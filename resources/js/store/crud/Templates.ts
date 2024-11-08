/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */
/* eslint-disable @typescript-eslint/no-empty-object-type */

/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { crud } from "@/services/baseURL";
import useLogin from "../auth/login";
import { TemplatesTypes } from "@/types/TemplatesTypes";
// store templates
type Props = {
    page?: number;
    limit?: number;
    search?: string;
    sortby?: string;
    order?: string;
};

type Store = {
    dtTemplates: {
        last_page: number;
        current_page: number;
        data: TemplatesTypes[];
    };

    setTemplates: ({ page, limit, search, sortby, order }: Props) => Promise<{
        status: string;
        data?: {};
        error?: {};
    }>;

    setShowTemplates: (id: number | string) => Promise<{
        status: string;
        data?: {};
        error?: {};
    }>;

    addData: (
        data: TemplatesTypes
    ) => Promise<{ status: string; data?: any; error?: any }>;

    removeData: (
        id: number | string
    ) => Promise<{ status: string; data?: any; error?: any }>;

    updateData: (
        id: number | string,
        data: TemplatesTypes
    ) => Promise<{ status: string; data?: any; error?: any }>;
};

const useTemplates = create(
    devtools<Store>((set) => ({
        dtTemplates: {
            last_page: 0,
            current_page: 0,
            data: [],
        },
        setTemplates: async ({
            page = 1,
            limit = 10,
            search,
            sortby,
            order,
        }) => {
            try {
                const token = await useLogin.getState().setToken();
                const response = await crud({
                    method: "get",
                    url: `/templates`,
                    headers: { Authorization: `Bearer ${token}` },
                    params: {
                        limit,
                        page,
                        search,
                        sortby,
                        order,
                    },
                });
                set((state) => ({ ...state, dtTemplates: response.data }));
                return {
                    status: "berhasil",
                    data: response.data,
                };
            } catch (error: any) {
                return {
                    status: "error",
                    error: error.response?.data,
                };
            }
        },
        setShowTemplates: async (id) => {
            try {
                const token = await useLogin.getState().setToken();
                const response = await crud({
                    method: "get",
                    url: `/templates/${id}`,
                    headers: { Authorization: `Bearer ${token}` },
                });
                set((state) => ({ ...state, dtTemplates: response.data.data }));
                return {
                    status: "berhasil",
                    data: response.data,
                };
            } catch (error: any) {
                return {
                    status: "error",
                    error: error.response?.data,
                };
            }
        },
        addData: async (row) => {
            try {
                const token = await useLogin.getState().setToken();
                const res = await crud({
                    method: "post",
                    url: `/templates`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                    data: row,
                });
                set((prevState) => ({
                    dtTemplates: {
                        last_page: prevState.dtTemplates.last_page,
                        current_page: prevState.dtTemplates.current_page,
                        data: [res.data.data, ...prevState.dtTemplates.data],
                    },
                }));
                return {
                    status: "berhasil tambah",
                    data: res.data,
                };
            } catch (error: any) {
                return {
                    status: "error",
                    data: error.response.data,
                };
            }
        },
        removeData: async (id) => {
            try {
                const token = await useLogin.getState().setToken();
                const res = await crud({
                    method: "delete",
                    url: `/templates/${id}`,
                    headers: { Authorization: `Bearer ${token}` },
                });
                set((prevState) => ({
                    dtTemplates: {
                        last_page: prevState.dtTemplates.last_page,
                        current_page: prevState.dtTemplates.current_page,
                        data: prevState.dtTemplates.data.filter(
                            (item: any) => item.id !== id
                        ),
                    },
                }));
                return {
                    status: "berhasil hapus",
                    data: res.data,
                };
            } catch (error: any) {
                return {
                    status: "error",
                    data: error.response.data,
                };
            }
        },
        updateData: async (id, row) => {
            try {
                const token = await useLogin.getState().setToken();

                const response = await crud({
                    method: "POST",
                    url: `/templates/${id}?_method=PUT`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                    data: row,
                });
                set((prevState) => ({
                    dtTemplates: {
                        last_page: prevState.dtTemplates.last_page,
                        current_page: prevState.dtTemplates.current_page,
                        data: prevState.dtTemplates.data.map((item: any) => {
                            if (item.id === id) {
                                return {
                                    ...item,
                                    ...response.data.data,
                                };
                            } else {
                                return item;
                            }
                        }),
                    },
                }));
                return {
                    status: "berhasil update",
                    data: response.data,
                };
            } catch (error: any) {
                return {
                    status: "error",
                    data: error.response.data,
                };
            }
        },
    }))
);

export default useTemplates;

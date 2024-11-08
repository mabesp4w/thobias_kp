import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { crud } from "@/services/baseURL";
import useLogin from "../auth/login";
import SubDistrictsTypes from "@/types/SubDistricts";
// store subDistricts
type Props = {
    page?: number;
    limit?: number;
    search?: string;
    sortby?: string;
    order?: string;
};

type Store = {
    dtSubDistricts: {
        last_page: number;
        current_page: number;
        data: SubDistrictsTypes[];
    };

    setSubDistricts: ({
        page,
        limit,
        search,
        sortby,
        order,
    }: Props) => Promise<{
        status: string;
        data?: {};
        error?: {};
    }>;

    setShowSubDistricts: (id: number | string) => Promise<{
        status: string;
        data?: {};
        error?: {};
    }>;

    addData: (
        data: SubDistrictsTypes
    ) => Promise<{ status: string; data?: any; error?: any }>;

    removeData: (
        id: number | string
    ) => Promise<{ status: string; data?: any; error?: any }>;

    updateData: (
        id: number | string,
        data: SubDistrictsTypes
    ) => Promise<{ status: string; data?: any; error?: any }>;
};

const useSubDistricts = create(
    devtools<Store>((set) => ({
        dtSubDistricts: {
            last_page: 0,
            current_page: 0,
            data: [],
        },
        setSubDistricts: async ({
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
                    url: `/subDistricts`,
                    headers: { Authorization: `Bearer ${token}` },
                    params: {
                        limit,
                        page,
                        search,
                        sortby,
                        order,
                    },
                });
                set((state) => ({
                    ...state,
                    dtSubDistricts: response.data,
                }));
                console.log({ response });
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
        setShowSubDistricts: async (id) => {
            try {
                const token = await useLogin.getState().setToken();
                const response = await crud({
                    method: "get",
                    url: `/subDistricts/${id}`,
                    headers: { Authorization: `Bearer ${token}` },
                });
                set((state) => ({
                    ...state,
                    dtSubDistricts: response.data.data,
                }));
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
                    url: `/subDistricts`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    data: row,
                });
                set((prevState) => ({
                    dtSubDistricts: {
                        last_page: prevState.dtSubDistricts.last_page,
                        current_page: prevState.dtSubDistricts.current_page,
                        data: [res.data.data, ...prevState.dtSubDistricts.data],
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
                    url: `/subDistricts/${id}`,
                    headers: { Authorization: `Bearer ${token}` },
                });
                set((prevState) => ({
                    dtSubDistricts: {
                        last_page: prevState.dtSubDistricts.last_page,
                        current_page: prevState.dtSubDistricts.current_page,
                        data: prevState.dtSubDistricts.data.filter(
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
                    method: "PUT",
                    url: `/subDistricts/${id}`,
                    headers: { Authorization: `Bearer ${token}` },
                    data: row,
                });
                set((prevState) => ({
                    dtSubDistricts: {
                        last_page: prevState.dtSubDistricts.last_page,
                        current_page: prevState.dtSubDistricts.current_page,
                        data: prevState.dtSubDistricts.data.map((item: any) => {
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

export default useSubDistricts;

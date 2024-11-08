import { FC } from "react";
import { StylesConfig } from "react-select";
import AsyncSelect from "react-select/async";
import { Controller } from "react-hook-form";

type Props = {
    dataDb: any;
    body: string[];
    control: any;
    required?: boolean;
    name: string;
    errors?: any;
    placeholder?: string;
    addClass: any;
    label?: string;
    menuPosition?: "fixed" | "absolute";
    defaultOptions?: boolean;
    menuPortalTarget?: boolean;
};

const SelectFromDb: FC<Props> = ({
    dataDb,
    body,
    control,
    required,
    name,
    errors,
    placeholder,
    addClass,
    label,
    defaultOptions = true,
    menuPosition = "fixed",
    menuPortalTarget = false,
}) => {
    // style
    const styles: StylesConfig<any, true> = {
        menuPortal: (base) => ({
            ...base,
            zIndex: 9999,
            pointerEvents: "auto",
        }),
        multiValue: (base, state) => {
            return state.data.isFixed
                ? { ...base, backgroundColor: "gray" }
                : base;
        },
        multiValueLabel: (base, state) => {
            return state.data.isFixed
                ? {
                      ...base,
                      fontWeight: "bold",
                      color: "white",
                      paddingRight: 6,
                  }
                : base;
        },
        multiValueRemove: (base, state) => {
            return state.data.isFixed ? { ...base, display: "none" } : base;
        },
    };

    const getProperty = (obj: any, prop: any): any => {
        const value = obj[prop];
        if (prop === "id") {
            return {
                value: value,
                label: "",
            };
        } else if (prop === "NPM_FULL") {
            const angkatan = obj?.thn_angkatan?.substring(2);
            const prodi = obj["prodi"];
            const NPM = obj["NPM"];
            //  return `${obj["prodi"]["kode"]}${angkatan}${obj["NPM"]}`;
            const NPMFULL = `${prodi["kode"]}${angkatan.substring(2)}${NPM}`;
            return {
                value: obj["NPM"],
                label: NPMFULL,
            };
        } else if (prop.includes(".")) {
            // melakukan pengecekan jika prop memiliki "." (titik)
            const [head, ...tail] = prop.split(".");
            const nestedObj = obj[head];
            return getProperty(nestedObj, tail.join(".")); // melakukan rekursi untuk mengambil property selanjutnya
        } else {
            return {
                value: "",
                label: value,
            };
        }
    };

    const myOptions = () => {
        const result =
            dataDb &&
            dataDb.map((row: any) => {
                const rowResult = body.map((column) => {
                    return getProperty(row, column);
                });
                const labels = rowResult
                    .map((item) => item.label)
                    .filter((label) => label !== "");
                const labelString = labels.join(labels.length > 1 ? " - " : "");
                return {
                    value: rowResult.find((item) => item.value !== "").value,
                    label: labelString,
                };
            });
        return result;
    };

    const filterData = (inputValue: string) => {
        return myOptions()?.filter((i: any) =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const loadOptions = (
        inputValue: string,
        callback: (options: any) => void
    ) => {
        setTimeout(() => {
            callback(filterData(inputValue));
        }, 1000);
    };

    return (
        <div className={addClass}>
            {label && (
                <label className="text-sm font-medium text-gray-700 tracking-wide">
                    {label}
                </label>
            )}
            {required && <span className="ml-1 text-red-600">*</span>}
            <Controller
                name={name}
                control={control}
                rules={{ required }}
                render={({ field: { onChange, value, ref } }) => (
                    <AsyncSelect
                        cacheOptions
                        defaultOptions={defaultOptions}
                        isClearable={true}
                        isSearchable={true}
                        loadOptions={loadOptions}
                        placeholder={placeholder}
                        menuPlacement="auto"
                        menuPosition={menuPosition}
                        menuPortalTarget={
                            menuPortalTarget ? document.body : null
                        }
                        styles={styles}
                        ref={ref}
                        value={
                            myOptions()?.find((x: any) => x.value === value) ||
                            null
                        }
                        onChange={(option: any) =>
                            onChange(option ? option.value : option)
                        }
                    />
                )}
            />
            {errors?.type === "required" && (
                <p className="text-red-500 font-inter italic text-sm">
                    {label} tidak boleh kosong
                </p>
            )}
        </div>
    );
};

export default SelectFromDb;

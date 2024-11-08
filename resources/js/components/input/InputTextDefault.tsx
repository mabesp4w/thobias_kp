import { FC } from "react";
import { Input } from "@/components/ui/input";

type Props = {
    label?: string;
    register: any;
    required?: boolean;
    name: string;
    minLength?: number;
    maxLength?: number;
    errors?: any;
    valueAsNumber?: boolean;
    type?:
        | "text"
        | "password"
        | "number"
        | "email"
        | "date"
        | "time"
        | "hidden";
    readOnly?: boolean;
    placeholder?: string;
    autoComplete?: string;
    addClass?: string;
    value?: string | number;
    defaultValue?: string | number;
    max?: number;
    min?: number;
    step?: number;
    labelCss?: string;
    className?: string;
};

const InputTextDefault: FC<Props> = ({
    label,
    register,
    required,
    name,
    minLength,
    maxLength,
    errors,
    valueAsNumber,
    type = "text",
    readOnly,
    placeholder,
    autoComplete = "on",
    addClass,
    value,
    defaultValue,
    max,
    min,
    step,
    labelCss = "text-gray-700",
    className,
}) => {
    return (
        <div className={addClass}>
            <label
                htmlFor={name}
                className={`text-sm font-medium  tracking-wide ${labelCss}`}
            >
                {label}
            </label>
            {required && <span className="ml-1 text-red-600">*</span>}
            <div className="relative">
                <Input
                    type={type}
                    id={name}
                    readOnly={readOnly}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    {...register(name, {
                        required,
                        minLength,
                        maxLength,
                        valueAsNumber,
                        max,
                        min,
                        step,
                    })}
                    defaultValue={defaultValue}
                    value={value}
                    className={className}
                />
            </div>
            {/* jika type password */}
            {errors?.type === "required" && (
                <p className="text-red-500 font-inter italic text-sm">
                    {label} tidak boleh kosong
                </p>
            )}
            {errors?.type === "minLength" && (
                <p className="text-red-500 font-inter italic text-sm">
                    {label} tidak boleh kurang dari {minLength} karakter
                </p>
            )}
            {errors?.type === "maxLength" && (
                <p className="text-red-500 font-inter italic text-sm">
                    {label} tidak boleh lebih dari {maxLength} karakter
                </p>
            )}
            {errors?.type === "pattern" && (
                <p className="text-red-500 font-inter italic text-sm">
                    {label} hanya boleh angka.
                </p>
            )}
            {errors?.type === "max" && (
                <p className="text-red-500 font-inter italic text-sm">
                    {label} tidak boleh lebih dari {max}.
                </p>
            )}
            {errors?.type === "min" && (
                <p className="text-red-500 font-inter italic text-sm">
                    {label} tidak boleh kurang dari {min}.
                </p>
            )}
        </div>
    );
};

export default InputTextDefault;

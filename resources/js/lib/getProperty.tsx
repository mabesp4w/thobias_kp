import { BASE_URL } from "../services/baseURL";
import moment from "moment";

const getProperty = (obj: any, prop: any, index: number, setIndexBox: any) => {
    const parts = prop.split(".");
    if (Array.isArray(parts)) {
        const last = parts.length > 1 ? parts.pop() : parts;
        // jika gabungan antara pangkat golongan dan ruang
        if (last.includes("start_end")) {
            const start_time = moment(obj["start_time"], "HH:mm:ss").format(
                "HH:mm"
            );
            const end_time = moment(obj["end_time"], "HH:mm:ss").format(
                "HH:mm"
            );
            return `${start_time} - ${end_time}`;
        }
        // memisahkan properti dalam bentuk array
        const l = parts.length;
        let i = 1,
            current = parts[0];
        while ((obj = obj[current]) && i < l) {
            current = parts[i];
            i++;
        }
        if (typeof obj === "object") {
            return obj ? obj[last] : "";
        }
        // date pros
        const dateProps = ["created_at", "updated_at", "deleted_at"];
        // cek date
        if (dateProps.includes(prop)) {
            return moment(obj).format("DD/MM/YYYY");
        }
        // cek image
        const fileProps = [
            "gambar",
            "foto",
            "img_student",
            "img_teacher",
            "img_slide",
            "img_news",
            "photo_path",
            "img_employee",
            "thumb_category",
            "img_facility",
            "img_achievement",
        ];
        // cek image
        if (fileProps.includes(prop)) {
            const extension = obj.split(".").pop();
            return (
                obj &&
                (["png", "jpg", "jpeg"].includes(extension) ? (
                    <img
                        src={`${BASE_URL}/${obj}`}
                        alt="image"
                        className="cursor-pointer"
                        onClick={
                            setIndexBox ? () => setIndexBox(index) : undefined
                        }
                    />
                ) : (
                    <a
                        href={`${BASE_URL}/${obj}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-700"
                    >
                        Lihat File
                    </a>
                ))
            );
        }
        return <p className="capitalize">{obj}</p>;
    } else {
        // eslint-disable-next-line no-throw-literal
        throw "parts is not valid array";
    }
};

export default getProperty;

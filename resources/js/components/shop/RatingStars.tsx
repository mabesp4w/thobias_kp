import { StarFilledIcon } from "@radix-ui/react-icons";

const RatingStars = ({ rating }: any) => {
    const fullStars = Math.floor(rating); // Hitung bintang penuh
    const halfStar = rating % 1 >= 0.5; // Jika rating memiliki sisa, tampilkan setengah bintang
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Sisanya adalah bintang kosong

    return (
        <section className="flex gap-x-2">
            <div className="flex">
                {/* Bintang Penuh */}
                {[...Array(fullStars)].map((_, index) => (
                    <StarFilledIcon
                        key={`full-${index}`}
                        className="text-yellow-500"
                    />
                ))}

                {/* Bintang Setengah */}
                {halfStar && (
                    <StarFilledIcon className="text-yellow-500 opacity-50" />
                )}

                {/* Bintang Kosong */}
                {[...Array(emptyStars)].map((_, index) => (
                    <StarFilledIcon
                        key={`empty-${index}`}
                        className="text-gray-300"
                    />
                ))}
            </div>
            <p>{rating}</p>
        </section>
    );
};

export default RatingStars;

const transformDataWithFilters = (data: any, nestedKeys: any) => {
    return data.map((item: any) => {
        const newItem = { ...item };

        nestedKeys.forEach((key: any) => {
            const keys = key.split(".");
            const filterKey = `${keys.join("_")}_filter`;

            // Ambil nilai nested dari objek dengan pengecekan mendalam
            let value = item;
            for (let k of keys) {
                value = value ? value[k] : null;
            }

            newItem[filterKey] = value;
        });

        return newItem;
    });
};

export default transformDataWithFilters;

export const getSaleByDate = (from, to) => {
    const sales = JSON.parse(localStorage.getItem("sales")) || [];

    return sales.filter(sale => {
        const saleDate = new Date(sale.date);

        // Convertimos la fecha de la venta a YYYY-MM-DD en UTC
        const saleDay = saleDate.toISOString().split("T")[0];

        if (from && saleDay < from) {
            return false;
        }

        if (to && saleDay > to) {
            return false;
        }

        return true;
    });
};


export const getSaleById = (idSale) => {
    const sales = JSON.parse(localStorage.getItem("sales")) || [];

    const sale = sales.find(sale => sale.id === idSale);

    if (!sale) {
        console.log("Sale not found");
        return null;
}

    return sale;
};
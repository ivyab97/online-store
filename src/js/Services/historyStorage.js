const HISTORY_KEY = "productHistory";


export const getVisitedProducts = () => {

    const history =
        localStorage.getItem(HISTORY_KEY);

    if (!history) {
        return [];
    }

    try {
        return JSON.parse(history);
    } catch (error) {
        console.error(
            "No se pudo leer el historial:",
            error
        );

        return [];
    }
};


export const registerVisitedProduct = (product) => {

    const history =
        getVisitedProducts();


    

    const historyWithoutProduct =
        history.filter(
            item => item.id !== product.id
        );


    const visitedProduct = {
        id: product.id,
        title: product.title,
        thumbnail: product.thumbnail,
        category: product.category,
        price: product.price,
        discountPercentage:
            product.discountPercentage,
        rating: product.rating,
        visitedAt:
            new Date().toISOString()
    };


    const updatedHistory = [
        visitedProduct,
        ...historyWithoutProduct
    ];


    localStorage.setItem(
        HISTORY_KEY,
        JSON.stringify(updatedHistory)
    );
};


export const removeVisitedProduct = (productId) => {

    const history =
        getVisitedProducts();

    const updatedHistory =
        history.filter(
            product =>
                product.id !== productId
        );


    localStorage.setItem(
        HISTORY_KEY,
        JSON.stringify(updatedHistory)
    );
};


export const clearVisitedProducts = () => {

    localStorage.removeItem(HISTORY_KEY);
};
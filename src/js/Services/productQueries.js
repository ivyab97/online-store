import { apiServiceFalledDescription, apiServiceFalledTitle, createAlertModal } from "../EventFunctions/alert.js";

const urlBase = "https://dummyjson.com/products";

export const getProduct = async (idProduct) => {

    const url = `${urlBase}/${idProduct}`;
    let result = null;
    let statusCodeMessage = null;

    try {
        const response = await fetch(url);

        if (response.ok) {
            result = await response.json();
            // Save in LocalStorage
            localStorage.setItem(`memoizationCache_${idProduct}`, JSON.stringify(result));
        }
        if (response.status===400)
        {
            statusCodeMessage = await response.json();
            console.log(statusCodeMessage.message);
        }
        if (response.status===404)
        {
            statusCodeMessage = await response.json();
            console.log(statusCodeMessage.message);
        }
    } catch (error) {
        if (error.name === "TypeError" && error.message === "Failed to fetch") {
            createAlertModal(apiServiceFalledTitle, apiServiceFalledDescription);
        }
    }

    return result;
}


export const getProductByFilters = async (name, limit, skip, category) => {

    let url;

    if (name) {
        url = new URL(`${urlBase}/search`);
        url.searchParams.set("q", name);
    }
    else if (category) {
        url = new URL(`${urlBase}/category/${category}`);
    }
    else {
        url = new URL(urlBase);
    }

    if (limit !== null && limit !== undefined) {
        url.searchParams.set("limit", limit);
    }

    if (skip !== null && skip !== undefined) {
        url.searchParams.set("skip", skip);
    }

    let result = [];

    try {

        const response = await fetch(url);

        if (response.ok) {
            result = await response.json();
        }
        else {
            console.error(`Error HTTP: ${response.status}`);
        }

    }
    catch (error) {

        if (
            error.name === "TypeError" &&
            error.message === "Failed to fetch"
        ) {
            createAlertModal(
                apiServiceFalledTitle,
                apiServiceFalledDescription
            );
        }

    }

    return result;
}


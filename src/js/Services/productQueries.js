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


export const getProductByFilters = async (name, limit, offset, category) => {
    var url = `${urlBase}/`;

    if(name)
    {
        url += `search?q=${name}`;
    }
    else if(category)
    {
        url += `category/${category}?`
    }
    if(limit)
    {
        if(name){url += `&`;}
        url += `limit=${limit}`;
    }
    if(offset)
    {
        if (name || limit) {url += `&`;}
        url += `skip=${offset}`;
    }
    let result = []
    try {
        let response = await fetch(url);
        if(response.ok){
            result = await response.json();
        }
    } catch (error) {
        if(error.name === "TypeError" && error.message === "Failed to fetch")
        {
            createAlertModal(apiServiceFalledTitle, apiServiceFalledDescription);
        }
    }  
    return result;    
}


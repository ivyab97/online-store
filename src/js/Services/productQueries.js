import { apiServiceFalledDescription, apiServiceFalledTitle, createAlertModal } from "../EventFunctions/alert.js";

const urlBase = "http://localhost:5007/api/Product";

export const getProduct = async (idProduct) => {
    // Check in LocalStorage - Memoization
    const cachedProduct = localStorage.getItem(`memoizationCache_${idProduct}`);
    if (cachedProduct) {
        return JSON.parse(cachedProduct);
    }

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


export const getProductByFilters = async (name, limit, offset, categories) => {
    var url = `${urlBase}?`;

    if(name)
    {
        url += `name=${name}`;
    }
    if(limit)
    {
        if(name){url += `&`;}
        url += `limit=${limit}`;
    }
    if(offset)
    {
        if (name || limit) {url += `&`;}
        url += `offset=${offset}`;
    }
    if(categories)
    {
        categories.forEach(id => {
            if (name || limit || offset) {url += `&`;}
            url += `categories=${id}`;
        });
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


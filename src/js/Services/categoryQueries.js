import { apiServiceFalledDescription, apiServiceFalledTitle, createAlertModal } from "../EventFunctions/alert.js";

const urlBase = "https://dummyjson.com/products";


export const getCategories = async () => {
    var url = `${urlBase}/category-list`;

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


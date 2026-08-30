import { apiServiceFalledDescription, apiServiceFalledTitle, createAlertModal, orderCompletedOptional, orderCompletedTitle } from "../EventFunctions/alert.js";

const urlBase = "https://dummyjson.com/carts";


export const createSale = async (saleRequest) => {
    var url = `${urlBase}/add`;

    let responseData = null;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(saleRequest)
        });

        if (response.ok)
        {
            responseData = await response.json();
            createAlertModal(orderCompletedTitle, orderCompletedOptional+responseData.id);
        }
        else {
            throw new Error('Error al registrar la venta');
        }

        return responseData;

    } catch (error) {
        if (error.name === "TypeError" && error.message === "Failed to fetch") {
            createAlertModal(apiServiceFalledTitle, apiServiceFalledDescription);
        }
    }
}

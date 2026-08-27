import { apiServiceFalledDescription, apiServiceFalledTitle, createAlertModal, orderCompletedOptional, orderCompletedTitle } from "../EventFunctions/alert.js";

const urlBase = "http://localhost:5007/api/Sale";


export const createSale = async (saleRequest) => {
    let responseData = null;
    try {
        const response = await fetch(urlBase, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(saleRequest)
        });

        if (response.ok)
        {
            responseData = await response.json();
            console.log(responseData.id)
            createAlertModal(orderCompletedTitle, orderCompletedOptional+responseData.id);
        }
        else {
            console.log(response)
            throw new Error('Error al registrar la venta');
        }

        return responseData;

    } catch (error) {
        if (error.name === "TypeError" && error.message === "Failed to fetch") {
            createAlertModal(apiServiceFalledTitle, apiServiceFalledDescription);
        }
    }
}

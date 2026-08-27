const urlBase = "http://localhost:5007/api/Sale";

export const getSaleByDate = async (from, to) => {
    var url = `${urlBase}?`;
    let result = []

    if(from)
    {
        url += `from=${from}`;
    }
    if(to)
    {
        if(from){url += `&`;}
        url += `to=${to}`;
    }
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


export const getSaleById = async (idSale) => {
    const url = `${urlBase}/${idSale}`;
    let result = null;
    let statusCodeMessage = null;

    try {
        const response = await fetch(url);

        if (response.ok) {
            result = await response.json();
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
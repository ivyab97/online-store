import { footer } from "./Components/footer.js";
import { header } from "./Components/header.js";
import { detailSale, searchSale } from "./EventFunctions/actionSale.js";


export const saleRender = async () => {
    let _header = document.getElementById("header");
    let _footer = document.getElementById("footer");

    _header.innerHTML = header();
    _footer.innerHTML = footer();

    await searchSale();
    await detailSale();
}

await saleRender();
import { header } from "./Components/header.js";
import { productSearcherAndPrinter } from "./EventFunctions/searcher.js";
import { addProduct, detailProduct } from "./EventFunctions/actionProduct.js";
import { clickCategorySearch, clickExpand } from "./EventFunctions/actionClick.js";
import { registerSale } from "./EventFunctions/actionSale.js";
import { footer } from "./Components/footer.js";
import { fillCategories } from "./EventFunctions/actionCategory.js";
import { pageButton } from "./Components/pageButton.js"

export const IndexRender = async () => {
  document.addEventListener("DOMContentLoaded", async () => {
    let _header = document.getElementById('header');
    let _footer = document.getElementById('footer');
    let _container = document.getElementsByClassName('content__product')[0];
    let _pagination = pageButton();

    _header.innerHTML = header();
    _footer.innerHTML = footer();
    _container.insertAdjacentHTML("afterend", _pagination);

    await fillCategories();
    clickCategorySearch();
    clickExpand();
    await productSearcherAndPrinter(_container);
    addProduct();
    await detailProduct();
    await registerSale();
  })
}

await IndexRender();

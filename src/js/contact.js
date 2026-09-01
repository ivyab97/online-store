import { header } from "./Components/header.js";
import { footer } from "./Components/footer.js";


document.addEventListener("DOMContentLoaded", () => {

    const headerContainer =
        document.getElementById("header");

    const footerContainer =
        document.getElementById("footer");


    headerContainer.innerHTML = header();

    footerContainer.innerHTML = footer();

});
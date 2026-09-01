import { header } from "./Components/header.js";
import { footer } from "./Components/footer.js";
import { getProductByFilters } from "./Services/productQueries.js";


const PRODUCTS_PER_PAGE = 10;

let currentProducts = [];
let currentPage = 1;


/* =========================
   UTILIDADES
========================= */

const formatCategory = (category) => {
    return category
        .split("-")
        .map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" ");
};


const calculateDiscountPrice = (product) => {
    return (
        product.price -
        (product.price * product.discountPercentage / 100)
    );
};


/* =========================
   TARJETA DE PRODUCTO
========================= */

const createProductCard = (product) => {

    const discountPrice =
        calculateDiscountPrice(product);

    return `
        <a
            class="product-card-link"
            href="./detail.html?id=${product.id}"
            aria-label="Ver detalle de ${product.title}"
        >

            <article class="product-card">

                <div class="product-card__image-container">

                    <img
                        class="product-card__image"
                        src="${product.thumbnail}"
                        alt="${product.title}"
                        loading="lazy"
                    >

                </div>


                <div class="product-card__info">

                    <h3 class="product-card__title">
                        ${product.title}
                    </h3>

                    <p class="product-card__category">
                        ${formatCategory(product.category)}
                    </p>


                    <div class="product-card__price-container">

                        <p class="product-card__original-price">
                            $ ${product.price.toFixed(2)}
                        </p>

                        <p class="product-card__price">
                            $ ${discountPrice.toFixed(2)}
                        </p>

                        <p class="product-card__discount">
                            %${product.discountPercentage.toFixed(2)} OFF
                        </p>

                    </div>


                    <div class="product-card__extra">

                        <span>
                            Rating: ${product.rating.toFixed(1)}
                        </span>

                    </div>


                    <span class="product-card__detail">
                        Ver detalle
                    </span>

                </div>

            </article>

        </a>
    `;
};


/* =========================
   CATEGORÍAS
========================= */

const fillCategorySelect = (
    products,
    categorySelect
) => {

    const categories =
        [...new Set(
            products.map(product => product.category)
        )]
            .sort();


    categories.forEach(category => {

        const option =
            document.createElement("option");

        option.value = category;

        option.textContent =
            formatCategory(category);

        categorySelect.appendChild(option);

    });

};


/* =========================
   RESULTADOS
========================= */

const renderProducts = (
    productsContainer,
    resultsStatus,
    paginationContainer
) => {

    if (currentProducts.length === 0) {

        productsContainer.innerHTML = `
            <p class="products-empty">
                No se encontraron productos
                con los filtros seleccionados.
            </p>
        `;

        resultsStatus.textContent =
            "0 productos encontrados.";

        paginationContainer.innerHTML = "";

        return;
    }


    const totalPages =
        Math.ceil(
            currentProducts.length /
            PRODUCTS_PER_PAGE
        );


    if (currentPage > totalPages) {
        currentPage = totalPages;
    }


    const start =
        (currentPage - 1) *
        PRODUCTS_PER_PAGE;

    const end =
        start + PRODUCTS_PER_PAGE;


    const productsToShow =
        currentProducts.slice(start, end);


    productsContainer.innerHTML =
        productsToShow
            .map(createProductCard)
            .join("");


    const firstProduct = start + 1;

    const lastProduct =
        Math.min(
            end,
            currentProducts.length
        );


    resultsStatus.textContent =
        `Mostrando ${firstProduct}-${lastProduct} ` +
        `de ${currentProducts.length} productos.`;


    renderPagination(
        paginationContainer,
        productsContainer,
        resultsStatus
    );
};


/* =========================
   PAGINACIÓN
========================= */

const renderPagination = (
    paginationContainer,
    productsContainer,
    resultsStatus
) => {

    const totalPages =
        Math.ceil(
            currentProducts.length /
            PRODUCTS_PER_PAGE
        );


    if (totalPages <= 1) {

        paginationContainer.innerHTML = "";

        return;
    }


    paginationContainer.innerHTML = `
        <button
            type="button"
            class="pagination__button"
            id="previous-page"
            ${currentPage === 1 ? "disabled" : ""}
        >
            Anterior
        </button>


        <span class="pagination__status">
            Página ${currentPage} de ${totalPages}
        </span>


        <button
            type="button"
            class="pagination__button"
            id="next-page"
            ${currentPage === totalPages ? "disabled" : ""}
        >
            Siguiente
        </button>
    `;


    const previousButton =
        document.getElementById(
            "previous-page"
        );

    const nextButton =
        document.getElementById(
            "next-page"
        );


    previousButton?.addEventListener(
        "click",
        () => {

            if (currentPage > 1) {

                currentPage--;

                renderProducts(
                    productsContainer,
                    resultsStatus,
                    paginationContainer
                );

                productsContainer.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }
    );


    nextButton?.addEventListener(
        "click",
        () => {

            if (currentPage < totalPages) {

                currentPage++;

                renderProducts(
                    productsContainer,
                    resultsStatus,
                    paginationContainer
                );

                productsContainer.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }
    );

};


/* =========================
   VALIDACIÓN DE FILTROS
========================= */

const validatePrices = (
    minPrice,
    maxPrice,
    resultsStatus
) => {

    if (
        minPrice !== null &&
        minPrice < 0
    ) {

        resultsStatus.textContent =
            "El precio mínimo no puede ser negativo.";

        return false;
    }


    if (
        maxPrice !== null &&
        maxPrice < 0
    ) {

        resultsStatus.textContent =
            "El precio máximo no puede ser negativo.";

        return false;
    }


    if (
        minPrice !== null &&
        maxPrice !== null &&
        minPrice > maxPrice
    ) {

        resultsStatus.textContent =
            "El precio mínimo no puede ser mayor al precio máximo.";

        return false;
    }


    return true;
};


/* =========================
   BÚSQUEDA
========================= */

const searchProducts = async (
    searchInput,
    categorySelect,
    minPriceInput,
    maxPriceInput,
    productsContainer,
    resultsStatus,
    paginationContainer
) => {

    const name =
        searchInput.value.trim();

    const category =
        categorySelect.value;


    const minPrice =
        minPriceInput.value !== ""
            ? Number(minPriceInput.value)
            : null;


    const maxPrice =
        maxPriceInput.value !== ""
            ? Number(maxPriceInput.value)
            : null;


    const validPrices =
        validatePrices(
            minPrice,
            maxPrice,
            resultsStatus
        );


    if (!validPrices) {
        return;
    }


    resultsStatus.textContent =
        "Buscando productos...";

    productsContainer.innerHTML = "";

    paginationContainer.innerHTML = "";


   

    const result =
        await getProductByFilters(
            name || null,
            0,
            0,
            category || null
        );


    let products =
        result?.products ?? [];


    

    if (category) {

        products =
            products.filter(
                product =>
                    product.category === category
            );

    }


   

    if (minPrice !== null) {

        products =
            products.filter(
                product =>
                    product.price >= minPrice
            );

    }


    if (maxPrice !== null) {

        products =
            products.filter(
                product =>
                    product.price <= maxPrice
            );

    }


    currentProducts = products;

    currentPage = 1;


    renderProducts(
        productsContainer,
        resultsStatus,
        paginationContainer
    );

};


/* =========================
   INICIALIZACIÓN
========================= */

export const IndexRender = async () => {

    const headerContainer =
        document.getElementById("header");

    const footerContainer =
        document.getElementById("footer");

    const searchForm =
        document.getElementById("search-form");

    const searchInput =
        document.getElementById("search");

    const categorySelect =
        document.getElementById(
            "category-filter"
        );

    const minPriceInput =
        document.getElementById(
            "min-price"
        );

    const maxPriceInput =
        document.getElementById(
            "max-price"
        );

    const productsContainer =
        document.getElementById(
            "product-results"
        );

    const resultsStatus =
        document.getElementById(
            "results-status"
        );

    const paginationContainer =
        document.getElementById(
            "pagination"
        );


    /* =========================
       COMPONENTES COMPARTIDOS
    ========================== */

    headerContainer.innerHTML =
        header();

    footerContainer.innerHTML =
        footer();


    /* =========================
       CARGA INICIAL
    ========================== */

    resultsStatus.textContent =
        "Cargando productos...";


    const initialResult =
        await getProductByFilters(
            null,
            0,
            0,
            null
        );


    const initialProducts =
        initialResult?.products ?? [];


    fillCategorySelect(
        initialProducts,
        categorySelect
    );


    currentProducts =
        initialProducts;

    currentPage = 1;


    renderProducts(
        productsContainer,
        resultsStatus,
        paginationContainer
    );


    /* =========================
       EVENTO DE BÚSQUEDA
    ========================== */

    searchForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            await searchProducts(
                searchInput,
                categorySelect,
                minPriceInput,
                maxPriceInput,
                productsContainer,
                resultsStatus,
                paginationContainer
            );

        }
    );

};


/* =========================
   INICIO DE LA VISTA
========================= */

document.addEventListener(
    "DOMContentLoaded",
    IndexRender
);
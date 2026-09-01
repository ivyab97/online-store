import { header } from "./Components/header.js";
import { footer } from "./Components/footer.js";
import { getProductByFilters } from "./Services/productQueries.js";


const createFeaturedProduct = (product) => {

    const discountPrice =
        product.price -
        (
            product.price *
            product.discountPercentage /
            100
        );

    return `
        <article class="featured-card">

            <a
                href="./detail.html?id=${product.id}"
                class="featured-card__image-link"
                aria-label="Ver detalle de ${product.title}"
            >
                <div class="featured-card__image-container">

                    <img
                        class="featured-card__image"
                        src="${product.thumbnail}"
                        alt="${product.title}"
                        loading="lazy"
                    >

                </div>
            </a>


            <div class="featured-card__info">

                <h3 class="featured-card__title">

                    <a
                        href="./detail.html?id=${product.id}"
                        class="featured-card__title-link"
                    >
                        ${product.title}
                    </a>

                </h3>


                <p class="featured-card__category">
                    ${product.category}
                </p>


                <div class="featured-card__price-container">

                    <p class="featured-card__original-price">
                        $ ${product.price.toFixed(2)}
                    </p>

                    <p class="featured-card__price">
                        $ ${discountPrice.toFixed(2)}
                    </p>

                    <p class="featured-card__discount">
                        %${product.discountPercentage.toFixed(2)} OFF
                    </p>

                </div>


                <a
                    href="./detail.html?id=${product.id}"
                    class="featured-card__detail"
                >
                    Ver detalle
                </a>

            </div>

        </article>
    `;
};


document.addEventListener(
    "DOMContentLoaded",
    async () => {

        const headerContainer =
            document.getElementById("header");

        const footerContainer =
            document.getElementById("footer");

        const productsContainer =
            document.getElementById(
                "featured-products"
            );


      

        headerContainer.innerHTML =
            header();

        footerContainer.innerHTML =
            footer();


        

        const result =
            await getProductByFilters(
                null,
                30,
                0,
                null
            );


        if (
            !result?.products ||
            result.products.length === 0
        ) {

            productsContainer.innerHTML = `
                <p>
                    No se pudieron cargar
                    los productos destacados.
                </p>
            `;

            return;
        }


        

        const featuredProducts =
            [...result.products]
                .sort(() => Math.random() - 0.5)
                .slice(0, 6);


        productsContainer.innerHTML =
            featuredProducts
                .map(createFeaturedProduct)
                .join("");

    }
);
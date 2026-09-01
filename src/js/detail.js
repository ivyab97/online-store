import { header } from "./Components/header.js";
import { footer } from "./Components/footer.js";
import { getProduct } from "./Services/productQueries.js";
import {
    registerVisitedProduct
} from "./Services/historyStorage.js";


/* =========================
   UTILIDADES
========================= */

const formatCategory = (category = "") => {

    return category
        .split("-")
        .map(word =>
            word.charAt(0).toUpperCase() +
            word.slice(1)
        )
        .join(" ");
};


const calculateDiscountPrice = (product) => {

    return (
        product.price -
        (
            product.price *
            product.discountPercentage /
            100
        )
    );
};


const formatValue = (
    value,
    fallback = "No disponible"
) => {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {
        return fallback;
    }

    return value;
};


/* =========================
   RESEÑAS
========================= */

const createReviews = (reviews = []) => {

    if (!reviews.length) {

        return `
            <p class="detail-empty-message">
                Este producto no posee reseñas.
            </p>
        `;
    }


    return reviews
        .map(review => `
            <article class="review-card">

                <div class="review-card__header">

                    <h4>
                        ${formatValue(
                            review.reviewerName,
                            "Usuario"
                        )}
                    </h4>

                    <span class="review-card__rating">
                        ${review.rating}/5
                    </span>

                </div>

                <p>
                    ${formatValue(
                        review.comment,
                        "Sin comentario."
                    )}
                </p>

            </article>
        `)
        .join("");
};


/* =========================
   DETALLE DEL PRODUCTO
========================= */

const createProductDetail = (product) => {

    const discountedPrice =
        calculateDiscountPrice(product);


    const dimensions =
        product.dimensions ?? {};


    const tags =
        Array.isArray(product.tags)
            ? product.tags.join(", ")
            : "No disponible";


    return `
        <article class="product-detail">

            <!-- =========================
                 INFORMACIÓN PRINCIPAL
            ========================== -->

            <div class="product-detail__main">

                <div class="product-detail__image-container">

                    <img
                        class="product-detail__image"
                        src="${product.thumbnail}"
                        alt="${product.title}"
                    >

                </div>


                <div class="product-detail__content">

                    <p class="product-detail__category">
                        ${formatCategory(
                            product.category
                        )}
                    </p>


                    <h2 class="product-detail__title">
                        ${product.title}
                    </h2>


                    <p class="product-detail__rating">
                        Rating:
                        ${product.rating.toFixed(1)} / 5
                    </p>


                    <p class="product-detail__description">
                        ${product.description}
                    </p>


                    <div class="product-detail__prices">

                        <p class="product-detail__original-price">
                            $ ${product.price.toFixed(2)}
                        </p>

                        <p class="product-detail__price">
                            $ ${discountedPrice.toFixed(2)}
                        </p>

                        <p class="product-detail__discount">
                            %${product.discountPercentage.toFixed(2)}
                            OFF
                        </p>

                    </div>


                    <p class="product-detail__stock">
                        Stock disponible:
                        <strong>
                            ${product.stock}
                        </strong>
                    </p>


                    <div class="product-detail__actions">

                        <button
                            type="button"
                            id="wishlist-button"
                            class="detail-button
                                   detail-button--primary"
                            data-product-id="${product.id}"
                        >
                            Agregar a lista de deseos
                        </button>


                        <a
                            href="./index.html"
                            class="detail-button
                                   detail-button--secondary"
                        >
                            Volver a productos
                        </a>

                    </div>

                </div>

            </div>


            <!-- =========================
                 INFORMACIÓN ADICIONAL
            ========================== -->

            <section class="product-information">

                <h3>
                    Información del producto
                </h3>


                <div class="product-information__grid">

                    <div class="information-item">
                        <span>Marca</span>

                        <strong>
                            ${formatValue(product.brand)}
                        </strong>
                    </div>


                    <div class="information-item">
                        <span>SKU</span>

                        <strong>
                            ${formatValue(product.sku)}
                        </strong>
                    </div>


                    <div class="information-item">
                        <span>Disponibilidad</span>

                        <strong>
                            ${formatValue(
                                product.availabilityStatus
                            )}
                        </strong>
                    </div>


                    <div class="information-item">
                        <span>Garantía</span>

                        <strong>
                            ${formatValue(
                                product.warrantyInformation
                            )}
                        </strong>
                    </div>


                    <div class="information-item">
                        <span>Envío</span>

                        <strong>
                            ${formatValue(
                                product.shippingInformation
                            )}
                        </strong>
                    </div>


                    <div class="information-item">
                        <span>Política de devolución</span>

                        <strong>
                            ${formatValue(
                                product.returnPolicy
                            )}
                        </strong>
                    </div>


                    <div class="information-item">
                        <span>Peso</span>

                        <strong>
                            ${
                                product.weight !== undefined
                                    ? `${product.weight}`
                                    : "No disponible"
                            }
                        </strong>
                    </div>


                    <div class="information-item">
                        <span>Pedido mínimo</span>

                        <strong>
                            ${formatValue(
                                product.minimumOrderQuantity
                            )}
                        </strong>
                    </div>


                    <div class="information-item">
                        <span>Dimensiones</span>

                        <strong>
                            ${formatValue(dimensions.width)}
                            ×
                            ${formatValue(dimensions.height)}
                            ×
                            ${formatValue(dimensions.depth)}
                        </strong>
                    </div>


                    <div class="information-item">
                        <span>Etiquetas</span>

                        <strong>
                            ${tags}
                        </strong>
                    </div>

                </div>

            </section>


            <!-- =========================
                 RESEÑAS
            ========================== -->

            <section class="product-reviews">

                <h3>
                    Reseñas
                </h3>

                <div class="product-reviews__list">

                    ${createReviews(
                        product.reviews
                    )}

                </div>

            </section>

        </article>
    `;
};


/* =========================
   ERROR
========================= */

const showDetailError = (
    container,
    message
) => {

    container.innerHTML = `
        <div class="detail-error">

            <h2>
                No se pudo cargar el producto
            </h2>

            <p>
                ${message}
            </p>

            <a
                href="./index.html"
                class="detail-button
                       detail-button--secondary"
            >
                Volver a productos
            </a>

        </div>
    `;
};


/* =========================
   WISHLIST - PUNTO DE
   INTEGRACIÓN
========================= */

const configureWishlistButton = () => {

    const wishlistButton =
        document.getElementById(
            "wishlist-button"
        );


    if (!wishlistButton) {
        return;
    }


    wishlistButton.addEventListener(
        "click",
        () => {

            

            console.log(
                "Producto preparado para Lista de Deseos:",
                wishlistButton.dataset.productId
            );

        }
    );
};


/* =========================
   INICIALIZACIÓN
========================= */

const DetailRender = async () => {

    const headerContainer =
        document.getElementById("header");

    const footerContainer =
        document.getElementById("footer");

    const detailContainer =
        document.getElementById(
            "detail-container"
        );


    headerContainer.innerHTML =
        header();

    footerContainer.innerHTML =
        footer();


    /* =========================
       ID DESDE LA URL
    ========================== */

    const params =
        new URLSearchParams(
            window.location.search
        );


    const productId =
        params.get("id");


    if (
        !productId ||
        !/^\d+$/.test(productId)
    ) {

        showDetailError(
            detailContainer,
            "El identificador del producto no es válido."
        );

        return;
    }


    /* =========================
       CONSULTA A LA API
    ========================== */

    const product =
        await getProduct(productId);


    if (!product) {

        showDetailError(
            detailContainer,
            "El producto solicitado no existe o no pudo ser recuperado."
        );

        return;
    }


    /* =========================
       RENDER
    ========================== */

    document.title =
        `${product.title} | Online Store`;


    detailContainer.innerHTML =
        createProductDetail(product);


    /* =========================
       HISTORIAL
    ========================== */

    registerVisitedProduct(product);


    /* =========================
       LISTA DE DESEOS
    ========================== */

    configureWishlistButton();

};


/* =========================
   INICIO
========================= */

document.addEventListener(
    "DOMContentLoaded",
    DetailRender
);
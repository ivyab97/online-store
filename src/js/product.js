export function product(data) {
    const discountPrice = data.price - (data.price * data.discount / 100);
    const discountElement = data.discount !== 0 ? `
        <div class="card__discount-container">
            <p class="card__price card__price--original" value="${discountPrice}" discount=${data.discount} original-price="${data.price}">$ ${data.price}</p>
            <p class="card__price card__price--discounted" value="${discountPrice}" discount="${data.discount}">$ ${discountPrice.toFixed(2)}</p>
            <p class="card__discount">%${data.discount} OFF</p>
        </div>` : `
        <p class="card__price" value="${data.price}" discount=0 original-price="${data.price}">$ ${data.price}</p>`;

    return `
    <article class="product__card card" value="${data.id}">
        <div class="card__img-container">
            <img class="card__img" src="${data.imageUrl}" alt="Imagen del producto">
        </div>
        <div class="card__info info">
            <h4 class="info__name">${data.name}</h4>
            <p class="info__category">${data.categoryName}</p>
            <div class="card__price-container">
                ${discountElement}
            </div>
            <button class="button__addProduct" value="${data.id}" id="button__addProduct${data.id}">
                <img src="./../../Image/Icons/plus.png" class="more" alt="+">
            </button>
        </div>
    </article>`;
}

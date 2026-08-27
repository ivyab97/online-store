export const productInfoAddInOrder = (id, name, priceWithDiscount, originalPrice, discount) =>{
    return `
    <div class="productInfoAdd" id="${"productAdd"+id}" value="${id}" price="${originalPrice}" discount="${discount}">
        <div class="productInfoAdd__quantity">
            <p class="quantity">1</p>
            <p>x</p>
        </div>
        <div class="productInfoAdd__name">
            <p>${name}</p>
        </div>
        <div class="productInfoAdd__price-button">
            <div class="productInfoAdd__price" value="${originalPrice}">
                <p>$</p>
                <p class="subTotalPrice">${priceWithDiscount}</p>
            </div>
            <div class="productAdd__button">
                <span>
                    <img src="../../../Image/Icons/minus.png" class="minus" alt="-">
                </span>
                <span class="quantity" price=${originalPrice}>
                    1
                </span>
                <span>
                    <img src="./../../Image/Icons/plus.png" class="more" alt="+">
                </span>
            </div>
        </div>
    </div>
    `
}
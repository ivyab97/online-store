export function productModal(data) {

    
    return `           
       <div id="productInfoModalClose">
                    <span class="material-symbols-outlined">
                    close
                    </span>
                </div>
                <div class="productInfoModal__info info">
                    <div class="info__title">
                        <p>
                            ${data.name}
                        </p> 
                        
                    </div>
                    <div class="info__img">
                        <img src="${data.imageUrl}" alt="productImagen">
                    </div>
                    <div class="info__productInfo productInfo">
                        
                        <div class="productInfo__price">
                            <p>$</p>
                            <p class="price">${data.price}</p>
                        </div>
                    </div>
                </div>

                
                <div class="productInfoModal__preparationMode">
                    <p id="detailProductRecipe">
                        ${data.description}
                    </p>
                </div>  

                <div class="productInfoModal__addUnits">
                    <p>Unidades</p>
                    <div class="productAdd__button">
                        <span>
                            <img src="../../../Image/Icons/minus.png" class="minus" alt="-">
                        </span>
                        <span class="quantity">
                            1
                        </span>
                        <span>
                            <img src="./../../Image/Icons/plus.png" class="more" alt="+">
                        </span>
                    </div>
                </div>
                
                <div class="productInfoModal__buttonConfirm">
                    <button class="option" id="modalAddButton" value="${data.id}">
                        <div id="unitCircle">
                            <p class="quantity">1</p>
                        </div>
                        <p>Agregar a mi pedido</p>
                        <div class="divFlex">
                            <p>$</p>
                            <p class="subTotalPrice">${data.price}</p>
                        </div>
                    </button>
                </div>
        
    `;
}

    export const productModal2 = (data) => `
    <div class="modal-header">
        <div id="productInfoModalClose" class="close-button">
            <span class="material-symbols-outlined">close</span>
        </div>
    </div>
    <div class="modal-content">
        <div class="product-info">
            <h1 class="product-title">${data.name}</h1>
            <img class="product-image" src="${data.imageUrl}" alt="${data.name}">
            <div class="product-details">
                <h2 class="product-category">${data.category.name}</h2>
                <h3 class="product-price">$${data.price}</h3>
                <p class="product-description">${data.description}</p>
            </div>
        </div>
        <div class="product-actions">
            <div class="units-selector">
                <label for="units">Unidades</label>
                <div class="quantity-controls">
                    <button class="quantity-decrease">-</button>
                    <span class="quantity">1</span>
                    <button class="quantity-increase">+</button>
                </div>
            </div>
            <button class="add-to-cart" id="modalAddButton" value="${data.id}">
                <span class="cart-quantity">1</span>
                <span>Agregar A Mi Pedido</span>
                <span class="total-price">$${data.price}</span>
            </button>
        </div>
    </div>
`;


export const productModal3 = (data) =>
    `
       
                <div id="productInfoModalClose">
                    <span class="material-symbols-outlined">
                    close
                    </span>
                </div>
                <div class="productInfoModal__info info">
                    <div class="info__title">
                        <p>
                            ${data.name}
                        </p> 
                    </div>
                    <div class="info__img">
                        <img src="${data.imageUrl}" alt="productImagen">
                    </div>
                    <div class="info__productInfo productInfo">
                        <div class="productInfo__detail detail">
                            <p class="detail__productTitle"> 
                                ${data.name}
                            </p>
                            <p class="detail__productIngredients">
                                ${data.category.name}
                            </p>
                        </div>
                        <div class="productInfo__price">
                            <p>$</p>
                            <p class="price">${data.price}</p>
                        </div>
                    </div>
                </div>

                <div class="productInfoModal__addUnits">
                    <p>Unidades</p>
                    <div class="productAdd__button">
                        <span>
                            <img src="../../../Image/Icons/minus.png" class="minus" alt="-">
                        </span>
                        <span class="quantity">
                            1
                        </span>
                        <span>
                            <img src="./../../Image/Icons/plus.png" class="more" alt="+">
                        </span>
                    </div>
                </div>
                <div class="productInfoModal__preparationMode">
                    <p>Descripción</p>
                    <p id="detailProductRecipe">
                        ${data.description}
                    </p>
                </div>  
                
                <div class="productInfoModal__buttonConfirm">
                    <button class="option" id="modalAddButton" value="${data.id}">
                        <div id="unitCircle">
                            <p class="quantity">1</p>
                        </div>
                        <p>Agregar a mi pedido</p>
                        <div class="divFlex">
                            <p>$</p>
                            <p class="subTotalPrice">${data.price}</p>
                        </div>
                    </button>
                </div>
        
    `
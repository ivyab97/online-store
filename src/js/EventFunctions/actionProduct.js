import { emptyOrder } from "../Components/emptyOrder.js";
import { productInfoAddInOrder } from "../Components/productInfoAddInOrder.js";
import { orderToFill } from "../Components/orderToFill.js";
import { productModal } from "../Components/productModal.js";
import { getProduct } from "../Services/productQueries.js";


export const addProduct = () => {
    const container = document.getElementsByClassName("container")[0];
    let myOrder = document.getElementsByClassName("myOrder")[0];
    myOrder.innerHTML = JSON.parse(localStorage.getItem("myOrderInfo"));

    checkEmptyOrder(myOrder);

    container.addEventListener("click", e => 
    {
        let myOrderInfo = myOrder.getElementsByClassName("myOrder__productInfo")[0];

        if(e.target.matches(".button__addProduct"))
        {
            if(!myOrderInfo)
            {
                myOrder.innerHTML = orderToFill();
                myOrderInfo = myOrder.getElementsByClassName("myOrder__productInfo")[0];
                
            }

            let productInfo = e.target.closest(".product__card");
            let productId = e.target.value;
            let name = productInfo.getElementsByTagName("h4")[0].textContent;
            let originalPrice;
            let price = parseFloat(productInfo.getElementsByClassName("card__price")[0].getAttribute("value"));
            originalPrice = parseFloat(productInfo.getElementsByClassName("card__price")[0].getAttribute("original-price"));;
            let discount = parseFloat(productInfo.getElementsByClassName("card__price")[0].getAttribute("discount"));
          
            if(!sumProduct("productAdd"+productId, price))
            {
                myOrderInfo.innerHTML += productInfoAddInOrder(productId, name, price, originalPrice, discount);
                calcTotalPrice(price);
            }
        }

        if(e.target.matches(".more"))
        {
            let productInfo = e.target.closest(".productInfoAdd");
            let productId = productInfo.id;
            let price = parseFloat(productInfo.getElementsByClassName("productInfoAdd__price")[0].getAttribute("value"));

            sumProduct(productId, price);
        }

        if(e.target.matches(".minus"))
        {
            let productInfo = e.target.closest(".productInfoAdd");
            let productId = productInfo.id;
            let price = parseFloat(productInfo.getElementsByClassName("productInfoAdd__price")[0].getAttribute("value"));

            subtractProduct(productId, price);

        }
               
        checkEmptyOrder(myOrder, myOrderInfo);
        localStorage.setItem("myOrderInfo", JSON.stringify(myOrder.innerHTML));
    })
}



const checkEmptyOrder = (orderContainer, orderInfo) => {
    if(orderInfo && orderInfo.childElementCount===0)
    {
        orderContainer.innerHTML=emptyOrder();
    }
    if(orderContainer.childElementCount===0)
    {
        orderContainer.innerHTML=emptyOrder();
    }
}





const sumProduct = (orderProductId, productPrice) => {
    let productInfo = document.getElementById(orderProductId);
    let statusOrder = false;
    
    if(productInfo)
    {
        let quantity = Array.from(productInfo.getElementsByClassName("quantity"));
        quantity.forEach(element => {
            element.innerHTML = parseFloat(element.textContent) + 1;
        });

        calcSubTotalPrice(parseFloat(productPrice), productInfo);
        if(!(orderProductId.substring(0, 16)==="productInfoModal"))
        {
            calcTotalPrice(parseFloat(productPrice));        
        }
        statusOrder = true;
    }
    return statusOrder;
}

const subtractProduct = (orderProductId, productPrice) => {
    let productInfo = document.getElementById(orderProductId);
    if(productInfo)
    {
        if(!(parseFloat(productInfo.getElementsByClassName("quantity")[0].textContent)===1))
        {
            calcSubTotalPrice(parseFloat(- productPrice), productInfo);
        }

        if(!(orderProductId.substring(0, 16)==="productInfoModal")) //avoid to use for modal
        {
            calcTotalPrice(parseFloat(- productPrice));        
        }

        let quantity = Array.from(productInfo.getElementsByClassName("quantity"));
        quantity.forEach(element => {

            if(!(parseFloat(element.textContent)===1) || !(orderProductId.substring(0, 16)==="productInfoModal"))
            {
                element.innerHTML = parseFloat(element.textContent) - 1;
            }
            if(parseFloat(element.textContent)===0 && !(orderProductId.substring(0, 16)==="productInfoModal"))
            {
                productInfo.remove();
            }
        });
        
        
    }
}


const calcTotalPrice = (priceToAdd) => {
    const priceTotalElement = document.getElementsByClassName("totalPrice")[0];
    if (priceTotalElement) {
        let currentTotal = new Decimal(priceTotalElement.textContent);
        let additionalPrice = new Decimal(priceToAdd).times(new Decimal(1.21)).toFixed(4); // CON IVA

        let newTotal = currentTotal.plus(additionalPrice);
        let displayTotal = newTotal.toFixed(2);

        priceTotalElement.innerHTML = displayTotal;
        priceTotalElement.setAttribute("value", newTotal);
    }   
}

const calcSubTotalPrice = (priceToAdd, productInfo) => {
    const priceSubTotalElement = productInfo.getElementsByClassName("subTotalPrice")[0];
    if (priceSubTotalElement) {
        let currentSubTotal = new Decimal(priceSubTotalElement.textContent);
        let additionalSubTotal = new Decimal(priceToAdd);

        let newSubTotal = currentSubTotal.plus(additionalSubTotal);
        let displaySubTotal = newSubTotal.toFixed(2);

        priceSubTotalElement.innerHTML = displaySubTotal;
    }   
}


export const detailProduct = async () => {

    const _productCard = document.querySelector(".content__product");
    _productCard.addEventListener("click", async e =>
      {
        if(e.target.matches(".card__img"))
        {
          //Get Product Info
          let productId = (e.target.closest(".product__card")).getAttribute("value");
          let productInfo = await getProduct(productId);
          if(productInfo)
          {
            //Create Modal
            let containerModal = document.createElement("div");
            let modal = document.createElement("div");
            containerModal.appendChild(modal);
    
            //Open Modal
            containerModal.classList.add("containerModal");
            modal.classList.add("productInfoModal");
            modal.classList.add("open");
            modal.id = "productInfoModal" + productInfo.id;

            modal.innerHTML = productModal(productInfo);
            document.body.appendChild(containerModal);
    
            addProductByModal(modal);
            //Close Modal
            closeModalDetailProduct(containerModal);
          }
          
        }
      }
    );
  
    const closeModalDetailProduct = (modal) =>{
      modal.addEventListener("click", e => 
      {
        if(e.target.matches(".material-symbols-outlined") || (e.target.matches(".containerModal")) || (e.target.matches("#modalAddButton")))
        {
          modal.remove();
        }
      });
    }
  }




  const addProductByModal = (modal) =>{    
    let productPrice = parseFloat(modal.getElementsByClassName("price")[0].textContent);
    modal.addEventListener("click", e =>
    {
        if(e.target.matches(".more"))
        {
            sumProduct(modal.id, productPrice);
        }
        if(e.target.matches(".minus"))
        {
            subtractProduct(modal.id, productPrice);
        }
        if(e.target.matches("#modalAddButton"))
        {
            ModalAddProductConfirm(e.target);
        }
    });    
}


const ModalAddProductConfirm = (container) =>{
    let quantity = parseFloat(container.getElementsByClassName("quantity")[0].textContent);
    let productAddButton = document.getElementById("button__addProduct"+container.getAttribute("value"));
    for (let i = 0; i < quantity; i++) {
        productAddButton.click();
        }
}


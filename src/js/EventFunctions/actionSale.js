import { createSale } from "../Services/saleCommand.js";
import { getSaleByDate, getSaleById } from "../Services/saleQuery.js";
import { saleMinimalInfo } from "../Components/saleMinimalInfo.js";
import { saleModal } from "../Components/saleModal.js";
import { emptyOrder } from "../Components/emptyOrder.js";
import { saleTableHeader } from "../Components/saleTableHeader.js";


export const registerSale = async () => {
  document.addEventListener("click", async e => 
  {
    if(e.target.matches(".createOrder"))
    {
      if(true)
      {
        let productInfo = document.querySelectorAll(".productInfoAdd");
        
        if(productInfo)
        {
            let subtotal = 0;
            let totalDiscount = 0;
            let totalPay = 0;

            let products = [];

            productInfo.forEach(product => 
            {
                let productId = product.getAttribute("value");
                let quantity = parseInt(product.getElementsByClassName("quantity")[0].textContent);
                let price = parseFloat(product.getAttribute("price"));
                let discount = parseInt(product.getAttribute("discount"));
                console.log(price)
                console.log(discount)
                subtotal = subtotal + (quantity * price);
                totalDiscount = totalDiscount + ((quantity * price) * (discount / 100));
                console.log(totalDiscount)
                console.log(subtotal)
                products.push({"productId": productId, "quantity": quantity});
            });

            totalPay = (subtotal - totalDiscount) * 1.21; //Formula especificada en los requerimientos
            console.log(totalPay);
            await createSale({"products": products, "totalPayed": totalPay}); 

            localStorage.removeItem("myOrderInfo");
            let sale = document.getElementsByClassName("cart__myOrder myOrder")[0];
            
            sale.innerHTML = emptyOrder();
        }
      }    
    }
  });    
}



export const searchSale = async () => {
  document.addEventListener("DOMContentLoaded", () => {
    const saleSearcher = document.getElementById("saleSearcher");
    const fromInput = document.getElementById("from");
    const toInput = document.getElementById("to");
    const saleList = document.getElementById("bodyTable");

    const todayButton = document.getElementById('today');
    const yesterdayButton = document.getElementById('yesterday');
    const last7DaysButton = document.getElementById('last7Days');

    if (!saleSearcher || !saleList) {
      console.error("La página todavía no ha cargado...");
      return;
    }

    const getISODate = (date) => {
      return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
    };

    // loginca pra opciones rapidas
    todayButton.addEventListener('click', () => {
      const today = new Date();
      const formattedToday = getISODate(today);
      fromInput.value = formattedToday;
      toInput.value = formattedToday;
      triggerSearch();
    });

    yesterdayButton.addEventListener('click', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const formattedYesterday = getISODate(yesterday);
      fromInput.value = formattedYesterday;
      toInput.value = formattedYesterday;
      triggerSearch();
    });

    last7DaysButton.addEventListener('click', () => {
      const today = new Date();
      const last7Days = new Date(today);
      last7Days.setDate(today.getDate() - 7);
      const formattedToday = getISODate(today);
      const formattedLast7Days = getISODate(last7Days);
      fromInput.value = formattedLast7Days;
      toInput.value = formattedToday;
      triggerSearch();
    });

    saleSearcher.addEventListener("click", async (e) => {
      e.preventDefault();
      await triggerSearch();
    });

    const triggerSearch = async () => {
      const from = fromInput.value;
      const to = toInput.value;

      try {
        const saleData = await getSaleByDate(from, to);

        saleList.innerHTML = '';
        if(saleData.length !== 0){
          saleList.innerHTML = saleTableHeader();
        } else {
          saleList.innerHTML = `
          <div class="no-sale">
            <img src="../Image/Icons/sale.svg" alt="sin ventas">
            <img src="../Image/Icons/sale.svg" alt="sin ventas">
            <img src="../Image/Icons/sale.svg" alt="sin ventas">
          </div>
          <p clase="name">SIN VENTAS POR AQUI</p>
          `
        }

        saleData.forEach(sale => { 
          saleList.innerHTML += saleMinimalInfo(sale);
        });

      } catch (error) {
        console.error("Error al obtener los datos de ventas:", error);
      }
    };
  });
};



export const detailSale = async () => {
  document.addEventListener("DOMContentLoaded", () =>{
    const saleList = document.getElementById("saleList");
  saleList.addEventListener("click", async e =>
    {
      if(e.target.matches(".detailButton"))
      {
        //Get Product Info
        let saleId = e.target.getAttribute("value");
        let saleInfo = await getSaleById(saleId);
        if(saleInfo)
        {
          //Create Modal
          let containerModal = document.createElement("div");
          let modal = document.createElement("div");
          containerModal.appendChild(modal);
  
          //Open Modal
          containerModal.classList.add("containerModal");
          modal.classList.add("container");
          modal.classList.add("open");

          modal.innerHTML = await saleModal(saleInfo);
          document.body.appendChild(containerModal);  

          closeModalDetailSale(containerModal);
        }
        
      }
    }
  );
  })
  

  const closeModalDetailSale = (modal) =>{
    modal.addEventListener("click", e => 
    {
      if(e.target.matches(".material-symbols-outlined") || (e.target.matches(".containerModal")) || (e.target.matches("#modalAddButton")))
      {
        modal.remove();
      }
    });
  }
}

import { alertModal } from "../Components/alertModal.js";

export const apiServiceFalledTitle = "Sistema caído";
export const apiServiceFalledDescription = "El servidor se encuentra fuera de servicio, por favor intente más tarde...";
export const orderCompletedTitle = "Venta realizada";
export const orderCompletedOptional = "Código de venta: "


export const createAlertModal = (title, description, optional) => {

  let modalContainer = document.getElementById("alertModalContainer");
  if (!modalContainer)
  {
    //Create Modal
    let containerModal = document.createElement("div");
    containerModal.classList.add("containerModal");
    containerModal.id = "alertModalContainer";
    let modal = alertModal(title, description, optional);
    containerModal.innerHTML=modal;
    //Open Modal
    document.body.appendChild(containerModal);
    //Close Modal
    closeAlertModal(containerModal); 
  }
}

const closeAlertModal = (modal) =>{

  modal.addEventListener("click", e => 
  {
    if(e.target.classList.contains("containerButton__button") || e.target.classList.contains("containerModal"))
    {
      modal.remove();
    }
  });
}
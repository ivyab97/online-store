import { resetPagination } from "./pagination.js";

export const clickExpand = () => {
  let _aside = document.querySelectorAll(".sidebar__categories-title")[0]
  let _btnExpand = document.getElementById("expand_more-less");
  let _sidebarList = document.querySelector(".sidebar__list");
  _aside.addEventListener("click", e => 
    {
      if(!_sidebarList.classList.contains("expand"))
      {
        _sidebarList.classList.add("expand");
        _btnExpand.textContent = "expand_less";
      } else {
        _sidebarList.classList.remove("expand");
        _btnExpand.textContent = "expand_more";
      }
    });
}

export const clickCategorySearch = () => {

    const checkboxes = document.querySelectorAll('.checkbox');
    const savedCategory = localStorage.getItem('category');

    // Recuperar categoría guardada
    checkboxes.forEach(checkbox => {
        if (checkbox.value === savedCategory) {
            checkbox.checked = true;
        }
    });

    // Manejar selección
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {

            if (checkbox.checked) {
                // Desmarcar las demás
                checkboxes.forEach(otherCheckbox => {
                    if (otherCheckbox !== checkbox) {
                        otherCheckbox.checked = false;
                    }
                });

                // Guardar categoría
                localStorage.setItem(
                    'category',
                    checkbox.value
                );

                resetPagination();
            } else {
                localStorage.removeItem('category');
            }
        });
    });
};
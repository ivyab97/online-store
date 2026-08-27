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
    document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('.checkbox');

    // Cargar el estado guardado de los checkbox
    checkboxes.forEach(checkbox => {
        const savedState = JSON.parse(localStorage.getItem("categories_checkboxes")) || [];
        if (savedState.includes(checkbox.value)) {
            checkbox.checked = true;
        }
    });

    // Manejar el evento change para cada checkbox
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const savedState = JSON.parse(localStorage.getItem("categories_checkboxes")) || [];
            if (checkbox.checked) {
                if (!savedState.includes(checkbox.value)) {
                    savedState.push(checkbox.value);
                }
            } else {
                const index = savedState.indexOf(checkbox.value);
                if (index > -1) {
                    savedState.splice(index, 1);
                }
            }
            localStorage.setItem("categories_checkboxes", JSON.stringify(savedState));
        });
    });
  });
}

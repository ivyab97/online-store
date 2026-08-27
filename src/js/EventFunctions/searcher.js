import { getProductByFilters } from "../Services/productQueries.js";
import { product } from "../product.js";



export const productSearcherAndPrinter = async (container) => {
  const handleSearchInputChange = async (event) => {
    event.preventDefault();
    showLoadingIndicator(container);
    updateCategoriesInLocalStorage();
    await performSearch();
  };

  const performSearch = async () => {
    const searchValue = document.getElementById("search").value;
    let categories = JSON.parse(localStorage.getItem('categories_checkboxes')) || [];
    let data = await getProductByFilters(searchValue, 12, 0, categories);

    const currentProducts = container.querySelectorAll('.product');
    currentProducts.forEach(product => {
      product.classList.add('exit');
      product.addEventListener('transitionend', () => {
        product.remove();
        if (container.querySelectorAll('.product').length === 0) {
          showProductNotFoundImage(container);
        }
      });
    });

    const fragment = document.createDocumentFragment();
    data.forEach((producto) => {
      const productElement = document.createElement('div');
      productElement.className = 'product enter';
      productElement.innerHTML = product(producto);
      fragment.appendChild(productElement);
    });

    container.appendChild(fragment);

    checkProductNotFound(container);

    hideLoadingIndicator(container);
  };

  const updateCategoriesInLocalStorage = () => {
    const checkboxes = document.querySelectorAll(".checkbox");
    let categories = [];
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        categories.push(checkbox.value);
      }
    });
    localStorage.setItem('categories_checkboxes', JSON.stringify(categories));
  };

  const showLoadingIndicator = (container) => {
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading-indicator';
    loadingIndicator.textContent = 'Cargando...';
    container.appendChild(loadingIndicator);
  };

  const hideLoadingIndicator = (container) => {
    const loadingIndicator = container.querySelector('.loading-indicator');
    if (loadingIndicator) {
      container.removeChild(loadingIndicator);
    }
  };

  const showProductNotFoundImage = (container) => {
    const existingImage = container.querySelector('#product-not-found');
    if (!existingImage) {
      const image = document.createElement('img');
      image.src = '../Image/Product-Not-Found.png';
      image.id = 'product-not-found';
      image.alt = 'Product Not Found';
      container.appendChild(image);
    }
  };

  const hideProductNotFoundImage = (container) => {
    const image = container.querySelector('#product-not-found');
    if (image) {
      container.removeChild(image);
    }
  };

  const checkProductNotFound = (container) => {
    if (container.querySelectorAll('.product').length === 0) {
      showProductNotFoundImage(container);
    } else {
      hideProductNotFoundImage(container);
    }
  };

  document.getElementById("search").addEventListener("input", handleSearchInputChange);

  const checkboxes = document.querySelectorAll(".checkbox");
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", handleSearchInputChange);
  });

  await performSearch();
};

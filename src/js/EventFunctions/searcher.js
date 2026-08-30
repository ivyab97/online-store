import { getProductByFilters } from "../Services/productQueries.js";
import { product } from "../product.js";
import { renderPaginationControls } from "./pagination.js";

export const productSearcherAndPrinter = async (container) => {
  const handleSearchInputChange = async (event) => {
    event.preventDefault();
    showLoadingIndicator(container);
    await performSearch();
  };

  const performSearch = async () => {
    const searchValue = document.getElementById("search").value;
    const category = localStorage.getItem('category');

    const limit = 10;
    const skip = Number(localStorage.getItem("skip")) || 0;

    let data = await getProductByFilters(searchValue, limit, skip, category);

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
    data.products.forEach((producto) => {
      const productElement = document.createElement('div');
      productElement.className = 'product enter';
      productElement.innerHTML = product(producto);
      fragment.appendChild(productElement);
    });

    container.appendChild(fragment);

    checkProductNotFound(container);

    hideLoadingIndicator(container);

    renderPaginationControls(data, limit, (page) => {
      const newSkip = (page - 1) * limit;

      localStorage.setItem("skip", newSkip);

      performSearch();
    });
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

  const searchButton = document.querySelector(".search__img");
  searchButton.addEventListener("click", handleSearchInputChange);

  const checkboxes = document.querySelectorAll(".checkbox");
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", handleSearchInputChange);
  });

  await performSearch();
};

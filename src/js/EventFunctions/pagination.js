export const resetPagination = () => {
    localStorage.setItem("limit", 10);
    localStorage.setItem("skip", 0);
}

export const setPage = (limit, skip) => {
    localStorage.setItem("limit", limit);
    localStorage.setItem("skip", skip);
}

export const previousPage = () => {
    localStorage.setItem("limit", 10);
    localStorage.setItem("skip", 0);
}

export function renderPaginationControls(data, limit, onPageChange) {

    const paginationDiv = document.getElementById("pagination");
    const totalPages = Math.ceil(data.total / limit);
    const currentPage = Math.floor(data.skip / limit) + 1;
    paginationDiv.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.className =  "page-button";
        if (i === currentPage) {
            pageButton.classList.add("active");
        }
        pageButton.addEventListener(
            "click",() => {
                onPageChange(i);
            }
        );
        paginationDiv.appendChild(pageButton);
    }
}

import { getCategories } from "../Services/categoryQueries.js";
import { categoryItem } from "../Components/categoryItem.js";

export const fillCategories = async () => {
    let list = await getCategories();
    let _categories = document.getElementsByClassName('sidebar__list')[0];

    list.forEach((category) => {
        let item = categoryItem(category);
        _categories.insertAdjacentHTML("beforeend", item);
    });
};
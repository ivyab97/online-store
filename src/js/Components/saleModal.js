import { getProduct } from "../Services/productQueries.js";


export const saleModal = async (data) => {
    let productsHTML = "";
    let product;
    for (const prod of data.products) 
    {
        product = await getProduct(prod.productId);
        productsHTML += `
            <tr>
                <td>${prod.productId}</td>
                <td>${product.name}</td>
                <td>${prod.quantity}</td>
                <td>$${prod.price}</td>
                <td>${prod.discount}</td>
            </tr>
        `;
    }

    return `
        <div class="info">
            <span class="material-symbols-outlined">
                    close
            </span>
            <div>ID VENTA: ${data.id}</div>
            <p class="opacity">FECHA: 20 de mayo de 2020</p>
        </div>
        <div class="products">
            <table>
                <thead>
                    <tr class="opacity">
                        <th>Producto ID</th>
                        <th>Descripción</th>
                        <th>Q</th>
                        <th>Precio</th>
                        <th>%</th>
                    </tr>
                </thead>
                <tbody class="opacity">
                    ${productsHTML}
                </tbody>
            </table>
        </div>
        <div class="opacity">
            <p>Subtotal: $${data.subtotal}</p>
            <p>Descuento total: $${parseFloat(data.totalDiscount).toFixed(2)}</p>
            <p>IVA: %${(data.taxes * 100) - 100}</p>
        </div>
        <div class="total">
            <p>TOTAL A PAGAR: $${data.totalPay}</p>
        </div>
    `;
}
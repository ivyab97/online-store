export const saleModal = (data) => {
    let productsHTML = "";
    for (const prod of data.card) 
    {
        productsHTML += `
            <tr>
                <td>${prod.id}</td>
                <td>${prod.name}</td>
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
            <p class="opacity">FECHA: ${new Date(data.date).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                timeZone: 'UTC'
            })}</p>
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
            <p>Subtotal: $${parseFloat(data.subtotal).toFixed(2)}</p>
            <p>Descuento total: $${parseFloat(data.totalDiscount).toFixed(2)}</p>
            <p>IVA: %21</p>
        </div>
        <div class="total">
            <p>TOTAL A PAGAR: $${parseFloat(data.totalPay).toFixed(2)}</p>
        </div>
    `;
}
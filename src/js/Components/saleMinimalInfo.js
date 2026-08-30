export function saleMinimalInfo(data) {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    };
  
    return `
      <tr>
          <td>${data.id}</td>
          <td>${formatDate(data.date)}</td>
          <td>${data.quantity}</td>
          <td>$${parseFloat(data.totalPay).toFixed(2)}</td>
          <td><button class="detailButton optionButton option" value="${data.id}">Ver Detalles</button></td>
      </tr>
    `;
  }
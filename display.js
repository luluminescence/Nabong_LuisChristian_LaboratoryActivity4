import { 
    getStockStatus, 
    calculateTotalInventoryValue, 
    countLowStockProducts, 
    countOutOfStockProducts 
  } from './inventoryUtils.js';
  
  export function displayProducts(productsToDisplay) {
    const productList = document.getElementById("productList");
    const noResultsMessage = document.getElementById("noResultsMessage");
  
    productList.innerHTML = "";
  
    if (productsToDisplay.length === 0) {
      noResultsMessage.classList.remove("hidden");
    } else {
      noResultsMessage.classList.add("hidden");
  
      productsToDisplay.forEach(product => {
        // Object Destructuring
        const { id, name, category, price, stock } = product;
        const status = getStockStatus(stock);
  
        let statusClass = "status-in-stock";
        if (status === "Low Stock") statusClass = "status-low-stock";
        if (status === "Out of Stock") statusClass = "status-out-of-stock";
  
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
          <h4>${name}</h4>
          <p><strong>Category:</strong> ${category}</p>
          <p><strong>Price:</strong> ₱${price.toLocaleString()}</p>
          <p><strong>Stock:</strong> ${stock}</p>
          <p><strong>Status:</strong> <span class="${statusClass}">${status}</span></p>
        `;
  
        productList.appendChild(card);
      });
    }
  }
  
  export function displaySummary(products) {
    const totalValueEl = document.getElementById("totalInventoryValue");
    const lowStockEl = document.getElementById("lowStockCount");
    const outOfStockEl = document.getElementById("outOfStockCount");
  
    const totalVal = calculateTotalInventoryValue(products);
    const lowCount = countLowStockProducts(products);
    const outCount = countOutOfStockProducts(products);
  
    totalValueEl.textContent = `₱${totalVal.toLocaleString()}`;
    lowStockEl.textContent = lowCount;
    outOfStockEl.textContent = outCount;
  }
import { products } from './products.js';
import { searchProducts, filterProductsByCategory } from './inventoryUtils.js';
import { displayProducts, displaySummary } from './display.js';

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");

function updateDashboard() {
  const query = searchInput.value;
  const selectedCategory = categoryFilter.value;

  // Apply search filter first, then category filter
  let filtered = searchProducts(products, query);
  filtered = filterProductsByCategory(filtered, selectedCategory);

  displayProducts(filtered);
}

// Initial Rendering
document.addEventListener("DOMContentLoaded", () => {
  displayProducts(products);
  displaySummary(products);
});

// Event Listeners
searchBtn.addEventListener("click", updateDashboard);

categoryFilter.addEventListener("change", updateDashboard);

resetBtn.addEventListener("click", () => {
  searchInput.value = "";
  categoryFilter.value = "All";
  displayProducts(products);
});
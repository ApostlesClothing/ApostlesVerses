const today = new Date();
const start = new Date(today.getFullYear(), 0, 0);
const diff = today - start + ((start.getTimezoneOffset() - today.getTimezoneOffset()) * 60 * 1000);
const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
const imageNumber = (dayOfYear % 365) + 1;

const params = new URLSearchParams(window.location.search);
const category = params.get("category") || "hope";

document.getElementById("daily-photo").src = `images/${category}/${imageNumber}.png`;

document.getElementById("logo-hotspot").addEventListener("click", () => {
  window.location.href = "index.html";
});
document.getElementById("like-hotspot").addEventListener("click", () => {
  window.location.href = "index.html";  
});

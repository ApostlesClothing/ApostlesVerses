// --- Date logic to determine today's image ---
const today = new Date();
const start = new Date(today.getFullYear(), 0, 0);
const diff = today - start + ((start.getTimezoneOffset() - today.getTimezoneOffset()) * 60 * 1000);
const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
const imageNumber = (dayOfYear % 365) + 1;

// --- Get topic from URL (English or Spanish) ---
const params = new URLSearchParams(window.location.search);
const category = params.get("category") || params.get("category-es") || "hope";

// --- Load the image ---
const dailyPhoto = document.getElementById("daily-photo");
if (dailyPhoto) {
  dailyPhoto.src = `images/${category}/${imageNumber}.png`;
  dailyPhoto.onerror = () => {
    dailyPhoto.src = "images/fallback.png"; // fallback image path
  };
}

// --- Store info about the current image ---
const currentImage = { category, imageNumber };

// --- Logo hotspot to return to homepage ---
const logo = document.getElementById("logo-hotspot");
if (logo) {
  logo.addEventListener("click", () => {
    if (window.location.search.includes("category-es")) {
      window.location.href = "index-es.html";
    } else {
      window.location.href = "index.html";
    }
  });
}

// --- Heart icon favorite logic ---
const favoriteToggle = document.getElementById("favorite-toggle");
const heartEffect = document.getElementById("heart-effect");
const redFlash = document.getElementById("red-flash");

function getStorageKey() {
  return (category.includes("á") || window.location.search.includes("category-es"))
    ? "favorites-es"
    : "favorites";
}

function isCurrentFavorited() {
  const favorites = JSON.parse(localStorage.getItem(getStorageKey()) || "[]");
  return favorites.some(f =>
    f.category === currentImage.category && f.imageNumber === currentImage.imageNumber
  );
}

function updateHeartIcon() {
  if (favoriteToggle) {
    favoriteToggle.textContent = isCurrentFavorited() ? "❤️" : "🤍";
  }
}

function toggleFavorite() {
  const storageKey = getStorageKey();
  let favorites = JSON.parse(localStorage.getItem(storageKey) || "[]");

  const index = favorites.findIndex(f =>
    f.category === currentImage.category && f.imageNumber === currentImage.imageNumber
  );

  if (index >= 0) {
    favorites.splice(index, 1); // remove
  } else {
    favorites.push(currentImage); // add

    // Trigger animation
    if (heartEffect && redFlash) {
      heartEffect.classList.add("active");
      redFlash.classList.add("active");
      setTimeout(() => {
        heartEffect.classList.remove("active");
        redFlash.classList.remove("active");
      }, 600);
    }
  }

  localStorage.setItem(storageKey, JSON.stringify(favorites));
  updateHeartIcon();
}

if (favoriteToggle) {
  favoriteToggle.addEventListener("click", toggleFavorite);
  updateHeartIcon();
}

// --- Share button logic ---
const shareButton = document.getElementById("share-button");
if (shareButton) {
  shareButton.addEventListener("click", async () => {
    const imageUrl = `https://apostlesclothing.github.io/ApostlesVerses/images/${category}/${imageNumber}.png`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Verse of the Day - ${category}`,
          text: `Check out this verse from the "${category}" topic!`,
          url: imageUrl,
        });
      } catch (err) {
        console.error("Share canceled or failed:", err);
      }
    } else {
      alert("Sharing is not supported on this browser.");
    }
  });
}

// --- Ellipsis menu toggle logic ---
function toggleMenu() {
  const menu = document.getElementById("menuDropdown");
  if (menu) {
    menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
  }
}

// --- Close ellipsis menu if clicking outside ---
document.addEventListener("click", function (e) {
  const menu = document.getElementById("menuDropdown");
  const icon = document.querySelector(".ellipsis-icon");
  if (menu && icon && !icon.contains(e.target) && !menu.contains(e.target)) {
    menu.style.display = "none";
  }
});


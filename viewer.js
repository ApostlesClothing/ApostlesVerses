const today = new Date();
const start = new Date(today.getFullYear(), 0, 0);
const diff = today - start + ((start.getTimezoneOffset() - today.getTimezoneOffset()) * 60 * 1000);
const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
const imageNumber = (dayOfYear % 365) + 1;

const params = new URLSearchParams(window.location.search);
const category = params.get("category") || params.get("category-es") || "hope";
document.getElementById("daily-photo").src = `images/${category}/${imageNumber}.png`;

const currentImage = { category, imageNumber };

// Logo click back
document.getElementById("logo-hotspot").addEventListener("click", () => {
  window.location.href = "index.html";
});

const favoriteToggle = document.getElementById("favorite-toggle");
const heartEffect = document.getElementById("heart-effect");

function isCurrentFavorited() {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  return favorites.some(f =>
    f.category === currentImage.category && f.imageNumber === currentImage.imageNumber
  );
}

function updateHeartIcon() {
  favoriteToggle.textContent = isCurrentFavorited() ? "❤️" : "🤍";
}

function toggleFavorite() {
  let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  const index = favorites.findIndex(f =>
    f.category === currentImage.category && f.imageNumber === currentImage.imageNumber
  );

  if (index >= 0) {
    favorites.splice(index, 1); // remove
  } else {
    favorites.push(currentImage); // add
    heartEffect.classList.add("active");
    setTimeout(() => heartEffect.classList.remove("active"), 700);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  updateHeartIcon();
}

favoriteToggle.addEventListener("click", toggleFavorite);

// Initialize heart icon on load
updateHeartIcon();

const shareButton = document.getElementById("share-button");

shareButton.addEventListener("click", async () => {
  const imageUrl = `https://apostlesclothing.github.io/ApostlesVerses/index.html`;

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



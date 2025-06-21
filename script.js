const today = new Date();
const start = new Date(today.getFullYear(), 0, 0);
const diff = today - start + ((start.getTimezoneOffset() - today.getTimezoneOffset()) * 60 * 1000);
const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
const imageNumber = (dayOfYear % 365) + 1;

const verses = {
  hope: [
    "Jeremiah 29:11 - For I know the plans I have for you...",
    "Psalm 31:24 - Be strong and take heart...",
    "Romans 15:13 - May the God of hope fill you with all joy..."
  ],
  motivation: [
    "Philippians 4:13 - I can do all things through Christ...",
    "Hebrews 12:1 - Run with perseverance the race...",
    "Joshua 1:9 - Be strong and courageous..."
  ],
  lust: [
    "1 Corinthians 6:18 - Flee from sexual immorality...",
    "Matthew 5:28 - Anyone who looks at a woman lustfully...",
    "Galatians 5:16 - Walk by the Spirit, and you will not gratify..."
  ],
  love: [
    "1 Corinthians 13:4 - Love is patient, love is kind...",
    "1 John 4:8 - God is love...",
    "John 15:12 - Love each other as I have loved you..."
  ]
};

let currentCategory = "hope";
const img = document.getElementById("daily-photo");

function updateContent() {
  const verseList = verses[currentCategory];
  img.src = `images/${currentCategory}/${imageNumber}.png`;
}

function selectCategory(category) {
  currentCategory = category;
  updateContent();
  dropdown.classList.remove("show");
}

const dropdown = document.getElementById("dropdown");
document.getElementById("logo-hotspot").addEventListener("click", () => {
  dropdown.classList.toggle("show");
});

updateContent();

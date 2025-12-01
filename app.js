/**
 * E-commerce Product Page Logic (app.js)
 * Handles image gallery interaction, quantity counter, mobile menu toggling, and lightbox functionality.
 */

// ===========================================
// 1. DOM ELEMENT SELECTION
// ===========================================

// --- Product & Gallery Elements ---
const bigImgs = document.querySelectorAll(".bigImg");
const thumbnails = document.querySelectorAll(".thumbnail");
const bigImg1 = document.getElementById("bigImg1"); // Reference to the first main image
const mbImg = document.getElementById('mb-img'); // Mobile main image

// --- Menu Elements ---
const menuBtn = document.getElementById("menuBtn");
const menuCloseBtn = document.querySelector(".menuCloseBtn");
const menu = document.getElementById("menu");
const main = document.querySelector("main"); // Used for blurring effect

// --- Counter & Cart Elements ---
const plusBtn = document.getElementById("plusBtn");
const minusBtn = document.getElementById("minusBtn");
const counterSpan = document.getElementById("counterSpan");
const cartSpan = document.querySelector(".cartSpan");

// --- Mobile Navigation Buttons ---
const mbPrev = document.getElementById('mb-prev');
const mbNext = document.getElementById('mb-next');

// --- 2. LIGHTBOX CREATION (Dynamic HTML Insertion) ---

// Create the lightbox element dynamically
const lightbox = document.createElement("div");
lightbox.id = "lightbox";
lightbox.innerHTML = `
  <div id="lightbox-content">
   <div class="upperLb">
   <button id="closeLb" class="lb-close"></button>
    <button id="lb-prev" class="lb-btn"></button>
    <img id="lb-img" src="" alt="lightbox image">
    <button id="lb-next" class="lb-btn"></button>
   </div> 
    <div class="carousel">
        <img src="./images/image-product-1-thumbnail.jpg" alt="" class="thumbnailLb">
        <img src="./images/image-product-2-thumbnail.jpg" alt="" class="thumbnailLb">
        <img src="./images/image-product-3-thumbnail.jpg" alt="" class="thumbnailLb">
        <img src="./images/image-product-4-thumbnail.jpg" alt="" class="thumbnailLb">
      </div>
  </div>
`;
document.body.appendChild(lightbox);

// --- Lightbox Elements (Selected AFTER creation) ---
const lbImg = document.getElementById("lb-img");
const lbPrev = document.getElementById("lb-prev");
const lbNext = document.getElementById("lb-next");
const lbClose = document.querySelector(".lb-close"); // Note: Using querySelector for .lb-close
const lbThumbnail = document.querySelectorAll(".thumbnailLb");


// ===========================================
// 3. STATE MANAGEMENT
// ===========================================
let currentIndex = 0; // Tracks the currently displayed image index

// ===========================================
// 4. CORE GALLERY FUNCTIONS
// ===========================================

/**
 * Opens the lightbox modal and sets the initial image based on the index.
 * @param {number} index - The index of the image to display.
 */
function openLightbox(index) {
  currentIndex = index;
  lbImg.src = bigImgs[currentIndex].src;
  lightbox.style.display = "flex";
}

/**
 * Updates the mobile main image element based on the current index.
 * Also hides the desktop version of the first image for mobile view consistency.
 */
function updateMbImg() {
  mbImg.src = bigImgs[currentIndex].src;
  mbImg.style.display = "flex"; // Make visible (based on original logic)
  bigImg1.style.display = 'none' // Hide desktop default image
}


// ===========================================
// 5. EVENT LISTENERS
// ===========================================

// --- A. Lightbox Interaction ---

// Close lightbox when clicking outside the content area
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});

// Close lightbox via dedicated close button
lbClose.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// Lightbox: Navigate to the next image
lbNext.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % bigImgs.length;
  lbImg.src = bigImgs[currentIndex].src;
});

// Lightbox: Navigate to the previous image
lbPrev.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + bigImgs.length) % bigImgs.length;
  lbImg.src = bigImgs[currentIndex].src;
});

// Lightbox: Change image by clicking on the thumbnail inside the lightbox
lbThumbnail.forEach((tmbLb, index) => {
  tmbLb.addEventListener("click", () => {
    openLightbox(index);
  });
});


// --- B. Mobile Gallery Navigation ---

// Mobile: Navigate to the next image
mbNext.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % bigImgs.length;
  updateMbImg();
});

// Mobile: Navigate to the previous image
mbPrev.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + bigImgs.length) % bigImgs.length;
  updateMbImg();
});


// --- C. Desktop Gallery Interaction ---

// Open the lightbox when clicking the main image (desktop only)
bigImgs.forEach((img, index) => {
  img.addEventListener("click", (e) => {
    e.preventDefault();
    if (window.innerWidth >= 450) {
      openLightbox(index);
    }
  });
});

// Open the lightbox when clicking a thumbnail (original implementation logic)
thumbnails.forEach((tmb, index) => {
  tmb.addEventListener("click", () => {
    openLightbox(index);
  });
});

// Show the corresponding main image by hovering over a thumbnail
thumbnails.forEach((tmb, index) => {
  tmb.addEventListener("mouseover", () => {
    bigImgs.forEach((img, i) => {
      if (i === index) {
        img.style.display = "flex";
      } else {
        img.style.display = "none";
      }
    });
  });
});


// --- D. Mobile Menu Toggle ---

// Open the mobile menu and blur main content
menuBtn.addEventListener("click", () => {
  menu.style.transform = "translateX(0)"; // Menu in
  main.style.filter = "blur(1em)";
});

// Close the mobile menu and remove blur
menuCloseBtn.addEventListener("click", () => {
  menu.style.transform = "translateX(-100%)"; // Menu out
  main.style.filter = "blur(0)";
});


// --- E. Quantity Counter ---

// Increase quantity and update both item counter and cart count
plusBtn.addEventListener("click", () => {
  counterSpan.textContent++;
  cartSpan.textContent++;
});

// Decrease quantity and cart count (prevents negative values)
minusBtn.addEventListener("click", () => {
  if (parseInt(counterSpan.textContent) > 0) {
    counterSpan.textContent--;
    cartSpan.textContent--;
  }
});
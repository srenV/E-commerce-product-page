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
const menu = document.querySelector(".menu");
const main = document.querySelector("main"); // Used for blurring effect

// --- Counter & Cart Elements ---
const plusBtn = document.getElementById("plusBtn");
const minusBtn = document.getElementById("minusBtn");
const counterSpan = document.getElementById("counterSpan");
const counterSpanCart = document.getElementById("counterSpanCart");
const cartSpan = document.querySelector(".cartSpan");
const addToCart = document.getElementById('addBtn')
const plusBtnCart = document.getElementById("plusBtnCart");
const minusBtnCart = document.getElementById("minusBtnCart")
const cart = document.getElementById('cart')
const cartOpen = document.getElementById('cartOpen')
const cartCloseBtn = document.getElementById('cartCloseBtn')
const deleteCartBtn = document.getElementById('deleteCartBtn')
const cartArticle = document.getElementById('cartArticle')
const cartEmpty = document.getElementById('cartEmpty')

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
  menu.style.transform = "translateX(1%)"; // Menu in
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
});

// Decrease quantity and cart count (prevents negative values)
minusBtn.addEventListener("click", () => {
  if (parseInt(counterSpan.textContent) > 0) {
    counterSpan.textContent--;
  }
});

// Cart quantity buttons

plusBtnCart.addEventListener("click", () => {
  counterSpanCart.textContent++;
});

minusBtnCart.addEventListener("click", () => {
  if (parseInt(counterSpanCart.textContent) > 0) {
    counterSpanCart.textContent--;
  }else{
    counterSpanCart.textContent = 0
    cartSpan.textContent = 0;
    cartEmpty.style.display = 'flex'
    cartArticle.style.display = 'none'
  }

});

addToCart.addEventListener('click', () =>{
  if(parseInt(counterSpan.textContent) > 0){
    cartSpan.textContent = counterSpan.textContent
    counterSpanCart.textContent = counterSpan.textContent
    counterSpan.textContent = 0
  }
})

// 1. Cart button click -> toggle cart
cart.addEventListener('click', (e) => {
  // Toggle the 'active' class to show/hide the cart
  cartOpen.classList.toggle('active');

  // Show cart content or empty message based on current cart count
  if (counterSpanCart.textContent > 0) {
    cartArticle.style.display = 'flex';   // show items
    cartEmpty.style.display = 'none';     // hide "empty cart" message
  } else {
    cartEmpty.style.display = 'flex';     // show "empty cart" message
    cartArticle.style.display = 'none';   // hide items
  }

  // Disable pointer events for main content if cart is open
  main.style.pointerEvents = cartOpen.classList.contains('active') ? 'none' : 'auto';

  // Stop the click from bubbling up to the document
  // Without this, the document click listener would immediately close the cart
  e.stopPropagation();
});

// 2. Click outside the cart closes it
document.addEventListener('click', (e) => {
  // Only run if the cart is open AND click is NOT inside the cart AND not on the cart button
  if (
    cartOpen.classList.contains('active') && 
    !cartOpen.contains(e.target) && 
    e.target !== cart
  ) {
    // Close cart
    cartOpen.classList.remove('active');
    main.style.pointerEvents = 'auto';
  }
});

// 3. Click inside the cart should not close it
cartOpen.addEventListener('click', (e) => {
  // Stop the event from bubbling up to the document
  e.stopPropagation();
});

cartOpen.addEventListener('click', (e) => {
  e.stopPropagation();
});



deleteCartBtn.addEventListener('click', () =>{
  counterSpanCart.textContent = 0
  cartSpan.textContent = 0;
  cartEmpty.style.display = 'flex'
  cartArticle.style.display = 'none'
  
})



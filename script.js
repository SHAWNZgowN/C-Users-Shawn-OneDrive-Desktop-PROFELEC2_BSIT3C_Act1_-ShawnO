// Products data
const products = [
    {
      name: "OMEN Gaming Laptop 16t-wf100, 16.1\"",
      price: 70000,
      image: "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c08900457.png?imwidth=570&imdensity=1&impolicy=Png_Res",
      details: [
        "Windows 11 Home",
        "Up to Intel® Core™ i9-14900HX (up to 5.8 GHz, 36 MB cache, 24 cores)",
        "Up to NVIDIA® GeForce® RTX 4070 (8 GB)"
      ]
    },

    {
        name: "LOQ 15ARP9 (15 AMD) Gaming Laptop\"",
        price: 38000,
        image: "https://p4-ofp.static.pub/ShareResource/na/products/legion/560x450/lenovo-loq-15-v3.png",
        details: [
          "Windows 11 Home",
          "Play the best games with up to an AMD Ryzen™ 7 7435HS processor",
          "Every pixel tells a story with up to NVIDIA® GeForce RTX™ 40 Series graphics"
        ]
      },

      {
        name: "Victus by HP Gaming Laptop 16t-r100, 16.1\"",
        price: 44000,
        image: "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c08848882.png?imwidth=640&imdensity=1&impolicy=Png_Res",
        details: [
          "Windows 11 Home",
          "Intel® Core™ i5-14450HX (up to 4.8 GHz, 20 MB L3 cache, 10 cores, 16 threads)",
          "NVIDIA® GeForce RTX™ 4050 Laptop GPU (6 GB)"
        ]
      },

      {
        name: "Predator Helios 18 Gaming Laptop - PH18-72-90C9\"",
        price: 150000,
        image: "https://static-ecpa.acer.com/media/catalog/product/p/r/predator-helios-18-ph18-72-perkey-backlit-on-wp-black-01-1000x1000_nh.qp4aa.002.png?optimize=high&bg-color=255,255,255&fit=bounds&height=500&width=500&canvas=500:500&format=jpeg",
        details: [
          "Windows 11 Home",
          "Intel® Core™ i9-14900HX processor Tetracosa-core (24 Core™) 2.20 GHz",
          "NVIDIA® GeForce RTX™ 4090 with 16 GB dedicated memory"
        ]
      },

      {
        name: "Nitro 17 Gaming Laptop - AN17-72-734A\"",
        price: 79000,
        image: "https://static-ecpa.acer.com/media/catalog/product/n/i/nitro-17-an17-72-4zone-backlit-on-wallpaper-black-01-1000x1000_nh.qqtaa.001.png?optimize=high&bg-color=255,255,255&fit=bounds&height=500&width=500&canvas=500:500&format=jpeg",
        details: [
          "Windows 11 Home",
          "Intel® Core™ i7-14650HX processor Hexadeca-core",
          "NVIDIA® GeForce RTX™ 4060 with 8 GB dedicated memory"
        ]
      },

      {
        name: "OMEN Gaming Laptop 16t-wf100, 16.1\"",
        price: 110000,
        image: "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c08900668.png?impolicy=Png_Res",
        details: [
          "Windows 11 Home",
          "Intel® Core™ i7 14th generation processor",
          "NVIDIA® GeForce RTX™ 4070 Laptop GPU (8 GB GDDR6 dedicated)"
        ]
      },

];

// Store cart items
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Function to create product cards on index.html
function renderProducts() {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return; // Skip if we're not on the products page

    productGrid.innerHTML = ''; // Clear existing products
    products.forEach((product, index) => {
      const cardHTML = `
        <div class="card glass w-96 shadow-lg">
          <figure class="w-full h-[300px]">
            <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover" />
          </figure>
          <div class="card-body">
            <h2 class="card-title font-bold text-stone-950 mb-[10px] text-[23px] justify-center text-center">
              ${product.name}
            </h2>
            <div class="text-center">
              <p class="text-[35px] font-bold text-stone-950 mb-[20px]">
                ₱${product.price.toLocaleString()}
              </p>
              <button class="btn w-[300px] bg-orange-500 text-white hover:bg-orange-600" onclick="openModal(${index})">ADD TO CART</button>
            </div>

            <div class="mt-4 text-center">
              <button class="btn btn-sm" onclick="toggleDetails(this)">Show More</button>
              <div class="details hidden mt-2 text-gray-700">
                <ul class="text-left text-sm space-y-[13px]">
                  ${product.details.map(detail => `<li>&bull; ${detail}</li>`).join('')}
                </ul>
              </div>
            </div>
          </div>
        </div>
      `;
      productGrid.innerHTML += cardHTML;
    });
}

// Function to render cart items on cart.html
function renderCart() {
    const cartBody = document.querySelector('tbody');
    if (!cartBody) return; // Skip if we're not on the cart page
    
    cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // Get latest cart items
    cartBody.innerHTML = ''; // Clear current cart

    cartItems.forEach((item, index) => {
      const totalPrice = item.price * item.quantity;
      const rowHTML = `
        <tr>
          <th>
            <label>
              <input type="checkbox" class="checkbox" />
            </label>
          </th>
          <td>
            <div class="flex items-center gap-3">
              <div class="avatar">
                <div class="mask h-[80px] w-[95px]">
                  <img src="${item.image}" alt="${item.name}" class="h-full w-full object-cover" />
                </div>
              </div>
              <div>
                <div class="font-bold">${item.name}</div>
              </div>
            </div>
          </td>
          <td>${item.quantity}</td>
          <td>₱${item.price.toLocaleString()}</td>
          <td>
            <button class="btn btn-ghost btn-xs">₱${totalPrice.toLocaleString()}</button>
          </td>
          <td>
            <button class="btn btn-error btn-xs" onclick="removeFromCart(${index})">Remove</button>
          </td>
        </tr>
      `;
      cartBody.innerHTML += rowHTML;
    });

    updateCartTotal();
    updateCartCount();
}

// New function to update cart count in the navbar
function updateCartCount() {
    const cartCount = document.querySelector('.indicator-item');
    if (cartCount) {
        cartCount.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);
    }
}

// Function to remove item from cart
function removeFromCart(index) {
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCart();
}

// Toggle product details visibility
function toggleDetails(button) {
    const details = button.nextElementSibling;
    details.classList.toggle('hidden');
    button.textContent = details.classList.contains('hidden') ? 'Show More' : 'Show Less';
}

// Modal functions
function openModal(productIndex) {
    const modal = document.getElementById("modal");
    if (!modal) return;
    modal.classList.add("modal-open");
    localStorage.setItem("selectedProductIndex", productIndex);
}

function closeModal() {
    const modal = document.getElementById("modal");
    if (!modal) return;
    modal.classList.remove("modal-open");
}

// Initialize page
window.onload = function() {
    // Check which page we're on and call appropriate render function
    if (document.getElementById('product-grid')) {
        renderProducts();
    }
    if (document.querySelector('tbody')) {
        renderCart();
    }
    updateCartCount(); // Update cart count on both pages
};

// Set up modal event listeners if we're on the products page
if (document.getElementById("modal")) {
    document.getElementById("confirm-btn").addEventListener("click", function() {
        const quantity = parseInt(document.getElementById("quantity-input").value);
        const selectedProductIndex = localStorage.getItem("selectedProductIndex");

        if (quantity > 0 && selectedProductIndex !== null) {
            const product = products[selectedProductIndex];
            cartItems.push({
                ...product,
                quantity: quantity
            });

            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            closeModal();
            updateCartCount();
        } else {
            alert("Please enter a valid quantity.");
        }
    });

    document.getElementById("cancel-btn").addEventListener("click", closeModal);
}

// Function to update total cart price
function updateCartTotal() {
    const totalElement = document.getElementById('cart-total');
    const subElement = document.getElementById('sub-total');
    if (!totalElement) return;
    
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    totalElement.textContent = total.toLocaleString();
    subElement.textContent = total.toLocaleString();
}


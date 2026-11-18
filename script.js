
// Food Items
const foods = [
    {
        id: 1,
        name: "Margherita Pizza",
        category: "Pizza",
        price: 249,
        image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=500",
        description: "Delicious cheese pizza with fresh toppings."
    },
    {
        id: 2,
        name: "Pepperoni Pizza",
        category: "Pizza",
        price: 349,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
        description: "Classic pepperoni pizza with mozzarella."
    },
    {
        id: 3,
        name: "Cheese Burger",
        category: "Burger",
        price: 149,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
        description: "Juicy burger with cheese and fresh vegetables."
    },
    {
        id: 4,
        name: "Chicken Burger",
        category: "Burger",
        price: 199,
        image: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=500",
        description: "Crispy chicken burger with special sauce."
    },
    {
        id: 5,
        name: "Chicken Biryani",
        category: "Biryani",
        price: 249,
        image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?w=500",
        description: "Traditional spicy chicken dum biryani."
    },
    {
        id: 6,
        name: "Veg Biryani",
        category: "Biryani",
        price: 179,
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500",
        description: "Flavorful vegetable biryani with spices."
    },
    {
        id: 7,
        name: "Chocolate Cake",
        category: "Dessert",
        price: 129,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
        description: "Rich and creamy chocolate cake."
    },
    {
        id: 8,
        name: "Ice Cream",
        category: "Dessert",
        price: 89,
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500",
        description: "Sweet and delicious vanilla ice cream."
    },
    {
        id: 9,
        name: "Cold Coffee",
        category: "Drinks",
        price: 99,
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500",
        description: "Refreshing chilled creamy coffee."
    },
    {
        id: 10,
        name: "Fresh Juice",
        category: "Drinks",
        price: 79,
        image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500",
        description: "Freshly prepared seasonal fruit juice."
    }
];

// Shopping Cart
let cart = [];

// Display Food Items
function displayFoods(category = "All") {
    const container = document.getElementById("food-container");

    const filteredFoods = category === "All"
        ? foods
        : foods.filter(food => food.category === category);

    container.innerHTML = filteredFoods.map(food => `
        <div class="food-card">
            <img src="${food.image}" alt="${food.name}">
            <div class="food-info">
                <h3>${food.name}</h3>
                <p>${food.description}</p>
                <div class="price">₹${food.price}</div>
                <button class="add-btn" onclick="addToCart(${food.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join("");
}

// Category Filtering
document.querySelectorAll(".category-btn").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".category-btn").forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        displayFoods(button.dataset.category);
    });
});

// Add Food to Cart
function addToCart(id) {
    const food = foods.find(item => item.id === id);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({...food, quantity: 1});
    }

    updateCart();
}

// Increase or Decrease Quantity
function changeQuantity(id, change) {
    const item = cart.find(food => food.id === id);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter(food => food.id !== id);
    }

    updateCart();
}

// Remove Item
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Update Cart
function updateCart() {
    const cartContainer = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    cartCount.textContent = cart.reduce(
        (total, item) => total + item.quantity, 0
    );

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty!</p>";
    } else {
        cartContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong>
                    <p>₹${item.price} × ${item.quantity}</p>
                </div>

                <div>
                    <button class="quantity-btn"
                        onclick="changeQuantity(${item.id}, -1)">−</button>

                    <strong>${item.quantity}</strong>

                    <button class="quantity-btn"
                        onclick="changeQuantity(${item.id}, 1)">+</button>

                    <button class="remove-btn"
                        onclick="removeItem(${item.id})">Remove</button>
                </div>
            </div>
        `).join("");
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    cartTotal.textContent = total;
}

// Checkout
document.getElementById("checkout-btn").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Please add food items to your cart first!");
        return;
    }

    let orderDetails = cart.map(item =>
        `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`
    ).join("\n");

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    alert(
        "Your Order Summary:\n\n" +
        orderDetails +
        "\n\nTotal Amount: ₹" + total +
        "\n\nThank you for ordering with Foodie!"
    );

    cart = [];
    updateCart();
});

// Initial Display
displayFoods();
updateCart();

var body = document.querySelector("body");
var container1 = document.querySelector(".container1");
var container2 = document.querySelector(".container2");
var container3 = document.querySelector(".container3");
var addCartBtns = document.querySelectorAll(".addCartBtn");
var cart = [];

var starter = [
    {
        name: "Manchurian Dry",
        pic: "manchurian.jpg",
        price: "200",
    },
    {
        name: "Paneer Chilli Dry",
        pic: "paneer-chilli.jpg",
        price: "200",
    },
    {
        name: "Hara Bhara Kebab",
        pic: "kebab.png",
        price: "190",
    },
    {
        name: "Aloo Tikki Chaat",
        pic: "aloo-tikki.jpg",
        price: "170",
    }
];

var mainCourse = [
    {
        name: "Paneer e Nawab",
        pic: "paneer.jpg",
        price: "250",
    },
    {
        name: "Chinese Platter",
        pic: "chinese.jpg",
        price: "270",
    },
    {
        name: "Vanakkam Special",
        pic: "south-indian.jpg",
        price: "220",
    },
    {
        name: "Shahi Biryani",
        pic: "biryani.jpg",
        price: "280",
    }
];

var dessert = [
    {
        name: "Gulab Jamun",
        pic: "gulab-jamun.jpg",
        price: "50",
    },
    {
        name: "Rasgulla",
        pic: "rasgulla.jpg",
        price: "45",
    },
    {
        name: "Ice Cream",
        pic: "ice-cream.jpg",
        price: "30",
    },
    {
        name: "Jalebi",
        pic: "jalebi.jpg",
        price: "50",
    }
];

var dishes = [
    {
        name: "Manchurian Dry",
        pic: "manchurian.jpg",
        price: "200",
    },
    {
        name: "Paneer Chilli Dry",
        pic: "paneer-chilli.jpg",
        price: "200",
    },
    {
        name: "Hara Bhara Kebab",
        pic: "kebab.png",
        price: "190",
    },
    {
        name: "Aloo Tikki Chaat",
        pic: "aloo-tikki.jpg",
        price: "170",
    },
    {
        name: "Paneer e Nawab",
        pic: "paneer.jpg",
        price: "250",
    },
    {
        name: "Chinese Platter",
        pic: "chinese.jpg",
        price: "270",
    },
    {
        name: "Vanakkam Special",
        pic: "south-indian.jpg",
        price: "220",
    },
    {
        name: "Shahi Biryani",
        pic: "biryani.jpg",
        price: "280",
    },
    {
        name: "Gulab Jamun",
        pic: "gulab-jamun.jpg",
        price: "50",
    },
    {
        name: "Rasgulla",
        pic: "rasgulla.jpg",
        price: "45",
    },
    {
        name: "Ice Cream",
        pic: "ice-cream.jpg",
        price: "30",
    },
    {
        name: "Jalebi",
        pic: "jalebi.jpg",
        price: "50",
    }
];

// Dish Cards

function generateDishCards(container, dishes) {
    var clutter = "";
    dishes.forEach((obj, idx) => {
        clutter += `<div class="dish-card" data-array-name="dishes" data-id="${idx}" dataset="dishes">
            <div class="card-img-container" alt="${obj.name}">
                <img src="${obj.pic}">
            </div>
            <h1>${obj.name}</h1>
            <p>INR ${obj.price}</p>
            <div class="card-buttons">
                <div class="add-button">
                    <button class="add-to-cart" onclick="this.classList.toggle('clicked')" dataset="dishes">ADD+</button>
                </div>
            </div>
        </div>
        `;
        });
        container.innerHTML = clutter;

}

generateDishCards(container1, starter); //starter

generateDishCards(container2, mainCourse); // main course

generateDishCards(container3, dessert); //dessert


addCartBtns.forEach(addCartBtn => {
    addCartBtn.addEventListener("click", () => {
        let currentState = addCartBtn.dataset.state || "not-added";
        if (currentState === "not-added") {
            addCartBtn.innerHTML = "Added";
            addCartBtn.dataset.state = "added";
        } else {
            addCartBtn.innerHTML = "<i class='bx bx-cart'></i>Add to Cart";
            addCartBtn.dataset.state = "not-added";
        }
    });
});

// --------------------------Cart Section-------------------->

// Initialize cart from localStorage or set it as an empty array
let data = JSON.parse(localStorage.getItem('data')) || [];

// Function to update cart and save to localStorage
function updateCart(newCart) {
    data = newCart;
    localStorage.setItem('data', JSON.stringify(data));
}

// Example of retrieving the cart data
function getCart() {
    return data;
}

function clearCart() {
    data = [];
    updateCart(data);
}

function showFloatingPopup(message) {
    // Create a new div element
    var popup = document.createElement('div');

    // Set the class for styling
    popup.className = 'floating-popup';

    // Set the content
    popup.innerText = message;

    // Append the div to the body
    document.body.appendChild(popup);

    // Make the popup visible
    popup.style.display = 'block';

    // Schedule the removal of the popup after a delay
    setTimeout(function() {
        popup.style.display = 'none';
        // Remove the popup from the DOM after it's hidden
        document.body.removeChild(popup);
    }, 3000); // Adjust the delay (in milliseconds) based on your preference
}

function addToCart() {
    var cartBtn = document.querySelectorAll(".add-to-cart");

    cartBtn.forEach((cartBtn) => {
        cartBtn.addEventListener("click", (event) => {
          let productArray = cartBtn.dataset.array;
          let productArrayId = cartBtn.dataset.id;
          let positionThisProductInCart = cart.findIndex((value) => value.product_id == productArrayId);
          if (cart.length <= 0) {
            cart = [{
              product_id: productArrayId,
              product_Arr: productArray,
              quantity: 1
            }];
          } else if (positionThisProductInCart < 0) {
            cart.push({
              product_id: productArrayId,
              product_Arr: productArray,
              quantity: 1
            });
          } else {
            cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
          }
          showFloatingPopup("Added");
          updateCart(cart);
        });
      });
}

const track = document.querySelector(".carousel-track");
const productCards = Array.from(document.querySelectorAll(".product-card"));
const cartTable = document.querySelector("#cart-table");
const noItems = document.querySelector(".noItems");
const totalPriceElement = document.getElementById("total-price");
const submitButton = document.querySelector(".submit");
const error = document.querySelector("#error");
const success = document.querySelector("#success");

let currentIndex = 0;
let cartIndex = 1;
let totalPrice = 0;

function productExists(name) {
  for (let row of cartTable.rows) {
    if (row.cells[1] && row.cells[1].textContent === name) {
      return row;
    }
  }
  return null;
}

function addToCart(button, name, price) {
  const existingRow = productExists(name);
  if (existingRow) {
    removeFromCart(existingRow, price);
    button.textContent = "Add Item";
    button.classList.remove("button-remove-from-cart");
    button.classList.add("button-add-to-cart");
  } else {
    const row = document.createElement("tr");
    row.innerHTML = `
  <td>${cartIndex}</td>
  <td>${name}</td>
  <td>${price.toFixed(2)}</td>
  `;
    cartTable.appendChild(row);
    noItems.style.display = "none";
    submitButton.classList.add("bgblue");
    submitButton.disabled = false;
    cartIndex++;
    totalPrice += price;
    button.textContent = "Remove Item";
    button.classList.remove("button-add-to-cart");
    button.classList.add("button-remove-from-cart");
    totalPriceElement.textContent = `₹${totalPrice.toFixed(2)}`;
    error.innerHTML = "";
  }
}

function removeFromCart(row, price) {
  if (row && row instanceof Node) {
    cartTable.removeChild(row);
    totalPrice -= price;
    cartIndex--;
    totalPriceElement.textContent = `₹${totalPrice.toFixed(2)}`;
    if (cartTable.children.length == 0) {
      noItems.style.display = "block";
      submitButton.classList.remove("bgblue");
    }
  }
}

submitButton.addEventListener("click", () => {
  if (cartTable.children.length == 0) {
    error.innerHTML = "Add items to the cart";
  }
  if (cartTable.children.length >= 1) {
    cartTable.innerHTML = "";
    noItems.style.display = "block";
    totalPrice = 0;
    totalPriceElement.textContent = `₹${totalPrice.toFixed(2)}`;
    success.innerHTML =
      "Thank you for contacting, we will get back to you soon";
    const addButtons = document.querySelectorAll(".button-remove-from-cart");
    addButtons.forEach((button) => {
      button.textContent = "Add Item";
      button.classList.remove("button-remove-from-cart");
      button.classList.add("button-add-to-cart");
    });
    setTimeout(() => {
      success.innerHTML = "";
      submitButton.classList.remove("bgblue");
      let name = document.getElementById("name").value;
      let email = document.getElementById("email").value;
      let mobile = document.getElementById("mobile").value;
      const form = document.getElementById("contact-form");
      emailjs
        .sendForm(
          "service_spau1jo",
          "template_7qe20vs",
          form
        )
        .then(
          () => {
            console.log("SUCCESS!");
          },
          (error) => {
            console.log("FAILED...", error);
          }
        );
    }, 2000);
  }
});

document.getElementById("scrollButton").onclick = function () {
  document.getElementById("service").scrollIntoView({ behavior: "smooth" });
};

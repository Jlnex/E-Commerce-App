import { saveToLocal, getFromLocale } from "./helpers.js";
import {
  renderCartItems,
  renderCartQuantity,
  renderCartTotal,
  renderNotFound,
} from "./ui.js";

let cart = getFromLocale("cart");

const addToCart = (e, products) => {
  console.log("alan 1", e.target.dataset.id);
  const productId = +e.target.dataset.id;
  console.log("alan 2");
  const foundProduct = products.find((product) => product.id === productId);
  const existingProduct = cart.find((item) => item.id === productId);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    const cartItem = {
      ...foundProduct,
      quantity: 1,
    };
    cart.push(cartItem);
  }
  saveToLocal("cart", cart);
  e.target.textContent = "Added";
  setTimeout(() => {
    e.target.textContent = "Add to Cart";
  }, 1000);
  renderCartQuantity(cart);
};

const removeFromCart = (e) => {
  const reponse = confirm("silmek istedigine emin misin?");

  if (reponse) {
    const productId = Number(e.target.dataset.id);
    console.log("productId: ", productId);

    cart = cart.filter((item) => item.id !== productId);

    console.log("productId cart: ", cart);

    saveToLocal("cart", cart);

    renderCartTotal(cart);

    if (cart.length > 0) {
      console.log("ekrani guncelle");
      renderCartItems(cart);
    } else {
      console.log("ekrani yok");

      renderNotFound();
    }
  }

  renderCartQuantity(cart);
};

const onQuantityChange = (e) => {
  const productId = parseInt(e.target.dataset.id); // 1 1 1 1 2

  const newQuantity = parseInt(e.target.value);

  if (newQuantity > 0) {
    const updateItem = cart.find((item) => item.id === productId);

    updateItem.quantity = newQuantity;

    saveToLocal("cart", cart);

    renderCartTotal(cart);

    renderCartQuantity(cart);
  } else {
    alert("0 dan buyuk olmali miktar");
    return;
  }
};

export { addToCart, removeFromCart, onQuantityChange };

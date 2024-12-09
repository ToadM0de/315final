import * as $ from "jquery";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "./firebaseConfig";

const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in");
    $("yourRecipe").css("display", "block");
  } else {
    console.log("User is signed out");
    $("#yourRecipe").css("display", "none");
  }
});

export function signUserUp(fn, ln, email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log("User created");
    })
    .catch((error) => {
      console.log(error);
    });
  // return firebase.auth().createUserWithEmailAndPassword(email, password);
}

export function signUserOut() {
  signOut(auth)
    .then(() => {
      console.log("User signed out");
      $("#yourRecipe").css("display", "none");
    })
    .catch((error) => {
      console.log("Error" + error);
    });
}

export function signUserIn(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log("User signed in");
      $("#yourRecipe").css("display", "block");
    })
    .catch((error) => {
      console.log(error);
    });
}

var products = [];
var cart = [];

function changeRoute() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#", "");
  //   console.log(hashTag + ' ' + pageID);

  if (pageID != "") {
    $.get(`pages/${pageID}.html`, function (data) {
      console.log("data " + data);
      $("#app").html(data);
      if (pageID == "cart") {
        loadCartItems();
      }
    });
  } else {
    if (products.length <= 0) {
      loadProducts();
    } else {
      loadHomePage();
    }
  }
}

function loadCartItems() {
  if (cart.length > 0) {
    $(".cart-items").html("");
    console.log("cart page", cart);
    $.each(cart, (index, productIndex) => {
      let product = products[productIndex];
      console.log(product);
      console.log("cart page");
      let cartHTML = `<div class="product">
              <div class="image-holder">
                  <img src="${product.productImage}" alt="">
              </div>
              <div class="desc">${product.productDescription}</div>
              <div class="price">$${product.productPrice}</div>
              <div class="remove" id="${index}">Remove</div>
              </div>`;

      $(".cart-items").append(cartHTML);

      $(".remove").on("click", function () {
        console.log("remove", cart);
        cart.splice(index, 1);
        console.log("after removed", cart);
        loadCartItems();
      });
    });
  }
}

function loadHomePage() {
  $("#app").html("");
  $.each(products, (index, product) => {
    let productHTML = `<div class="product">
            <div class="image-holder">
                <img src="${product.productImage}" alt="">
            </div>
            <div class="desc">${product.productDescription}</div>
            <div class="buy">
                <div class="buy-now" id="${index}">BUY NOW</div>
            </div>
        </div>`;
    $("#app").append(productHTML);
  });

  addBuyNowListener();
}

function addBuyNowListener() {
  $(".buy-now").on("click", function () {
    let index = $(this).attr("id");
    // let product = products[index];
    cart.push(index);
    $(".item-text").html(cart.length);
    console.log("buy now", index);
  });
}

function loadProducts() {
  $.getJSON("data/data.json", (data) => {
    products = data.PRODUCTS;
    console.log(products);
    loadHomePage();
  });
}

export function initURLListener() {
  $(window).on("hashchange", changeRoute);
  changeRoute();
}

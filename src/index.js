import * as $ from "jquery";
import { initURLListener } from "./model";
import { signUserUp, signUserOut, signUserIn } from "./model";

function initListeners() {
  $("#submit").on("click", () => {
    let firstName = $("#fName").val();
    let lastName = $("#lName").val();
    let email = $("#email").val();
    let password = $("#password").val();
    signUserUp(firstName, lastName, email, password);
  });

  $("#so").on("click", () => {
    signUserOut();
  });

  $("#siSubmit").on("click", () => {
    let siEmail = $("#siEmail").val();
    let siPassword = $("#siPassword").val();
    signUserIn(siEmail, siPassword);
  });
}

function initAccountListener() {
  $(".logo").on("click", function () {
    window.location.hash = "";
    console.log("logo clicked");
  });

  $(".account").on("click", function () {
    window.location.hash = "account";
    console.log("account clicked");
  });

  $(".cart").on("click", function () {
    window.location.hash = "cart";
    console.log("cart clicked");
  });
}

$(document).ready(function () {
  initListeners();
  initURLListener();
  initAccountListener();
});

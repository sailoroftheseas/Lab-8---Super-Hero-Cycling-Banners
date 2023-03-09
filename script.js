"use strict";

const $ = selector => document.querySelector(selector);
    
const imageCache = [];
const realCache = [];
let realCounter = 0;
let imageCounter = 0;
let timer = null;
let image = null;
let realImage = null;

const mainImage = $("#main_image");   // the a element for the show
const caption = $("#caption");        // the h2 element for the caption
const realMainImage = $("#themainimage"); // the img element for the show

const runSlideShow = () => {
    imageCounter = (imageCounter + 1) % imageCache.length;
    image = imageCache[imageCounter];
    realCounter = (realCounter + 1) % realCache.length;
    realImage = realCache[realCounter];
    realMainImage.src = realImage.src;
    mainImage.href = image.href;
    mainImage.alt = image.alt;
    caption.textContent = image.alt;
    // mainImage.textContent = image.alt;
};
         
document.addEventListener("DOMContentLoaded", () => {
    const links = $("#image_list").querySelectorAll("a");
    const realLinks = $("#image_list").querySelectorAll("img");


    for ( let realLink of realLinks ) {
        // Preload image and copy src properties
        realImage = new Image();
        realImage.src = realLink.src;

        // add image to array 
        realCache[realCache.length] = realImage;
    }
    // process image links
    for ( let link of links ) {
        // Copy title and href link properties
        image = new Image();
        image.href = link.href;
        image.alt = link.title;

        // add image to array 
        imageCache[imageCache.length] = image;
    }


    // attach start and pause event handlers
    $("#start").addEventListener("click", () => {
        runSlideShow();
        timer = setInterval(runSlideShow, 2000);
        $("#start").disabled = true;
        $("#pause").disabled = false;
    });
    $("#pause").addEventListener("click", () => {
        clearInterval(timer);
        $("#start").disabled = false;
        $("#pause").disabled = true;
    });
});
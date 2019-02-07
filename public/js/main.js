// Banner Carousel 

const bannerCarousel = document.querySelector("[data-js=banner__carousel]");
const slideOne = document.querySelector("[data-js=pic__one]");
const slideTwo = document.querySelector("[data-js=pic__two]");
const slideThree = document.querySelector("[data-js=pic__three]");

slideOne.addEventListener("click", e => {
 slideOne.style.visibility = "hidden";
 slideTwo.style.visibility = "visible";
 slideThree.style.visibility = "hidden";
 bannerCarousel.classList.toggle("show__two");
});

slideTwo.addEventListener("click", e => {
 slideOne.style.visibility = "hidden";
 slideTwo.style.visibility = "hidden";
 slideThree.style.visibility = "visible";
 bannerCarousel.classList.toggle("show__three");
});

slideThree.addEventListener("click", e => {
 slideOne.style.visibility = "visible";
 bannerCarousel.classList.remove("show__two");
 bannerCarousel.classList.remove("show__three");
});


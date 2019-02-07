// Banner Carousel 

const bannerCarousel = document.querySelector("[data-js=banner__carousel]");
const slideOne = document.querySelector("[data-js=pic__one]");
const slideTwo = document.querySelector("[data-js=pic__two]");
const slideThree = document.querySelector("[data-js=pic__three]");
const buttonOne = document.querySelector("[data-js=btn__pic-1]");
const buttonTwo = document.querySelector("[data-js=btn__pic-2]");
const buttonThree = document.querySelector("[data-js=btn__pic-3]");

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

buttonOne.addEventListener("click", e => {
 slideOne.style.visibility = "visible";
 slideTwo.style.visibility = "hidden";
 slideThree.style.visibility = "hidden";
 bannerCarousel.classList.remove("show__two");
 bannerCarousel.classList.remove("show__three");
});

buttonTwo.addEventListener("click", e => {
 slideOne.style.visibility = "hidden";
 slideTwo.style.visibility = "visible";
 slideThree.style.visibility = "hidden";
 bannerCarousel.classList.toggle("show__two");
 bannerCarousel.classList.remove("show__three");
});

buttonThree.addEventListener("click", e => {
 slideOne.style.visibility = "hidden";
 slideTwo.style.visibility = "hidden";
 slideThree.style.visibility = "visible";
 bannerCarousel.classList.toggle("show__three");
 bannerCarousel.classList.remove("show__two");
})


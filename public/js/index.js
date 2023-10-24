// SLIDESHOW CODE

document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".featureSlide");
    let currentSlide = 0;

    function showSlide(slideIndex) {
        slides[currentSlide].classList.remove("active");
        slides[slideIndex].classList.add("active");
        currentSlide = slideIndex;
    }

    function nextSlide() {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= slides.length) {
            nextIndex = 0;
        }
        showSlide(nextIndex);
    }

    function prevSlide() {
        let prevIndex = currentSlide - 1;
        if (prevIndex < 0) {
            prevIndex = slides.length - 1;
        }
        showSlide(prevIndex);
    }

    const prevButton = document.querySelector(".prevBtn");
    const nextButton = document.querySelector(".nextBtn");

    prevButton.addEventListener("click", prevSlide);
    nextButton.addEventListener("click", nextSlide);

    // Show the initial slide
    showSlide(currentSlide);
});

// FORM CODE

const hiddenButtons = document.querySelectorAll('.hiddenButton');
    hiddenButtons.forEach(button => {
        button.addEventListener('click', function() {
            const cardId = button.getAttribute('data-card-id');
            // Send the cardId along with the AJAX request
        });
    });
 const brandContent=document.querySelectorAll(".brandContent");

brandContent.forEach((brand)=>{brand.addEventListener("click",()=>{
    const btn=brand.querySelector(".hiddenButton");
    btn.click();
    console.log("clicked");
});
});

//Navbar
const navItems=document.querySelector(".navItems");
const navBtn=document.querySelector(".navBtn");
navBtn.addEventListener("click",()=>{
    
navItems.classList.toggle("show");
})
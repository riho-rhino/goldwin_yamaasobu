const mvSwiper = new Swiper(".mv-swiper", {
    loop: false, 
    slidesPerView: 1, 
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        type: "fraction", 
      },
});

const howSwiper = new Swiper(".how-swiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    loop: true, 
    spaceBetween: 10, 
    slidesPerView: 1.2, 
    centeredSlides: true, 
    centeredSlidesBounds: true 
  });

const doSwiper = new Swiper(".do-swiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    loop: true, 
    spaceBetween: 10, 
    slidesPerView: 1.2, 
    centeredSlides: true, 
    centeredSlidesBounds: true 
  });


const fieldSwiper = new Swiper(".field-swiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    pagination: {
        el: ".swiper-pagination",
        type: "fraction", 
      },
    loop: true, 
    spaceBetween: 15, 
    slidesPerView: 1.3, 

  });


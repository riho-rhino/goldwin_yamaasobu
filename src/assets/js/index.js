import $ from "jquery"


const element = document.querySelector('.scrollable-element'); // スクロール可能な要素
    const elementWidth = element.scrollWidth;
    const windowWidth = window.innerWidth;
    const initialScrollPosition = (elementWidth / 2) - (windowWidth / 2);
    element.scrollTo({
        left: initialScrollPosition,
        behavior: 'smooth' // 可視性を向上させるためのオプション
});


$(function () {
    $(window).on({
      'scroll': function () {
        scrollFadeIn();
        scrollActivr();
      },
    });
  
  })
  
  function scrollActivr() {
    $('.active').each(function () {
      var elementTop = $(this).offset().top;
      var viewportBottom = $(window).scrollTop() + $(window).height() * 0.8;
  
      if (elementTop < viewportBottom) {
        $(this).addClass('move');
      }
    });
  }
  
  function scrollFadeIn() {
    $('.fadein').each(function () {
      var elementTop = $(this).offset().top;
      var viewportBottom = $(window).scrollTop() + $(window).height() * 0.8;
  
      if (elementTop < viewportBottom) {
        $(this).addClass('in');
      }
    });
  }
  
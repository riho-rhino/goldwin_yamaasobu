import $ from "jquery"


opning();
function tick(time) {
    return new Promise((resolve) => {
        setTimeout(function () {
            resolve()
        }, time)
    })
}
async function opning() {
// $('body').addClass('noscroll')
//   await tick(100);
//   $('.opening').addClass('start');
//   await tick(3500);
//   $('.opening').fadeOut(700);
  // await tick(500);
  $('.mv_wrapper').addClass('start');
  $('.ttl').addClass('show');
  await tick(500);
  $('body').removeClass('noscroll');
}





var $body       = $('body')
var $modal_bg   = $('.yamaasobu_modal_bg');
var $modal      = $modal_bg.find('.yamaasobu_modal_content');
var $item_list  = $('.map-image');
var $item       = $item_list.find('.map-num');
var $close = $('.modal_close');

// mapのmodal

function toggleModal() {
  $item.on('click', function(){
      var $this = $(this);
      var index = $this.attr('data-modal') - 1;
      $modal.removeClass('show');
      $('.yamaasobu_modal_list').scrollTop(0);

      $modal.eq(index).addClass('show');
      $body.addClass('noscroll');
      $modal_bg.fadeIn(500, function() {
          $modal_bg.addClass('open');
      });
  });

  $close.on('click', function(){
      $body.removeClass('noscroll');
      $modal_bg.fadeOut(500, function() {
          $modal_bg.removeClass('open');
      });
      $modal.removeClass('show');
      $('.yamaasobu_modal_list').scrollTop(0);
  });  
}




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



  function itemOn() {
    $('.yamaasobu-section').each(function () {
      var element = $(this);
      var elementTop = element.offset().top;
      var windowTop = $(window).scrollTop();
      var windowHeight = $(window).height();
  
      if (windowTop + windowHeight * 0.6 > elementTop) {
        element.addClass('on');
        element.addClass('active');
      } else {
        element.removeClass('on');
      }
    });
  }


$(function () {
  $(window).on({
    'scroll': function () {
      scrollFadeIn();
      scrollActivr();
      itemOn();
    },
    'load' : function(){
      toggleModal();
    },
  });

})

// fixedのバーのアイテムリンク
  $(function () {
    $('.fixed-item-link').on('click', function (e) {
        $('.fixed-item-link').toggleClass('linkshow');
        $('.item-link_modal').toggleClass('show');
    });
    $(document).on('click', function (e) {
        if (
            !$(e.target).closest('.item-link_modal').length &&
            !$(e.target).closest('.fixed-item-link').length
        ) {
            $('.fixed-item-link').removeClass('linkshow');
            $('.item-link_modal').removeClass('show');
        }
    });
});


  // swiper
  const mvSwiper = new Swiper(".mv-swiper", {
    loop: true,  
    slidesPerView: 1, 
    
    effect: 'fade',  
    fadeEffect: {
      crossFade: true,  
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      type: "fraction", 
    },
    autoplay: {
      delay: 3000, 
      disableOnInteraction: false, 
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
  centeredSlidesBounds: true,
  effect: '',
  breakpoints: {
    768: {
      spaceBetween: 10,
      slidesPerView: 1.2
    },
    769: {
      spaceBetween: 15,
      slidesPerView: 1.5,
    }
  }
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
    centeredSlidesBounds: true ,
    effect: '',
    breakpoints: {
      768: {
        spaceBetween: 10,
        slidesPerView: 1.2
      },
      769: {
        spaceBetween: 15,
        slidesPerView: 1.5,
      }
    }
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
    slidesPerView: 1.2,  
    effect: '',
    breakpoints: {
      768: {
        spaceBetween: 15,
        slidesPerView: 1.2, 
      },
      769: {
        spaceBetween: 15, 
        slidesPerView: 3.5, 
      }
    }
  });


// openweatherAPI

  const apiKey = 'ae1de34a065b92514dcacf0d4295d081';
  const cities = {
      tokyo: 'Tokyo,jp',
      osaka: 'Osaka,jp',
      okinawa: 'Okinawa,jp',
      sapporo: 'Sapporo,jp', // hokkaidoをsapporoに変更
      fukuoka: 'Fukuoka,jp'
  };


  async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ja`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200 && data.weather && data.weather[0]) {
            const weatherMain = data.weather[0].main;
            const temperature = `${data.main.temp.toFixed(0)}℃`;  
            const weatherIcon = getWeatherIcon(weatherMain);

            return { temperature, weatherIcon };
        } else {
            console.error("Weather data missing:", data);
            return { temperature: '', weatherIcon: '' };
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return { temperature: '', weatherIcon: '' };
    }
}

// 天気の状態に対応する画像を返す関数
function getWeatherIcon(main) {
    switch(main) {
        case 'Clear': return '<div class="weather-icon"><img class="sunny-icon" src="/assets/img/sunny.png" alt="晴れ"></div>';
        case 'Rain': return '<div class="weather-icon"><img class="rain-icon" src="/assets/img/rain.png" alt="雨"></div>';
        case 'Clouds': return '<div class="weather-icon"><img class="cloud-icon" src="/assets/img/cloud.png" alt="曇り"></div>';
        case 'Snow': return '<div class="weather-icon"><img class="snow-icon" src="/assets/img/snow.png" alt="雪"></div>';
        default: return '<div class="weather-icon"><img class="cloud-icon" src="/assets/img/cloud.png" alt="曇り"></div>';
    
    }
}

// 各都市の天気情報を表示
async function displayWeather() {
    const tokyoWeather = await getWeather(cities.tokyo);
    const osakaWeather = await getWeather(cities.osaka);
    const okinawaWeather = await getWeather(cities.okinawa);
    const sapporoWeather = await getWeather(cities.sapporo); 
    const fukuokaWeather = await getWeather(cities.fukuoka);

    document.getElementById('tokyo').innerHTML = `${tokyoWeather.weatherIcon} <div class="weather-txt"><span>tokyo</span>${tokyoWeather.temperature}</div>`;
    document.getElementById('osaka').innerHTML = `${osakaWeather.weatherIcon} <div class="weather-txt"><span>osaka</span>${osakaWeather.temperature}</div>`;
    document.getElementById('okinawa').innerHTML = `${okinawaWeather.weatherIcon} <div class="weather-txt"><span>okinawa</span>${okinawaWeather.temperature}</div>`;
    document.getElementById('sapporo').innerHTML = `${sapporoWeather.weatherIcon} <div class="weather-txt"><span>hokkaido</span>${sapporoWeather.temperature}</div>`;
    document.getElementById('fukuoka').innerHTML = `${fukuokaWeather.weatherIcon} <div class="weather-txt"><span>fukuoka</span>${fukuokaWeather.temperature}</div>`;

    document.getElementById('tokyo-2').innerHTML = `${tokyoWeather.weatherIcon} <div class="weather-txt"><span>tokyo</span>${tokyoWeather.temperature}</div>`;
    document.getElementById('osaka-2').innerHTML = `${osakaWeather.weatherIcon} <div class="weather-txt"><span>osaka</span>${osakaWeather.temperature}</div>`;
    document.getElementById('okinawa-2').innerHTML = `${okinawaWeather.weatherIcon} <div class="weather-txt"><span>okinawa</span>${okinawaWeather.temperature}</div>`;
    document.getElementById('sapporo-2').innerHTML = `${sapporoWeather.weatherIcon} <div class="weather-txt"><span>hokkaido</span>${sapporoWeather.temperature}</div>`;
    document.getElementById('fukuoka-2').innerHTML = `${fukuokaWeather.weatherIcon} <div class="weather-txt"><span>fukuoka</span>${fukuokaWeather.temperature}</div>`;
}

// ページが読み込まれたときに天気情報を表示
displayWeather();


// mapをスマホ時センターにする
const element = document.querySelector('.scrollable-element'); // スクロール可能な要素
    const elementWidth = element.scrollWidth;
    const windowWidth = window.innerWidth;
    const initialScrollPosition = (elementWidth / 2) - (windowWidth / 2);
    element.scrollTo({
        left: initialScrollPosition,
        behavior: 'smooth' // 可視性を向上させるためのオプション
});


gsap.fromTo(
  ".map-wrap", 
  {
      yPercent: 20, 
  },
  {
      yPercent: -20, 
      ease: "none", 
      scrollTrigger: {
      trigger: ".yamaasobu-map", 
      start: "top bottom", 
      end: "bottom top", 
      scrub: true, 
      },
  }
);


gsap.fromTo(
  ".cloud", 
  {
      yPercent: 30, 
  },
  {
      yPercent: -30, 
      ease: "none", 
      scrollTrigger: {
      trigger: ".yamaasobu-map", 
      start: "top bottom", 
      end: "bottom top", 
      scrub: true, 
      },
  }
);


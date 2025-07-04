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
  $('body').addClass('noscroll')
  await tick(100);
  $('.op-ja').addClass('show');
  $('.op-en').addClass('show');
  $('.opening').addClass('show');
  $('.op-map-wrap').addClass('show');
  await tick(2900);
  $('.opening').fadeOut(400);
  await tick(300);
  $('.subttl').addClass('show');
  $('body').removeClass('noscroll');
  await tick(1100);
  $('.ttl').addClass('show');
  $('.mv_wrapper').addClass('start');
  $('.mv-swiper').addClass('show');
  await tick(900);
  $('.three_bu-wrap').addClass('show');
  await tick(2000);
  $('.mv-swiper').addClass('start');

}





var $body = $('body')
var $modal_bg = $('.yamaasobu_modal_bg');
var $modal = $modal_bg.find('.yamaasobu_modal_content');
var $item_list = $('.map-image');
var $item = $item_list.find('.map-num');
var $close = $('.modal_close');

// mapのmodal

function toggleModal() {
  $item.on('click', function () {
    var $this = $(this);
    var index = $this.attr('data-modal') - 1;
    $modal.removeClass('show');
    $('.yamaasobu_modal_list').scrollTop(0);

    $modal.eq(index).addClass('show');
    $body.addClass('noscroll');
    $modal_bg.fadeIn(500, function () {
      $modal_bg.addClass('open');
    });
  });

  $close.on('click', function () {
    $body.removeClass('noscroll');
    $modal_bg.fadeOut(500, function () {
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
      element.addClass('move');
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
    'load': function () {
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
  autoplay: false,  
});

const mvSwiperElement = document.querySelector('.mv-swiper');
const startClassObserver = new MutationObserver(() => {
  if (mvSwiperElement.classList.contains('start')) {
    mvSwiper.autoplay.start(); 
  }
});

startClassObserver.observe(mvSwiperElement, {
  attributes: true,
  attributeFilter: ['class'],
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
      spaceBetween: 30,
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
  centeredSlidesBounds: true,
  effect: '',
  breakpoints: {
    768: {
      spaceBetween: 10,
      slidesPerView: 1.2
    },
    769: {
      spaceBetween: 30,
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
  nagano: 'Nagano,jp', // 長野に変更
  sapporo: 'Sapporo,jp', 
  kumamoto: 'Kumamoto,jp', // 熊本追加
  matsuyama: 'Matsuyama,jp', // 愛媛松山追加
  yamagata: 'Yamagata,jp' // 山形追加
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
  switch (main) {
    case 'Clear': return '<div class="weather-icon"><img class="sunny-icon" src="./assets/img/sunny.png" alt="晴れ"></div>';
    case 'Rain': return '<div class="weather-icon"><img class="rain-icon" src="./assets/img/rain.png" alt="雨"></div>';
    case 'Clouds': return '<div class="weather-icon"><img class="cloud-icon" src="./assets/img/cloud.png" alt="曇り"></div>';
    case 'Snow': return '<div class="weather-icon"><img class="snow-icon" src="./assets/img/snow.png" alt="雪"></div>';
    default: return '<div class="weather-icon"><img class="cloud-icon" src="./assets/img/cloud.png" alt="曇り"></div>';
  }
}

// 各都市の天気情報を表示
// async function displayWeather() {
//   const tokyoWeather = await getWeather(cities.tokyo);
//   const naganoWeather = await getWeather(cities.nagano); // 長野の天気情報
//   const sapporoWeather = await getWeather(cities.sapporo);
//   const kumamotoWeather = await getWeather(cities.kumamoto); // 熊本の天気情報
//   const matsuyamaWeather = await getWeather(cities.matsuyama); // 松山の天気情報
//   const yamagataWeather = await getWeather(cities.yamagata); // 山形の天気情報

//   document.getElementById('tokyo').innerHTML = `${tokyoWeather.weatherIcon} <div class="weather-txt"><span>tokyo</span>${tokyoWeather.temperature}</div>`;
//   document.getElementById('nagano').innerHTML = `${naganoWeather.weatherIcon} <div class="weather-txt"><span>nagano</span>${naganoWeather.temperature}</div>`;
//   document.getElementById('sapporo').innerHTML = `${sapporoWeather.weatherIcon} <div class="weather-txt"><span>hokkaido</span>${sapporoWeather.temperature}</div>`;
//   document.getElementById('kumamoto').innerHTML = `${kumamotoWeather.weatherIcon} <div class="weather-txt"><span>kumamoto</span>${kumamotoWeather.temperature}</div>`;
//   document.getElementById('matsuyama').innerHTML = `${matsuyamaWeather.weatherIcon} <div class="weather-txt"><span>ehime</span>${matsuyamaWeather.temperature}</div>`;
//   document.getElementById('yamagata').innerHTML = `${yamagataWeather.weatherIcon} <div class="weather-txt"><span>yamagata</span>${yamagataWeather.temperature}</div>`;

//   document.getElementById('tokyo-2').innerHTML = `${tokyoWeather.weatherIcon} <div class="weather-txt"><span>tokyo</span>${tokyoWeather.temperature}</div>`;
//   document.getElementById('nagano-2').innerHTML = `${naganoWeather.weatherIcon} <div class="weather-txt"><span>nagano</span>${naganoWeather.temperature}</div>`;
//   document.getElementById('sapporo-2').innerHTML = `${sapporoWeather.weatherIcon} <div class="weather-txt"><span>hokkaido</span>${sapporoWeather.temperature}</div>`;
//   document.getElementById('kumamoto-2').innerHTML = `${kumamotoWeather.weatherIcon} <div class="weather-txt"><span>kumamoto</span>${kumamotoWeather.temperature}</div>`;
//   document.getElementById('matsuyama-2').innerHTML = `${matsuyamaWeather.weatherIcon} <div class="weather-txt"><span>ehime</span>${matsuyamaWeather.temperature}</div>`;
//   document.getElementById('yamagata-2').innerHTML = `${yamagataWeather.weatherIcon} <div class="weather-txt"><span>yamagata</span>${yamagataWeather.temperature}</div>`;
// }

async function displayWeather() {
  const weatherPromises = Object.values(cities).map(city => getWeather(city));
  const [tokyoWeather, naganoWeather, sapporoWeather, kumamotoWeather, matsuyamaWeather, yamagataWeather] = await Promise.all(weatherPromises);

  document.getElementById('tokyo').innerHTML = `${tokyoWeather.weatherIcon} <div class="weather-txt"><span>tokyo</span>${tokyoWeather.temperature}</div>`;
  document.getElementById('nagano').innerHTML = `${naganoWeather.weatherIcon} <div class="weather-txt"><span>nagano</span>${naganoWeather.temperature}</div>`;
  document.getElementById('sapporo').innerHTML = `${sapporoWeather.weatherIcon} <div class="weather-txt"><span>hokkaido</span>${sapporoWeather.temperature}</div>`;
  document.getElementById('kumamoto').innerHTML = `${kumamotoWeather.weatherIcon} <div class="weather-txt"><span>kumamoto</span>${kumamotoWeather.temperature}</div>`;
  document.getElementById('matsuyama').innerHTML = `${matsuyamaWeather.weatherIcon} <div class="weather-txt"><span>ehime</span>${matsuyamaWeather.temperature}</div>`;
  document.getElementById('yamagata').innerHTML = `${yamagataWeather.weatherIcon} <div class="weather-txt"><span>yamagata</span>${yamagataWeather.temperature}</div>`;
  
  document.getElementById('tokyo-2').innerHTML = `${tokyoWeather.weatherIcon} <div class="weather-txt"><span>tokyo</span>${tokyoWeather.temperature}</div>`;
  document.getElementById('nagano-2').innerHTML = `${naganoWeather.weatherIcon} <div class="weather-txt"><span>nagano</span>${naganoWeather.temperature}</div>`;
  document.getElementById('sapporo-2').innerHTML = `${sapporoWeather.weatherIcon} <div class="weather-txt"><span>hokkaido</span>${sapporoWeather.temperature}</div>`;
  document.getElementById('kumamoto-2').innerHTML = `${kumamotoWeather.weatherIcon} <div class="weather-txt"><span>kumamoto</span>${kumamotoWeather.temperature}</div>`;
  document.getElementById('matsuyama-2').innerHTML = `${matsuyamaWeather.weatherIcon} <div class="weather-txt"><span>ehime</span>${matsuyamaWeather.temperature}</div>`;
  document.getElementById('yamagata-2').innerHTML = `${yamagataWeather.weatherIcon} <div class="weather-txt"><span>yamagata</span>${yamagataWeather.temperature}</div>`;
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
    yPercent: 25,
  },
  {
    yPercent: -25,
    ease: "none",
    scrollTrigger: {
      trigger: ".yamaasobu-map",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  }
);

// アンカーリンク
$(window).on('load', function () {
  $('.footer-anchor-list a[href*="#"]').on('click', function () {
    var elmHash = $(this).attr('href');
    var pos = $(elmHash).offset().top;
    $('html, body').animate({ scrollTop: pos }, 700);
    return false;
  });
});

// アンカーリンク
$(window).on('load', function () {
  $('.fixed-anchor_wrap-inner a[href*="#"]').on('click', function () {
    var elmHash = $(this).attr('href');
    var pos = $(elmHash).offset().top;
    $('html, body').animate({ scrollTop: pos }, 700);
    return false;
  });
});

// アンカーリンク
$(window).on('load', function () {
  $('.mv-swiper-wrapper a[href*="#"]').on('click', function () {
    var elmHash = $(this).attr('href');
    var pos = $(elmHash).offset().top;
    $('html, body').animate({ scrollTop: pos }, 700);
    return false;
  });
});

$(window).on('load', function () {
  $('.footer-people').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 700);
    return false;
  });
});

/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, { Navigation, Pagination, Autoplay, } from 'swiper';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
 import 'swiper/css';

// Добавление классов слайдерам
// swiper главному блоку, swiper-wrapper оболочке, swiper-slide для слайдов
function bildSliders() {
	//BildSlider
	let sliders = document.querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper)');
	if (sliders) {
		sliders.forEach(slider => {
			slider.parentElement.classList.add('swiper');
			slider.classList.add('swiper-wrapper');
			for (const slide of slider.children) {
				slide.classList.add('swiper-slide');
			}
		});
	}
}
// Инициализация слайдеров
function initSliders() {
	// Добавление классов слайдера
	// при необходимости отключить
	bildSliders();
	// Перечень слайдеров 
	if (document.querySelector('.mainslider__slider')) {
		new Swiper('.mainslider__slider', {
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, Pagination, Autoplay,],
			//effect: 'coverflow',
			//coverflowEffect: {
			//	rotate: 18,
			//	slideShadows: true,
				//modifier: 1
			//},
			//effect: 'fade',
			// autoplay: {
			// 	delay: 5000,
			// 	disableOnInteraction: false,
			// },
			observer: true,
			observeParents: true,
			slidesPerView: 2,
			spaceBetween: 0,
			autoHeight: true,
			speed: 2500,
			//loop: true,
			navigation: {
				nextEl: '.about__more .more__item_next',
				prevEl: '.about__more .more__item_prev',
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 1,
					spaceBetween: 0,
				},
				992: {
					slidesPerView: 2,
					spaceBetween: 0,
				},
				1268: {
					slidesPerView: 2,
					spaceBetween: 0,
				},
			},	
			on: {
			}
		});
	}
	if (document.querySelector('maincatalogue__slider')) {
		new Swiper('.maincatalogue__slider', {
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Autoplay],
			//effect: 'fade',
			//autoplay: {
			//	delay: 5000,
			//	disableOnInteraction: false,
			//},
			//observer: true,
			//observeParents: true,
			//slidesPerView: 4,
			spaceBetween: 0,
			//autoHeight: true,
			//speed: 2500,
			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			breakpoints: {
				320: {
					slidesPerView: 2,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 4,
					spaceBetween: 0,
				},
				992: {
					slidesPerView: 4,
					spaceBetween: 0,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 0,
				},
			},	
			on: {
			}
		});
	}
	if (document.querySelector('.product__slider')) {
		new Swiper('.product__slider', {
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, Pagination,  ],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: false,
			speed: 800,
			allowTouchMove: true,
			touchRatio: 1,
			resistanceRatio: 0.3,
			loop: true,
			// Dotts
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
				type:'progressbar',
			},
			// Arrows
			navigation: {
				prevEl: '.swiper-button-prev',
				nextEl: '.swiper-button-next',
			},
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
		});
	}

}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	// Добавление классов слайдера
	// при необходимости отключить
	bildSliders();
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});
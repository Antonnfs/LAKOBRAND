import { bodyLock, bodyLockStatus, bodyLockToggle, bodyUnlock, isMobile} from './functions.js';
import {totalUpdate, orderItemsRender} from './orderform.js'

export function cartInit() {
	window.addEventListener('click', function(e) {
		if(e.target.closest('.header__cart')) {
			if(bodyLockStatus) {
				bodyLockToggle()
				document.documentElement.classList.toggle('cart-open');
			}
		} else {
			if (!e.target.closest('.cart')) {
				cartClose()
			}
		}
	})
	//Закрытие меню по клавише Esc
	document.addEventListener('keyup', function(event) {
		if(event.code === 'Escape') {
			cartClose();
		}
	})
}
cartInit();
export function cartOpen() {
	document.documentElement.classList.add('cart-open');
}
export function cartClose() {
	bodyUnlock()
	document.documentElement.classList.remove('cart-open');
}
//========================================================================================================================================================
console.log(localStorage);
const cartWrapper = document.querySelector('.cart__wrapper');
let productKey;
let productInfo;
formQuantity()
checkCartStatus()

// Отслеживаем клик на странице
window.addEventListener('click', function(e) {
	// Проверяем что клик был совершен на кнопке "Добавить в корзину" 
	if(e.target.hasAttribute('data-add-to-cart')) {
		// Находим карточку с товаром, внутри которой был совершён клик
		const product = e.target.closest('[data-product]');
		//Записываем данные товара в объект productInfo
		productInfo = {
			product: product.dataset.product,
			imgSrc: product.querySelector('.product-img_main').getAttribute('src'), 
			title: product.querySelector('.product__name').innerText,
			size: product.querySelector('input:checked').id,
			price: product.querySelector('[data-currency]').innerText,
			counter: product.querySelector('[data-counter]').value,
		}
		// Генерируем ID-ключ продукта
		productKey = `${productInfo.product}${productInfo.size}`;
		//Проверяем есть ли уже такой товар в корзине
		if (localStorage.getItem(productKey)) {
			//Если уже есть
			cartClear()
			modifyStorage(productKey, productInfo, 'plus')
			cartRender()
		} else {
			// Если нету - записываем в localStorage пару ключ-значение продукта
			cartClear()
			setStorage(productKey, productInfo) 
			cartRender()
		}
		// Проверка статуса корзины
		checkCartStatus()
		// Пересчёт количества товаров в корзине
		countIconValue()
		// Пересчёт общей стоимости
		countTotal()		
		//Сбрасывание счётчика после добавления
		product.querySelector('[data-counter]').value = '1';
		console.log(localStorage);
	}
	// Очистка корзины
	if(e.target.closest('[data-cart-clear]')) {
		localStorage.clear();
		cartClear();
		checkCartStatus();
		countTotal();
		countIconValue();
		totalUpdate()
		orderItemsRender()
	}
})
// Отрисовка корины после перезагрузки страницы
window.addEventListener('load', function() {
	cartRender();
	countTotal();
	countIconValue();
	checkCartStatus()
})
console.log(localStorage);

//========================================================================================================================================================
function setStorage(productKey, productInfo) {
	localStorage.setItem(productKey, JSON.stringify(productInfo))
}
function modifyStorage(productKey, productInfo, sign) {
	const prodStor = JSON.parse(localStorage.getItem(productKey))		// Получаем объект по ключу
	if (sign === 'plus') {															// Если аргумент - плюс
		prodStor.counter = +prodStor.counter + +productInfo.counter;   // Добавляем количество товара
	} else if (sign === 'minus') {												// Если аргумент - минус
		prodStor.counter = prodStor.counter - productInfo.counter;  	// Отнимаем количество товара
	}
	localStorage.setItem(productKey, JSON.stringify(prodStor) )  		// Перезаписываем товар с новым кол-вом
}
function modifyStorageInCart(productKey, productInfo, sign) {
	const prodStor = JSON.parse(localStorage.getItem(productKey))		
	if (sign === 'plus') {															
		++prodStor.counter;   
	} else if (sign === 'minus') {												
		--prodStor.counter;  	
	}
	localStorage.setItem(productKey, JSON.stringify(prodStor) )
}
// Функция очистки элемента корзины для корректного вывода значений
function cartClear() {
	cartWrapper.innerHTML = '';
}
function cartRender() {
	//Выводим товары в корзину
	for (let i = 0; i < localStorage.length; i++) {
		let key = localStorage.key(i);
		if (key !== 'totalPrice' && key !== 'totalQuantity') {
			let productInfo = JSON.parse(localStorage.getItem(key)) 
			console.log(key);
			//Шаблон отображения товара в корзине
			const cartItemHTML = `	
			<div data-product="${productInfo.product}" data-product-key="${key}" class="item-cart">
				<div class="item-cart__remove">╳</div>
				<img class="item-cart__img" src=${productInfo.imgSrc} alt="">
				<div class="item-cart__info">
					<h3 class="item-cart__name">${productInfo.title}</h3>
					<div data-currency class="item-cart__price">${productInfo.price}</div>
					<h5 data-size="${productInfo.size}" class="item-cart__size">Розмір:&nbsp;<span class="size-cart">${productInfo.size}</span></h5>
					<div class="item-cart__quantity quantity">
						<h4 class="quantity__title">Кількість:</h4>
						<div class="quantity__counter">
							<button data-action class="quantity__button quantity__button_minus">-</button>
							<input data-counter disabled type="phone" value="${productInfo.counter}" class="quantity__value">
							<button data-action class="quantity__button quantity__button_plus">+</button>
						</div>
					</div>
				</div>
			</div>`
			cartWrapper.insertAdjacentHTML("afterbegin", cartItemHTML);
		}
	}
}

// Проверка корзины на пустоту
export function checkCartStatus() {
	// Корзина пустая/полная
	const cartEmptyBadge = document.querySelector('[data-cart-empty]');
	// Блок "Итого" / "Оформить"
	const orderForm = document.querySelector('.cart__total')
	if (!localStorage.getItem('totalQuantity') === '0' || cartWrapper.children.length) {
		cartEmptyBadge.classList.add('none');
		orderForm.classList.remove('none');
		cartWrapper.style.padding='10px';
	} else {
		cartWrapper.style.padding='0px'
		cartEmptyBadge.classList.remove('none');
		orderForm.classList.add('none');
	}
}

// Пересчёт общей стоимости
export function countTotal() {
	const totalPriceEl = document.querySelector('.total-cart__price');
	// Общая стоимость товаров
	let priceTotal = 0;
	// Обходим все блоки с ценами в корзине
	for (let i = 0; i < localStorage.length; i++) { 
		let key = localStorage.key(i);
		if (key !== 'totalPrice' && key !== 'totalQuantity') {				
			let productInfo = JSON.parse(localStorage.getItem(key));
			let sumOfItem = parseInt(productInfo.price) * productInfo.counter
			priceTotal = +priceTotal + sumOfItem;
		}    
	}
	// Отображаем цену на странице
	totalPriceEl.innerText = priceTotal;
	// Записываем в localStorage
	localStorage.setItem('totalPrice', priceTotal)
}

// Функция пересчёта кол-ва товаров в корзине   
export function countIconValue() {
	const iconCounter = document.querySelector('[data-cart-counter]');
	let iconValue = 0;
	for (let i = 0; i < localStorage.length; i++) { 
		let key = localStorage.key(i);
		if (key !== 'totalPrice' && key !== 'totalQuantity') {				
			let productInfo = JSON.parse(localStorage.getItem(key));
			iconValue = +iconValue + +productInfo.counter;
		}    
	}
	iconCounter.innerText = iconValue;
	localStorage.setItem('totalQuantity', iconValue)
}

// Модуь формы "колличество" 
export function formQuantity() {
	window.addEventListener("click", function(e) {
		if (e.target.closest('.quantity__button')) {
			let value = parseInt(e.target.closest('.quantity').querySelector('input').value);
			if (e.target.classList.contains('quantity__button_plus')) {
				++value;
			} else {
				--value;
			}
			if((e.target.closest('.cart__wrapper') || e.target.closest('.order__items')) && parseInt(value) < 1) {
				localStorage.removeItem(e.target.closest('.item-cart').getAttribute('data-product-key'))
				cartClear()
				cartRender();
				checkCartStatus()
				countIconValue();
				countTotal()
				totalUpdate()
				orderItemsRender()
				console.log(localStorage);
			} else if(value < 1) 
				value = 1;
				e.target.closest('.quantity').querySelector('input').value = value;
		} else if (e.target.closest('.item-cart__remove')) {
			localStorage.removeItem(e.target.closest('.item-cart').getAttribute('data-product-key'))
			cartClear()
			cartRender();
			checkCartStatus()
			countIconValue();
			countTotal()
			totalUpdate()
			orderItemsRender()
			console.log(localStorage);
		}
		if (e.target.hasAttribute('data-action') && (e.target.closest('.order__items') || e.target.closest('.cart__wrapper'))) {
			const product = e.target.closest('[data-product]');
			//Записываем данные товара в объект productInfo
			const productInfo = {
				product: product.dataset.product,
				imgSrc: product.querySelector('.item-cart__img').getAttribute('src'), 
				title: product.querySelector('.item-cart__name').innerText,
				size: product.querySelector('.size-cart').innerText,
				price: product.querySelector('[data-currency]').innerText,
				counter: product.querySelector('[data-counter]').value,
			}
			console.log(productInfo);
			console.log(localStorage);
			// Генерируем ID-ключ продукта
			const productKey = `${productInfo.product}${productInfo.size}`;
			if (e.target.classList.contains('quantity__button_plus')) {
				modifyStorageInCart(productKey, productInfo, 'plus')
				console.log(localStorage);
			} else {
				modifyStorageInCart(productKey, productInfo, 'minus')
				console.log(localStorage);
			}
			cartClear()
			cartRender();
			checkCartStatus()
			countIconValue();
			countTotal()
			totalUpdate()
			orderItemsRender()
			console.log(localStorage);
		}
	});
	console.log(localStorage);
}

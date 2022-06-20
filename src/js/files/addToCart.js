// Импорт функционала ==============================================================================================================================================================================================================================================================================================================================
import { bodyLock, bodyLockStatus, bodyLockToggle, bodyUnlock, isMobile } from "./functions.js";
import { formsModules } from "./forms/forms.js";
// Открытие корзины
export function cartInit() {
	window.addEventListener('click', function(e) {
		if(e.target.closest('.header__cart')) {
			if(bodyLockStatus) {
				bodyLockToggle()
				document.documentElement.classList.toggle('cart-open');
			}
		} else {
			//Закрытие на пустом месте
			if (!e.target.closest(".cart")) {
				//document.documentElement.classList.remove("cart-open");
				//bodyUnlock()
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
// Обёртка внутри корзины
const cartWrapper = document.querySelector('.cart__wrapper')
// Корзина пустая/полная
let emptyLabel = document.querySelector('[data-cart-empty]').innerText;
console.log(emptyLabel);
// Отслеживаем клик на странице
window.addEventListener('click', function(e) {
	// Проверяем что клик был совершен на кнопке "Добавить в корзину"
	if(e.target.hasAttribute('data-add-to-cart')) {
		// Находим карточку с товаром, внутри которой был совершён клик
		const product = e.target.closest('[data-product]');
		// Записываем данные товара в объект productInfo
		const productInfo = {
			product: product.dataset.product,
			imgSrc: product.querySelector('.product-img').getAttribute('src'), 
			title: product.querySelector('.product__name').innerText,
			size: product.querySelector('input:checked').id,
			price: product.querySelector('[data-currency]').innerText,
			counter: product.querySelector('[data-counter]').value,
		}
		const productKey = `${productInfo.product}${productInfo.size}`;
		console.log(productInfo);
		console.log(productKey);
		//Проверяем если товар уже есть в корзине
		let productKeyInCart = cartWrapper.querySelector(`[data-product-key="${productKey}"]`);
		//Если уже есть
		if (productKeyInCart) {
			emptyLabel = ' ';
			let counterElement = productKeyInCart.querySelector('[data-counter]');
			counterElement.value = parseInt(counterElement.value) + parseInt(productInfo.counter);
		} else {
			//Шаблон отображения товара в корзине
		const cartItemHTML = `	
		<div data-product="${productInfo.product}" data-product-key="${productKey}" class="item-cart">
			<div class="item-cart__close">╳</div>
			<img class="item-cart__img" src=${productInfo.imgSrc} alt="">
			<div class="item-cart__info">
				<h3 class="item-cart__name ">${productInfo.title}</h3>
				<div data-currency class="item-cart__price">${productInfo.price}</div>
				<h5 data-size="${productInfo.size}" class="item-cart__size">Розмір:&nbsp;${productInfo.size} </h5>
				<div class="item-cart__quantity quantity">
					<h4 class="quantity__title">Кількість:</h4>
					<div class="quantity__counter">
						<button class="quantity__button quantity__button_minus">-</button>
						<input data-counter type="phone" value="${productInfo.counter}" class="quantity__value">
						<button class="quantity__button quantity__button_plus">+</button>
					</div>
				</div>
			</div>
		</div>`
		const cartTotalHTML = `
			<div class="cart__total total-cart">
				<h5 class="total-cart__total title title_left ">Разом:&nbsp; <span class="total-cart__price">1900<span class="uah">&nbsp;₴</span></span></h5>
				<a href="" class="total-cart__order button button_black _icon-arrow-link">Оформити замовлення</a>
			</div>
		`
		//Отображение товара в корзине
		cartWrapper.insertAdjacentHTML("afterbegin", cartItemHTML);
		cartWrapper.insertAdjacentHTML("afterend", cartTotalHTML);
		//emptyLabel.innerText = 'Ваш кошик порожній';
		console.log(cartItemHTML);
		}
		//Сбрасывание счётчика после добавления
		product.querySelector('[data-counter]').value = '1';
	}
})

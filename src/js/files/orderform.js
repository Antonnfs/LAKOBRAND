const cartWrapper = document.querySelector('.cart__wrapper');
const totalForm = document.querySelector('[data-order-total]'); 
const orderItems = document.querySelector('[data-order-items]');
const orderContainer = document.querySelector('.order__container');
const totalInput = document.getElementById('total-input')


if (totalForm) {
	document.addEventListener('loaded', totalUpdate())
}
if (orderItems) {
	document.addEventListener('loaded', orderItemsRender())
}

export function totalUpdate() {
	if (totalForm) {
		totalForm.innerHTML = `Речей у кошику: <strong>${localStorage.totalQuantity}</strong>, </br>
		на сумму: <strong>${localStorage.totalPrice} ₴</strong>`;
		totalInput.value = `Речей у кошику: ${localStorage.totalQuantity}, на сумму: ${localStorage.totalPrice} ₴`;
	}

}
export function orderItemsRender() {
	if (orderItems) {
		orderItems.innerHTML = '';
		//textareaForOrder.innerText = '';
		if (localStorage.getItem('totalQuantity') === '0') {
			orderContainer.innerHTML = `<div class="order__empty"><h2 class="title">Ваш кошик порожній</h2><a href="catalog.html" class="order__button_back button button_black _icon-arrow-link">Повернутись до каталогу</a></div>` 
		}
		for (let i = 0; i < localStorage.length; i++) {
			let key = localStorage.key(i);
			if (key !== 'totalPrice' && key !== 'totalQuantity') {
				let productInfo = JSON.parse(localStorage.getItem(key)) 
				console.log(key);
				const orderItemHTML = `	
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
				orderItems.insertAdjacentHTML("afterbegin", orderItemHTML);
				const orderItemInput = `
					<input hidden name="product ${i}" value='${productInfo.title}; розмір: "${productInfo.size}"; 
					кількість - ${productInfo.counter}шт; ціна - ${productInfo.price}/шт.'>
				`
				orderItems.insertAdjacentHTML("afterbegin", orderItemInput)
			}
		}
	}
}
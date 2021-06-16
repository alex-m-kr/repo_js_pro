// 1. Переделайте makeGETRequest() так, чтобы она использовала промисы. (Сделано на уроке)
// 2. Добавьте в соответствующие классы методы добавления товара в корзину, 
// удаления товара из корзины и получения списка товаров корзины. 
// Основное задание - вывести товары корзины.
// 3* Переделайте GoodsList так, чтобы fetchGoods() возвращал промис, а render() 
// вызывался в обработчике этого промиса. (Сделано на уроке)

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductsList {
    constructor(container = '.products'){
        this.allProducts = []
        this.container = container;
        this.goods = [];//массив товаров из JSON документа
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = [...data];
                this.render()
            });
    }
    
    _getProducts(){
      
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    calcSum(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }

    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }
}


class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150'){
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }

    render(){
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}


class BasketList {
    constructor(container = '#popup-basket'){
        this.container = container;
        this.goods = []; //массив товаров корзины из JSON документа
        this._getProducts()
            .then(data => { //data - объект js
                console.log(data, 'data в console.log')

                this.goods = [...data.contents];//распаковываем не все данные, а только список товаров, ключ 'contents'
                // this.render()
            });
    }
    
    _getProducts(){
      
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    calcSum(){
        return this.goods.reduce((accum, item) => accum += item.price, 0);
    }

    render(){
        const $popupBasket = document.querySelector(this.container);
        $popupBasket.textContent = '';

        this.goods.forEach(function (item) {                
            const html = `<div><h3>${item.product_name}</h3> \
            <p>артикул: ${item.id_product}, цена: \
            ${item.price}, количество ${item.quantity}, стоимость \
            ${item.price * item.quantity}<hr></div>`;
            $popupBasket.insertAdjacentHTML('beforeend', html);        
        });
        $popupBasket.insertAdjacentHTML('beforeend', `Общая сумма ${this.calcSum()}<hr>`);
    }    
}



let list = new ProductsList();
console.log(list.allProducts);

let basket1 = new BasketList()


const $popup = document.querySelector('#popup');
const $popupBtn = document.querySelector('#popup-btn');
const $btnCart = document.querySelector('.btn-cart')

$popupBtn.insertAdjacentHTML('beforeend', '<button id="hide-basket">Скрыть товары корзины</button>');

$btnCart.addEventListener('click', function(e) {
    basket1.render();
    $popup.style.display = 'block';
});

$popupBtn.addEventListener('click', function(e) {
    $popup.style.display = 'none';
});

document.addEventListener('keydown', function(e) {
    if(e.key === 'Escape') {                
        $popup.style.display = 'none';
    }
});

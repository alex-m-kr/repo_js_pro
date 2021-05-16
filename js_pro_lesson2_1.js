// 1. Добавьте пустые классы для Корзины товаров и Элемента корзины товаров. 
// Продумайте, какие методы понадобятся для работы с этими сущностями.

// 2. Добавьте для GoodsList метод, определяющий суммарную стоимость всех товаров.

// 3. * Некая сеть фастфуда предлагает несколько видов гамбургеров:
// в отдельном файле

class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
        ];
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }

    getTotalSum() {
        return this.goods.reduce(function (acc, product) {
            return  acc + product.price;
        }, 0);
    }

    showTotalSum() {
        document.querySelector('#show-total').textContent = `Общая стоимость \
        товаров: ${this.getTotalSum()}`;
    }
}

class Cart extends GoodsList {
    constructor() {
        super();
        this.discount = 10; // пусть будет скидка 10 процентов
    }

    getCartSum() {
        return this.getTotalSum() * (100 - this.discount) / 100;
    }

    showCartSum() {
        console.log(`Если купили весь магазин, стоимость товаров со скидкой будет: ${this.getCartSum()}`)
    }

}

class CartItem extends GoodsItem {
    // свой конструктор у этого класса не стал определять

    // что-то с методами тут не особо придумывается, пусть будет так:
    showCartItem() {
        console.log(`Название товара: ${this.title}, цена товара: ${this.price}`)
    }
}


const list = new GoodsList();
list.fetchGoods();
list.render();
list.showTotalSum();


let cart = new Cart();
// console.log(cart.goods);
cart.fetchGoods();
// console.log(cart.goods);
// console.log(cart.discount);
cart.showCartSum();

let cartItem = new CartItem('Ботинки', 300);
cartItem.showCartItem();

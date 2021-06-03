 // Из методички:
// 1. Добавьте стили для верхнего меню, товара, списка товаров и кнопки вызова корзины.
// в файле css

// 2. Добавьте значения по умолчанию для аргументов функции. Как можно упростить или сократить запись функций?
// см. комментарии ниже

// 3. *Сейчас после каждого товара на странице выводится запятая. Из-за чего это происходит? Как это исправить?
/* map выдает нам новый массив goodList, соотвественно значения в нем разделены запятыми. 
Исправить можно с помощью join. 
Это создаст строку из элементов массива, для вставки между элементами выберем '' (пустоту).
*/

const goods = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 20},
    {id: 3, title: 'Keyboard', price: 200},
    {id: 4, title: 'Gamepad', price: 50},
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
    
];

//Функция для формирования верстки каждого товара
//Добавить в выводе изображение

// Будет проще использовать в качестве аргумента объект, а не отдельные свойства
// задание №2 методички
const renderGoodsItem = obj => {
    return `<div class="goods-item">
        <h3>${obj.title}</h3>
        <p>${obj.price}</p>
        <img src="https://image.freepik.com/free-photo/3d-clouds-and-hot-air-balloons_23-2148964570.jpg" alt="pic"><br>
        <button class="buy-btn">Купить</button>
        </div>`;
};

// здесь добавлены значения по умолчанию, задание №2 методички
// например при вызове renderGoodsList(), т.е. без аргумента, будет использовани значение по умолчанию 
const renderGoodsList = (list=[{title: 'Название не придумано', price:'цена не установлена'}]) => {
    let goodsList = list.map(item => renderGoodsItem(item));
    console.log(goodsList);  // проверка работы кода
    document.querySelector('.goods-list').innerHTML = goodsList.join('');  //убираем запятые, задание №3
}

renderGoodsList(goods);

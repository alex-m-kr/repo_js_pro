/* Некая сеть фастфуда предлагает несколько видов гамбургеров:
Маленький (50 рублей, 20 калорий).
Большой (100 рублей, 40 калорий).
Гамбургер может быть с одним из нескольких видов начинок (обязательно):
С сыром (+10 рублей, +20 калорий).
С салатом (+20 рублей, +5 калорий).
С картофелем (+15 рублей, +10 калорий).
Дополнительно гамбургер можно посыпать приправой (+15 рублей, +0 калорий) и полить майонезом (+20 рублей, +5 калорий). 
Напишите программу, рассчитывающую стоимость и калорийность гамбургера. Можно использовать примерную архитектуру класса со следующей страницы, но можно использовать и свою.
*/

// попробовал добавить визуальную часть с обработкой событий,
// немного путанно получилось, возможно надо было посмотреть в сторону вложенных 
// в объект массивов с вложенными объектами (начинками, топпингами),
// но код вроде работает 


class Hamburger {
    constructor(size, stuffing) {
        this.size = size;
        this.stuffing = stuffing;
        this.stuffingDescription = null;        
        this.spice = false;
        this.mayonnaise = false;
        this.price = 0;
        this.caloricity = 0;
        this.choiceSizeDone = false;
        this.done = false;        
    }

    checkChoiceSizeDone() {
        if (this.size !== undefined) {
            this.choiceSizeDone = true;            
        }
        console.log('choiceSizeDone', this.choiceSizeDone);
    }

    checkDone() {
        if (this.size !== undefined && this.stuffing !== undefined) {
            this.done = true;            
        }
        console.log('done', this.done);
    }

    setBasePrice() {
        if (this.size === 'small') {
            this.price = 50;
            this.caloricity = 20
        } else if (this.size == 'big') {
            this.price = 100;
            this.caloricity = 40
        }
    }

    getBasePrice() {
        console.log(this);
        return `Базовый бургер, размер: "${this.size}", цена: ${this.price} руб.,\
        калорийность: ${this.caloricity} калорий`;
    }

    setStuffing() {
        if (this.stuffing === 'cheese') {
            this.price += 10;
            this.caloricity += 20;
            this.stuffingDescription = 'С сыром (+10 рублей, +20 калорий)';
        } else if (this.stuffing === 'salad') {
            this.price += 20;
            this.caloricity += 5;
            this.stuffingDescription = 'С салатом (+20 рублей, +5 калорий)';
        } else if (this.stuffing === 'potato') {
            this.price += 15;
            this.caloricity += 10;
            this.stuffingDescription = 'С картофелем (+15 рублей, +10 калорий)';
        } 
    }

    getStuffing() {          // Узнать начинку гамбургера 
        return `Начинка: ${this.stuffingDescription}`
    }    

    calculatePrice() {       // Узнать цену 
        return `Итоговая цена: ${this.price} руб.`

    }
    calculateCalories() {    // Узнать калорийность 
        return `Калорийность ${this.caloricity} калорий`
    }

    addOrRemoveTopping(topping) {    // Добавить/убрать добавку 
        console.log('топпинг в начале метода', this[topping]);
        if (topping === 'spice') {
            if (!this[topping]) {
                this.price += 15;
            } else {
                this.price -= 15;
            }            
        } else if (topping === 'mayonnaise') {
            if (!this[topping]) {
                this.price += 20;
                this.caloricity += 5;
            } else {
                this.price -= 20;
                this.caloricity -= 5;
            }            
        }
        this[topping] = !this[topping];
        console.log('состояние топпинга в конце', topping, this[topping]);
    }   

    getToppings() {   // Получить список добавок 
        let strTopping = '';
        this.spiceDescription = 'топпинг: добавить приправу (+15 рублей, +0 калорий) ';
        this.mayonnaiseDescription = 'топпинг: полить майонезом (+ 20 рублей, + 5 калорий) ';
        if (this.spice) {
            strTopping += this.spiceDescription;
        }
        if (this.mayonnaise) {
            strTopping += this.mayonnaiseDescription;
        }
        return strTopping;
    }    
}


const $choiceSize = document.querySelector('#size');
const $popup1 = document.querySelector('#popup1');

const $choiceStuff = document.querySelector('#stuff');
const $popup2 = document.querySelector('#popup2');

const $choiceTopping = document.querySelector('#topping');
const $popup3 = document.querySelector('#popup3');

const $result = document.querySelector('#result');
const $popup4 = document.querySelector('#popup4');


function handlerSize(e) {
    console.log(e.target.textContent, e.target.id);
    if (e.target.id === 'big' || e.target.id === 'small') {
    
        e.target.classList.toggle('selected');
        $choiceSize.removeEventListener('click', handlerSize);

        burger.size = e.target.id;
        burger.setBasePrice();
        $popup1.textContent = burger.getBasePrice();
    }    
}
$choiceSize.addEventListener('click', handlerSize);

function handlerStuff(e) {
    burger.checkChoiceSizeDone();
    if (burger.choiceSizeDone) {
        console.log(e.target.textContent, e.target.id);
        if (e.target.id === 'cheese' || e.target.id === 'salad' || e.target.id === 'potato') {
        
            e.target.classList.toggle('selected');
            $choiceStuff.removeEventListener('click', handlerStuff);

            burger.stuffing = e.target.id;
            burger.setStuffing();        
            $popup2.textContent = burger.getStuffing();            
        }     
    } else {
        alert('Сначала выберите размер бургера');
    }
}
$choiceStuff.addEventListener('click', handlerStuff);

function handlerTopping(e) {
    burger.checkDone()
    if (burger.done) {
        // console.log(e.target.textContent, e.target.id);
        if (e.target.id === 'spice' || e.target.id === 'mayonnaise') {
        
            e.target.classList.toggle('selected');            

            topping = e.target.id;
            burger.addOrRemoveTopping(topping);
            burger.calculatePrice();
            burger.calculateCalories();

            $popup3.textContent = burger.getToppings();            
        }     
    } else {
        alert('Сначала выберите размер бургера и начинку');
    }
}
$choiceTopping.addEventListener('click', handlerTopping);

function handlerResult(e) {
    burger.checkDone();
    if (burger.done) {
        $popup4.textContent = burger.calculatePrice() + ' ' + burger.calculateCalories();
    } else {
        alert('Сначала выберите размер бургера и начинку');
    }
}
$result.addEventListener('click', handlerResult);


let burger = new Hamburger();

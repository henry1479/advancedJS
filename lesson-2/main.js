// класс с карточкой товара в html

class GoodsItem {
    
    constructor(title,price){
        this.title = title;
        this.price = price;
    }

    render() {
        return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p> <button type="button" class="add-btn">Add to Cart</button></div>`;
    }
}
// класс с со списком товаров
class GoodsList {
    constructor() {
        this.goods = [];
    }
    // метод, который имитирует сервер, наполняя каталог товаров
    fetchGoods() {
        this.goods = [
            {title: 'T-shirt', price: 150},
            {title: 'Pants', price: 100},
            {title: 'Skirt', price: 250},
            {title: 'Soks', price: 50},
            {title: 'Tights', price: 1500},
        ]
    }
    // метод наполняте карточку содержимым и внедряет ее в html
    render() {
        let listAcc = '';
        this.goods.forEach(good => {const goodItem = new GoodsItem(good.title, good.price) // новый объект
            listAcc += goodItem.render();// добавляем в пустую строку карточку наполненную содержимым
        })
        document.querySelector('.goods-list').innerHTML = listAcc;// внедряем в html
    }

    countAllGoods(){
        let sum = 0;
        for(let good of this.goods){
            sum += good.price
        }

        console.log(sum);
    }
}

class CartItem extends GoodsItem {


    
    // отрисовывает на странице корзины выбранные карточки  без кнопки
    render() {

    }
    
}

class Cart extends GoodsList {
   
    // добавляет товары в виртуальную корзину по клику на кнопе в карточке

    addToCart() {
       
        
    }
    


    // удаляет товары из корзины по клику на кнопку на странице корзины "удалить"
    removeFromCart() {

    }

    // считает стоимость товаров в корзине

    countCart() {

    }

    // отрисовывает блок на странице с корзиной с информацией о количестве товаров и их общей стоимости
    renderCart() {

    }

   
}

// класс гамбургер

class Hamburger {
    constructor(size, stuffing) {
        this.size = size; // размер
        this.stuffing = stuffing; // начинка
        this.toppings = [];    // список топпингов   
        this.parameters = this.constructor.setParamOfSize(this.size);// список цены и калорийности после определения размера
        this.arrPriceCalory = this.constructor.addStuffing(this.stuffing,this.parameters);//список цены и калорийности после определения начинки
        this.price = this.arrPriceCalory[0]; // цена
        this.calory = this.arrPriceCalory[1];// калорийность
    }

    /*
    * принимает размер гамбургера и возвращает массив с его ценой
    * и калорийностью
     */

    static setParamOfSize(size) {
        const price = (size === 'big')? 100 : 50; // тернарный оператор для определения цены в зависимости от размера
        const calory = (size === 'big')? 40 : 20; // нужно конечно условно проверять, но это только схема
        const param = [price,calory];
        return param
    }
    /*
    * принимает начинку гамбургера, массив с его ценой
    * и калорийностью 
    * возвращает переработанный массив с ценой и калорийностью
     */

    static addStuffing (stuffing,param) {
        if(stuffing === 'cheese') {
            param[0] += 10;
            param[1] += 20;
        } else if (stuffing === 'salad') {
            param[0] += 20;
            param[1] += 5;
        } else if (stuffing === 'potato') {
            param[0] += 15;
            param[1] += 10;
        }

        return param
    }
    // принимает название топинга и увеличивает цену с калорийностью, добавляя в массив с топпингами соответсвующее значение
    addTopping(topping) {
        if (topping === 'mineosis') {
            this.price += 10;
            this.calory += 20;
            this.toppings.push(topping);
        } 
        if (topping === 'seasoning') {
            this.price += 20;
            this.calory += 5;
            this.toppings.push(topping);
        }  
    }
      // принимает название топинга и уменьшает цену с калорийностью, удаляя из массива с топпингами соответсвующее значение

    removeTopping(topping) { 
        if (topping === 'mineosis') {
            this.price -= 10;
            this.calory -= 20;
            this.toppings.pop(topping);
        } 
        if (topping === 'seasoning') {
            this.price -= 20;
            this.calory -= 5;
            this.toppings.pop(topping);
        }
    }

    // выводит список с топингами строкой
    getToppings() {
        console.log(this.toppings.join(', '));
    }
    // выводит размер гамбургера
    getSize() {
        console.log(this.size);
    }
    // выводит начинку гамбургера
    getStuffing() {
        console.log(this.stuffing);
    }
    // выводит цену гамбургера
    calculatePrice() {
        console.log(this.price);
    }
    
    //выводит калорийность гамбургера
    calculateCalories() { 
        console.log(this.calory)
    }
}
   

 

const init = () => {
    const goodsList = new GoodsList(); //  новый объект с товарами
    goodsList.fetchGoods(); // наполняем товарами
    goodsList.render(); // отрисовываем карточки
    goodsList.countAllGoods(); // общая сумма товаров


    const hum = new Hamburger('big','potato'); // экземпляр гамбургера большой с картошкой
    hum.addTopping('seasoning'); // и еще приправа
    hum.addTopping('mineosis'); // и еще мйонез
    // все остальное в консоле
    hum.getToppings();
    hum.getSize();
    hum.getStuffing();
    hum.calculatePrice();
    hum.calculateCalories();
    
}

window.onload = init;


 
 
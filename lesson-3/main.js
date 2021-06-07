// константа с адресщм сервера

const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";



// класс с карточкой товара в html

class GoodsItem {

    constructor(id, title, price) {
        this.id = id;
        this.title = title;
        this.price = price;
    }

    render() {
        return `<div class="goods-item" itemId="${this.id}"><h3>${this.title}</h3><p>${this.price}</p> <button type="button" class="add-btn">Add to Cart</button></div>`;
    }
}
// класс с со списком товаров
class GoodsList {
    constructor() {
        this.goods = [];
    }
    //направляет запрос к серверу, получает ответ и наполняет массив товарами
    async fetchGoods() {
        const responce = await fetch(`${API_URL}/catalogData.json`);
        if (responce.ok) {// проверка на наличие ответа на запрос
            const catalogItems = await responce.json(); // async это вместо then
            this.goods = catalogItems;
            // console.log(this.goods);
        } else {
            alert(`Ошибка при соединении сервером`);
        }


    }

    // fetchGoods() {
    //     this.goods = [
    //         { product_name: 'Ноутбук', id_product: 123, price: 46500 },
    //         { product_name: 'Мышка', id_product: 456, price: 1000 },
    //     ]
    // }
    // метод наполняте карточку содержимым и внедряет ее в html
    render() {
        let listAcc = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.id_product, good.product_name, good.price) // новый объект
            listAcc += goodItem.render();// добавляем в пустую строку карточку наполненную содержимым
        })
        document.querySelector('.goods-list').innerHTML = listAcc;// внедряем в html
      
    }

    countAllGoods() {
        let sum = 0;
        for (let good of this.goods) {
            sum += good.price
        }

        console.log(sum);
    }
}





class CartItem extends GoodsItem {
    // подтягивем свойства родительского класса
    constructor(id, title, price,data) {
        super(id, title, price);
        this.data = data; // это нужно для связи удаляемой карточки с массивом корзины, чтобы понять какой элемент из массива удалять
    }

    render() {
        return `<div class="cart__goods-item" data-number="${this.data}" itemId="${this.id}"><h3>${this.title}</h3><p>${this.price}</p> <button type="button" class="remove-btn">Remove from cart</button></div>`;

    }

}


class Cart {
    constructor() {
        this.cartGoods = [];
        this.removeButtons = [];
    }

    // добавляет товары в виртуальную корзину по клику на кнопе в карточке

    async addToCart(event) {
        const goodsList = new GoodsList()//экземпляр класса GoodList
        await goodsList.fetchGoods(); // наполняем товарами
        const idProduct = Number(event.target.parentElement.getAttribute('itemId')); // itemId карточки
        // проходимся циклом по массиву с товарами
        for (let item of goodsList.goods) {
            if (idProduct === item.id_product) { // если id кликнутой карточки и товара в массиве совпадают
                this.cartGoods.push(item); // добавляем товар в корзину
            }
        }
        this.renderCart(); // отрисовываем корзину
        this.removeButtons = document.querySelectorAll('.remove-btn'); // получаем кнопки на карточках корзины
        this.removeFromCart(this.removeButtons); // вызываем метод по удалению этих карточек при клике на кнопку
        // иначе никак не получается сделать 
        this.countCart(this.cartGoods); // вызывам метод подсчета количества товаров в корзине их стоимсоть 
    }

   

    // удаляет товары из корзины по клику на кнопку на карточке корзины "Add from cart"
    // принимает список кнопок
    removeFromCart(buttons) {
        // функция обработчик
        function remove (event) { 
            //получаем кликнутую кнопку
            const elem = event.target.parentElement;
            //получаем атрибут data-number карточки кликyутой кнопки
            const product = Number(elem.dataset.number); 
            // удаляем кликнутую карточку из html 
            elem.parentNode.removeChild(elem);
            //удаляем элемент из массива корзины
            delete this.cartGoods[product];
            // уменьшаем длину массива на один
            this.cartGoods.length -=1;
            this.countCart(this.cartGoods); // вызывам метод подсчета количества товаров в корзине их стоимость 
        }

        buttons.forEach(el => el.addEventListener('click', remove.bind(this)))
    }

    // считает стоимость товаров в корзине и выводит их с вместе с количеством

    countCart(cart) {
        //получаеи информационный блок корзины
        const cartInfo = document.querySelector('.cart .cart-info');
        // сумма
        let sum = 0;
        // проходимся циклом по корзине с товарами
        for (let good of cart) {
            sum += good.price // увеличиваем сумму на стоимость товара
        }
        // внедреям html параграф длиной корзины и общей стоимостью товаров
        cartInfo.innerHTML = `<p>В корзине сейчас ноходится товаров: ${cart.length} на общую стоимость: ${sum}</p>`
        
    }

   

    // отрисовывает корзину вместе с карточками
    renderCart() {
        let listHTML = '';
        this.cartGoods.forEach((good,i=0) => {
            let data = i++; // набор чисел для  aтрибута data-number
            const item = new CartItem(good.id_product, good.product_name, good.price, data)// новый объект корзины
            listHTML += item.render();// добавляем в пустую строку карточку наполненную содержимым
        })
        document.querySelector('.cart .cart__goods-list').innerHTML = listHTML;// внедряем в html

    }


}







const init = async() => {
    const goodsList = new GoodsList(); //  новый объект с товарами
    await goodsList.fetchGoods(); // наполняем товарами
    goodsList.render();// отрисовываем карточки
    let el = document.getElementsByClassName('goods-item');
    const cart = new Cart(); // новая корзина
    const addBtn = document.querySelectorAll('.add-btn');
    // вешаем обработчик на кнопки в карточке и привязываем к this объекта
    addBtn.forEach((el) => { el.addEventListener('click', cart.addToCart.bind(cart)) });
    const cartInfo = document.querySelector('.cart .cart-info');

}

window.onload = init;




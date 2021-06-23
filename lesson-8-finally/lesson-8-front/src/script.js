import searchBlock from './search.block'
import goodsList from './goods.list'
import cart from './cart'


export default {
    components: {
        searchBlock,
        goodsList,
        cart,
    },

}


const API_URL =
    "http://localhost:3000";

const app = new Vue({
    el: "#app",
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: '',
        // массив с товарами в корзине
        cartGoods: [],
        // свойство управляющие видимостью корзины
        isVisibleCart: true,
        // свойство для вывода сообщения
        // если массив  с товарами пуст
        emptyMessage: 'Список товаров пуст!',
        // параметр для корзины с товарами
        cartGoods: [],
        count: 0
    },

    methods: {

        //получает товары с сервера
        async getProducts() {
            const responce = await fetch(`${API_URL}/catalogData`);
            // в случае нормального ответа 
            // преобразует ответ в объекты
            // и возвращает true
            if (responce.ok) {
                const catalogItems = await responce.json();
                this.goods = catalogItems;
                this.filteredGoods = catalogItems;
                return true
                // иначе сообщение об ошибке и false
            } else {
                alert("Ошибка при соединении с сервером");
                return false
            }
        },

        async sendProducts() {
            const responce = await fetch(`${API_URL}/cartData`);
            // в случае нормального ответа 
            // преобразует ответ в объекты
            // и возвращает true
            if (responce.ok) {
                const catalogItems = await responce.json();
                this.cartGoods = catalogItems;
                return true
                // иначе сообщение об ошибке и false
            } else {
                alert("Ошибка при соединении с сервером");
                return false
            }
        },

        // осуществляет поиск товаров в массиве с ними
        // по запросу в строке поиска
        filterGoods() {
            // регулярное выражение на основе свойства,  
            //получаемое из строки поиска
            const regExp = new RegExp(this.searchLine, 'i');
            // фильтруем список товаров
            this.filteredGoods = this.goods.filter(good => regExp.test(good.product_name));
        },

        addToCart(event) {
            const idProduct = Number(event.target.parentElement.getAttribute('itemId')); // itemId карточки
            // проходимся циклом по массиву с товарами
            for (let item of this.filteredGoods) {
                if (idProduct === item.id_product) { // если id кликнутой карточки и товара в массиве совпадают
                    this.cartGoods.push(item); // добавляем товар в корзину
                }
            }
        },


        removeFromCart(event) {
            // функция обработчик
            //получаем список всех элементов в корзине
            elems = document.querySelectorAll('.cart__goods-item');
            // получаем кликнутую карточку
            const elem = event.target.parentElement;
            // усли кликнутая карточка есть 
            // в списке элементов
            //то удаляем ее из списка корзины 
            elems.forEach((e, i = 0) => {
                if (e === elem) {
                    this.cartGoods.splice(i, 1);
                    console.log(this.cartGoods);
                    i++
                }
            });

        }

    },

    async mounted() {
        await this.getProducts();
        await this.sendProducts();
    }
});

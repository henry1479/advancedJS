const API_URL =
    "http://localhost:3000";

//компонет поля поиска товаров
Vue.component('search-input', {
    //входной параметр для правильной работы v-model
    props: ['value'],
    template: `
        <input type="text" class="goods-search"  v-bind:value="value"
        v-on:input = "$emit('input', $event.target.value)"/>`
})

// компонент для кнопки поиска
Vue.component('search-button', {
    //входной параметр для метода filterGoods()
    //которая является обработчиком на событие клика
    props: ['filtergoods'],
    template: `<button class="search-button" v-on:click="filtergoods" type="button">Искать</button>`
})

// компонент для блока с товарами
Vue.component('goods-list', {
 
    props: ['goods', 'addtocart', 'responce'],
    template: `<div class="goods-list">
    <error-message v-if="responce === false"></error-message>
        <goods-item v-for="goodEntity in goods" :goodProp="goodEntity"  :id="goodEntity.id_product"></goods-item>
    </div>`
})

// компонент для вывода ошибки соединения с сервером

Vue.component('error-message',{
    template:`<p>Ошибка соединения с сервером</p>`
})


//компонент для карточки с товарами
Vue.component('goods-item', {
    props: ["goodProp","id"],
    //send request POST
    //with body in view an object item
    methods: {
        async addToCart() {
        const response = await fetch(`${API_URL}/addToCart`, {
            method: 'POST', 
            mode: 'cors',
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(this.goodProp),
        });
        },
    },

    template: `<div class="goods-item" v-bind:itemId='id' @click=addToCart>
    <h3>{{goodProp.product_name}}</h3>
    <p>{{goodProp.price}}</p>
    <button type="button"  class="add-btn">Добавить в корзину</button>
    </div>`

})

// компонент для блока корзины
Vue.component('cart__goods-list', {
    
    props: ['cartgoods','removefromcart'],
   
    template: `<div class="cart__goods-list">
        <empty-message v-if="cartgoods.length === 0"></empty-message>
        <cart__goods-item v-for="goodEntity in cartgoods"   :goodProp="goodEntity" :id="goodEntity.id_product"></cart__goods-item>
    </div>`
})


//компонент для карточки с товарами в корзине
Vue.component('cart__goods-item', {
  
    props: ['goodProp', 'id'],
    methods: {
      async removeFromCart() {
      const response = await fetch(`${API_URL}/removeFromCart`, {
          method: 'POST', 
          mode: 'cors',
          headers: {
          'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(this.goodProp),
      });
      },
  },
    template: `<div class="cart__goods-item" :itemId='id'>
    <h3>{{goodProp.product_name}}</h3>
    <p>{{goodProp.price}}</p>
    <button type="button" class="remove-btn" @click=removeFromCart>Удалить из корзины</button>
    </div>`

})

Vue.component('empty-message',{
    template:`<p>Корзина пуста!</p>`
})







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
        elems.forEach((e,i=0)=> {if(e === elem) {
            this.cartGoods.splice(i,1);
            console.log(this.cartGoods);
            i++
            }
        });
                
        }

    },

    async mounted () {
        await this.getProducts();
        await this.sendProducts();
    }    
});

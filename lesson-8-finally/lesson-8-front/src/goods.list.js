
const API_URL =
    "http://localhost:3000";
// компонент для блока с товарами
Vue.component('goods-list', {

    props: ['goods', 'addtocart', 'responce'],
    template: `<div class="goods-list">
    <error-message v-if="responce === false"></error-message>
        <goods-item v-for="goodEntity in goods" :goodProp="goodEntity"  :id="goodEntity.id_product"></goods-item>
    </div>`
})

// компонент для вывода ошибки соединения с сервером

Vue.component('error-message', {
    template: `<p>Ошибка соединения с сервером</p>`
})


//компонент для карточки с товарами
Vue.component('goods-item', {
    props: ["goodProp", "id"],
    methods: {
        async addToCart() {
            const response = await fetch(`${API_URL}/addToCart`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(this.goodProp)
            });
        },
    },

    template: `<div class="goods-item" v-bind:itemId='id' @click=addToCart>
    <h3>{{goodProp.product_name}}</h3>
    <p>{{goodProp.price}}</p>
    <button type="button"  class="add-btn">Добавить в корзину</button>
    </div>`

})

const API_URL =
"http://localhost:3000";
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


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
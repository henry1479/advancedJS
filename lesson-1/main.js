const goodsList = document.querySelector('.goods-list');
// массив с товарами 
const goods = [
    {title: 'T-shirt', price: 150},
    {title: 'Pants', price: 100},
    {title: 'Skirt', price: 250},
    {title: 'Soks', price: 50},
    {title: 'Tights', price: 1500},
]
// возвращает строку html  с карточкой товара
const renderGoodsItem = (title, price)=> {
    return `<div class="goods-item"> <h3>${title}</h3><p>${price}</p></div>`;
}


/* применяет к товарам из массива функцию renderGoodsItem
* вводит полученный результат в html
* c аргументом по умолчанию container
* 
*/
const renderGoodsList = (list, container = goodsList) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    // в goods-list внедряется массив, поэтому и есть запятые,
    // методом join() массив преобразуется в строку
    // с разделителем '' , и запятые удаляются 
    container.innerHTML = goodsList.join('');
}


const init = () => {
    renderGoodsList(goods);
}

window.onload = init;


 
 
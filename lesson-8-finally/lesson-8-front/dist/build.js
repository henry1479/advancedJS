/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/cart.js":
/*!*********************!*\
  !*** ./src/cart.js ***!
  \*********************/
/***/ (() => {

eval("\r\nconst API_URL =\r\n\"http://localhost:3000\";\r\n// компонент для блока корзины\r\nVue.component('cart__goods-list', {\r\n    \r\n    props: ['cartgoods','removefromcart'],\r\n   \r\n    template: `<div class=\"cart__goods-list\">\r\n        <empty-message v-if=\"cartgoods.length === 0\"></empty-message>\r\n        <cart__goods-item v-for=\"goodEntity in cartgoods\"   :goodProp=\"goodEntity\" :id=\"goodEntity.id_product\"></cart__goods-item>\r\n    </div>`\r\n})\r\n\r\n\r\n//компонент для карточки с товарами в корзине\r\nVue.component('cart__goods-item', {\r\n  \r\n    props: ['goodProp', 'id'],\r\n    methods: {\r\n      async removeFromCart() {\r\n      const response = await fetch(`${API_URL}/removeFromCart`, {\r\n          method: 'POST', \r\n          mode: 'cors',\r\n          headers: {\r\n          'Content-Type': 'application/json;charset=utf-8'\r\n          },\r\n          body: JSON.stringify(this.goodProp),\r\n      });\r\n      },\r\n  },\r\n    template: `<div class=\"cart__goods-item\" :itemId='id'>\r\n    <h3>{{goodProp.product_name}}</h3>\r\n    <p>{{goodProp.price}}</p>\r\n    <button type=\"button\" class=\"remove-btn\" @click=removeFromCart>Удалить из корзины</button>\r\n    </div>`\r\n\r\n})\r\n\r\nVue.component('empty-message',{\r\n    template:`<p>Корзина пуста!</p>`\r\n})\r\n\r\n\n\n//# sourceURL=webpack://lesson-8-front/./src/cart.js?");

/***/ }),

/***/ "./src/goods.list.js":
/*!***************************!*\
  !*** ./src/goods.list.js ***!
  \***************************/
/***/ (() => {

eval("\r\nconst API_URL =\r\n    \"http://localhost:3000\";\r\n// компонент для блока с товарами\r\nVue.component('goods-list', {\r\n\r\n    props: ['goods', 'addtocart', 'responce'],\r\n    template: `<div class=\"goods-list\">\r\n    <error-message v-if=\"responce === false\"></error-message>\r\n        <goods-item v-for=\"goodEntity in goods\" :goodProp=\"goodEntity\"  :id=\"goodEntity.id_product\"></goods-item>\r\n    </div>`\r\n})\r\n\r\n// компонент для вывода ошибки соединения с сервером\r\n\r\nVue.component('error-message', {\r\n    template: `<p>Ошибка соединения с сервером</p>`\r\n})\r\n\r\n\r\n//компонент для карточки с товарами\r\nVue.component('goods-item', {\r\n    props: [\"goodProp\", \"id\"],\r\n    methods: {\r\n        async addToCart() {\r\n            const response = await fetch(`${API_URL}/addToCart`, {\r\n                method: 'POST',\r\n                mode: 'cors',\r\n                headers: {\r\n                    'Content-Type': 'application/json;charset=utf-8'\r\n                },\r\n                body: JSON.stringify(this.goodProp)\r\n            });\r\n        },\r\n    },\r\n\r\n    template: `<div class=\"goods-item\" v-bind:itemId='id' @click=addToCart>\r\n    <h3>{{goodProp.product_name}}</h3>\r\n    <p>{{goodProp.price}}</p>\r\n    <button type=\"button\"  class=\"add-btn\">Добавить в корзину</button>\r\n    </div>`\r\n\r\n})\n\n//# sourceURL=webpack://lesson-8-front/./src/goods.list.js?");

/***/ }),

/***/ "./src/script.js":
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _search_block__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./search.block */ \"./src/search.block.js\");\n/* harmony import */ var _search_block__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_search_block__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _goods_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./goods.list */ \"./src/goods.list.js\");\n/* harmony import */ var _goods_list__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_goods_list__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _cart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cart */ \"./src/cart.js\");\n/* harmony import */ var _cart__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_cart__WEBPACK_IMPORTED_MODULE_2__);\n\r\n\r\n\r\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\r\n    components: {\r\n        searchBlock: (_search_block__WEBPACK_IMPORTED_MODULE_0___default()),\r\n        goodsList: (_goods_list__WEBPACK_IMPORTED_MODULE_1___default()),\r\n        cart: (_cart__WEBPACK_IMPORTED_MODULE_2___default()),\r\n    },\r\n\r\n});\r\n\r\n\r\nconst API_URL =\r\n    \"http://localhost:3000\";\r\n\r\nconst app = new Vue({\r\n    el: \"#app\",\r\n    data: {\r\n        goods: [],\r\n        filteredGoods: [],\r\n        searchLine: '',\r\n        // массив с товарами в корзине\r\n        cartGoods: [],\r\n        // свойство управляющие видимостью корзины\r\n        isVisibleCart: true,\r\n        // свойство для вывода сообщения\r\n        // если массив  с товарами пуст\r\n        emptyMessage: 'Список товаров пуст!',\r\n        // параметр для корзины с товарами\r\n        cartGoods: [],\r\n        count: 0\r\n    },\r\n\r\n    methods: {\r\n\r\n        //получает товары с сервера\r\n        async getProducts() {\r\n            const responce = await fetch(`${API_URL}/catalogData`);\r\n            // в случае нормального ответа \r\n            // преобразует ответ в объекты\r\n            // и возвращает true\r\n            if (responce.ok) {\r\n                const catalogItems = await responce.json();\r\n                this.goods = catalogItems;\r\n                this.filteredGoods = catalogItems;\r\n                return true\r\n                // иначе сообщение об ошибке и false\r\n            } else {\r\n                alert(\"Ошибка при соединении с сервером\");\r\n                return false\r\n            }\r\n        },\r\n\r\n        async sendProducts() {\r\n            const responce = await fetch(`${API_URL}/cartData`);\r\n            // в случае нормального ответа \r\n            // преобразует ответ в объекты\r\n            // и возвращает true\r\n            if (responce.ok) {\r\n                const catalogItems = await responce.json();\r\n                this.cartGoods = catalogItems;\r\n                return true\r\n                // иначе сообщение об ошибке и false\r\n            } else {\r\n                alert(\"Ошибка при соединении с сервером\");\r\n                return false\r\n            }\r\n        },\r\n\r\n        // осуществляет поиск товаров в массиве с ними\r\n        // по запросу в строке поиска\r\n        filterGoods() {\r\n            // регулярное выражение на основе свойства,  \r\n            //получаемое из строки поиска\r\n            const regExp = new RegExp(this.searchLine, 'i');\r\n            // фильтруем список товаров\r\n            this.filteredGoods = this.goods.filter(good => regExp.test(good.product_name));\r\n        },\r\n\r\n        addToCart(event) {\r\n            const idProduct = Number(event.target.parentElement.getAttribute('itemId')); // itemId карточки\r\n            // проходимся циклом по массиву с товарами\r\n            for (let item of this.filteredGoods) {\r\n                if (idProduct === item.id_product) { // если id кликнутой карточки и товара в массиве совпадают\r\n                    this.cartGoods.push(item); // добавляем товар в корзину\r\n                }\r\n            }\r\n        },\r\n\r\n\r\n        removeFromCart(event) {\r\n            // функция обработчик\r\n            //получаем список всех элементов в корзине\r\n            elems = document.querySelectorAll('.cart__goods-item');\r\n            // получаем кликнутую карточку\r\n            const elem = event.target.parentElement;\r\n            // усли кликнутая карточка есть \r\n            // в списке элементов\r\n            //то удаляем ее из списка корзины \r\n            elems.forEach((e, i = 0) => {\r\n                if (e === elem) {\r\n                    this.cartGoods.splice(i, 1);\r\n                    console.log(this.cartGoods);\r\n                    i++\r\n                }\r\n            });\r\n\r\n        }\r\n\r\n    },\r\n\r\n    async mounted() {\r\n        await this.getProducts();\r\n        await this.sendProducts();\r\n    }\r\n});\r\n\n\n//# sourceURL=webpack://lesson-8-front/./src/script.js?");

/***/ }),

/***/ "./src/search.block.js":
/*!*****************************!*\
  !*** ./src/search.block.js ***!
  \*****************************/
/***/ (() => {

eval("//компонет поля поиска товаров\r\nVue.component('search-input', {\r\n    //входной параметр для правильной работы v-model\r\n    props: ['value'],\r\n    template: `\r\n        <input type=\"text\" class=\"goods-search\"  v-bind:value=\"value\"\r\n        v-on:input = \"$emit('input', $event.target.value)\"/>`\r\n})\r\n\r\n// компонент для кнопки поиска\r\nVue.component('search-button', {\r\n    //входной параметр для метода filterGoods()\r\n    //которая является обработчиком на событие клика\r\n    props: ['filtergoods'],\r\n    template: `<button class=\"search-button\" v-on:click=\"filtergoods\" type=\"button\">Искать</button>`\r\n})\n\n//# sourceURL=webpack://lesson-8-front/./src/search.block.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/script.js");
/******/ 	
/******/ })()
;
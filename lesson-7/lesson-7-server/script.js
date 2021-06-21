//подключаем библиотеки

const express = require("express");
const bodyParser = require('body-parser');
const fs = require("fs");
var cors = require('cors');
const moment = require('moment');

// определяем переменную с приложением
const app = express();
// используем необходимые параметры
app.use(bodyParser.json({ extended: true }));
app.use(express.static("."));
app.use(cors())
// запускаем сервер с помощью экспресс
app.listen(3000, () => {
  console.log("server is running at port 3000!!");
});
// отрисовка корзины из сервера
app.get('/cartData', (req, res) => {
    fs.readFile('cart.json', 'utf-8', (err,data) => {
        res.send(data)
    });
});
// отрисовка каталога
app.get("/catalogData", (req, res) => {
  fs.readFile("catalogData.json", "utf-8", (err, data) => {
    res.send(data);
  });
});
// добавление товаров в корзину на сервере
// если запрос post 
app.post("/addToCart", (req, res) => {
//то читаем файл cart.json
//добавляя туда тело запроса в виде объекта товара
  fs.readFile("cart.json", "utf-8", (err, data) => {
    if (err) {
      res.send('{"result": 0}');
    } else {
      const cart = JSON.parse(data);
      const item = req.body;
      cart.push(item);
      // making id for every item;
      cart.forEach((el,i=0)=>{
        el.product_id = i;
        i++;
      })

      //writing cart.json
      fs.writeFile("cart.json", JSON.stringify(cart), (err) => {
        if (err) {
        res.send('{"result": 0}');
        } else {
        res.send('{"result": 1}');
        }
        });
      // reading stats.json
      fs.readFile("stats.json", "utf-8", (err, data) => {
        const stats = JSON.parse(data);
        //making empty object
        const add = {};
        //add necessary properties
        add.operation = 'add';
        add.item = req.body;
        add.time = moment().format('lllll');
        stats.push(add);
        //writing stats.json
        fs.writeFile("stats.json", JSON.stringify(stats), (err) => {
        }); 
      });
    }
  });
});
    
    


// удаление товаров из корзины
app.post("/removeFromCart", (req, res) => {
  fs.readFile("cart.json", "utf-8", (err, data) => {
    if (err) {
      res.send('{"result": 0}');
    } else {
      
      let cart = JSON.parse(data);
      const item = req.body;
      
      cart.forEach((e,i=0) => {
        if(e.product_id == item.product_id) {
        console.log(e.product_id)
        console.log(item.product_id)
          cart.splice(i,1);
          i++;
          }
      });
      fs.writeFile("cart.json", JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      });
      // reading stats.json
      fs.readFile("stats.json", "utf-8", (err, data) => {
        const stats = JSON.parse(data);
        //making empty object
        const remove = {};
        remove.operation = 'remove';
        remove.item = req.body;
        // using lib 'moment' for creation current date
        remove.time = moment().format('lllll');
        stats.push(remove);
        //writing stats.json
        fs.writeFile("stats.json", JSON.stringify(stats), (err) => {
        }); 
      });
    }
  });
});
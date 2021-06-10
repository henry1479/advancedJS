
// замена кавычек в слов, принимает элемент с текстом
const changeQuote = (text,event) => {
    console.log(event);
    let change = text.innerText;
    change = change.replace(/'(?=[A-Z])/g, '"');// левая кавычка 
    change = change.replace(/(?<=[\!\?\w])'(?=[\,\-\.\s])/g, '"');//правая кавычка
    const newChange = change.replace(/"(?=[a-z])/g, "'");//апострофы в словах
    text.innerText = newChange;
}

// функци валидации формы 
const validation = (event)=> {
    event.preventDefault(); // отмена поведения по умолчанию кнопки
    let names ='' // имя поля для вывода результатов в html
    const info = document.getElementById('info'); // получаем блок для вывода результатов валидации
    // получаем все инпуты
    const name = document.feedback.name;
    const tel = document.feedback.tel;
    const email = document.feedback.email;
    const text = document.feedback.text;
    /*
    *вызываем на них функцию изменений стиля в зависимости от *результатов проверки регулярного выражения для *соответствующего поля с выводом в блок info
    */
    // но здесь нужно еще поработать, не совсем как нужно реагирует
    names = changeStyle(/^([A-Z][a-z]+)$/.test(name.value),name,names);
    info.innerText =`Fields: ${names} is not valid!`
    names = changeStyle(/^\+\d{1,2}\(\d{3}\)\d{3}-\d{2}-\d{2}$/.test(tel.value),tel,names);
    info.innerText =`Fields: ${names} is not valid!`
    names = changeStyle(/^[a-z]{2}[\-\.]|[^\-\.][a-z0-9]+@mail\.ru$/.test(email.value),email,names);
    info.innerText =`Fields: ${names} is not valid!`
    names = changeStyle(/(\w+)/.test(text.value),text,names);
    info.innerText =`Fields: ${names} is not valid!`
}

// функция изменения стиля
// принимает результат проверки регулярным выражением
// сам элемент
// строку для добавления имени элемента в случае 
// неудачной валидации
const changeStyle = (func,elem,names)=>{
    // если валидацию проходит, то рамка становится зеленой
    if(func === true) {
        elem.style.borderColor = 'green';   
        
    // еслти нет, то рамка - красная и в поле добавляется 
    //имя этого элемента
    } else {
        names += `${elem.getAttribute('name')} `;
        names = names.replace(/undefined/, '');
        elem.style.borderColor = 'red';
        console.log(names);
        return names   
    } 
}





const init = () => {
    // получаем параграф
    const text = document.querySelector('.text');
    // получаем кнопку edit
    const btn = document.querySelector('.edit');
    // вешаем на кнопку обрабочтк событий changeQuote
    btn.addEventListener('click', changeQuote.call(this,text));
    // кнопку отправки формы
    const sendButton = document.getElementById('sendButton');
    sendButton.addEventListener('click',validation)
}


window.onload = init;
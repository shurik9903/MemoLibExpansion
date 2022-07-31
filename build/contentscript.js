'use strict';

console.log("Start Lib");


(async () => {

    //Импорт модуля меню библиотеки
    const lib_src = chrome.runtime.getURL("lib_window.js");
    const lib = await import(lib_src);

})();


//Импорт модуля логики
let find = ["Хан Сяо", "Хила", "Хиле", "Хилу"];

let reader = document.getElementsByClassName("reader");
let reader_container = document.getElementsByClassName("reader-container");

let new_reader_container = document.createElement("div");
new_reader_container.className = reader_container[0].className;

Array.from(reader_container[0].children).forEach(element => {

    let new_div = document.createElement("div");
    new_div.className = "text_block";
    new_div.innerHTML = element.innerText;

    if (find)
        find.forEach(person => 
            new_div.innerHTML = new_div.innerHTML.replaceAll(person, 
                `<div class="text" name="${person}">${person}</div>`)
        );
    
    new_reader_container.appendChild(new_div);
});

let basic_div = document.createElement("div");
basic_div.className = "basic_div";

if (reader && reader[0].children.length > 0 && 
    reader_container && reader_container[0].children.length > 0){

    reader = reader[0];
    reader_container = reader_container[0];

    reader.replaceChild(basic_div, reader_container);

    basic_div.appendChild(new_reader_container);
}









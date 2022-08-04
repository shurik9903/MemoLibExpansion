'use strict';

console.log("Start Lib");


(async () => {

    //Импорт модуля меню библиотеки
    const lib_src = chrome.runtime.getURL("lib_window.js");
    const lib = await import(lib_src);

    //Импорт модуля логики
    const lib_logic_src = chrome.runtime.getURL("lib_logic.js");
    const lib_logic = (await import(lib_logic_src)).lib_logic;


    console.log(lib_logic);

    let all_person = [];

    console.log("test1");

    await lib_logic.list_person().then(result => {
    
        let title_name = document.getElementsByClassName("reader-header-action__title")[0].innerText;
        
    
        if (result && result.lib_user_data && result.lib_user_data.length != 0){
    
            let data = result.lib_user_data;
    
            for (let element of data)
                if (element.title_name == title_name && element.title_data)
                        all_person = element.title_data;
                   
        }
    
        // all_person.forEach((data) => {
    
    
        //     let person_container = document.createElement("div");
        //     person_container.className = "lib_person_container";
        //     person_container.innerText = data.person_name;
        //     person_container.style.color = data.color;
    
        //     view_list.appendChild(person_container);
        // })
    
        console.log("test2");

        }, error => {
            console.log(`Error data chrome get: ${error}`);
        }
    )

    let reader = document.getElementsByClassName("reader");
    let reader_container = document.getElementsByClassName("reader-container");

    let new_reader_container = document.createElement("div");
    new_reader_container.className = reader_container[0].className;
    new_reader_container.setAttribute("lib", false);

    Array.from(reader_container[0].children).forEach(element => {

        let new_div = document.createElement("div");
        new_div.className = "text_block";
        new_div.innerHTML = element.innerText;

        if (all_person)
            all_person.forEach(person => 
                new_div.innerHTML = new_div.innerHTML.replaceAll(person.person_name, 
                    `<div style="color:${person.color};" class="text" name="${person.person_name}">${person.person_name}</div>`)
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

})();


// /([A-zА-яЁё] +) (я|ей|ов|а|ы|и|у|ю)/g










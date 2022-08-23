'use strict';

console.log("Start Lib");

(async () => {

    //Импорт модуля меню библиотеки
    const lib_src = chrome.runtime.getURL("lib_window.js");
    const lib = (await import(lib_src)).inject_window;

    //Импорт модуля логики
    const lib_logic_src = chrome.runtime.getURL("lib_logic.js");
    const lib_logic = (await import(lib_logic_src)).lib_logic;

    let all_person = [];

    await lib_logic.list_person().then(result => { all_person = result }, error => {
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
            all_person.forEach(person => {

                [...person.other_name, person.person_name].forEach(all_name => {

                    let reg;

                    let end_reg = `?(ер|ем|ой|ом|ёй|ью|[ыейуаиляью]|)`;

                    console.log(all_name);

                    all_name.split(' ').forEach((name, index) => {
                        if (index == 0)
                            reg = new RegExp(`${name}` + end_reg,'gi');
                        else
                            reg = new RegExp(reg.source + `(\\s${name}` + end_reg + `|)`,'gi');
                    })

                    let full_reg = new RegExp(`(?<!name=")` + reg.source,'gi');

                    console.log(full_reg);

                    new_div.innerHTML = new_div.innerHTML.replaceAll(full_reg, 
                        match => {

                            let person_div = document.createElement("div");
                            person_div.style.color = person.color;
                            person_div.className = "text";
                            person_div.setAttribute("name", person.person_name);
                            person_div.innerText = match;

                            return person_div.outerHTML;
                        });
                });
            });

                

        new_reader_container.appendChild(new_div);
    
    });

    let all_person_div = new_reader_container.querySelectorAll(".text[name]");

    if (all_person_div.length != 0)
        all_person_div.forEach(person_div => {
            all_person.forEach(person => {
                
                    let reg = new RegExp(`${person.person_name}?(ер|ем|ой|ом|ёй|ью|[ыейуаиляью]|)`,'gi');

                    if (reg.test(person_div.getAttribute("name"))){

                        person_div.onclick = () => {

                            let view = lib.get_view;
        
                            view.innerHTML = '';
                            view.appendChild(lib.person_lib_view(person, () => {
                                view.innerHTML = '';
                                view.appendChild(lib.list_view(view));
                            }));
                        };

                    };
            })
        })

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






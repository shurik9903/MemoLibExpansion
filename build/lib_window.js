import {lib_logic} from "./lib_logic.js";

const person_lib_view = (() => {

    let old_name = "";
    let declination;

    let view_name = document.createElement("div");
    view_name.className = "lib_view_name";

    //Имя персонажа
    let name_container = document.createElement("div");
    name_container.className = "lib_container lib_name_container";


    let name_text = document.createElement("div");
    name_text.className = "lib_container_text";
    name_text.innerText = "Имя";

    let person = document.createElement("div");
    person.className = "lib_person";

    let name = document.createElement("input");
    name.className = "lib_name";

    let color_pick = document.createElement("input");
    color_pick.className = "lib_input_color";
    color_pick.type = "color";

    color_pick.onchange = (e) => 
        name.style.color = e.target.value;

    [name, color_pick].forEach(e => person.appendChild(e));

    let other_name_text = document.createElement("div");
    other_name_text.className = "lib_container_text";
    other_name_text.innerText = "Другие имена";

    let other_person = document.createElement("div");
    other_person.className = "lib_other_person";

    let other_name = document.createElement("input");
    other_name.className = "lib_other_name";

    other_person.appendChild(other_name);

    [name_text, person, other_name_text, other_person].forEach(e => name_container.appendChild(e));

    //Изображения
    let image_container = document.createElement("div");
    image_container.className = "lib_container lib_image_container";

    let image_text = document.createElement("div");
    image_text.className = "lib_container_text";
    image_text.innerText = "Изображения";

    let image = document.createElement("div");
    image.className = "lib_image";

    [image_text, image].forEach(e => image_container.appendChild(e));

    //Текст
    let text_container = document.createElement("div");
    text_container.className = "lib_container lib_text_container";

    let text_text = document.createElement("div");
    text_text.className = "lib_container_text";
    text_text.innerText = "Описание";

    let text = document.createElement("textarea");
    text.className = "lib_text";

    [text_text, text].forEach(e => text_container.appendChild(e));

    let view_menu_container = document.createElement("div");
    view_menu_container.className = "lib_view_menu_container";

    let back_button = document.createElement("div");
    back_button.className = "lib_back_button";
    back_button.innerText = "Назад";

    let save_button = document.createElement("div");
    save_button.className = "lib_save_button";
    save_button.innerText = "Сохранить";


    save_button.onclick = () => {

        console.log(other_name.value.split(','))
        
        if (name.value.length == 0 || name.value.trim().length == 0)
            return;

        let all_other_name = [];
        
        other_name.value.split(',').forEach(e => {
            if (!(e.length == 0 || e.trim().length == 0))
                all_other_name.push(e);
        })   

        let new_data = {
            person_name: name.value,
            other_name: all_other_name,
            image: [],
            text: text.value,
            color: color_pick.value,
            declination: declination
        };

        lib_logic.save_person_data(name.value, new_data)
    };

    [save_button, back_button].forEach(e => view_menu_container.appendChild(e));

    [name_container, image_container, text_container, view_menu_container].forEach(e => view_name.appendChild(e));

    const show = (person_data, back_callback) => {

        old_name = person_data.person_name;
        declination = person_data.declination;

        name.value = old_name;
        name.style.color = person_data.color;
        color_pick.value = person_data.color;

        other_name.value = person_data.other_name.toString()

        person_data.image.forEach(e => { image.appendChild(`<img width="100" height="200" src=${e}>`) });

        text.value = person_data.text;

        back_button.onclick = back_callback;

        return view_name;
    };

    return {
        show: show
        
    };

})();


const list_view = (() => {

    let view_list = document.createElement("div");
    view_list.className = "lib_view_list"; 

    const show = (view) => {

        lib_logic.list_person().then(result => {

            view_list.innerHTML = ''; 

            let all_person = [];

            let title_name = document.getElementsByClassName("reader-header-action__title")[0].innerText;
            

            if (result && result.lib_user_data && result.lib_user_data.length != 0){

                let data = result.lib_user_data;

                for (let element of data)
                    if (element.title_name == title_name && element.title_data)
                            all_person = element.title_data;
                       
            }

            all_person.forEach((data) => {


                let person_container = document.createElement("div");
                person_container.className = "lib_person_container";
                

                let name = document.createElement("div");
                name.className = "lib_list_name";
                name.innerText = data.person_name;
                name.style.color = data.color;

                let delete_button = document.createElement("div");
                delete_button.className = "lib_delete_button";

                const img = document.createElement('img');
                img.src = chrome.runtime.getURL('images/63481.png');
                document.body.append(img);

                delete_button.appendChild(img);

                [name, delete_button].forEach(e => person_container.appendChild(e));

                name.onclick = () => {
                    view.innerHTML = '';
                    view.appendChild(person_lib_view.show(data, () => {
                        view.innerHTML = '';
                        view.appendChild(list_view.show(view));
                    }));
                }

                view_list.appendChild(person_container);
            })

            }, error => {
                console.log(`Error data chrome get: ${error}`);
            }
        )

        return view_list;
    }

    return {
        show: show
    };

})()


const add_person_view = (() => {

    let view_add = document.createElement("div");
    view_add.className = "lib_view_add";

    let text = document.createElement("div");
    text.className = "lib_text_add";
    text.innerText = "Введите имя нового персонажа";

    let input = document.createElement("input");
    input.className = "lib_input_add";

    let color_text = document.createElement("div");
    color_text.className = "lib_text_add";
    color_text.innerText = "Задайте цвет персонажа";

    let color_pick = document.createElement("input");
    color_pick.className = "lib_input_color";
    color_pick.type = "color";

    let check_conteiner = document.createElement("div");
    check_conteiner.className = "lib_check_conteiner";

    let check_text = document.createElement("div");
    check_text.className = "lib_check_text";
    check_text.innerText = "Склоняемое имя:  ";

    let check_declination = document.createElement("input");
    check_declination.className = "lib_check_declination";
    check_declination.type = "checkbox";

    [check_text, check_declination].forEach(e => check_conteiner.appendChild(e));

    let add = document.createElement("div");
    add.className = "lib_button_add";
    add.innerText = "Добавить";

    add.onclick = () => {
        if (input.value.replace(/\s/g, '').length != 0 && /[А-яЁёA-Za-z0-9]/g.test(input.value) == true){
            console.log(`add ${input.value}`);
 
            lib_logic.new_person(input.value, color_pick.value, check_declination.checked);
        }
    }

    [text, input, color_text, color_pick, check_conteiner, add].forEach(e => view_add.appendChild(e));

    const show = () => {

        let randomColor = Math.floor(Math.random()*16777215).toString(16);
        color_pick.value = "#" + randomColor;

        return view_add;
    };

    return {
        show: show
    };

})();


const inject_window = (() => {

    // chrome.storage.sync.clear();

    //Внешнее Окно
    let window = document.createElement("div");
    window.className = "lib_window";
    
    //Внутренее базовое окно
    let basic = document.createElement("div");
    basic.className = "lib_basic";

    window.appendChild(basic);

    //Меню
    let menu = document.createElement("div");
    menu.className = "lib_menu";

    //Окно просмотра
    let view = document.createElement("div");
    view.className = "lib_view";

    basic.appendChild(menu);

    //Кнопка добавления нового имени
    let B_Add = document.createElement("div");
    B_Add.className = "lib_button";
    B_Add.innerHTML = "add";

    B_Add.onclick = () => {

        view.innerHTML = '';

        view.appendChild(add_person_view.show());
    }

    //Кнопка просмотра имеющихся имен
    let B_List = document.createElement("div");
    B_List.className = "lib_button";
    B_List.innerHTML = "list";

    B_List.onclick = () => {

        view.innerHTML = '';

        view.appendChild(list_view.show(view));
    }

    menu.appendChild(B_Add);
    menu.appendChild(B_List);

    basic.appendChild(view);

    document.body.appendChild(window);

    let t = () => {return "qwe"};

    return {
        get_view: view,
        person_lib_view: person_lib_view.show,
        list_view: list_view.show
    }
})();

export {inject_window};
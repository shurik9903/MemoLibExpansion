import {lib_logic} from "./lib_logic.js";

const inject_window = (() => {

    //Внешнее Окно
    let window = document.createElement("div");
    window.className = "lib_window";
    
    //Внутренее базовое окно
    let basic = document.createElement("div");
    basic.className = "lib_basic";

    window.appendChild(basic);

    let menu = document.createElement("div");
    menu.className = "lib_menu";

    let view = document.createElement("div");
    view.className = "lib_view";

    basic.appendChild(menu);

    let TestB1 = document.createElement("div");
    TestB1.className = "lib_button";
    TestB1.innerHTML = "add";

    TestB1.onclick = () => {
        let enter_name = prompt("Please enter name", "");
    
        lib_logic.new_person(enter_name);
        
    }

    let TestB2 = document.createElement("div");
    TestB2.className = "lib_button";
    TestB2.innerHTML = "list";

    menu.appendChild(TestB1);
    menu.appendChild(TestB2);

    basic.appendChild(view);

    let name = document.createElement("div");
    name.className = "lib_name";

    let image = document.createElement("div");
    image.className = "lib_image";

    let text = document.createElement("div");
    text.className = "lib_text";

    [name, image, text].forEach(e => view.appendChild(e));

    document.body.appendChild(window);
})();

export {inject_window};
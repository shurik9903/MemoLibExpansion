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
    basic.appendChild(view);

    document.body.appendChild(window);
})();

export {inject_window};
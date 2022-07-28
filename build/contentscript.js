'use strict';

console.log("start");

let find = ["Хан Сяо", "Хила", "Хиле", "Хилу"];

let reader = document.getElementsByClassName("reader");
let reader_container = document.getElementsByClassName("reader-container");

let new_reader_container = document.createElement("div");
new_reader_container.className = reader_container[0].className;

Array.from(reader_container[0].children).forEach(element => {

    let new_div = document.createElement("div");
    new_div.className = "text_block";

    new_div.appendChild(document.createElement("div"));
    new_div.lastChild.className = "text";
    new_div.lastChild.innerText = element.innerText;

    if (find){

        let all_name = [];

        let global_space = 0;

        find.forEach(word => {

            global_space = 0;

            let text = element.innerText;

            do {
                let start = text.toLowerCase().search(word.toLowerCase());

                if (start < 0)
                    break;

                let end = word.length + start;

                all_name.push({"name":word, "start":start + global_space, "end": end + global_space});

                global_space += end;
                text = text.substring(end);

            } while(true);
        });

        all_name.sort(function (a, b) {
            if (a.start > b.start) {
                return 1;
            }
            if (a.start < b.start) {
                return -1;
            }

            return 0;
        });

        global_space = 0;

        all_name.forEach(AName => {

            console.log(AName);
            console.log(element);

            let text_div = document.createElement("div");
            let prev_div = document.createElement("div");
            let next_div = document.createElement("div");

            text_div.className = "text";
            text_div.setAttribute("name", AName.name) ;

            prev_div.className = "text";
            next_div.className = "text";

            text_div.innerText = AName.name;
            prev_div.innerText = element.innerText.substring(global_space, AName.start);
            next_div.innerText = element.innerText.substring(AName.end);

            console.log(prev_div.innerText.length);

            if (prev_div.innerText.length != 0){
                new_div.replaceChild(prev_div, new_div.lastChild);
                new_div.appendChild(text_div);
            } else {
                new_div.replaceChild(text_div, new_div.lastChild);
            }

            console.log(next_div);
            global_space = AName.end;

            new_div.appendChild(next_div);

        });

    }

    new_reader_container.appendChild(new_div);

});

let basic_div = document.createElement("div");
basic_div.className = "basic_div";

let lib_window = document.createElement("div");
lib_window.className = "lib_window";

lib_window.innerHTML = "qweqwe";

if (reader && reader[0].children.length > 0 && 
    reader_container && reader_container[0].children.length > 0){

    reader = reader[0];
    reader_container = reader_container[0];

    reader.replaceChild(basic_div, reader_container);

    basic_div.appendChild(new_reader_container);
    basic_div.appendChild(lib_window);
}

// // let all_text = "";

// // Array.from(reader).forEach(element => {
// //     all_text += element.innerText + " ";
// // });

// // console.log(all_text);

// // all_text = all_text.replace(/[^a-zа-яё0-9\s-]/gi, '')

// // console.log(all_text);

// console.log(reader[1]);

// let All_Find = (element, index, array) => {
//     console.log(element);
// }




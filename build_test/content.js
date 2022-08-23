'use strict';

console.log("Start Lib");

// (async () => {

//     //Импорт модуля
//     const lib_src = chrome.runtime.getURL("lib_window.js");
//     const lib = (await import(lib_src)).inject_window;

// })();


import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
// import "./content.css";

// import {inject_window} from "./lib_window";
import {lib_logic} from "./lib_logic";


function person_div({children,name}) {

    return (
        <div name={name}>
            {children}
        </div>
    )
}

function app() {

    useEffect(()=>{

        console.log("basic::constructor");
    },[]);

    return (
        <div class={"reader-container container container_center"} lib={false}>
            tezr
        </div>
    );
}

(async () => {

    // let all_person = [];

    // await lib_logic.list_person().then(result => {
    
    //     let title_name = document.getElementsByClassName("reader-header-action__title")[0].innerText;
        
    
    //     if (result && result.lib_user_data && result.lib_user_data.length != 0){
    
    //         let data = result.lib_user_data;
    
    //         for (let element of data)
    //             if (element.title_name == title_name && element.title_data)
    //                     all_person = element.title_data;
                   
    //     }

    //     }, error => {
    //         console.log(`Error data chrome get: ${error}`);
    //     }
    // )

    let reader = document.getElementsByClassName("reader");
    let reader_container = document.getElementsByClassName("reader-container");

    // let new_reader_container = <new_reader_container/>
    // new_reader_container.className = reader_container[0].className;

    // let all_name_element = [];

    // Array.from(reader_container[0].children).forEach(element => {

    //     let new_div = document.createElement("div");
    //     new_div.className = "text_block";
    //     new_div.innerHTML = element.innerText;

    //     if (all_person)
    //         all_person.forEach(person => {

    //             [...person.other_name, person.person_name].forEach(all_name => {

    //                 let reg = new RegExp(`(?<!name=")${all_name}?(|[ыейуаиляью]|ой|ёй|ью)`,'gi');


    //                 new_div.innerHTML = new_div.innerHTML.replaceAll(reg, 
    //                     match => {

    //                         let person_div = <person_div name={person.person_name} style={{color: person.color}}>{match}</person_div>;
    //                         // person_div.style.color = person.color;
    //                         // person_div.className = "text";
    //                         // person_div.setAttribute("name", person.person_name);
    //                         // person_div.innerText = match;

    //                         return person_div.outerHTML;
    //                     });
    //             });
    //         });

                

    //     all_name_element.push(new_div);
    
    // });

    // let all_person_div = new_reader_container.querySelectorAll(".text[name]");

    // if (all_person_div.length != 0)
    //     all_person_div.forEach(person_div => {
    //         all_person.forEach(person => {
                
    //                 let reg = new RegExp(`${person.person_name}?(|[ыейуаиляью]|ой|ёй|ью)`,'gi');


    //                 if (reg.test(person_div.getAttribute("name"))){

    //                     person_div.onclick = () => {

    //                         let view = lib.get_view;
        
    //                         view.innerHTML = '';
    //                         view.appendChild(lib.person_lib_view(person, () => {
    //                             view.innerHTML = '';
    //                             view.appendChild(lib.list_view(view));
    //                         }));
    //                     };

    //                 };
    //         })
    //     })

    // let basic_div = document.createElement("div");
    // basic_div.className = "basic_div";



    if (reader && reader[0].children.length > 0 && 
        reader_container && reader_container[0].children.length > 0){

        reader = reader[0];
        reader_container = reader_container[0];
        // reader_container = <basic_div/>;
        // reader.removeChild(reader_container);

        // console.log(all_name_element);

        let basic_div = document.createElement("div");
        basic_div.className = "basic_div";
        reader.replaceChild(basic_div, reader_container);
        ReactDOM.render(React.createElement(app, {}), basic_div);

        // ReactDOM.render(<basic_div>
        //     {all_name_element}
        // </basic_div>, reader_container);
        // reader.replaceChild(<basic_div/>, reader_container);

        // basic_div.appendChild(new_reader_container);
    }

})()


// class Main extends React.Component {
//     render() {
//         return (
//             <div className={'my-extension'}>
//                 <h1>Hello world - My first Extension</h1>
//             </div>
//         )
//     }
// }

// const app = document.createElement('div');
// app.id = "my-extension-root";
// document.body.appendChild(app);
// ReactDOM.render(<Main />, app);



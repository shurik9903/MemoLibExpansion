'use strict';

console.log("Start Lib");

// (async () => {

//     //Импорт модуля
//     const lib_src = chrome.runtime.getURL("lib_window.js");
//     const lib = (await import(lib_src)).inject_window;

// })();


import React, { useEffect, useState, useContext } from 'react';
import ReactDOM from 'react-dom';
// import "./content.css";

// import {inject_window} from "./lib_window";
import {lib_logic} from "./lib_logic";

const text_div = ({children}) => {

    return (
        <div class={"text"}> 
            {children}
        </div>
    )

}

const person_div = ({children, name}) => {

    return (
        <div name={name} class={"text"}>
            {children}
        </div>
    )
}


const text_block = ({children}) => {

    const {getPersons} = useApp();

    const [full_text, setFull_Text] = useState();

    useEffect(()=>{

        let text = [React.createElement(text_div, {class:"text"}, children)];
        let new_text_elements = [];


        let all_person = [{
            person_name: "Лейлин",
            other_name: []
            },
            {
                person_name: "Рынка Эллинель",
                other_name: []
            }
        ]

        if (all_person)
            all_person.forEach(person => {

                if (new_text_elements.length != 0)
                    text = new_text_elements;

                new_text_elements = [];

                text.forEach(text_element => {

                    if (text_element.props.name)
                        new_text_elements.push(text_element);
                    else {
                        text_element = text_element.props.children;

                        [...person.other_name, person.person_name].forEach(all_name => {

                        let reg;

                        let end_reg = `?(ер|ем|ой|ом|ёй|ью|[ыейуаиляью]|)`;


                        all_name.split(' ').forEach((name, index) => {
                            if (index == 0)
                                reg = new RegExp(`${name}` + end_reg,'gi');
                            else
                                reg = new RegExp(reg.source + `(\\s${name}` + end_reg + `|)`,'gi');
                        })

                        let full_reg = new RegExp(`(?<!name=")` + reg.source,'gi');

                        let find = text_element.matchAll(full_reg);

                        let slice;
                        let prev_person_last_index = 0;

                        [...find].forEach(find_element => {

                            slice = text_element.slice(prev_person_last_index, find_element.index);

                            if (slice.length != 0)
                                new_text_elements.push(React.createElement(text_div, {class:"text"}, slice));
                            
                            new_text_elements.push(React.createElement(person_div, {name:all_name}, find_element[0]));
                            
                            prev_person_last_index = find_element.index + find_element[0].length; 
                        })

                        slice = text_element.slice(prev_person_last_index);

                        if (slice.length != 0)
                                new_text_elements.push(React.createElement(text_div, {class:"text"}, slice));
                        
                    })
                }

            })
        })

        setFull_Text(new_text_elements);
        
    },[])

    return (
        <div class='text_block'>
            {full_text}
        </div>
    )
}

const Text_child = document.getElementsByClassName("reader-container")[0].children;

const AppContext = React.createContext();

const useApp = () => {
    return useContext(AppContext);
}

const app = () => {

    const [child, setChild] = useState([]);
    const [persons, setPersons] = useState([]);

    useEffect(()=>{

        console.log("app::constructor");

        (async () => {
            let all_person = [];

            await lib_logic.list_person().then(result => { all_person = result }, error => {
                    console.log(`Error data chrome get: ${error}`);
                }
            )

            setPersons(all_person);
        })();

        Array.from(Text_child).forEach(element => {

            let new_text_block = React.createElement(text_block, {}, element.innerText);

            setChild(prev => [...prev, new_text_block])
        });
        
    },[]);

    return (
        <div class={"reader-container container container_center"} lib={false}>
            <AppContext.Provider value={{
                        getPersons: persons,
                        setPersons: setPersons
                    }}>
                {child}
            </AppContext.Provider>
        </div>
    );
}

let reader = document.getElementsByClassName("reader");
let reader_container = document.getElementsByClassName("reader-container");

if (reader && reader[0].children.length > 0 && 
    reader_container && reader_container[0].children.length > 0){

    reader = reader[0];
    reader_container = reader_container[0];

    let basic_div = document.createElement("div");
    basic_div.className = "basic_div";
    reader.replaceChild(basic_div, reader_container);
    ReactDOM.render(React.createElement(app, {}), basic_div);

}


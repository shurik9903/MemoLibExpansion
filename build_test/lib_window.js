import React, { useEffect, useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import {lib_logic} from "./lib_logic.js";

let show_person_data;

const person_lib_view = ({data}) => {

    const [name, setName] = useState('');
    const [other_name, setOther_Name] = useState('');
    const [color, setColor] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState([]);
    const [old_name, setOld_Name] = useState('');

    const {setView} = useWindow();

    const save_button = () => {

        if (name.length == 0 || name.trim().length == 0)
            return;

        let all_other_name = [];
        
        other_name.split(',').forEach(e => {
            if (!(e.length == 0 || e.trim().length == 0))
                all_other_name.push(e);
        })   

        let new_data = {
            person_name: name,
            other_name: all_other_name,
            image: [],
            text: text,
            color: color,
        };

        lib_logic.save_person_data(old_name, new_data);
    }

    useEffect(() => {

        setOld_Name(data.person_name);

        setName(data.person_name);
        setColor(data.color);

        setOther_Name(data.other_name.toString());

        data.image.forEach(e => { 
            setImage(prev => [...prev, `<img width="100" height="200" src=${e}>`]);
        });

        setText(data.text);

    },[])

    return (
        <div className={"lib_view_name"}>
            <div className={"lib_container lib_name_container"}>
                <div className={"lib_container_text"}>
                    Имя
                </div>
                <div className={"lib_person"}>
                    <input className={"lib_name"} style={{color: color}} onChange={name => setName(name.target.value)} value={name}/>
                    <input className={"lib_input_color"} type={"color"} onChange={color => setColor(color.target.value)} value={color}/>
                </div>
                <div className={"lib_container_text"}>
                    Другие имена
                </div>
                <div className={"lib_other_person"}>
                    <input className={"lib_other_name"} onChange={other_name => setOther_Name(other_name.target.value)} value={other_name}/>
                </div>
            </div>
            <div className={"lib_container lib_image_container"}>
                <div className={"lib_container_text"}>
                    Изображения
                </div>
                <div className={"lib_image"}>
                </div>
            </div>
            <div className={"lib_container lib_text_container"}>
                <div className={"lib_container_text"}>
                    Описание
                </div>
                <textarea className={"lib_text"} onChange={text => setText(text.target.value)} value={text}/>
            </div>
            <div className={"lib_view_menu_container"}>
                <div className={"lib_back_button"} onClick={() => setView(React.createElement(list_view, {}))}>
                    Назад
                </div>
                <div className={"lib_save_button"} onClick={save_button}>
                    Сохранить
                </div>
            </div>
        </div>
    )

}

const person_container = ({data}) => {

    const {setView} = useWindow();
    const {Refresh} = useList_view();
    const [name, setName] = useState('');
    const [color, setColor] = useState('');

    useEffect(() => {
        setName(data.person_name);
        setColor(data.color);
    },[])

    const name_click = () => {
        setView(React.createElement(person_lib_view, {data: data}));
    }

    const delete_button = () => {
        lib_logic.delete_person_data(name).then(result => {
            Refresh();
        })
    }

    return (
        <div className={"lib_person_container"}>
            <div className={"lib_list_name"} style={{color:color}} onClick={name_click}>
                {name}
            </div>
            <div className={"lib_delete_button"} onClick={delete_button}>
                <img src={chrome.runtime.getURL('images/63481.png')}/>
            </div>
        </div>
    )
}

const list_view_Context = React.createContext();

const useList_view = () => {
    return useContext(list_view_Context);
}

const list_view = () => {

    const [view, setView] = useState('');

    const Refresh = () => {
        setView('');

        lib_logic.list_person().then(result => {
            result.forEach(data => {
                setView(prev => [...prev, React.createElement(person_container, {data: data})]);
            })
        }, error => {
            console.log(`Error data chrome get: ${error}`);
        })
    }

    useEffect(() => {

        Refresh()

    },[])

    return (
        <div className={"lib_view_list"}>
            <list_view_Context.Provider value={{
                        Refresh: Refresh
                    }}>
            {view}
            </list_view_Context.Provider>
        </div>
    )
}

const add_person_view = () => {

    const [name, setName] = useState('');
    const [color, setColor] = useState('')

    useEffect(()=>{
        setName('');

        let randomColor = Math.floor(Math.random()*16777215).toString(16);
        setColor("#" + randomColor);
    },[])

    const add = () => {
        if (name.replace(/\s/g, '').length != 0 && /[А-яЁёA-Za-z0-9]/g.test(name) == true){
            console.log(`add ${name}`);
    
            lib_logic.new_person(name, color).then(result => console.log(result));
        }
    }

    return (
        <div className={"lib_view_add"}>
            <div className={"lib_text_add"}>
                Введите имя нового персонажа
            </div>
            <input className={"lib_input_add"} onChange={text => setName(text.target.value)} value={name}/>
            <div className={"lib_text_add"}>
                Задайте цвет персонажа
            </div>
            <input className={"lib_input_color"} type={"color"} onChange={color => setColor(color.target.value)} value={color}/>
            <div className={"lib_button_add"} onClick={add}>
                Добавить
            </div>
        </div>
    )
}



const WindowContext = React.createContext();

const useWindow = () => {
    return useContext(WindowContext);
}

const window_view = () => {

    const [visible, setVisible] = useState(false);
    const [arrow, setArrow] = useState('\u2770')
    const [view, setView] = useState();

    const collapse = () => {
        if (visible) 
            setArrow('\u2770');
         else 
            setArrow('\u2771');
        
        setVisible(!visible);
    }

    useEffect(() => {

        show_person_data = (data) => {
            setVisible(true);
            setArrow('\u2771');
            setView(React.createElement(person_lib_view, {data: data}));
        }

    },[])

    return (
        <div className={"lib_window"} collapse={`${visible}`}>
            <WindowContext.Provider value={{
                        getView: view,
                        setView: setView
                    }}>
                <div className={"lib_collapse"} onClick={collapse}>
                    {arrow}
                </div>
                <div className={"lib_basic"} collapse={`${visible}`} >
                    <div className={"lib_menu"}>
                        <div className={"lib_button"} onClick={() => setView(React.createElement(add_person_view, {}))}>
                            add
                        </div>
                        <div className={"lib_button"} onClick={() => setView(React.createElement(list_view, {}))}>
                            list
                        </div>
                    </div>
                    <div className={"lib_view"}>
                        {view}
                    </div>
                </div>
            </WindowContext.Provider>
        </div>
    )
} 

const inject_window = (() => {
    ReactDOM.render(React.createElement(window_view, {}), document.body.appendChild(document.createElement("div")));
})();

export {inject_window, show_person_data};
const lib_logic = (() => {

    class lib_logic_class {

        async delete_person_data_async(name){
            return new Promise((resolve, reject) => {
                let data = [];

                let title_name = document.getElementsByClassName("reader-header-action__title")[0].innerHTML;

                if (title_name.length == 0 || title_name.trim().length == 0)
                    return;

                chrome.storage.sync.get(['lib_user_data'], function(result) {
                    if (result && result.lib_user_data && result.lib_user_data.length != 0){

                        data = result.lib_user_data;

                        for (let element of data){
                            if (element.title_name == title_name && element.title_data){

                                let index = element.title_data.findIndex(person => {
                                    return person.person_name == name;
                                });

                                if (index >= 0)
                                    element.title_data.splice(index, 1);

                                break;
                            }
                        }

                        chrome.storage.sync.set({'lib_user_data': data}, function() {
                            resolve(data);
                        }); 

                    }
                });
            });
        }

        async save_person_data_async(name, new_data){
            return new Promise((resolve, reject) => {
                let data = [];

                let title_name = document.getElementsByClassName("reader-header-action__title")[0].innerHTML;

                if (title_name.length == 0 || title_name.trim().length == 0)
                    return;

                chrome.storage.sync.get(['lib_user_data'], function(result) {
                    if (result && result.lib_user_data && result.lib_user_data.length != 0){

                        data = result.lib_user_data;

                        for (let element of data){
                            if (element.title_name == title_name && element.title_data){

                                let index = element.title_data.findIndex(person => {
                                    return person.person_name == name;
                                });

                                if (index >= 0)
                                    element.title_data[index] = new_data;

                                break;
                            }
                        }

                        chrome.storage.sync.set({'lib_user_data': data}, function() {
                            resolve(data);
                        }); 

                    }
                });
            });
        }

        async new_person_async(name, color) {
            return new Promise((resolve, reject) => {
                let data = [];
                
                let title_name = document.getElementsByClassName("reader-header-action__title")[0].innerHTML;

                if (title_name.length == 0 || title_name.trim().length == 0)
                    return;

                chrome.storage.sync.get(['lib_user_data'], function(result) {
                    if (result && result.lib_user_data && result.lib_user_data.length != 0){

                        data = result.lib_user_data;

                        if (!data.find(find_element => {
                            return find_element.title_name == title_name;
                        })) {
                            data.push({
                                title_name: title_name,
                                title_data: [
                                    {
                                        person_name: name,
                                        other_name: [],
                                        image: [],
                                        text: "",
                                        color: color
                                    }
                                ]
                            });

                            chrome.storage.sync.set({'lib_user_data': data}, function() {
                                resolve(data);
                            });  

                            return;
                        }

                        for (let element of data){
                            if (element.title_name == title_name && element.title_data){

                                if (element.title_data.find(find_element => {
                                    return find_element.person_name == name;
                                })) break ;

                                element.title_data.push(
                                    {
                                        person_name: name,
                                        other_name: [],
                                        image: [],
                                        text: "",
                                        color: color
                                    }
                                );
                            }

                            chrome.storage.sync.set({'lib_user_data': data}, function() {
                                resolve(data);
                            });  

                            break ;
                        }

                    } else {

                        data = [{
                            title_name: title_name,
                            title_data: [
                                {
                                    person_name: name,
                                    other_name: [],
                                    image: [],
                                    text: "",
                                    color: color
                                }
                            ]
                        }]

                        chrome.storage.sync.set({'lib_user_data': data}, function() {
                            resolve(data);
                        });  
                    }
                });

                
            });
        };

        async list_person_async() {
            return new Promise((resolve, reject) => {
                chrome.storage.sync.get(['lib_user_data'], (result) => {

                    if (chrome.runtime.lastError) {
                        return reject(chrome.runtime.lastError);
                    }

                    let all_person = [];

                    let title_name = document.getElementsByClassName("reader-header-action__title")[0].innerHTML;

                    if (title_name.length == 0 || title_name.trim().length == 0)
                        return;

                    if (result && result.lib_user_data && result.lib_user_data.length != 0){

                        let data = result.lib_user_data;

                        for (let element of data)
                            if (element.title_name == title_name)
                                all_person = element.title_data;
                            
                    }

                    resolve(all_person);
                });
            });
        };
    };

    const new_person = (name, color) => {
        return new lib_logic_class().new_person_async(name, color);
    };

    const list_person = () => {
        return new lib_logic_class().list_person_async();
    }

    const save_person_data = (name, new_data) => {
        return new lib_logic_class().save_person_data_async(name, new_data);
    }

    const delete_person_data = (name) => {
        return new lib_logic_class().delete_person_data_async(name);
    }


    return {
        new_person: new_person,
        list_person: list_person,
        save_person_data: save_person_data,
        delete_person_data: delete_person_data
    };

})();

export {lib_logic};
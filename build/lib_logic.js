const lib_logic = (() => {

    class lib_logic_class {

        async new_person_async(name, color, declination) {

            // chrome.storage.sync.clear();

            let data = [];
            
            let title_name = document.getElementsByClassName("reader-header-action__title")[0].innerText;

            chrome.storage.sync.get(['lib_user_data'], function(result) {
                if (result && result.lib_user_data && result.lib_user_data.length != 0){

                    data = result.lib_user_data;

                    for (let element of data){
                        if (element.title_name == title_name && element.title_data){

                            if (element.title_data.find(find_element => {
                                return find_element.person_name == name;
                            })) break ;

                            element.title_data.push(
                                {
                                    person_name: name,
                                    image: [],
                                    text: "",
                                    color: color,
                                    declination: declination
                                }
                            );
                        }

                        chrome.storage.sync.set({'lib_user_data': data}, function() {
                            console.log('Value is set to ' + data);
                        });  

                        break ;
                    }

                } else {

                    data = [{
                        title_name: title_name,
                        title_data: [
                            {
                                person_name: name,
                                image: [],
                                text: "",
                                color: color,
                                declination: declination
                            }
                        ]
                    }]

                    chrome.storage.sync.set({'lib_user_data': data}, function() {
                        console.log('Value is set to ' + data);
                    });  
                }
            });

        };

        async list_person_async() {


            return new Promise((resolve, reject) => {
                chrome.storage.sync.get(['lib_user_data'], (result) => {

                    if (chrome.runtime.lastError) {
                        return reject(chrome.runtime.lastError);
                    }

                    resolve(result);
                });
                
            })
                
        };

    };

    const new_person = (name, color, declination) => {
        return new lib_logic_class().new_person_async(name, color, declination);
    };

    const list_person = () => {
        return new lib_logic_class().list_person_async();
    }


    return {
        new_person: new_person,
        list_person: list_person
    };

})();

export {lib_logic};
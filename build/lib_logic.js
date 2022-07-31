const lib_logic = (() => {

    class lib_logic_class {

        new_person(name) {

            // chrome.storage.sync.clear();

            let data = [];
            
            let title_name = document.getElementsByClassName("reader-header-action__title")[0].innerText;
            console.log(title_name);

            chrome.storage.sync.get(['lib_user_data'], function(result) {
                if (result && result.lib_user_data && result.lib_user_data.length != 0){

                    console.log("test1");
                    console.log(result.lib_user_data);
                    
                    data = result.lib_user_data;
                    
                    console.log(data);

                    for (let element of data){
                        if (element.title_name == title_name && element.title_data){

                            if (element.title_data.find(find_element => {
                                return find_element.person_name == name;
                            })) break ;



                            element.title_data.push(
                                {
                                    person_name: name,
                                    image: [],
                                    text: ""
                                }
                            );
                        }

                        chrome.storage.sync.set({'lib_user_data': data}, function() {
                            console.log('Value is set to ' + data);
                        });  

                        break ;
                    }

                } else {
                    
                    console.log("test2");
                    data = [{
                        title_name: title_name,
                        title_data: [
                            {
                                person_name: name,
                                image: [],
                                text: ""
                            }
                        ]
                    }]

                    chrome.storage.sync.set({'lib_user_data': data}, function() {
                        console.log('Value is set to ' + data);
                    });  
                }
            });

            // console.log(data);

            // chrome.storage.sync.set({'lib_user_data': data}, function() {
            //     console.log('Value is set to ' + data);
            // });  

        };

    };

    let new_person = (name) => {
        return new lib_logic_class().new_person(name);
    };


    return {
        new_person: new_person
    };

})();

export {lib_logic};
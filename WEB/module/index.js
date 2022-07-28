import { useEffect } from "react";

function basic_div() {
    console.log("basic_div::constructor");


    useEffect(() => {
        console.log("basic_div::componentDidMount")
    
        return () => {
            console.log('basic_div::componentWillUnmount');
        };
    },[]);

    return (
        <div className="basic">
            "qwerty"
        </div>
    );

}

export default basic_div;

import React from 'react'

export default function Alert(props) {
    // This function can help you to change first character of the given word to uppercase
    const toLowerCase = (word) => {
        if(word === "danger"){
            word = "Error";
        }
        // Converting the whole word to lowercase
        const lower = word.toLowerCase();
        // Converting the first cahracter of the word to uppercase and the slice method return the whole  text excepting the first character of the word
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <>
            <div style={ {height: '150px' }}>
                {/* The JSX converts into jsvascript calls so props.alert && the JSX */}
                {/* It means two conditions has to true to run the above code */}
                {props.alert &&
                    <div className={`alert alert-${props.alert.type}`} role="alert">
                        <strong>{toLowerCase(props.alert.type)}: </strong>{props.alert.msg}.
                    </div>}
            </div>
        </>

    )
}

import React from 'react';

const FileInput = (props) => {
    return(
        <div className = 'inputContainer'>
            <h3>{props.title}</h3>
            <input type="file" id="input" accept=".xls,.xlsx,.ods" onChange = {props.fileHandler} name = {props.name}/>
        </div>
    )
}

export default FileInput;
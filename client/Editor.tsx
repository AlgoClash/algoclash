import React from 'react';

import CodeMirror from '@skidding/react-codemirror';

const Editor = (props) => {

    const options = {
        lineNumbers: true,
        lineWrapping: true,
        lint: true,
        mode: 'javascript',
        theme: `${props.theme === 'light' ? 'default' : 'lesser-dark'}`,
    };

    const handleChange = (value) => {
        props.onChange(value);
    }

    return (
        <div className='ide container' >

            <div className='header'>
                {props.username}
                {props.user === 'challenger' ? '' : <button id='collapse' onClick={() => props.collapse(!props.collapsed)}>{props.collapsed ? `<<` : `>>`}</button>}
            </div>

            <div className={`editor ${props.user === 'challenger' ? 'challenger' : 'player'}`} >
                <CodeMirror onChange={handleChange} options={options} value={props.value} />
            </div>

        </div>
    );
}

export default Editor;
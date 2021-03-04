import React from 'react';

import CodeMirror from '@skidding/react-codemirror';

const Question = (props) => {

    const options = {
        lineNumbers: false,
        lineWrapping: true,
        readOnly: true,
        mode: 'language',
        theme: `${props.theme === 'light' ? 'default' : 'lesser-dark'}`,
    };

    return (
        <div id='question' className='container'>
            <div className='header'>Question</div>

            <CodeMirror options={options} value={props.value} />
        </div>
    );
}

export default Question;
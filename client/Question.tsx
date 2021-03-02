import React from 'react';

import CodeMirror from '@skidding/react-codemirror';

const Question = (props) => {

    const options = {
        lineNumbers: false,
        lineWrapping: true,
        mode: 'javascript',
        theme: `${props.theme === 'light' ? 'default' : 'lesser-dark'}`,
    };

    return (
        <div id='question'>
            <div className='header'>Question</div>

            <CodeMirror options={options} value={props.value} />
        </div>
    );
}

export default Question;
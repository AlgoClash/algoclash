import React from 'react';

import CodeMirror from '@skidding/react-codemirror';

const options = {
    lineNumbers: false,
    lineWrapping: true,
    readOnly: true,
    mode: 'javascript',
    theme: 'lesser-dark',
};

const Question = (props) => {
    return (
        <>
            <div className='header'>Question</div>

            <CodeMirror options={options} value={props.value} />
        </>
    );
}

export default Question;
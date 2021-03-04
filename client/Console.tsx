import React from 'react';
import CodeMirror from '@skidding/react-codemirror';
// import jestJSON from '../jest-results.json'

// const jestJSON = require('../jest-results.json');

const Console = (props) => {

    const options = {
        lineNumbers: false,
        lineWrapping: true,
        readOnly: true,
        mode: 'language',
        theme: 'colorforth',
    };

    // console.log('JSOOONNNNNNNNNNNNNNNNNNNNNNNNNNN', jestJSON)

    return (
        <div className='console container'>
            <div className='header'>Console</div>
            <CodeMirror options={options} value={props.value} />
        </div>
    );
}

export default Console;
import React, { useState } from 'react';

import CodeMirror from '@skidding/react-codemirror';

const Tests = (props) => {

    const options = {
        lineNumbers: true,
        lineWrapping: true,
        readOnly: true,
        mode: 'javascript',
        theme: `${props.theme === 'light' ? 'default' : 'lesser-dark'}`,
    };    

    const [checks, toggleChecks] = useState<Boolean>(false);

    return (
        <div id='test container'>
            <div className='header'><a onClick={() => toggleChecks(false)} style={{userSelect: 'none', cursor: 'pointer', fontSize: `${checks ? '14px' : '16px'}`, opacity: `${checks ? '.6' : '1'}`}} >Tests</a> <a onClick={() => toggleChecks(true)} style={{userSelect: 'none', cursor: 'pointer', fontSize: `${checks ? '16px' : '14px'}`, opacity: `${checks ? '1' : '.6'}`}} >/Checks</a></div>

            {checks ? 
                <div id='terminal'>
                    <iframe
                    id='iframe'
                    title='output'
                    sandbox='allow-scripts'
                    frameBorder='0'
                    width='100%'
                    height='100%'
                    />
                </div> : <CodeMirror options={options} value={props.value} />}
        </div>
    );
}

export default Tests;
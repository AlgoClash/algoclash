import React, { useState } from 'react';

import CodeMirror from '@skidding/react-codemirror';

// import mocha from '../public/test/lib/mocha/mocha';
import {iframestyle} from '../public/test/lib/mocha/style';

const Tests = (props) => {

    const options = {
        lineNumbers: true,
        lineWrapping: true,
        readOnly: true,
        mode: 'javascript',
        theme: `${props.theme === 'light' ? 'default' : 'lesser-dark'}`,
    };    

    const [checks, toggleChecks] = useState<Boolean>(false);

    const srcDoc = `
    <html>
        <head>
            <style>${iframestyle}</style>
        </head>
        <script src="test/lib/scroll.js"></script>
        <body onload="loadScroll()" onunload="saveScroll()">
            <div id="mocha"></div>
            <script>${`mocha`}</script>
            <script>mocha.setup('bdd')</script>
            <script src="test/lib/expect/index.js"></script>
            <script>${props.js}</script>
            <script src="src/main.js"></script>
            <script src="test/index.js"></script>
            <script>
                mocha.globals();
                if (window.mochaPhantomJS) { mochaPhantomJS.run(); }
                else { mocha.run(); }
            </script>
        </body>
    </html>`;

    return (
        <div id='test'>
            <div className='header'><a onClick={() => toggleChecks(false)} style={{userSelect: 'none', cursor: 'pointer', fontSize: `${checks ? '14px' : '16px'}`, opacity: `${checks ? '.6' : '1'}`}} >Tests</a> <a onClick={() => toggleChecks(true)} style={{userSelect: 'none', cursor: 'pointer', fontSize: `${checks ? '16px' : '14px'}`, opacity: `${checks ? '1' : '.6'}`}} >/Checks</a></div>

            {checks ? 
                <div id='terminal'>
                    <iframe
                    id='iframe'
                    srcDoc={srcDoc}
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
import React, { useState, useEffect, useRef } from 'react';

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
    const [code, testCode] = useState<string>('');

    useEffect(() => {

        if (!props.test) return;

        testCode(props.playerCode)
        props.runTest(false);

    }, [props.test]);

    const srcDoc = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Mocha Tests</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
    <link rel="stylesheet" href="https://unpkg.com/mocha/mocha.css" />
  </head>
  <body>
    <div id="mocha"></div>

    <script src="https://unpkg.com/chai/chai.js"></script>
    <script src="https://unpkg.com/mocha/mocha.js"></script>

    <script class="mocha-init">
      mocha.setup('bdd');
      mocha.checkLeaks();
    </script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/expect.js/0.3.1/index.min.js"></script>

    <script>${code}</script>
    
    <script>describe('clone', function() {
        it('should return shallow copy of object', function() {
          var users = [{ 'user': 'barney' },{ 'user': 'fred' }];
          var shallowClone = clone(users);
          expect(shallowClone[0].user).to.equal(users[0].user);
          expect(shallowClone[0]).to.equal(users[0]);
        });
      });</script>

    <script class="mocha-exec">
      mocha.run();
    </script>

  </body>
</html>`;

    return (
        <div id='test' className='container'>
            <div className='header'><a onClick={() => toggleChecks(false)} style={{userSelect: 'none', cursor: 'pointer', fontSize: `${checks ? '14px' : '16px'}`, opacity: `${checks ? '.6' : '1'}`}} >Tests</a> <a onClick={() => toggleChecks(true)} style={{userSelect: 'none', cursor: 'pointer', fontSize: `${checks ? '16px' : '14px'}`, opacity: `${checks ? '1' : '.6'}`}} >/Checks</a></div>

            {checks ? 
                <div id='mocha'>
                    <iframe
                    srcDoc={srcDoc}
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
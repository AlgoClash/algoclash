import React from 'react';

const FrontendFunction = (props) => {

  const frontendMethod = (param: string): string[] => {
    // should print passed in param 5 times and store in an array
    const concatArr: string[] = [];
    for (let i = 1; i <= 5; i += 1) {
      concatArr.push(<p>{param}</p>);
    }
    return concatArr;
  }

  let renderThis;
  // if props are passed in, run frontendMethod(), otherwise print 'Loading data...'
  props.displayText ? renderThis = frontendMethod(props.displayText): renderThis = <p>{'Loading data...'}</p>;

    return (
        <div className="testComponent">
            {renderThis}
        </div>
    );
}

export default FrontendFunction;
import React from 'react';

const Modal = (props) => {
    return (
        <div id='modalcontainer'>
            <div className='header'>{props.title}</div>
            <div id='contents'>{props.contents}</div>
        </div>
    );
}

export default Modal;
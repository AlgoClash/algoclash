import React, {useState} from 'react';

import Login from './Login';

const Navbar = (props) => {


    const createSignInModal = () => {
        props.createModal('Login/Sign Up', (<Login toggleModal={props.toggleModal} />));
    }

    const toggleTheme = () => {

        if (props.theme === 'dark')
            props.setTheme('light');
        if (props.theme === 'light')
            props.setTheme('');
        if (props.theme === '')
            props.setTheme('dark');
    }

    return (
        <div id='navbar'>
            <a href="/">Algo Clash</a>


            <h1>Room: {props.room}</h1>

            <div>
                <a onClick={createSignInModal} >Login/Sign Up</a>
                <a onClick={toggleTheme} >{`≡`}</a>
            </div>
        </div>
    );
}

export default Navbar;
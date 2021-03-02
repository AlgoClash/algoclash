import React, {useState} from 'react';
import {GoogleLogin} from 'react-google-login'
import GitHubLogin from 'react-github-login';

import {refreshTokenSetup} from '../utils/refreshToken'
import {clientIdGoogle} from '../utils/googleAuth'
import {githubClientId, githubRedirectURL} from '../utils/githubAuth'

const googleClientID = clientIdGoogle

const ghClientId = githubClientId
const redirectURL = githubRedirectURL

const Navbar = (props) => {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const submitButton = (e) => {
        e.preventDefault()
        console.log(username)
        // const body = {username: username, password: passwordState}
        // fetch('/user/signup', { method: 'POST', headers: { 'Content-Type': 'Application/JSON' }, body: JSON.stringify(body) })
        // .then(data => console.log('navbar verify user -------> ', data))
    }
    console.log(username, password)


    const onSuccessGoogle = (res) => {
        console.log('[Login Success] currentUser:', res.profileObj);
        refreshTokenSetup(res)
    }

    const onFailureGoogle = (res) => {
        console.log('[Login failed] res:', res);
    }

    const onSuccessGithub = (res) => {
        console.log('[Login Success] currentUser:', res);
    }
    
    const onFailureGithub = (res) => {
        console.log('[Login failed] res:', res);
    }


    const createSignInModal = () => {
        props.createModal('Login/Sign Up', (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}} >
            <h1 style={{fontFamily: 'monospace', fontSize: '16px', color: 'white'}} >Username</h1>
            <input type='text' onChange={e => setUserName(e.target.value)}/>

            <h1 style={{fontFamily: 'monospace', fontSize: '16px', color: 'white'}}>Password</h1>
            <input type='text' onChange={e => setPassword(e.target.value)} />
            <button onClick={submitButton} type='submit'>Confirm</button>

            <GoogleLogin 
                clientId={googleClientID}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
                onSuccess={onSuccessGoogle}
                onFailure={onFailureGoogle}
            />

            <GitHubLogin 
                clientId= {ghClientId}
                onSuccess={onSuccessGithub}
                onFailure={onFailureGithub}
                redirectUri={redirectURL}
            />
        </div>));
    }

    return (
        <div id='navbar'>
            <a href="/">Algo Clash</a>
            <a onClick={createSignInModal} >Login/Sign Up</a>
        </div>
    );
}

export default Navbar;
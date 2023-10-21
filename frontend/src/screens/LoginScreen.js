import React, { useState, useContext } from 'react';
import Footer from '../components/Footer';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../App';
import Toast from 'react-bootstrap/Toast';

const LoginScreen = () => {
    const { dispatch } = useContext(UserContext);
    const history = useHistory();
    const [email, setEmail] = useState('rowan@admin.com');
    const [password, setPassword] = useState('12345');
    const [show, setShow] = useState(false);
    const [tempData, setTempData] = useState('');

    const PostData = () => {
        if (
            // eslint-disable-next-line
            !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
        ) {
            setTempData('Invalid Email.');
            setShow(true);
            return;
        }
        fetch('/login', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.error) {
                    setTempData(data.error);
                    setShow(true);
                } else {
                    localStorage.setItem('jwt', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    dispatch({ type: 'USER', payload: data.user });
                    setTempData('Successfully Logged In.');
                    setShow(true);
                    history.push('/');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <>
            <div className='container d-flex flex-row justify-content-center' style={{ marginTop: ' 40px' }}>
                <div>
                    <img alt='' className='d-none d-md-block' src='https://i.ibb.co/5rWN32Q/welcome.png' style={{ height: ' 618px', marginRight: ' 29px' }} />
                </div>
                <div style={{ marginTop: ' 30px' }}>
                    <form
                        style={{
                            textAlign: ' center',
                            border: ' 1px solid rgb(219,219,219)',
                            borderBottomStyle: ' solid',
                            background: ' #ffffff',
                            padding: ' 15px',
                            width: ' 350px',
                            height: ' 377.8px',
                        }}
                    >
                        <Toast
                            style={{
                                fontSize: '0.7rem',
                                width: '258px',
                                zIndex: '100',
                                position: 'absolute',
                                marginTop: '65px',
                                marginLeft: '30px',
                            }}
                            bg='danger'
                            onClose={() => setShow(false)}
                            show={show}
                            delay={3000}
                            position='top-center'
                            autohide
                        >
                            <Toast.Header>
                                <strong className='me-auto'>{tempData}</strong>
                            </Toast.Header>
                        </Toast>
                        <img
                            alt=''
                            src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png'
                            style={{
                                width: ' 175px',
                                marginTop: ' 5px',
                                marginBottom: ' 30px',
                            }}
                        />
                        <input
                            type='text'
                            className='shadow-none form-control'
                            style={{
                                borderStyle: ' solid',
                                borderColor: ' rgb(219,219,219)',
                                background: ' rgb(249,249,249)',
                                color: ' rgb(142,142,142)',
                                fontSize: ' 12px',
                                margin: ' auto',
                                marginTop: ' 10px',
                                width: ' 258px',
                            }}
                            id='email'
                            name='email'
                            placeholder='Phone number, username or email address'
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                        <input
                            type='password'
                            className='shadow-none form-control'
                            style={{
                                color: ' rgb(142,142,142)',
                                background: ' rgb(250,250,250)',
                                borderStyle: ' solid',
                                borderColor: ' rgb(219,219,219)',
                                fontSize: ' 12px',
                                margin: ' auto',
                                marginTop: ' 5px',
                                width: ' 258px',
                            }}
                            placeholder='Password'
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        <button
                            className='btn btn-primary shadow-none'
                            type='button'
                            style={{
                                marginTop: ' 10px',
                                width: ' 258px',
                                background: ' #0095f6',
                                height: ' 29.6px',
                                paddingTop: ' 0px',
                                fontSize: ' 13px',
                            }}
                            onClick={() => PostData()}
                        >
                            Log In
                        </button>
                        <div
                            style={{
                                color: ' rgb(142,142,142)',
                                fontSize: ' 13px',
                                margin: ' auto',
                                marginTop: ' 15px',
                                width: ' 258px',
                            }}
                        >
                            <span style={{ marginRight: ' 5px' }}>------------------</span>
                            <span style={{ marginRight: ' 5px' }}>OR</span>
                            <span style={{ marginLeft: ' 5px' }}>
                                -------------------
                                <br />
                            </span>
                        </div>
                        <button
                            className='btn'
                            type='button'
                            style={{
                                marginTop: ' 15px',
                                width: ' 258px',
                                background: ' #ffffff',
                                height: ' 29.6px',
                                paddingTop: ' 0px',
                                color: ' #385185',
                                borderTopStyle: ' none',
                                fontSize: ' 14px',
                                fontWeight: ' bold',
                            }}
                        >
                            Log in with Facebook
                        </button>
                        <div
                            style={{
                                fontSize: ' 12px',
                                marginTop: ' 5px',
                                marginBottom: ' 0px',
                            }}
                        >
                            <span>Forgotten your Password?</span>
                        </div>
                    </form>
                    <form
                        style={{
                            textAlign: ' center',
                            border: ' 1px solid rgb(219,219,219)',
                            borderBottomStyle: ' solid',
                            background: ' #ffffff',
                            padding: ' 15px',
                            width: ' 350px',
                            height: ' 62.6px',
                            marginTop: ' 10px',
                        }}
                    >
                        <div
                            style={{
                                fontSize: ' 14px',
                                marginTop: ' 5px',
                                marginBottom: ' 0px',
                            }}
                        >
                            <span>Don't have an account?</span>
                            <span style={{ marginLeft: ' 5px' }}>
                                <Link to={`/register`} style={{ textDecoration: 'none', color: 'black' }}>
                                    Sign Up
                                </Link>
                            </span>
                        </div>
                    </form>
                    <form
                        style={{
                            textAlign: ' center',
                            background: ' rgb(250,250,250)',
                            padding: ' 7px',
                            width: ' 350px',
                            height: ' 100.8px',
                            marginTop: ' 10px',
                            border: ' 0px none rgb(219,219,219) ',
                            borderTopStyle: ' none',
                            borderBottomStyle: ' none',
                        }}
                    >
                        <div
                            style={{
                                fontSize: ' 14px',
                                marginTop: ' 5px',
                                marginBottom: ' 0px',
                            }}
                        >
                            <p>Get the app.</p>
                            <span>
                                <img
                                    alt=''
                                    src='https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png'
                                    style={{ width: ' 136px' }}
                                />
                            </span>
                            <span style={{ marginLeft: ' 5px' }}>
                                <img
                                    alt=''
                                    src='https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png'
                                    style={{ width: ' 136px' }}
                                />
                            </span>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default LoginScreen;

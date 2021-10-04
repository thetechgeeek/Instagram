import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <nav
        className='navbar navbar-light navbar-expand fixed-top d-flex flex-row align-content-center navigation-clean navbar-static-top'
        style={{
          paddingLeft: '16px',
          paddingRight: '16px',
          marginLeft: '0px',
          marginRight: '0px',
          // height: '52px',
          paddingTop: '0px',
          paddingBottom: '0px',
          borderBottom: '1px solid rgb(219,219,219)',
          width: '100%',
          //   position: 'fixed',
        }}
      >
        <div className='container'>
          <Link to={`/`}>
            <img
              className='navbar-brand'
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png'
              style={{ width: '110px' }}
            />
          </Link>
          <input
            type='text'
            className='placeholder d-none d-md-block'
            style={{
              background: 'rgb(250,250,250)',
              borderRadius: '3px',
              fontSize: '14px',
              textAlign: 'center',
              border: '1px solid rgb(219,219,219)',
              color: 'rgb(142,142,142)',
              height: '28px',
              width: '215px',
            }}
            placeholder='Search'
            autocomplete='off'
          />
          <div role='group' className='btn-group'>
            <Link
              className='btn d-none d-md-inline'
              role='button'
              style={{ height: '40.9px', background: '#ffffff' }}
              to={`/`}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='1em'
                height='1em'
                fill='currentColor'
                viewBox='0 0 16 16'
                className='bi bi-house-door'
                style={{ fontSize: '25px' }}
              >
                <path d='M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z'></path>
              </svg>
            </Link>
            <Link
              className='btn'
              type='button'
              style={{ background: '#ffffff' }}
              to={`/createpost`}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='1em'
                height='1em'
                fill='currentColor'
                viewBox='0 0 16 16'
                className='bi bi-plus-square'
                style={{ fontSize: '25px' }}
              >
                <path d='M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'></path>
                <path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z'></path>
              </svg>
            </Link>

            <Link
              className='btn d-none d-md-inline'
              role='button'
              style={{ height: '40.9px', background: '#ffffff' }}
              to={`/explore`}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='1em'
                height='1em'
                fill='currentColor'
                viewBox='0 0 16 16'
                className='bi bi-compass'
                style={{ fontSize: '25px' }}
              >
                <path d='M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016zm6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z'></path>
                <path d='m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z'></path>
              </svg>
            </Link>

            <div className='dropdown'>
              <button
                className='btn btn-primary shadow-none'
                aria-expanded='false'
                data-bs-toggle='dropdown'
                type='button'
                style={{
                  color: 'rgb(0,0,0)',
                  background: 'rgb(255,255,255)',
                  borderStyle: 'none',
                }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='1em'
                  height='1em'
                  fill='currentColor'
                  viewBox='0 0 16 16'
                  className='bi bi-person-circle'
                  style={{ fontSize: '25px' }}
                >
                  <path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z'></path>
                  <path
                    fill-rule='evenodd'
                    d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z'
                  ></path>
                </svg>
              </button>
              <div className='dropdown-menu' style={{ paddingBottom: '0px' }}>
                <Link className='dropdown-item' to={`/profile`}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='1em'
                    height='1em'
                    fill='currentColor'
                    viewBox='0 0 16 16'
                    className='bi bi-person-circle'
                    style={{ fontSize: '16px', marginRight: '10px' }}
                  >
                    <path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z'></path>
                    <path
                      fill-rule='evenodd'
                      d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z'
                    ></path>
                  </svg>
                  Profile
                </Link>
                <Link className='dropdown-item' to={'/profile/edit'}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='1em'
                    height='1em'
                    fill='currentColor'
                    viewBox='0 0 16 16'
                    class='bi bi-gear-wide'
                    style={{ fontSize: '16px', marginRight: '10px' }}
                  >
                    <path d='M8.932.727c-.243-.97-1.62-.97-1.864 0l-.071.286a.96.96 0 0 1-1.622.434l-.205-.211c-.695-.719-1.888-.03-1.613.931l.08.284a.96.96 0 0 1-1.186 1.187l-.284-.081c-.96-.275-1.65.918-.931 1.613l.211.205a.96.96 0 0 1-.434 1.622l-.286.071c-.97.243-.97 1.62 0 1.864l.286.071a.96.96 0 0 1 .434 1.622l-.211.205c-.719.695-.03 1.888.931 1.613l.284-.08a.96.96 0 0 1 1.187 1.187l-.081.283c-.275.96.918 1.65 1.613.931l.205-.211a.96.96 0 0 1 1.622.434l.071.286c.243.97 1.62.97 1.864 0l.071-.286a.96.96 0 0 1 1.622-.434l.205.211c.695.719 1.888.03 1.613-.931l-.08-.284a.96.96 0 0 1 1.187-1.187l.283.081c.96.275 1.65-.918.931-1.613l-.211-.205a.96.96 0 0 1 .434-1.622l.286-.071c.97-.243.97-1.62 0-1.864l-.286-.071a.96.96 0 0 1-.434-1.622l.211-.205c.719-.695.03-1.888-.931-1.613l-.284.08a.96.96 0 0 1-1.187-1.186l.081-.284c.275-.96-.918-1.65-1.613-.931l-.205.211a.96.96 0 0 1-1.622-.434L8.932.727zM8 12.997a4.998 4.998 0 1 1 0-9.995 4.998 4.998 0 0 1 0 9.996z'></path>
                  </svg>
                  Settings
                </Link>
                <hr style={{ marginBottom: '0px', marginTop: '0px' }} />
                <a className='dropdown-item' href='#'>
                  Log out
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <nav
        className='navbar navbar-light navbar-expand fixed-bottom d-flex flex-row justify-content-between navigation-clean d-block d-md-none'
        style={{
          paddingLeft: '16px',
          paddingRight: '16px',
          paddingTop: '0.4rem',
          paddingBottom: '0.4rem',
          marginLeft: '0px',
          marginRight: '0px',
          height: '52px',
          borderBottom: '1px solid rgb(219,219,219)',
          borderTop: '1px solid rgb(219,219,219)',
        }}
      >
        <div className='container'>
          <button
            className='btn'
            type='button'
            style={{ background: '#ffffff' }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='1em'
              height='1em'
              fill='currentColor'
              viewBox='0 0 16 16'
              className='bi bi-house-door'
              style={{ fontSize: '25px' }}
            >
              <path d='M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z' />
            </svg>
          </button>

          <button
            className='btn'
            type='button'
            style={{ background: '#ffffff' }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='1em'
              height='1em'
              fill='currentColor'
              viewBox='0 0 16 16'
              className='bi bi-search'
              style={{ fontSize: '25px' }}
            >
              <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
            </svg>
          </button>
          <button className='btn' type='button'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='1em'
              height='1em'
              fill='currentColor'
              viewBox='0 0 16 16'
              className='bi bi-compass'
              style={{ fontSize: '25px' }}
            >
              <path d='M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016zm6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z' />
              <path d='m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z' />
            </svg>
          </button>
          <button className='btn' type='button'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='1em'
              height='1em'
              fill='currentColor'
              viewBox='0 0 16 16'
              className='bi bi-person-circle'
              style={{ fontSize: '25px' }}
            >
              <path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z' />
              <path
                fillRule='evenodd'
                d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z'
              />
            </svg>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Header;

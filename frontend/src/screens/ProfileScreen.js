import React, { useEffect, useState, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loader from '../components/loader';
import { UserContext } from '../App';
import { Link } from 'react-router-dom';

const ProfileScreen = () => {
  const [myPosts, setMyPosts] = useState([]);
  const { state } = useContext(UserContext);
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  console.log(state);
  useEffect(() => {
    fetch('/myposts', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') },
    })
      .then((res) => res.json())
      .then((result) => setMyPosts(result.myPosts));
  }, []);

  const updateProfilePic = () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'instagram');
    data.append('cloud_name', 'thetechgeeek');
    fetch('	https://api.cloudinary.com/v1_1/thetechgeeek/image/upload', {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Header />
      {state ? (
        <div
          className='container text-center flex-row flex-grow-1 justify-content-center'
          style={{ marginTop: '70px' }}
        >
          <div
            className='row d-flex flex-column'
            style={{ maxWidth: '953px', margin: 'auto', marginTop: '15px' }}
          >
            <div className='col'>
              <div className='row'>
                <div
                  className='col-4 d-flex flex-column justify-content-start align-items-center'
                  style={{ paddingTop: '16px' }}
                >
                  <button
                    style={{
                      border: 'none',
                      backgroundColor: 'rgb(250,250,250)',
                    }}
                    onClick={() => updateProfilePic()}
                  >
                    <img
                      alt=''
                      className='rounded-circle img-fluid'
                      src={state.image}
                      style={{ maxWidth: '150px' }}
                    />
                  </button>
                </div>
                <div
                  className='col-8 text-start'
                  style={{ marginBottom: '20px' }}
                >
                  <div
                    className='d-flex d-sm-flex d-md-flex d-xl-flex flex-row align-items-start flex-wrap align-items-lg-center align-items-xl-center'
                    style={{ marginTop: '5px', marginBottom: '15px' }}
                  >
                    <div>
                      <h2
                        className='display-5 d-inline d-md-block'
                        style={{
                          fontSize: '28px',
                          marginRight: '15px',
                          marginTop: '2px',
                        }}
                      >
                        {state ? state.username : 'Loading...'}
                      </h2>
                    </div>
                    <div>
                      <button
                        className='btn btn-primary shadow-none'
                        type='button'
                        style={{
                          color: 'rgb(0,0,0)',
                          background: 'rgb(255,255,255)',
                          borderStyle: 'solid',
                          borderColor: 'rgb(219,219,219)',
                          borderTopStyle: 'solid',
                          marginRight: '10px',
                          paddingTop: '2px',
                          paddingBottom: '2px',
                        }}
                      >
                        <Link
                          style={{ textDecoration: 'none', color: 'black' }}
                          to={'/editprofile'}
                        >
                          Edit Profile
                        </Link>
                      </button>
                    </div>
                    <div></div>
                  </div>
                  <div
                    className='d-flex flex-row justify-content-start align-items-start d-none d-md-block'
                    style={{ marginBottom: '15px', textAlign: 'left' }}
                  >
                    <span style={{ marginRight: '10px' }}>
                      {myPosts.length} posts
                    </span>
                    <span style={{ marginRight: '10px' }}>
                      {state.followers.length} followers
                    </span>
                    <span>{state.following.length} following</span>
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <h6 style={{ marginBottom: '2px' }}>
                      {state ? state.name : 'Loading...'}
                    </h6>
                    <p>
                      {state.bio}
                      <br />
                    </p>
                  </div>
                </div>
                <div
                  className='col d-block d-md-none'
                  style={{
                    border: '1px solid rgb(219,219,219)',
                    borderRightStyle: 'none',
                    borderLeftStyle: 'none',
                    borderBottomStyle: 'none',
                  }}
                >
                  <div
                    className='d-flex flex-row justify-content-around'
                    style={{
                      marginRight: '10px',
                      paddingTop: '10px',
                      paddingBottom: '10px',
                    }}
                  >
                    <div>
                      <span className='d-inline-block'>
                        {myPosts.length} posts
                      </span>
                    </div>
                    <div>
                      <span className='d-inline-block'>
                        {state.followers.length} followers
                      </span>
                    </div>
                    <div>
                      <span className='d-inline-block'>
                        {state.following.length} following
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col'>
              <div className='row d-flex flex-column'>
                <div className='col'>
                  <div>
                    <ul
                      role='tablist'
                      className='nav nav-tabs d-flex flex-row justify-content-around'
                      style={{
                        padding: '1px',
                        borderStyle: 'none',
                        borderTop: '1px solid rgb(219,219,219)',
                        borderBottomStyle: 'none',
                      }}
                    >
                      <li role='presentation' className='nav-item'>
                        <a
                          role='tab'
                          data-bs-toggle='tab'
                          className='nav-link'
                          href='#tab-1'
                          style={{ borderStyle: 'none' }}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='1em'
                            height='1em'
                            fill='currentColor'
                            viewBox='0 0 16 16'
                            className='bi bi-grid-3x3'
                          >
                            <path d='M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13zM1.5 1a.5.5 0 0 0-.5.5V5h4V1H1.5zM5 6H1v4h4V6zm1 4h4V6H6v4zm-1 1H1v3.5a.5.5 0 0 0 .5.5H5v-4zm1 0v4h4v-4H6zm5 0v4h3.5a.5.5 0 0 0 .5-.5V11h-4zm0-1h4V6h-4v4zm0-5h4V1.5a.5.5 0 0 0-.5-.5H11v4zm-1 0V1H6v4h4z' />
                          </svg>
                          <span
                            className='text-uppercase d-none d-md-inline'
                            style={{ marginLeft: '10px', fontSize: '0.8rem' }}
                          >
                            Posts
                          </span>
                        </a>
                      </li>
                      <li role='presentation' className='nav-item'>
                        <a
                          role='tab'
                          data-bs-toggle='tab'
                          className='nav-link active'
                          href='#tab-2'
                          style={{ borderStyle: 'none' }}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='1em'
                            height='1em'
                            fill='currentColor'
                            viewBox='0 0 16 16'
                            className='bi bi-play-btn'
                            style={{ marginRight: '2px' }}
                          >
                            <path d='M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z' />
                            <path d='M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z' />
                          </svg>
                          <span
                            className='text-uppercase d-none d-md-inline'
                            style={{ marginLeft: '10px', fontSize: '0.8rem' }}
                          >
                            Reels
                          </span>
                        </a>
                      </li>
                      <li role='presentation' className='nav-item'>
                        <a
                          role='tab'
                          data-bs-toggle='tab'
                          className='nav-link'
                          href='#tab-3'
                          style={{ borderStyle: 'none' }}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='1em'
                            height='1em'
                            fill='currentColor'
                            viewBox='0 0 16 16'
                            className='bi bi-person-square'
                            style={{ marginRight: '2px' }}
                          >
                            <path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z' />
                            <path d='M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z' />
                          </svg>
                          <span
                            className='text-uppercase d-none d-md-inline'
                            style={{ marginLeft: '10px', fontSize: '0.8rem' }}
                          >
                            Tagged
                          </span>
                        </a>
                      </li>
                    </ul>
                    <div className='tab-content'>
                      <div
                        role='tabpanel'
                        className='tab-pane active'
                        id='tab-1'
                      >
                        <section
                          className='photo-gallery'
                          style={{ marginTop: '5px' }}
                        >
                          <div className='container'>
                            <div className='row photos' data-bss-baguettebox>
                              {myPosts ? (
                                myPosts.map((post) => (
                                  <div className='col-sm-6 col-md-4 col-lg-3 item'>
                                    <a href='desk.jpg'>
                                      <img
                                        alt=''
                                        className='img-fluid'
                                        src={post.image}
                                      />
                                    </a>
                                  </div>
                                ))
                              ) : (
                                <Loader />
                              )}
                            </div>
                          </div>
                        </section>
                      </div>
                      <div role='tabpanel' className='tab-pane mt-4' id='tab-2'>
                        <h5>This functionality is not included yet.</h5>
                      </div>
                      <div role='tabpanel' className='tab-pane mt-4' id='tab-3'>
                        <h5>This functionality is not included yet.</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ marginTop: '5rem' }}>
          <Loader />
        </div>
      )}
      <Footer />
    </>
  );
};
export default ProfileScreen;

import React, { useEffect, useState, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { UserContext } from '../App';
import { useParams } from 'react-router';
import Loader from '../components/loader';
const ProfileScreen = () => {
  const [userProfile, setUserProfile] = useState(null);

  const { state, dispatch } = useContext(UserContext);
  const { userId } = useParams();
  const [followButton, setFollowButton] = useState(
    state ? !state.following.includes(userId) : true
  );
  useEffect(() => {
    fetch(`/user/${userId}`, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') },
    })
      .then((res) => res.json())
      .then((result) => {
        setUserProfile(result);
      });
    setFollowButton(state ? !state.following.includes(userId) : true);
  }, [state]);

  const followUser = () => {
    fetch('/follow', {
      method: 'put',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({ followId: userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({
          type: 'UPDATE',
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem('user', JSON.stringify(data));
        setUserProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id],
            },
          };
        });
      });
    setFollowButton(false);
  };
  const unfollowUser = () => {
    fetch('/unfollow', {
      method: 'put',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({ unfollowId: userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({
          type: 'UPDATE',
          payload: { following: data.following, followers: data.following },
        });
        localStorage.setItem('user', JSON.stringify(data));
        setUserProfile((prevState) => {
          const newFollower = prevState.user.followers.filter(
            (item) => item !== data._id
          );

          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollower,
            },
          };
        });
        setFollowButton(true);
      });
  };
  return (
    <>
      <Header />

      {userProfile ? (
        <div
          className='container text-center flex-row flex-grow-1 justify-content-center'
          style={{ marginTop: '70px', height: '70vh' }}
        >
          <button type='button' className='btn btn-primary' id='liveToastBtn'>
            Show live toast
          </button>

          <div
            className='position-fixed bottom-0 end-0 p-3'
            style={{ zIndex: '11' }}
          >
            <div
              id='liveToast'
              className='toast hide'
              role='alert'
              aria-live='assertive'
              aria-atomic='true'
            >
              <div className='toast-header'>
                <img src='...' className='rounded me-2' alt='...' />
                <strong className='me-auto'>Bootstrap</strong>
                <small>11 mins ago</small>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='toast'
                  aria-label='Close'
                ></button>
              </div>
              <div className='toast-body'>
                Hello, world! This is a toast message.
              </div>
            </div>
          </div>
          <button
            type='button'
            className='btn btn-primary'
            data-bs-toggle='modal'
            data-bs-target='#exampleModal'
          >
            Launch demo modal
          </button>

          <div
            className='modal fade'
            id='exampleModal'
            tabindex='-1'
            role='dialog'
            aria-labelledby='exampleModalLabel'
            aria-hidden='true'
          >
            <div className='modal-dialog' role='document'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='exampleModalLabel'>
                    Modal title
                  </h5>
                  <button
                    type='button'
                    className='close'
                    data-dismiss='modal'
                    aria-label='Close'
                  >
                    <span aria-hidden='true'>&times;</span>
                  </button>
                </div>
                <div className='modal-body'>...</div>
                <div className='modal-footer'>
                  <button
                    type='button'
                    className='btn btn-secondary'
                    data-bs-dismiss='modal'
                  >
                    Close
                  </button>
                  <button type='button' className='btn btn-primary'>
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
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
                  <img
                    alt=''
                    className='rounded-circle img-fluid'
                    src={userProfile.user.image}
                    style={{ maxWidth: '150px' }}
                  />
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
                        {userProfile ? userProfile.user.username : <Loader />}
                      </h2>
                    </div>
                    <div>
                      {/* <button
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
                        Message
                      </button> */}
                      {followButton ? (
                        <button
                          className='btn btn-primary shadow-none'
                          style={{
                            marginRight: '10px',
                            paddingTop: '2px',
                            paddingBottom: '2px',
                          }}
                          onClick={() => followUser()}
                        >
                          Follow
                        </button>
                      ) : (
                        <button
                          className='btn btn-primary shadow-none'
                          style={{
                            marginRight: '10px',
                            paddingTop: '2px',
                            paddingBottom: '2px',
                          }}
                          onClick={() => unfollowUser()}
                        >
                          Unfollow
                        </button>
                      )}
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
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='1em'
                          height='1em'
                          fill='currentColor'
                          viewBox='0 0 16 16'
                          className='bi bi-person-check'
                        >
                          <path d='M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z' />
                          <path
                            fillRule='evenodd'
                            d='M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z'
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div
                    className='d-flex flex-row justify-content-start align-items-start d-none d-md-block'
                    style={{ marginBottom: '15px', textAlign: 'left' }}
                  >
                    <span style={{ marginRight: '10px' }}>
                      {userProfile.posts.length} posts
                    </span>
                    <span style={{ marginRight: '10px' }}>
                      {userProfile.user.followers.length} followers
                    </span>
                    <span>{userProfile.user.following.length} following</span>
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <h6 style={{ marginBottom: '2px' }}>
                      {userProfile.user.name}
                    </h6>
                    <p>
                      • 🇬🇧~rowanrow.com
                      <br />
                      •📍London | 1.5M+ YouTube subs
                      <br />• ⬇️ Get your 5000 QMiles&nbsp;
                      <a href='https://www.instagram.com/explore/tags/qatarairways/'>
                        #qatarairways
                      </a>
                      &nbsp;⬇️
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
                        {userProfile.posts.length} posts
                      </span>
                    </div>
                    <div>
                      <span className='d-inline-block'>
                        {userProfile.user.followers.length} followers
                      </span>
                    </div>
                    <div>
                      <span className='d-inline-block'>
                        {userProfile.user.following.length} following
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
                      <div role='tabpanel' className='tab-pane' id='tab-1'>
                        <section
                          className='photo-gallery'
                          style={{ marginTop: '5px' }}
                        >
                          <div className='container'>
                            <div className='row photos' data-bss-baguettebox>
                              {userProfile.posts.map((post) => (
                                <div className='col-sm-6 col-md-4 col-lg-3 item'>
                                  <a href='desk.jpg'>
                                    <img
                                      alt=''
                                      className='img-fluid'
                                      src={post.image}
                                    />
                                  </a>
                                </div>
                              ))}
                              <div className='col-sm-6 col-md-4 col-lg-3 item'>
                                <a href='building.jpg'>
                                  <img
                                    alt=''
                                    className='img-fluid'
                                    src='https://images.unsplash.com/photo-1599850929872-2dec3cbafd7f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3F1YXJlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                                  />
                                </a>
                              </div>
                              <div className='col-sm-6 col-md-4 col-lg-3 item'>
                                <a href='loft.jpg'>
                                  <img
                                    alt=''
                                    className='img-fluid'
                                    src='https://images.unsplash.com/photo-1599850929872-2dec3cbafd7f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3F1YXJlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                                  />
                                </a>
                              </div>
                              <div className='col-sm-6 col-md-4 col-lg-3 item'>
                                <a href='building.jpg'>
                                  <img
                                    alt=''
                                    className='img-fluid'
                                    src='https://images.unsplash.com/photo-1599850929872-2dec3cbafd7f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3F1YXJlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                                  />
                                </a>
                              </div>
                              <div className='col-sm-6 col-md-4 col-lg-3 item'>
                                <a href='loft.jpg'>
                                  <img
                                    alt=''
                                    className='img-fluid'
                                    src='https://images.unsplash.com/photo-1599850929872-2dec3cbafd7f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3F1YXJlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                                  />
                                </a>
                              </div>
                              <div className='col-sm-6 col-md-4 col-lg-3 item'>
                                <a href='desk.jpg'>
                                  <img
                                    alt=''
                                    className='img-fluid'
                                    src='https://images.unsplash.com/photo-1599850929872-2dec3cbafd7f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3F1YXJlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                                  />
                                </a>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                      <div
                        role='tabpanel'
                        className='tab-pane active'
                        id='tab-2'
                      >
                        <p>Content for tab 2.</p>
                      </div>
                      <div role='tabpanel' className='tab-pane' id='tab-3'>
                        <p>Content for tab 3.</p>
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

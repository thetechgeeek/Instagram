import React, { useEffect, useState, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { UserContext } from '../App';

const ProfileScreen = () => {
  const [myPosts, setMyPosts] = useState([]);
  const { state } = useContext(UserContext);
  useEffect(() => {
    fetch('/myposts', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') },
    })
      .then((res) => res.json())
      .then((result) => setMyPosts(result.myPosts));
  }, []);
  return (
    <>
      <Header />
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
                <img
                  alt=''
                  className='rounded-circle img-fluid'
                  src='data:image/jpeg;base64,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'
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
                      Message
                    </button>
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
                        className='bi bi-three-dots'
                        style={{ color: 'rgb(0,0,0)' }}
                      >
                        <path d='M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z' />
                      </svg>
                    </button>
                    <div className='dropdown-menu'>
                      <a className='dropdown-item' href={`/editProfile`}>
                        First Item
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className='d-flex flex-row justify-content-start align-items-start d-none d-md-block'
                  style={{ marginBottom: '15px', textAlign: 'left' }}
                >
                  <span style={{ marginRight: '10px' }}>1624 posts</span>
                  <span style={{ marginRight: '10px' }}>1.4m followers</span>
                  <span>2 following</span>
                </div>
                <div style={{ textAlign: 'left' }}>
                  <h6 style={{ marginBottom: '2px' }}>
                    {state ? state.name : 'Loading...'}
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
                    <span className='d-inline-block'>1624 posts</span>
                  </div>
                  <div>
                    <span className='d-inline-block'>1.4m followers</span>
                  </div>
                  <div>
                    <span className='d-inline-block'>2 following</span>
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
                            {myPosts.map((post) => (
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
                    <div role='tabpanel' className='tab-pane active' id='tab-2'>
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
      <Footer />
    </>
  );
};
export default ProfileScreen;

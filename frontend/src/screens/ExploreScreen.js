import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import Loader from '../components/loader';

const HomeScreen = () => {
  const [data, setData] = useState(null);
  const { state } = useContext(UserContext);

  useEffect(() => {
    fetch('/allposts', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result.posts);
      });
  }, []);

  const likePost = (id) => {
    fetch('/like', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      });
  };

  const unlikePost = (id) => {
    fetch('/unlike', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //   console.log(result)
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const makeComment = (text, postId) => {
    fetch('/comment', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePost = (postId) => {
    fetch(`/deletepost/${postId}`, {
      method: 'delete',
      headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Header />

      <div className='container'>
        <div className='row' style={{ marginTop: '70px' }}>
          <div className='col-lg-8 col-md-12 align-self-center'>
            {data ? (
              data.map((post) => (
                <div
                  className='card'
                  style={{
                    maxWidth: ' 614px',
                    border: ' 1px solid rgb(219,219,219)',
                    marginLeft: 'auto',
                    marginBottom: '25px',
                  }}
                >
                  <div>
                    <div
                      className='row d-flex flex-row flex-nowrap'
                      style={{ maxHeight: ' 60px' }}
                    >
                      <div
                        className='col-1 d-flex flex-row justify-content-center align-items-center align-items-md-center'
                        style={{
                          padding: ' auto',
                          paddingLeft: ' 42px',
                          paddingRight: ' 19px',
                        }}
                      >
                        <Link
                          to={
                            post.postedBy._id !== state._id
                              ? `/profile/${post.postedBy._id}`
                              : `/profile`
                          }
                        >
                          <img
                            alt=''
                            className='rounded-circle'
                            style={{ height: ' 32px', width: ' 32px' }}
                            src={`${post.image}`}
                          />
                        </Link>
                      </div>
                      <div
                        className='col-10 d-flex flex-column justify-content-center'
                        style={{ paddingLeft: '10px' }}
                      >
                        <p
                          style={{
                            marginBottom: ' 0px',
                            fontSize: ' 14px',
                            fontWeight: ' bold',
                            marginTop: ' 10px',
                          }}
                        >
                          <Link
                            style={{ textDecoration: 'none', color: 'black' }}
                            to={
                              post.postedBy._id !== state._id
                                ? `/profile/${post.postedBy._id}`
                                : `/profile`
                            }
                          >
                            {post.postedBy.username}
                          </Link>
                        </p>
                        <p style={{ marginTop: ' 0px', fontSize: ' 12px' }}>
                          {post.location}
                        </p>
                      </div>
                      <div className='col-1 d-flex flex-row justify-content-end align-items-center'>
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
                              marginRight: '8px',
                            }}
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='1em'
                              height='1em'
                              fill='currentColor'
                              viewBox='0 0 16 16'
                              className='bi bi-three-dots'
                              style={{ fontSize: ' 24px' }}
                            >
                              <path d='M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z' />
                            </svg>
                          </button>
                          <div className='dropdown-menu'>
                            {post.postedBy._id === state._id && (
                              <a
                                type='button'
                                className='dropdown-item'
                                onClick={() => deletePost(post._id)}
                              >
                                Delete Post
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link to={`/post/${post._id}`}>
                    <img
                      alt=''
                      className='card-img w-100 d-block border rounded-0'
                      src={post.image}
                      style={{
                        marginRight: ' 0px',
                        borderStyle: ' none !important',
                      }}
                    />
                  </Link>
                  <div>
                    <div
                      className='d-flex flex-row justify-content-between'
                      style={{
                        paddingLeft: ' 15px',
                        paddingRight: ' 15px',
                        paddingTop: '10px',
                        paddingBottom: '10px',
                        fontSize: ' 24px',
                        borderTop: ' 1px solid rgb(219,219,219)',
                        marginTop: '0px',
                        marginBottom: '1px',
                      }}
                    >
                      <span>
                        {post.likes.includes(state._id) ? (
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='1em'
                            height='1em'
                            fill='red'
                            viewBox='0 0 16 16'
                            className='bi bi-heart-fill'
                            onClick={() => unlikePost(post._id)}
                            style={{ marginRight: '16px', marginTop: '2px' }}
                          >
                            <path
                              fill-rule='evenodd'
                              d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z'
                            ></path>
                          </svg>
                        ) : (
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='1em'
                            height='1em'
                            fill='currentColor'
                            viewBox='0 0 16 16'
                            className='like bi bi-heart'
                            onClick={() => likePost(post._id)}
                            style={{
                              marginRight: ' 16px',
                              marginTop: ' 2px',
                            }}
                          >
                            <path d='m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z'></path>
                          </svg>
                        )}

                        <label for={`comment-focus-${post._id}`}>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='1em'
                            height='1em'
                            fill='currentColor'
                            viewBox='0 0 16 16'
                            className='bi bi-chat'
                            style={{ marginRight: ' 16px' }}
                          >
                            <path d='M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z'></path>
                          </svg>
                        </label>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='1em'
                          height='1em'
                          fill='currentColor'
                          viewBox='0 0 16 16'
                          className='bi bi-cursor'
                        >
                          <path d='M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103zM2.25 8.184l3.897 1.67a.5.5 0 0 1 .262.263l1.67 3.897L12.743 3.52 2.25 8.184z'></path>
                        </svg>
                      </span>
                      <span>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='1em'
                          height='1em'
                          fill='currentColor'
                          viewBox='0 0 16 16'
                          className='bi bi-bookmark'
                        >
                          <path d='M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z'></path>
                        </svg>
                      </span>
                    </div>
                    <div
                      style={{
                        paddingRight: ' 15px',
                        paddingLeft: ' 15px',
                        marginBottom: ' 5px',
                        fontSize: ' 14px',
                        marginTop: '-2px',
                      }}
                    >
                      <span style={{ fontWeight: ' bold' }}>
                        {post.likes.length} likes
                      </span>
                    </div>
                    <div
                      style={{
                        paddingRight: ' 15px',
                        paddingLeft: ' 15px',
                        fontSize: ' 14px',
                      }}
                    >
                      <span style={{ fontWeight: ' bold' }}>
                        {post.postedBy.username}
                      </span>
                      <span style={{ marginLeft: ' 5px' }}>{post.caption}</span>
                    </div>
                    <div
                      style={{
                        paddingRight: ' 15px',
                        paddingLeft: ' 15px',
                        fontSize: ' 14px',
                      }}
                    >
                      <button
                        className='btn'
                        type='button'
                        style={{
                          padding: ' 0px',
                          paddingTop: ' 0px',
                          marginBottom: '-5px',
                          marginTop: '-5px',
                          paddingBottom: ' 0px',
                          color: ' rgb(142,142,142)',
                          fontSize: ' 14px',
                          background: '#ffffff',
                        }}
                      >
                        View all comments
                      </button>
                      <div
                        style={{
                          padding: ' 0px',
                          paddingRight: ' 0px',
                          paddingLeft: ' 0px',
                        }}
                      >
                        {post.comments.map((comment) => (
                          <div>
                            <span style={{ fontWeight: ' bold' }}>
                              {comment.postedBy.username}
                            </span>
                            <span style={{ marginLeft: ' 5px' }}>
                              {comment.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div
                      className='text-uppercase'
                      style={{
                        paddingRight: ' 0px',
                        paddingLeft: ' 15px',
                        marginTop: ' 5px',
                        color: ' rgb(142,142,142)',
                        fontSize: ' 12px',
                      }}
                    >
                      <span style={{ marginLeft: ' 0px', fontSize: ' 10px' }}>
                        2 DAYS AGO
                      </span>
                    </div>
                    <div
                      className='input-group'
                      style={{
                        marginTop: ' 7px',
                        padding: ' 4px',
                        borderTop: ' 0.5px solid rgb(219,219,219)',
                        paddingTop: ' 10px',
                        paddingBottom: ' 10px',
                      }}
                    >
                      <span
                        className='input-group-text'
                        style={{
                          background: ' rgb(255,255,255)',
                          borderStyle: ' none',
                          borderTopStyle: ' none',
                          borderTopColor: ' rgb(142,142,142)',
                        }}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='1em'
                          height='1em'
                          fill='currentColor'
                          viewBox='0 0 16 16'
                          className='bi bi-emoji-smile'
                          style={{ fontSize: ' 24px' }}
                        >
                          <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z'></path>
                          <path d='M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z'></path>
                        </svg>
                      </span>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          console.log(e);
                          makeComment(e.target[0].value, post._id);
                        }}
                      >
                        <input
                          type='text'
                          id={`comment-focus-${post._id}`}
                          className='shadow-none form-control'
                          style={{
                            borderStyle: ' none',
                            borderTopStyle: ' none',
                            borderTopsColor: ' rgb(142,142,142)',
                            fontSize: ' 16px',
                          }}
                          placeholder='Add a comment...'
                        />
                        <button
                          className='btn'
                          type='button'
                          style={{ background: ' #ffffff', fontSize: ' 16px' }}
                        >
                          Post
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <Loader />
            )}
          </div>
          <div className='col-lg-4 d-none d-lg-block'>
            <div style={{ position: 'fixed', width: '20%' }}>
              <div style={{ marginTop: '20px' }}>
                <div
                  className='row d-flex flex-row flex-nowrap'
                  style={{ maxHeight: ' 60px' }}
                >
                  <div
                    className='col-1 d-flex flex-row justify-content-center align-items-center align-items-md-center'
                    style={{
                      padding: ' auto',
                      paddingLeft: ' 42px',
                      paddingRight: ' 19px',
                    }}
                  >
                    <img
                      alt=''
                      className='rounded-circle'
                      style={{ height: ' 56px', width: ' 56px' }}
                      src='https://media-exp1.licdn.com/dms/image/C4E0BAQHikN6EXPd23Q/company-logo_200_200/0/1595359131127?e=2159024400&v=beta&t=S5MNjBDjiH433VCWzjPeiopNDhxGwmfcMk4Zf1P_m_s'
                    />
                  </div>
                  <div
                    className='col-8 d-flex flex-column justify-content-center'
                    style={{ paddingLeft: '20px' }}
                  >
                    <p
                      style={{
                        marginBottom: ' 0px',
                        fontSize: ' 14px',
                        fontWeight: ' bold',
                        marginTop: ' 10px',
                      }}
                    >
                      {state ? state.username : 'Loading...'}
                    </p>
                    <p style={{ marginTop: ' 0px', fontSize: ' 12px' }}>
                      {state ? state.name : 'Loading...'}
                    </p>
                  </div>
                  <div className='col-3 d-flex flex-row justify-content-start align-items-center'>
                    <a
                      className='btn'
                      type='button'
                      href='/profile/edit'
                      style={{ background: ' #ffffff', fontSize: ' 16px' }}
                    >
                      Edit
                    </a>
                  </div>
                </div>
              </div>
              {/*  */}
              <div>
                <div style={{ marginTop: '20px' }}>
                  <div
                    className='row d-flex flex-row flex-nowrap'
                    style={{ maxHeight: ' 60px' }}
                  >
                    <div
                      className='col-9 d-flex flex-column justify-content-center'
                      style={{ paddingLeft: '15px' }}
                    >
                      <p
                        style={{
                          marginBottom: ' 0px',
                          fontSize: ' 14px',

                          marginTop: ' 10px',
                        }}
                      >
                        Suggestions for you
                      </p>
                    </div>
                    <div className='col-3 d-flex flex-row justify-content-start align-items-center'>
                      <button
                        className='btn'
                        type='button'
                        style={{
                          background: ' #ffffff',
                          fontSize: ' 14px',
                          marginLeft: '20px',
                        }}
                      >
                        View All
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div style={{ marginTop: '5px' }}>
                  <div
                    className='row d-flex flex-row flex-nowrap'
                    style={{ maxHeight: ' 60px' }}
                  >
                    <div
                      className='col-1 d-flex flex-row justify-content-center align-items-center align-items-md-center'
                      style={{
                        padding: 'auto',
                        paddingLeft: ' 32px',
                      }}
                    >
                      <img
                        alt=''
                        className='rounded-circle'
                        style={{ height: ' 36px', width: ' 36px' }}
                        src='https://media-exp1.licdn.com/dms/image/C4E0BAQHikN6EXPd23Q/company-logo_200_200/0/1595359131127?e=2159024400&v=beta&t=S5MNjBDjiH433VCWzjPeiopNDhxGwmfcMk4Zf1P_m_s'
                      />
                    </div>
                    <div
                      className='col-8 d-flex flex-column justify-content-center'
                      style={{ paddingLeft: '15px' }}
                    >
                      <p
                        style={{
                          marginBottom: ' 0px',
                          fontSize: ' 14px',
                          fontWeight: ' bold',
                          marginTop: ' 10px',
                        }}
                      >
                        rowanrow
                      </p>
                      <p style={{ marginTop: ' 0px', fontSize: ' 12px' }}>
                        Rowan Row
                      </p>
                    </div>
                    <div className='col-3 d-flex flex-row justify-content-start align-items-center'>
                      <button
                        className='btn'
                        type='button'
                        style={{ background: ' #ffffff', fontSize: ' 14px' }}
                      >
                        Follow
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;

import React, { useEffect, createContext, useReducer, useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import ExploreScreen from './screens/ExploreScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import CreatePostScreen from './screens/CreatePostScreen';
import { reducer, initialState } from './reducers/userReducer';
export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch({ type: 'USER', payload: user });
    } else {
      history.push('/login');
    }
  }, [dispatch, history]);
  return (
    <>
      <Route path='/' component={HomeScreen} exact />
      <Route path='/explore' component={ExploreScreen} exact />
      <Route path='/register' component={RegisterScreen} />
      <Route path='/login' component={LoginScreen} />
      <Route path='/profile' component={ProfileScreen} exact />
      <Route path='/editprofile' component={EditProfileScreen} exact />
      <Route path='/profile/:userId' component={UserProfileScreen} exact />
      <Route path='/post/create' component={CreatePostScreen} exact />
    </>
  );
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <Routing />
      </Router>
    </UserContext.Provider>
  );
}

export default App;

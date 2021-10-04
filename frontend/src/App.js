import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';

function App() {
  return (
    <Router>
      <Route path='/' component={HomeScreen} exact />
      <Route path='/register' component={RegisterScreen} exact />
      <Route path='/login' component={LoginScreen} exact />
      <Route path='/profile' component={ProfileScreen} exact />
    </Router>
  );
}

export default App;

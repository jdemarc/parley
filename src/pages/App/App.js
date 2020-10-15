import React, { useState } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from '../LoginPage';
import SignupPage from '../SignupPage';
import Dashboard from '../Dashboard';
import userService from '../../utils/userService';
import AuthPage from '../AuthPage';
import ProfilePage from '../ProfilePage';
import ProfileEditForm from '../../components/ProfileEditForm';

// class App extends Component {}
const App = () => {
  const [user, setUser] = useState(null)

  const handleSignupOrLogin = () => {
    setUser(userService.getUser())
  }

  const handleLogout = () => {
    userService.logout();
    setUser(null);
  }

  return (
    <div>
      <Switch>
        <Route exact path='/' render={() =>
          <AuthPage />
        }/>

        <Route exact path='/dashboard' render={() =>
          userService.getUser() ? 
            <Dashboard
              user={user}
              handleLogout={handleLogout}
            />
            :
            <Redirect to='/' />
        }/>

        <Route exact path="/signup" render={({ history }) => 
          <SignupPage
            history={history}
            handleSignupOrLogin={handleSignupOrLogin}
          />
        }/>

        <Route exact path="/login" render={({ history }) => 
          <LoginPage
            history={history}
            handleSignupOrLogin={handleSignupOrLogin}
          />
        }/>

        <Route exact path="/profile" render={({history}) =>
          userService.getUser() ? 
            <ProfilePage
              user={user}
              history={history}
            />
            :
            <Redirect to='/' />
        }/>

        <Route exact path="/edit-profile" render={({history}) =>
          userService.getUser() ?
            <ProfileEditForm
              user={user}
              history={history}
            />
            :
            <Redirect to='/' />
        }/>

      </Switch>

    </div>
  );
}

export default App;

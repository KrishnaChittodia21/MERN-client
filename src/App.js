import React, { useEffect, createContext, useReducer, useContext } from 'react';
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom';
import NavBar from './components/Navbar';
import { Home, Profile, SignUp, Login, CreatePost } from './components/screens'
import { reducer, initialState } from './reducers/userReducer'
import './App.css';

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const [state, dispatch] = useContext(UserContext);
  useEffect(() => {
    const user = localStorage.getItem('user');
    if(user) {
      dispatch({type: 'USER', payload: user})
      history.push('/')
    }else {
      history.push('/login');
    }
  }, [])
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/create">
        <CreatePost />
      </Route>
    </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
    
  );
}

export default App;

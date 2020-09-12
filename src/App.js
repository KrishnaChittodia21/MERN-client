import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import NavBar from './components/Navbar';
import { Home, Profile, SignUp, Login, CreatePost } from './components/screens'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
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
    </BrowserRouter>
  );
}

export default App;

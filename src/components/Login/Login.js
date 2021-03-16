
import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { initializeLoginFramework, handelGoogleSignIn, handelSignOut, handleFbSignIn, signInWithEmailAndPassword } from './loginManager'
import { createUserWithEmailAndPassword } from './loginManager';

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  let history = useHistory();
  let location = useLocation();
  // let auth = useAuth();

  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handelGoogleSignIn()
      .then(res => {
        handleResponse(res, true)

      })
  }
  const signOut = () => {
    handelSignOut()
      .then(res => {
        handleResponse(res, false)
      })
  }

  const fbSignIn = () => {
    handleFbSignIn()
      .then(res => {
        handleResponse(res, true)
      })
  }

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
   redirect && history.replace(from);
  }

  const handelChange = (e) => {
    let isFieldValid = true;
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)

    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value)
      isFieldValid = isPasswordValid && passwordHasNumber;
      // console.log(isPasswordValid, passwordHasNumber);
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };
  const handelSubmit = (e) => {
    // console.log(user.email, user.password)
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(res => {
          handleResponse(res, true)

        })
    }
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.name, user.password)
        .then(res => {
          handleResponse(res, true)
        })
    }
    e.preventDefault();
  };



  return (
    <div style={{ textAlign: 'center' }}>
      {
        user.isSignedIn ? <button onClick={signOut}>Sign out</button>
          : <button onClick={googleSignIn}>Sign in</button>
      }
      <br />
      <button onClick={fbSignIn}>sign in using facebook</button>
      {
        user.isSignedIn &&
        <div>
          <p>Welcome {user.name}</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }

      <h1>Our own authentication system</h1>

      <form onSubmit={handelSubmit}>
        <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
        <label htmlFor="newUser">New User sign up</label><br />
        {newUser && <input name="name" type="text" placeholder="your name" onBlur={handelChange} required />}<br />
        <input type="text" name="email" onBlur={handelChange} placeholder="your email address" required /><br />
        <input type="password" name="password" onBlur={handelChange} placeholder="your password" required /><br />
        <input type="submit" value="submit" />
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {
        user.success && <p style={{ color: 'green' }}>Success! {newUser ? 'created' : 'login'}</p>
      }
    </div>
  );
}

export default Login;

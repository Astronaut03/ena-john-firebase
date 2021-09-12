
import { useContext, useState } from 'react';

import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
import { createUserWithEmailAndPasswords, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPasswords } from './loginManager';





function Login() {
  const[newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name:'',
    email:'',
    password:'',
    photo:'',
    error:'',
    success: false
  });


initializeLoginFramework();

const [loggedInUser, setLoggedInUser] = useContext(UserContext);
const history = useHistory();
const location = useLocation();
let {from} = location.state || {from: {pathname: "/"}};

const googleSignIn = () => {
  handleGoogleSignIn()
  .then(res => {
    setUser(res);
    setLoggedInUser(res);
    history.replace(from);
  })
}

const fbSignIn = ()=>{
  handleFbSignIn()
  .then(res => {
    setUser(res);
    setLoggedInUser(res);
    history.replace(from);
  })
}

const signOut = () =>{
  handleSignOut()
  .then(res => {
    setUser(res);
    setLoggedInUser(res);
  })

}

const handleBlur =(e) =>{
let isFormValid = true;
//console.log(e.target.name, e.target.value);
if(e.target.name === 'email'){
isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
  // const isEmailValid = /\S+@\S+\.\S+/.test(e.target.value);
  // console.log(isEmailValid)
}
if (e.target.name === 'password'){
  const isPasswordValid = e.target.value.length > 6;
  const passwordHasNumber = /\d{1}/.test(e.target.value);
  isFormValid = isPasswordValid && passwordHasNumber;
}
if (isFormValid){
  const newUserInfo = {...user};
  newUserInfo[e.target.name] = e.target.value;
  setUser(newUserInfo); 
}
}
const handleSubmit =(e) =>{
// console.log(user.email, user.password);

 if(newUser && user.email && user.password){
    createUserWithEmailAndPasswords(user.name, user.email, user.password)
    .then(res =>{
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
    })
 }

if (!newUser && user.email && user.password){
  signInWithEmailAndPasswords(user.email, user.password)
  .then(res =>{
    setUser(res);
    setLoggedInUser(res);
    history.replace(from);
  })
}

e.preventDefault();
}



  return (
    <div style={{textAlign: 'center'}}>
    {
      user.isSignedIn ? <button onClick={signOut}>Sign out</button> :
      <button onClick={googleSignIn}>Sign in</button>
    }
    <br />
    <button onClick ={fbSignIn}>login in using Facebook</button>
    
      {
        user.isSignedIn && <div>
          <p>Welcome , {user.name}</p>
          <p>Your Email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }

    
    <h1> Our Own Authentication</h1>
    {/* <p>User Name: {user.name}</p>
    <p>Email: {user.email}</p>
    <p>Password:{user.password}</p> */}
    <input type="checkbox" onChange={()=> setNewUser (!newUser)} name="newUser" id="" />
    <label htmlFor="newUser">New User Sign up</label>
    <form onSubmit ={handleSubmit}>
    {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder ="Your name" required/>}
    <br />
    <input type="text" name="email" onBlur={handleBlur} placeholder ="Your email holder" required/>
    <br />
    <input type="password" name="password" onBlur={handleBlur}  placeholder="Your password" required/>
    <br />
    {/* <button>Submit</button> */}
    <input type="submit" value={newUser ? 'Sign up' : 'Sign in'} />
    </form>
    <p style={{color: 'red'}}>{user.error}</p>

    {user.success && <p style={{color: 'green'}}>User {newUser ? 'created' : 'Logged In'} successfully</p>}

    </div>
  );
}

export default Login;

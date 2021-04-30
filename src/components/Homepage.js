import React from 'react';
import GoogleLogin from "react-google-login";
import { useDispatch, useSelector } from 'react-redux';
import { selectSignedIn, setSignedIn, setUserData } from '../features/UserSlice';

import "../styles/home.css";

const Homepage = () => {
     const dispatch = useDispatch();
     const login = (response) => {
         console.log(response);
         dispatch(setSignedIn(true));
         dispatch(setUserData(response.profileObj));

     }

     const isSignedIn = useSelector(selectSignedIn);
     return(
         <div className="home__page" style={{ display: isSignedIn ? "none" : "" }}>
            {!isSignedIn && (
            <div className="login__message">
                  <h1>sdf</h1>
                  <h2>HIANPE</h2>
                  <p>
                      sdffsdfdfdsfsdfdsf
                  </p>
                  <GoogleLogin 
                   clientId="663738000319-lskuvi38c343nfs5gl7o6tlj762812js.apps.googleusercontent.com"
                   render={(renderProps) => (
                       <button onClick={renderProps.onClick} 
                               disabled={renderProps.disabled} 
                               className="login__button" >
                           Connexion avec compte Google
                       </button>
                   )}
                   onSuccess={login}
                   onFailure={login}
                   isSignedIn={true}
                   cookiePolicy={"single_host_origin"}
                  />
             </div>
             )};
         </div>
     );
};

export default Homepage;
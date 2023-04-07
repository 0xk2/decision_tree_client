import { GoogleLogin, GoogleOAuthProvider, TokenResponse, googleLogout, useGoogleLogin } from "@react-oauth/google"
import VoteForm from "../../components/VoteForm";
import { useEffect, useState } from "react";
import axios from "axios";

type Props = {
  children?: React.ReactNode,
}

const GoogleProvider : React.FC<Props> = ({children}) => {
  return (
    <GoogleOAuthProvider clientId="653962216255-dhs8b8tuvbq5c8ugn9o25pjh77hcqj46.apps.googleusercontent.com">
      {children}
      <Profile />
    </GoogleOAuthProvider>
  )
}

type Profile = {
  email: string,
  name: string,
  picture: string,
}

const Profile: React.FC = () => {
  const [ accessToken, setAccessToken ] = useState("");
  const [ profile, setProfile ] = useState({} as Profile);

  const login = useGoogleLogin({
    onSuccess: (codeResponse: TokenResponse) => {
      setAccessToken(codeResponse.access_token)
    },
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(
    () => {
      console.log("accessToken: ",accessToken)
      if (accessToken !== "") {
        axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json'
          }
        })
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
      }
    },
    [ accessToken ]
  );

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile({} as Profile);
  };
  console.log("email: ",profile.email)
  return (
    <div>
      {profile.email !== undefined ? (
        <div>
          <div>
            <img src={profile.picture} alt="user" style={{verticalAlign:"top", marginRight: "10px"}}  />
            <div style={{display:"inline-block"}}>
              <p>Name: {profile.name}</p>
              <p>Email Address: {profile.email}</p>
              <button onClick={logOut}>Log out</button>
            </div>
          </div>
          <VoteForm provider="google" identity={profile.email} />
        </div>
      ) : (
        <button onClick={() => login()}>Sign in with Google 🚀 </button>
      )}
    </div>
  );
}


export default GoogleProvider
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "./components/Header";
import Homepage from "./components/Homepage";
import Main from "./components/Main";

function App() {
  const [token, setToken] = useState("");
  const [info, setInfo] = useState(false);

  // Spotify API Authorization
  const CLIENT_ID = "345e769ef981466e9ee4f8588d86175c";
  const REDIRECT_URI = "https://setlistener.onrender.com/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPE = "playlist-modify-private";

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  // Logout button
  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  // Info Button
  const infoClickHandler = () => {
    setInfo(!info);
  };

  return (
    <Router>

      <Header
        onLogout={logout}
        token={token}
        infoClickHandler={infoClickHandler}
      />

      {!token && (
        <Homepage
          CLIENT_ID={CLIENT_ID}
          REDIRECT_URI={REDIRECT_URI}
          AUTH_ENDPOINT={AUTH_ENDPOINT}
          RESPONSE_TYPE={RESPONSE_TYPE}
          SCOPE={SCOPE}
          token={token}
          info={info}
          infoClickHandler={infoClickHandler}
        />
      )}

      {token && <Main token={token} />
    
     }
     
    </Router>
  );
}

export default App;

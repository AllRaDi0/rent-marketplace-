import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
    <div className="App">
      <Router>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/createpost">CreatePost</Link>
          {!isAuth ? (
            <Link to="/login">Login</Link>
          ) : (
            <button onClick={signUserOut}>Log Out</button>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<Home isAuth={isAuth} />}></Route>
          <Route
            path="/createpost"
            element={<CreatePost isAuth={isAuth} />}
          ></Route>
          <Route
            path="/login"
            element={<Login setIsAuth={setIsAuth} />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

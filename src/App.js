import React, { useState } from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

//toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

//router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//firebase
import firebase from "firebase/app";
import "firebase/auth";

//components
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PageNotFound from "./pages/PageNotFound";
import { UserContext } from "./context/UserContext";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";

import firebaseConfig from "./Config/firebaseConfig";

//init firebase
firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <ToastContainer />
      <UserContext.Provider value={{ user, setUser }}>
          <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="*" component={PageNotFound} />
        </Switch>
          <Footer />
      </UserContext.Provider>
    </Router>
  );
}

export default App;

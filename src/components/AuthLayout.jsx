import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    //TODO: make it more easy to understand

    //NOTE: THIS IS ALSO READABLE
    // if (authStatus ===true){
    //     navigate("/")
    // } else if (authStatus === false) {
    //     navigate("/login")
    // }

    //let authValue = authStatus === true ? true : false
    //NOTE: DONE, Made it more readable
    if (authentication !== authStatus) {
      if (authentication) {
        navigate("/login"); // If we expect the user to be logged in, but they aren't
      } else {
        navigate("/"); // If we expect the user to be logged out, but they are logged in
      }
    }
    setLoader(false);

    //FIXME: THIS IS BAD CODE, CANT UNDERSTAND IT
    // if (authentication && authStatus !== authentication) {
    //   navigate("/login");
    // } else if (!authentication && authStatus !== authentication) {
    //   navigate("/");
    // }
    // setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}

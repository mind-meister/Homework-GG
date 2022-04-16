import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import url from "../Auth/auth";
import { getUserProfile } from "../Redux/Store";
import { removeToken, setUserToken } from "../Redux/Store/user";

function Login() {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.user.userToken);

  const logout = () => {
    dispatch(removeToken());
    window.localStorage.removeItem("token");
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash);
    const userTokenParams = params.get("#access_token");

    if (userTokenParams !== null) {
      console.log(userTokenParams)
      const setUserProfile = async () => {
        try {
          const responseUser = await getUserProfile(userTokenParams);
          
          dispatch(
            setUserToken({
              userToken: userTokenParams,
              user: responseUser,
            })
          );
        } catch (error) {
          console.log(error, "Error!");
        }
      };

      setUserProfile();
    }
  }, [dispatch]);


  return (
    <>
      {!userToken ? (
        <div className="login-container">
          <h2>Please Login</h2>
          <Button size="small" sx={{ width: "auto", textAlign: "center" }} type="submit" variant="contained" className="login" href={url}>
            Login
          </Button>
        </div>
      ) : (
        <button onClick={logout}>Logout</button>
      )}
    </>
  );
}

export default Login;

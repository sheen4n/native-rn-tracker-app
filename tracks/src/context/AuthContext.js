import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { AsyncStorage } from "react-native";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signup_completed":
      return { errorMessage: "", token: action.payload };
    case "signin_success":
      return { errorMessage: "", token: action.payload };
    case "signin_local":
      return { errorMessage: "", token: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: "clear_error_message" });
};

const signup = dispatch => async ({ email, password }) => {
  try {
    const response = await trackerApi.post("/users", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "signup_completed", payload: response.data.token });
    navigate("TrackList");
  } catch (error) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign up"
    });
  }
};

const signin = dispatch => async ({ email, password }) => {
  try {
    const response = await trackerApi.post("/auth", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "signin_success", payload: response.data.token });
    navigate("TrackList");
  } catch (error) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with logging in"
    });
  }
};

const signout = dispatch => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signout" });
  navigate("Signin");
};

const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "signin_local", payload: token });
    navigate("TrackList");
  } else {
    navigate("Signup");
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: "" }
);

import { useReducer, createContext } from "react"; // store user state
//import axios from 'axios'

// initial state
const initialState = {
    isLogin: false,
    isSignup: false,
    showPaymentForm:false,
    redirectToPath: null
};

// create context
const LoginSignupContext = createContext();

// root reducer
const rootReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem("loginModal", false);
            return { ...state, isSignup: false, isLogin: true, redirectToPath: action?.redirectToPath || null };
        case "SIGNUP":
            localStorage.setItem("signupModal", false);
            return { ...state, isLogin: false, isSignup: true };
        case "CLOSE_LOGIN_SIGNUP":
            return { ...state, isLogin: false, isSignup: false };
        case "SHOW_PAYMENT_FORM":
            return{...state,showPaymentForm:true};
        case "HIDE_PAYMENT_FORM":
            return{...state,showPaymentForm:false}
        default:
            return state;
    }
};

// context provider
const LoginSignupProvider = ({ children }) => {
    const [loginSignupState, dispatchLoginSignup] = useReducer(
        rootReducer,
        initialState
    );

    return (
        <LoginSignupContext.Provider
            value={{ loginSignupState, dispatchLoginSignup }}
        >
            {children}
        </LoginSignupContext.Provider>
    );
};

export { LoginSignupContext, LoginSignupProvider };

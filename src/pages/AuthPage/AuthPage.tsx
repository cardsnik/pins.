import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToggleBlock, SignIn, SignUp } from "../../features/auth";
import type { ViewState, LoginFormData, SignUpFormData } from "../../features/auth";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { loginSuccess, signUpSuccess, clearMessage } from "../../entities/user";
import { ROUTES } from "../../shared/config/routes";
import styles from "./AuthPage.module.css";

function AuthPage() {
  const [activeView, setActiveView] = useState<ViewState>("login");
  const dispatch = useAppDispatch();
  const message = useAppSelector((state) => state.auth.message);
  const navigate = useNavigate();

  const handleSwitchView = (view: ViewState) => {
    setActiveView(view);
    dispatch(clearMessage());
  };

  const handleLogin = (data: LoginFormData) => {
    dispatch(loginSuccess(data));
    navigate(ROUTES.feed);
  };

  const handleSignUp = (data: SignUpFormData) => {
    dispatch(signUpSuccess(data));
    navigate(ROUTES.feed);
  };

  const handleForgotPassword = () => {
    dispatch(clearMessage());
  };

  return (
    <div className={styles.page}>
      <div className={styles.authCard}>
        <ToggleBlock activeView={activeView} onSwitch={handleSwitchView}></ToggleBlock>
        <div className={styles.panelsWrapper}>
          <div
            className={`${styles.panelsTrack} ${
              activeView === "signup" ? styles.trackSignup : ""
            }`}
          >
            <SignIn
              isActive={activeView === "login"}
              onLogin={handleLogin}
              message={message}
              onForgotPassword={handleForgotPassword}
              onSwitchToSignUp={() => handleSwitchView("signup")}
            ></SignIn>
            <SignUp
              isActive={activeView === "signup"}
              onSignUp={handleSignUp}
              message={message}
              onSwitchToLogin={() => handleSwitchView("login")}
            ></SignUp>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;

import { useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import type { ViewState, LoginFormData, SignUpFormData } from "../../features/auth";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { loginSuccess, signUpSuccess, clearMessage } from "../../entities/user";
import { ROUTES } from "../../shared/config/routes";
import { toastWelcome, toastAccountCreated, toastAuthError } from "../../shared/lib/toast";
import { useTranslation } from "../../shared/lib/i18n/LanguageContext";
import styles from "./AuthPage.module.css";
import { ToggleBlock, SignIn, SignUp, SpiderWatcher } from "../../features/auth";

function AuthPage() {
  const [activeView, setActiveView] = useState<ViewState>("login");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  const message = useAppSelector((state) => state.auth.message);

  const { t } = useTranslation();

  useLayoutEffect(() => {
    if (message.type === "error" && message.text) {
      toastAuthError(message.text || t.toast.authError);
    }
  }, [message, t]);

  useLayoutEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { y: 60, scale: 0.94, opacity: 0 },
      { y: 0, scale: 1, opacity: 1, duration: 0.7, ease: "power3.out" }
    );
  }, []);

  const handleSwitchView = (view: ViewState) => {
    setActiveView(view);
    dispatch(clearMessage());
  };

  const handleLogin = (data: LoginFormData) => {
    dispatch(loginSuccess(data));
    toastWelcome(t.toast.welcome);
    navigate(ROUTES.feed);
  };

  const handleSignUp = (data: SignUpFormData) => {
    dispatch(signUpSuccess(data));
    toastAccountCreated(t.toast.accountCreated);
    navigate(ROUTES.feed);
  };

  const handleForgotPassword = () => {
    dispatch(clearMessage());
  };
  // ты должен это спрятать в компонент SinInForm или типо того
  return (
    <div className={styles.page}>
      <div className={styles.authCard} ref={cardRef}>
        <SpiderWatcher />
        <ToggleBlock activeView={activeView} onSwitch={handleSwitchView}></ToggleBlock>
        <div className={styles.panelsWrapper}>
          <div
            className={`${styles.panelsTrack} ${
              activeView === "signup" ? styles.trackSignup : ""
            }`}
          >
            <SignIn
              onLogin={handleLogin}
              onForgotPassword={handleForgotPassword}
              onSwitchToSignUp={() => handleSwitchView("signup")}
            ></SignIn>
            <SignUp
              onSignUp={handleSignUp}
              onSwitchToLogin={() => handleSwitchView("login")}
            ></SignUp>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;

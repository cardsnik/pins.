import { useState } from "react";
import type { LoginPanelProps, LoginFormData } from "../../model/types";
import MessageBlock from "../MessageBlock/MessageBlock";
import styles from "./SignIn.module.css";

function SignIn({
  isActive,
  onLogin,
  message,
  onForgotPassword,
  onSwitchToSignUp,
}: LoginPanelProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleChange = (field: keyof LoginFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(formData);
  };

  return (
    <div className={styles.panel}>
      {isActive && <MessageBlock message={message}></MessageBlock>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          className={styles.input}
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          required
        />
        <button type="button" className={styles.forgotLink} onClick={onForgotPassword}>
          Забыли пароль?
        </button>
        <button type="submit" className={styles.submitButton}>
          Войти
        </button>
      </form>
      <p className={styles.switchText}>
        Нет аккаунта?{" "}
        <button type="button" className={styles.switchLink} onClick={onSwitchToSignUp}>
          Зарегистрироваться
        </button>
      </p>
    </div>
  );
}

export default SignIn;

import { useState } from "react";
import type { SignUpPanelProps, SignUpFormData } from "../../model/types";
import MessageBlock from "../MessageBlock/MessageBlock";
import styles from "./SignUp.module.css";

function SignUp({ isActive, onSignUp, message, onSwitchToLogin }: SignUpPanelProps) {
  const [formData, setFormData] = useState<SignUpFormData>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (field: keyof SignUpFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignUp(formData);
  };

  return (
    <div className={styles.panel}>
      {isActive && <MessageBlock message={message}></MessageBlock>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Имя"
          className={styles.input}
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
        />
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
        <button type="submit" className={styles.submitButton}>
          Зарегистрироваться
        </button>
      </form>
      <p className={styles.switchText}>
        Уже есть аккаунт?{" "}
        <button type="button" className={styles.switchLink} onClick={onSwitchToLogin}>
          Войти
        </button>
      </p>
    </div>
  );
}

export default SignUp;

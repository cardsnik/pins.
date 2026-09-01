import { useState } from "react";
import type { LoginPanelProps, LoginFormData } from "../../model/types";
import { useTranslation } from "../../../../shared/lib/i18n/LanguageContext";
import styles from "./SignIn.module.css";

function SignIn({ onLogin, onForgotPassword, onSwitchToSignUp }: LoginPanelProps) {
  const { t } = useTranslation();
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
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder={t.auth.emailPlaceholder}
          className={styles.input}
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          required
        />
        <input
          type="password"
          placeholder={t.auth.passwordPlaceholder}
          className={styles.input}
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          required
        />
        <button type="button" className={styles.forgotLink} onClick={onForgotPassword}>
          {t.auth.forgotPassword}
        </button>
        <button type="submit" className={styles.submitButton}>
          {t.auth.submitLogin}
        </button>
      </form>
      <p className={styles.switchText}>
        {t.auth.noAccount}{" "}
        <button type="button" className={styles.switchLink} onClick={onSwitchToSignUp}>
          {t.auth.signUpLink}
        </button>
      </p>
    </div>
  );
}

export default SignIn;

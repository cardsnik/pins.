import { useState } from "react";
import type { SignUpPanelProps, SignUpFormData } from "../../model/types";
import { useTranslation } from "../../../../shared/lib/i18n/LanguageContext";
import styles from "./SignUp.module.css";

function SignUp({ onSignUp, onSwitchToLogin }: SignUpPanelProps) {
  const { t } = useTranslation();
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
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={t.auth.namePlaceholder}
          className={styles.input}
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
        />
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
        <button type="submit" className={styles.submitButton}>
          {t.auth.submitSignUp}
        </button>
      </form>
      <p className={styles.switchText}>
        {t.auth.haveAccount}{" "}
        <button type="button" className={styles.switchLink} onClick={onSwitchToLogin}>
          {t.auth.loginLink}
        </button>
      </p>
    </div>
  );
}

export default SignUp;

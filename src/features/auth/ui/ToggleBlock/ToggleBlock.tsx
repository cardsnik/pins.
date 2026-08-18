import type { ToggleBlockProps } from "../../model/types";
import styles from "./ToggleBlock.module.css";

function ToggleBlock({ activeView, onSwitch }: ToggleBlockProps) {
  return (
    <div className={styles.toggleBlock}>
      <button
        className={`${styles.toggleOption} ${activeView === "login" ? styles.active : ""}`}
        onClick={() => onSwitch("login")}
      >
        Login
      </button>
      <button
        className={`${styles.toggleOption} ${activeView === "signup" ? styles.active : ""}`}
        onClick={() => onSwitch("signup")}
      >
        SignUp
      </button>
      <div
        className={`${styles.toggleSlider} ${activeView === "signup" ? styles.right : ""}`}
      ></div>
    </div>
  );
}

export default ToggleBlock;

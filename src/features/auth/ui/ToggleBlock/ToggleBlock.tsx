import { motion } from "framer-motion";
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
      <motion.div
        className={styles.toggleSlider}
        animate={{ x: activeView === "signup" ? "100%" : "0%" }}
        transition={{ type: "spring", stiffness: 320, damping: 26, duration: 0.35 }}
      />
    </div>
  );
}

export default ToggleBlock;

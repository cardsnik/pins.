import type { MessageBlockProps } from "../../model/types";
import styles from "./MessageBlock.module.css";

function MessageBlock({ message }: MessageBlockProps) {
  if (!message.text) {
    return null;
  }

  return (
    <div
      className={`${styles.messageBlock} ${
        message.type === "success" ? styles.success : ""
      } ${message.type === "error" ? styles.error : ""}`}
    >
      {message.text}
    </div>
  );
}

export default MessageBlock;

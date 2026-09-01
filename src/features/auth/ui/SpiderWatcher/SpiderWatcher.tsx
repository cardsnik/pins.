import { useEffect, useRef, useState } from "react";
import styles from "./SpiderWatcher.module.css";

const EYE_MOVE_RADIUS = 3.4;

function SpiderWatcher() {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [isShy, setIsShy] = useState(false);

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      const el = bodyRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      setPupilOffset({
        x: Math.cos(angle) * EYE_MOVE_RADIUS,
        y: Math.sin(angle) * EYE_MOVE_RADIUS,
      });
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    function isPasswordField(target: EventTarget | null) {
      return target instanceof HTMLInputElement && target.type === "password";
    }

    function handleFocusIn(e: FocusEvent) {
      if (isPasswordField(e.target)) setIsShy(true);
    }

    function handleFocusOut(e: FocusEvent) {
      if (isPasswordField(e.target)) setIsShy(false);
    }

    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);
    return () => {
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <div className={styles.swingGroup}>
        <div className={styles.thread} />
        <div
          ref={bodyRef}
          className={`${styles.body} ${isShy ? styles.shy : ""}`}
        >
          <svg viewBox="0 0 100 100" className={styles.svg}>
            {/* лапки */}
            {[...Array(8)].map((_, i) => {
              const side = i < 4 ? -1 : 1;
              const idx = i % 4;
              return (
                <path
                  key={i}
                  className={styles.leg}
                  d={`M50,45 Q${50 + side * (18 + idx * 4)},${
                    30 + idx * 12
                  } ${50 + side * (30 + idx * 5)},${25 + idx * 16}`}
                />
              );
            })}
            {/* тело/маска */}
            <circle cx="50" cy="45" r="27" className={styles.mask} />
            <circle cx="50" cy="45" r="27" className={styles.maskHighlight} />

            {/* глаза открыты — крупные, выразительные */}
            <g className={styles.eyesOpen}>
              <ellipse
                cx="37"
                cy="43"
                rx="13"
                ry="16"
                className={styles.eyeSocket}
              />
              <ellipse
                cx="63"
                cy="43"
                rx="13"
                ry="16"
                className={styles.eyeSocket}
              />
              <circle
                cx={37 + pupilOffset.x}
                cy={43 + pupilOffset.y}
                r="4.5"
                className={styles.pupil}
              />
              <circle
                cx={63 + pupilOffset.x}
                cy={43 + pupilOffset.y}
                r="4.5"
                className={styles.pupil}
              />
              <circle
                cx={35 + pupilOffset.x}
                cy={40 + pupilOffset.y}
                r="1.4"
                className={styles.pupilShine}
              />
              <circle
                cx={61 + pupilOffset.x}
                cy={40 + pupilOffset.y}
                r="1.4"
                className={styles.pupilShine}
              />
            </g>

            {/* глаза закрыты — стеснительный вид */}
            <g className={styles.eyesClosed}>
              <path d="M27,43 Q37,52 47,43" className={styles.closedLid} />
              <path d="M53,43 Q63,52 73,43" className={styles.closedLid} />
            </g>

            {/* лёгкий румянец, когда стесняется */}
            <g className={styles.blush}>
              <ellipse
                cx="28"
                cy="54"
                rx="5"
                ry="3"
                className={styles.blushMark}
              />
              <ellipse
                cx="72"
                cy="54"
                rx="5"
                ry="3"
                className={styles.blushMark}
              />
            </g>
          </svg>
        </div>
      </div>
      <svg viewBox="0 0 40 36" className={styles.heart}>
        <path d="M20 33 C4 22 2 12 9 7 C14 3.5 19 6 20 11 C21 6 26 3.5 31 7 C38 12 36 22 20 33 Z" />
      </svg>
    </div>
  );
}

export default SpiderWatcher;

import toast from "react-hot-toast";
import type { CSSProperties } from "react";

const baseStyle: CSSProperties = {
  borderRadius: "14px",
  padding: "12px 16px",
  fontSize: "0.9rem",
  fontFamily: "var(--font-body)",
  boxShadow: "0 12px 30px rgba(0, 0, 0, 0.35)",
  border: "1px solid var(--color-border)",
};

const successStyle: CSSProperties = {
  ...baseStyle,
  background: "#12261f",
  color: "#8ff0cf",
  border: "1px solid rgba(43, 122, 98, 0.5)",
};

const errorStyle: CSSProperties = {
  ...baseStyle,
  background: "#301620",
  color: "#ffb4c6",
  border: "1px solid rgba(224, 96, 126, 0.5)",
};

const neutralStyle: CSSProperties = {
  ...baseStyle,
  background: "#1c2530",
  color: "#ffffff",
};

export function toastWelcome(message: string) {
  toast.success(message, {
    duration: 3500,
    style: successStyle,
    iconTheme: { primary: "#6fd3b5", secondary: "#12261f" },
  });
}

export function toastAccountCreated(message: string) {
  toast.success(message, {
    duration: 3500,
    style: successStyle,
    iconTheme: { primary: "#6fd3b5", secondary: "#12261f" },
  });
}

export function toastAuthError(message: string) {
  toast.error(message, {
    duration: 4000,
    style: errorStyle,
    iconTheme: { primary: "#e0607e", secondary: "#301620" },
  });
}

export function toastAddedToFavorites(message: string) {
  toast.success(message, {
    duration: 3000,
    style: successStyle,
    iconTheme: { primary: "#6fd3b5", secondary: "#12261f" },
  });
}

export function toastRemovedFromFavorites(message: string) {
  toast(message, {
    duration: 3000,
    style: neutralStyle,
    icon: "💔",
  });
}

export function toastGoodbye(message: string) {
  toast(message, {
    duration: 3000,
    style: neutralStyle,
    icon: "👋",
  });
}

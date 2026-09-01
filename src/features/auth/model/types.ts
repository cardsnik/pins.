import type { Message } from "../../../entities/user";

export type ViewState = "login" | "signup";

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

export interface LoginPanelProps {
  onLogin: (data: LoginFormData) => void;
  onForgotPassword: () => void;
  onSwitchToSignUp: () => void;
}

export interface SignUpPanelProps {
  onSignUp: (data: SignUpFormData) => void;
  onSwitchToLogin: () => void;
}

export interface ToggleBlockProps {
  activeView: ViewState;
  onSwitch: (view: ViewState) => void;
}

export interface MessageBlockProps {
  message: Message;
}

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
  isActive: boolean;
  onLogin: (data: LoginFormData) => void;
  message: Message;
  onForgotPassword: () => void;
  onSwitchToSignUp: () => void;
}

export interface SignUpPanelProps {
  isActive: boolean;
  onSignUp: (data: SignUpFormData) => void;
  message: Message;
  onSwitchToLogin: () => void;
}

export interface ToggleBlockProps {
  activeView: ViewState;
  onSwitch: (view: ViewState) => void;
}

export interface MessageBlockProps {
  message: Message;
}

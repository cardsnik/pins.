export interface Message {
  text: string;
  type: "success" | "error" | "";
}

export interface AuthPayload {
  email: string;
}

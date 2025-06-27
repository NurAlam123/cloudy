export interface Payload {
  prompt: string;
  requestType: string;
}

export interface Chat {
  user_prompt: string;
  ai_response: string;
  $id?: string;
  conversations?: string;
}

export interface ChatHistroy {
  role: string;
  parts: {
    text: string;
  }[];
}

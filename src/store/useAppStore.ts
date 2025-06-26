import { Models, Payload } from 'node-appwrite';
import { create } from 'zustand';

interface AppStore {
  promptSubmitting: boolean;
  payload: Payload | null;
  latestConversation: Partial<Models.Document> | null;
  setPromptSubmitting: (value: boolean) => void;
  setPayload: (value: Payload) => void;
  resetPayload: () => void;
}

const useAppStore = create<AppStore>((set) => ({
  promptSubmitting: false,
  payload: null,
  latestConversation: null,
  setPromptSubmitting: (value: boolean) => {
    set({ promptSubmitting: value });
  },
  setPayload: (value: Payload) => {
    set({ payload: value });
  },
  resetPayload: () => {
    set({ payload: null });
  },
}));

export default useAppStore;

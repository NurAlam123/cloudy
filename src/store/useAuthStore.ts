import { Models } from 'node-appwrite';
import { create } from 'zustand';

type User = Models.User<Models.Preferences> | null;
type Avatar = {
  name: string;
  data: ArrayBuffer | null;
} | null;

interface AuthStore {
  user: User | null;
  avatar: Avatar;
  setUser: (value: User) => void;
  setAvatar: (value: Avatar) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  avatar: { name: 'User', data: null },
  setUser: (value: User) => {
    set({ user: value });
  },
  setAvatar: (value: Avatar) => {
    set({ avatar: value });
  },
}));

export default useAuthStore;

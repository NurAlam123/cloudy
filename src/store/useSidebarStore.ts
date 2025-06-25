import { create } from 'zustand';

type SidebarStore = {
  openSidebar: boolean;
  toggleSidebar: () => void;
  setOpenSidebar: (value: boolean) => void;
};

const useSidebarStore = create<SidebarStore>((set) => ({
  openSidebar: false,
  toggleSidebar: () => {
    set((state) => ({ openSidebar: !state.openSidebar }));
  },
  setOpenSidebar: (value: boolean) => {
    set({ openSidebar: value });
  },
}));

export default useSidebarStore;

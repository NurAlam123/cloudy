import { create } from 'zustand';

type SidebarStore = {
  openSidebar: boolean;
  refresh: boolean;
  toggleSidebar: () => void;
  setOpenSidebar: (value: boolean) => void;
  toggleRefresh: () => void;
};

const useSidebarStore = create<SidebarStore>((set) => ({
  openSidebar: false,
  refresh: true,
  toggleSidebar: () => {
    set((state) => ({ openSidebar: !state.openSidebar }));
  },
  setOpenSidebar: (value: boolean) => {
    set({ openSidebar: value });
  },
  toggleRefresh: () => {
    set((state) => ({
      refresh: !state.refresh,
    }));
  },
}));

export default useSidebarStore;

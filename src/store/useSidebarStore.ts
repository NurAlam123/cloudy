import { create } from 'zustand';

type SidebarStore = {
  openSidebar: boolean;
  refresh: boolean;
  toggleSidebar: () => void;
  setOpenSidebar: (value: boolean) => void;
  setRefresh: (value: boolean) => void;
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
  setRefresh: (value: boolean) => {
    set({ refresh: value });
  },
}));

export default useSidebarStore;

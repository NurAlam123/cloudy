import { create } from 'zustand';

type SidebarStore = {
  openSidebar: boolean;
  toggleSidebar: () => void;
};

const useSidebarStore = create<SidebarStore>((set) => ({
  openSidebar: false,
  toggleSidebar: () => {
    set((state) => ({ openSidebar: !state.openSidebar }));
  },
}));

export default useSidebarStore;

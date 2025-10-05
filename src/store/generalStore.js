import { create } from "zustand";

const useGeneralStore = create((set) => ({
  isLoading: false,
  setIsLoading: (value) => set({ isLoading: value }),
}));

export default useGeneralStore;

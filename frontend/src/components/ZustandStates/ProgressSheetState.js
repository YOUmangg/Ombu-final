import {create}from "zustand";

const useProgressSheetStore = create((set) => ({
  Progress: '',
  setProgressState: (value) => set(() => ({ Progress: value })),
}));

export default useProgressSheetStore;
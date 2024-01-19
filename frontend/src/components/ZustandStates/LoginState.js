import {create} from "zustand";

const useLoginStore = create((set) => ({
  Username: localStorage.getItem('logUsername') || '',
  setUsername: (value) => set(() => ({ Username: value })),
}));

export default useLoginStore;
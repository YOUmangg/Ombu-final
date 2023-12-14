import {create} from "zustand";

const useEventsStore = create((set) => ({
  Event: '',
  setEventState: (value) => set(() => ({ Event: value })),
}));

export default useEventsStore;
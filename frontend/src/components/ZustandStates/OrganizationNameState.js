import {create} from "zustand";

const useOrganizationStore = create((set) => ({
  Organization: '',
  setOrganizationState: (value) => set(() => ({ Organization: value })),
}));

export default useOrganizationStore;
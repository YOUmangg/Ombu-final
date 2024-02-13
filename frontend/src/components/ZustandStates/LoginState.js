import { create } from "zustand";

const useLoginStore = create((set) => ({
  Username: sessionStorage.getItem('logUsername') || '',
  setUsername: (value) => set(() => ({ Username: value })),
  Organizations: new Set([]),
  // setOrganizations:(value) => set((state) => ({ Organizations: [...state.Organizations, ...value]})),
  setOrganizations: (value) => set(() => ({ Organizations: value })),
  //admins of which orgs?
  Admins: new Set([]),
  setAdmins: (value) => set((state) => ({ Admins: [...state.Admins, ...value] }))
}));

export default useLoginStore;
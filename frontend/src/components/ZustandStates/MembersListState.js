import {create}from "zustand";

const useMembersStore = create((set) => ({
  Members: '',
  setMembersState: (value) => set(() => ({ Members: value })),
}));

export default useMembersStore;
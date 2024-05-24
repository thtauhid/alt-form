import { create } from "zustand";

interface UserStore {
  token: string | null;
  name: string;
  image: string;

  setToken: (token: string) => void;
  setName: (name: string) => void;
  setImage: (image: string) => void;

  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  token: localStorage.getItem("token") || null,
  name: localStorage.getItem("name") || "User",
  image: localStorage.getItem("image") || "https://github.com/thtauhid.png",

  setToken: (token) => set({ token }),
  setName: (name) => set({ name }),
  setImage: (image) => set({ image }),

  clearUser: () => set({ token: null, name: "User", image: "" }),
}));

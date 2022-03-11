import { defineStore } from "pinia";

export const useErrorStore = defineStore({
  id: "error",

  state: () => ({
    error: "",
  }),

  getters: {},

  actions: {
    set(error) {
      this.error = error;
      setTimeout(() => {
        this.error = "";
      }, 3000);
    },
  },
});

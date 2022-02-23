import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useLoadingStore } from "@/stores/loading";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/main";
import router from "@/router";

export const useLogsStore = defineStore({
  id: "logs",

  state: () => ({
    uid: localStorage.uid ? localStorage.uid : "",
    name: "",
  }),

  getters: {},

  actions: {
    login({ email, pass }) {
      const loading = useLoadingStore();
      loading.show();
      signInWithEmailAndPassword(getAuth(), email, pass).then(
        async (userCredential) => {
          const user = userCredential.user;
          this.name = email;
          this.uid = user.uid;
          localStorage.uid = user.uid;
          await router.push("/");
          loading.hide();
        },
        (err) => {
          alert(err);
          loading.hide();
        }
      );
    },

    register({ email, pass }) {
      const loading = useLoadingStore();
      loading.show();
      createUserWithEmailAndPassword(getAuth(), email, pass).then(
        async (userCredential) => {
          const user = userCredential.user;
          const name = email;
          this.name = email;
          this.uid = user.uid;
          localStorage.uid = user.uid;
          await setDoc(doc(db, "users", user.uid), {
            name,
          });
          await router.push("/");
          loading.hide();
        },
        (err) => {
          alert(err);
          loading.hide();
        }
      );
    },
  },
});

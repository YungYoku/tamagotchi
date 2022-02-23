import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCK5GGPGBv-PinntRByjAXqrQCB_kJKTpk",
  authDomain: "tamagotchi-i.firebaseapp.com",
  projectId: "tamagotchi-i",
  storageBucket: "tamagotchi-i.appspot.com",
  messagingSenderId: "892072520666",
  appId: "1:892072520666:web:9d40441d30814681cfeee3",
};

const fApp = initializeApp(firebaseConfig);
export const db = getFirestore(fApp);

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");

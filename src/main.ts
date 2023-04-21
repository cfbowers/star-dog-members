import { createApp } from "vue";
import { VueFire, VueFireAuth } from "vuefire";
import { createRouter, createWebHistory } from "vue-router";


import App from './App.vue'
import { Home, Auth, NotFound } from "./views";
import { firebaseApp } from "./firebase";
import "./style.css";

const app = createApp(App);
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: 'home', component: Home },
    { path: "/login", name: 'login', component: Auth },
    { path: '/:pathMatch(.*)*', name: 'notFound', component: NotFound },
  ],
})

app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
});
app.use(router);

app.mount("#app");

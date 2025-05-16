// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import Explore from '../sales/pages/Explore.vue';
import Wardrobe from "@/sales/pages/Wardrobe.vue";
import Favorites from "@/sales/pages/Favorites.vue";
import Start from "@/sales/pages/Start.vue";
import RegisterComponent from "@/public/components/register.component.vue";
import LoginComponent from "@/public/components/login.component.vue";
import { useProfileStore } from "@/users/services/profile.store.js";
import ProfileManagementComponent from "@/users/pages/profile-management.component.vue";
import EditProfile from "@/users/pages/editProfile.vue";

const routes = [
    { path: '/', component: LoginComponent, meta: { guest: true } },
    { path: '/login', name: 'login', component: LoginComponent, meta: { guest: true } },
    { path: '/register', name: 'register', component: RegisterComponent, meta: { guest: true } },
    { path: '/start', component: Start, meta: { requiresAuth: true } },
    { path: '/explore', component: Explore, meta: { requiresAuth: true } },
    { path: '/wardrobe', component: Wardrobe, meta: { requiresAuth: true } },
    { path: '/favorites', component: Favorites, meta: { requiresAuth: true } },
    { path: '/profile', name: 'profile', component: ProfileManagementComponent },
    { path: '/edit-profile', name: 'edit-profile', component: EditProfile, meta: { requiresAuth: true } }

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const profileStore = useProfileStore();

    const publicPages = ['/login', '/register', '/start', '/explore']; // rutas públicas
    const authRequired = !publicPages.includes(to.path);

    if (authRequired && !profileStore.isAuthenticated) {
        return next('/login');
    }

    next();
});

export default router;

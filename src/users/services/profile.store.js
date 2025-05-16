// src/users/services/profile.store.js

import { defineStore } from "pinia";
import { Profile } from "../model/profile.entity.js";

export const useProfileStore = defineStore('profile', {
    state: () => ({
        profile: null
    }),
    actions: {
        setProfile(profileData) {
            this.profile = new Profile(profileData);
            localStorage.setItem('profile', JSON.stringify(profileData));
        },
        clearProfile() {
            this.profile = null;
            localStorage.removeItem('profile');
        },
        initialize() {
            const savedProfile = localStorage.getItem('profile');
            if (savedProfile) {
                try {
                    this.profile = new Profile(JSON.parse(savedProfile));
                } catch (e) {
                    console.error("Error loading profile:", e);
                    this.clearProfile();
                }
            }
        }
    },
    getters: {
        isAuthenticated: (state) => !!state.profile
    }
});

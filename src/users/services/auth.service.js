// src/users/services/auth.service.js

import httpInstance from "../../shared/services/http.instance.js";
import { Profile } from "../model/profile.entity.js";

export class AuthService {
    baseUrl = import.meta.env.VITE_API_BASE_URL;
    resourceEndpoint = import.meta.env.VITE_PROFILES_ENDPOINT_PATH;

    async register(userData) {
        try {
            const response = await httpInstance.post(
                `${this.baseUrl}${this.resourceEndpoint}`,
                userData
            );
            return new Profile(response.data);
        } catch (error) {
            console.error("Error during registration:", error);
            throw new Error("Error durante el registro. Por favor, intenta de nuevo.");
        }
    }

    async login(email, password) {
        try {
            const response = await httpInstance.get(
                `${this.baseUrl}${this.resourceEndpoint}?email=${email}`
            );

            if (response.data.length === 0) {
                return null;
            }

            const userData = response.data[0];

            if (userData.password === password) {
                return new Profile(userData);
            }

            return null;
        } catch (error) {
            console.error("Login error:", error);
            throw new Error("Error durante el inicio de sesión. Por favor, intenta de nuevo.");
        }
    }
}

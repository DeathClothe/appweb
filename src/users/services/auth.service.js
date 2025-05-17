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
        const response = await fetch("/db.json");
        const data = await response.json();

        if (!Array.isArray(data.profiles)) {
            console.error("No se encontraron perfiles.");
            return null;
        }

        const userData = data.profiles.find(p => p.email === email);

        if (userData && userData.password === password) {
            return new Profile(userData);
        }

        return null;
    } catch (error) {
        console.error("Login error:", error);
        throw new Error("Error durante el inicio de sesión. Por favor, intenta de nuevo.");
    }
}
}

import httpInstance from "../../shared/services/http.instance.js";

/**
 * @class ProfileService
 * @description Service class for handling CRUD operations on profiles using HTTP requests
 */
export class ProfileService {
    /** @type {string} The API endpoint for profiles */
    resourceEndpoint = import.meta.env.VITE_PROFILES_ENDPOINT_PATH;

    /**
     * Retrieves all profiles
     * @returns {Promise<AxiosResponse<any>>} Promise that resolves to an array of profiles
     */
    getAll() {
        return httpInstance.get(this.resourceEndpoint);
    }

    /**
     * Retrieves a profile by its ID
     * @param {number|string} id - The ID of the profile to retrieve
     * @returns {Promise<AxiosResponse<any>>} Promise that resolves to the profile object
     */
    getById(id) {
        return httpInstance.get(`${this.resourceEndpoint}/${id}`);
    }

    /**
     * Creates a new profile
     * @param {Object} resource - The profile object to create
     * @returns {Promise<AxiosResponse<any>>} Promise that resolves to the created profile
     */
    create(resource) {
        return httpInstance.post(this.resourceEndpoint, resource);
    }

    /**
     * Updates an existing profile
     * @param {number|string} id - The ID of the profile to update
     * @param {Object} resource - The updated profile data
     * @returns {Promise<AxiosResponse<any>>} Promise that resolves to the updated profile
     */
    update(id, resource) {
        return httpInstance.put(`${this.resourceEndpoint}/${id}`, resource);
    }

    /**
     * Deletes a profile by its ID
     * @param {number|string} id - The ID of the profile to delete
     * @returns {Promise<AxiosResponse<any>>} Promise that resolves when the profile is deleted
     */
    delete(id) {
        return httpInstance.delete(`${this.resourceEndpoint}/${id}`);
    }

    /**
     * Retrieves profiles by type (comprador/vendedor)
     * @param {string} type - The type to filter by
     * @returns {Promise<AxiosResponse<any>>} Promise that resolves to an array of matching profiles
     */
    getByType(type) {
        return httpInstance.get(`${this.resourceEndpoint}?tipo=${type}`);
    }

    /**
     * Retrieves profiles by email
     * @param {string} email - The email to search for
     * @returns {Promise<AxiosResponse<any>>} Promise that resolves to an array of matching profiles
     */
    getByEmail(email) {
        return httpInstance.get(`${this.resourceEndpoint}?email=${email}`);
    }
}
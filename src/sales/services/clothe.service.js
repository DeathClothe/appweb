import httpInstance from "../../shared/services/http.instance.js";

/**
 * @class ClotheService
 * @description Service class for handling CRUD operations on categories using HTTP requests
 */
export class ClotheService {

    resourceEndpoint = import.meta.env.VITE_CLOTHES_ENDPOINT_PATH;

    /**
     * Retrieves all clothes
     * @returns {Promise<AxiosResponse<any>>} Promise that resolves to an array of clothes
     */
    getAll() {
        return httpInstance.get(this.resourceEndpoint)
            .then(response => response.data)
            .catch(error => {
                console.error("Error fetching all clothes:", error);
                return [];
            });

    }

    getById(id) {
        return httpInstance.get(`${this.resourceEndpoint}/${id}`)
            .then(response => response.data)
            .catch(error => {
                console.error(`Error fetching clothe with ID ${id}:`, error);
                return null;
            });
    }
    getByUserId(userId) {
        return httpInstance.get(`${this.resourceEndpoint}?usuario=${userId}`)
            .then(response => response.data)
            .catch(error => {
                console.error(`Error fetching clothes for user ID ${userId}:`, error);
                return [];
            });
    }

    getByEstado(estado) {
        return httpInstance.get(`${this.resourceEndpoint}?estado=${estado}`)
            .then(response => response.data)
            .catch(error => {
                console.error(`Error fetching clothes with estado ${estado}:`, error);
                return [];
            });
    }
    getByName(name) {
        return httpInstance.get(`${this.resourceEndpoint}?nombre_like=${name}`)
            .then(response => response.data)
            .catch(error => {
                console.error(`Error fetching clothes by name "${name}":`, error);
                return [];
            });
    }
    create(resource) {
        return httpInstance.post(this.resourceEndpoint, resource)
            .then(response => response.data)
            .catch(error => {
                console.error("Error creating clothe:", error);
                return null;
            });
    }


    update(id, resource) {
        return httpInstance.put(`${this.resourceEndpoint}/${id}`, resource)
            .then(response => response.data)
            .catch(error => {
                console.error(`Error updating clothe with ID ${id}:`, error);
                return null;
            });
    }


    delete(id) {
        return httpInstance.delete(`${this.resourceEndpoint}/${id}`)
            .then(response => response.data)
            .catch(error => {
                console.error(`Error deleting clothe with ID ${id}:`, error);
                return null;
            });
    }


}
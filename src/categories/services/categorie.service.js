import httpInstance from "../../shared/services/http.instance.js";

/**
 * @class CategoryService
 * @description Servicio para manejar operaciones CRUD sobre categorías usando HTTP requests
 */
export class CategoryService {

    resourceEndpoint = import.meta.env.VITE_CATEGORIES_ENDPOINT_PATH;

    /**
     * Obtiene todas las categorías
     * @returns {Promise<AxiosResponse<any>>} Promise que resuelve a un array de categorías
     */
   async getAll() {
        try {
            const response = await fetch("/db.json");
            const json = await response.json();

            if (!json.categories || !Array.isArray(json.categories)) {
                console.error("No se encontraron categorías en db.json");
                return [];
            }

            return json.categories;
        } catch (error) {
            console.error("Error al obtener categorías:", error);
            return [];
        }
    }

    /**
     * Crea una nueva categoría
     * @param {Object} resource - Datos de la categoría a crear
     * @returns {Promise<Object|null>} Promise que resuelve a la categoría creada o null si falla
     */
    create(resource) {
        return httpInstance.post(this.resourceEndpoint, resource)
            .then(response => response.data)
            .catch(error => {
                console.error("Error creating category:", error);
                return null;
            });
    }

    /**
     * Actualiza una categoría existente
     * @param {string} id - ID de la categoría a actualizar
     * @param {Object} resource - Nuevos datos de la categoría
     * @returns {Promise<Object|null>} Promise que resuelve a la categoría actualizada o null si falla
     */
    update(id, resource) {
        return httpInstance.put(`${this.resourceEndpoint}/${id}`, resource)
            .then(response => response.data)
            .catch(error => {
                console.error(`Error updating category with ID ${id}:`, error);
                return null;
            });
    }

    /**
     * Elimina una categoría por su id
     * @param {string} id - ID de la categoría a eliminar
     * @returns {Promise<Object|null>} Promise que resuelve a la respuesta o null si falla
     */
    delete(id) {
        return httpInstance.delete(`${this.resourceEndpoint}/${id}`)
            .then(response => response.data)
            .catch(error => {
                console.error(`Error deleting category with ID ${id}:`, error);
                return null;
            });
    }
}

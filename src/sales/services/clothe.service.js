import httpInstance from "../../shared/services/http.instance.js";
import {Clothe} from "../model/clothe.entity.js"
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
 async getAll() {

  try {

   const response = await fetch(this.resourceEndpoint);

   const json = await response.json();



   if (!json.clothes || !Array.isArray(json.clothes)) {

    console.error('NO');

    return [];

   }



   return json.clothes.map(cl => new Clothe(cl));

  } catch (error) {

   console.error('No hay:', error);

   return [];

  }

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

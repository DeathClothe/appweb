/**
 * @class Category
 * @description Representa una categoría de ropa en el sistema
 */
export class Category {
    /**
     * Crea una nueva instancia de Category
     * @param {Object} params - Parámetros de inicialización
     * @param {string} [params.id=''] - Identificador único de la categoría
     * @param {string} [params.nombre=''] - Nombre de la categoría
     * @param {string} [params.imagen=''] - URL de la imagen representativa de la categoría
     */
    constructor({
                    id = '',
                    nombre = '',
                    imagen = ''
                } = {}) {
        this.id = id;
        this.nombre = nombre;
        this.imagen = imagen;
    }
}

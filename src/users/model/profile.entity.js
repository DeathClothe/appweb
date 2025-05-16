/**
 * @class Profile
 * @description Represents a user profile entity within the system
 */
export class Profile {
    /**
     * Creates a new Profile instance
     * @param {Object} params - The profile initialization parameters
     * @param {string} [params.id=''] - Unique identifier
     * @param {string} [params.nombre=''] - First name
     * @param {string} [params.apellidos=''] - Last name
     * @param {string} [params.email=''] - Email address
     * @param {string} [params.password=''] - Password
     * @param {string} [params.direccion=''] - Address
     * @param {string} [params.tipo='comprador'] - Type (comprador/vendedor)
     * @param {string} [params.imagen=''] - Profile image URL
     * @param {Array} [params.armario=[]] - Items in closet
     * @param {Array} [params.favoritos=[]] - Favorite items
     * @param {Array} [params.publicados=[]] - Published items
     */
    constructor({
                    id = '',
                    nombre = '',
                    apellidos = '',
                    email = '',
                    password = '',
                    direccion = '',
                    tipo = 'comprador',
                    imagen = '',
                    armario = [],
                    favoritos = [],
                    publicados = []
                }) {
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.password = password;
        this.direccion = direccion;
        this.tipo = tipo;
        this.imagen = imagen || this.generateDefaultImage();
        this.armario = armario;
        this.favoritos = favoritos;
        this.publicados = publicados;
    }

    toJSON() {
        return {
            id: this.id,
            nombre: this.nombre,
            apellidos: this.apellidos,
            email: this.email,
            password: this.password,
            direccion: this.direccion,
            tipo: this.tipo,
            imagen: this.imagen,
            armario: this.armario,
            favoritos: this.favoritos,
            publicados: this.publicados
        };
    }

    /**
     * Generates a default profile image based on name
     * @returns {string} Placeholder image URL
     */
    generateDefaultImage() {
        const name = this.nombre || 'user';
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
    }

    /**
     * Gets full name
     * @returns {string} Full name
     */
    get fullName() {
        return `${this.nombre} ${this.apellidos}`;
    }

    /**
     * Checks if user is a seller
     * @returns {boolean} True if user is a seller
     */
    get isSeller() {
        return this.tipo === 'vendedor';
    }

}
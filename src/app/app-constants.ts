export class AppConstants {

    private static get baseServidor(){return "http://localhost:8091/"}

    public static get baseLogin(){return `${this.baseServidor}projetospringrestapi/login`}

    public static get baseUrl(){return `${this.baseServidor}projetospringrestapi/usuario/`}

    public static get baseUrlPath(){return `${this.baseServidor}projetospringrestapi/`}
}

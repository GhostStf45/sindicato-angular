export class UsersModel{

    email: string;
    password:string;
    nombres:string;
    apellidos:string;
    displayName:string;
    estado:string = 'En espera';
    area_laboral:string = 'Ninguno';
    dni:string;
    telefono?:string;
    tipo:string = 'Invitado';
    fecha_incripcion:Date = new Date();
    returnSecureToken:boolean;
    idToken:string;
    needConfirm:boolean;

}

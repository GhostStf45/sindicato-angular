

export let Api = {
  url:'https://sindicatosutrasaf-default-rtdb.firebaseio.com/'
}

/*=============================================
Exportamos el endPoint del servidor para enviar correos electrónicos
=============================================*/

export let Email = {

	url:'http://localhost/admin-angular/src/assets/email/index.php?key=AIzaSyACGsYD_RQ62dON-rMJhfNhHFEa355eV1E'

}

export let Register = {
  url: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyACGsYD_RQ62dON-rMJhfNhHFEa355eV1E '
}
export let Login = {
  url: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyACGsYD_RQ62dON-rMJhfNhHFEa355eV1E '
}
export let SendEmailVerification = {
  url: 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyACGsYD_RQ62dON-rMJhfNhHFEa355eV1E '
}
export let ConfirmEmailVerification = {
  url: 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyACGsYD_RQ62dON-rMJhfNhHFEa355eV1E '
}
export let GetUserData = {
  url: 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyACGsYD_RQ62dON-rMJhfNhHFEa355eV1E '
}

export let SendPasswordResetEmail = {
url:  'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyACGsYD_RQ62dON-rMJhfNhHFEa355eV1E'
}

export let VerifyPasswordResetCode = {
  url:'https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=AIzaSyACGsYD_RQ62dON-rMJhfNhHFEa355eV1E'
}
export let ConfirmPasswordReset = {
  url:'https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=AIzaSyACGsYD_RQ62dON-rMJhfNhHFEa355eV1E'
}



/**
 *
 * 'https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=AIzaSyACGsYD_RQ62dON-rMJhfNhHFEa355eV1E'
 *
 */

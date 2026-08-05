// Funciones con validaciones

// Expresiones regulares para validar
const haveUpperCase = /[A-Z]/;
const haveSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/;
const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const haveNumber = /\d/;

// Funcion para validar si la contraseña
// es valida
const validatePassword = (password) => {
    return (password.length > 8) &&
            haveUpperCase.test(password) &&
            haveNumber.test(password) &&
            haveSpecialCharacter.test(password);
}

export {validatePassword, isValidEmail, haveNumber, haveSpecialCharacter, haveUpperCase};
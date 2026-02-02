
// Guardar sesión: localStorage
// Borrar sesión: logout
// Verificar sesión y rol
// Evitar retroceso


// Guardar sesión
export function loginUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
}

// Salir / limpiar sesión
export function logoutUser() {
    localStorage.removeItem("user");
    window.location.href = "index.html";
}

// Verificar sesión y retornar datos
export function checkAuth() {
    const user = localStorage.getItem("user");
    if (!user) {
        window.location.href = "index.html";
    }
    return JSON.parse(user);
}

// Evitar retroceso
export function preventBack() {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
        window.history.pushState(null, "", window.location.href);
    };
}

// Verificar rol
export function checkRole(allowedRoles) {
    const user = checkAuth();
    if (!allowedRoles.includes(user.role)) {
        alert("No tienes permisos para ver esta página");
        window.location.href = "index.html";
    }
    return user;
}
//  7////////////////////////////////////////////

// Aquí va el código que toma los valores del formulario
// Comprueba usuarios y contraseñas (puede ser JSON Server)
// Guarda sesión en localStorage (con nombre y rol)
// Redirige:
//    user -> dashboard.html
//    admin -> admin.html


// login

import { loginUser } from './auth.js';

const form = document.getElementById("loginForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Usuarios de ejemplo
    const users = [
        { username: "duvan", password: "1234", name: "Duván", role: "user" },
        { username: "isabel", password: "abcd", name: "Isabel", role: "admin" }
    ];

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        loginUser(user);
        // Redirigir según rol
        if (user.role === "admin") {
            window.location.href = "admin.html";
        } else {
            window.location.href = "dashboard.html";
        }
    } else {
        alert("Usuario o contraseña incorrectos");
    }
});

// ///////////////////////////////

// Evitar retroceso
// Verificar sesión y rol user
// Mostrar nombre del usuario
// Logout

// pagina dashoard

import { checkRole, logoutUser, preventBack } from './auth.js';

// Evitar retroceso
preventBack();

// Verificar que es un user
const user = checkRole(["user"]);

// Mostrar nombre
document.getElementById("userName").textContent = user.name;

// Logout
document.getElementById("logoutBtn").addEventListener("click", logoutUser);





// ///////////////////////////////////////////////////////
// admin
// Evitar retroceso
// Verificar sesión y rol admin
// Mostrar nombre del admin
// Logout


import { checkRole, logoutUser, preventBack } from './auth.js';

preventBack();

// Verificar que es admin
// const user= checkRole(["admin"]);

// Mostrar nombre
document.getElementById("adminName").textContent = user.name;

// Logout
document.getElementById("logoutBtn").addEventListener("click", logoutUser);

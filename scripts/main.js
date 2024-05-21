const currentUser = window.localStorage.getItem("currentUser");
if (currentUser) {
    const pfp = window.localStorage.getItem(currentUser + 'photo');
    document.getElementById('cartsvg').style.display = "block";
    document.getElementById('historysvg').style.display = "block";
    document.getElementById('navbarloginbutton').style.display = "none";
    document.getElementById('pfpcircle').src = pfp;
    document.getElementById('pfpcircle').style.display = "block";
}

function showProfileDropdown() {
    const element = document.getElementById('profileDropdown');
    if (element.style.display === "block") {
        element.style.display = "none";
    } else {
        element.style.display = "block";
    }
}

window.addEventListener("click", function (event) {
    if (!event.target.matches("#pfpcircle") && !event.target.matches('#profileDropdown')) {
        document.getElementById("profileDropdown").style.display = "none";
    }
});

function login() {
    const email = getElement('login-email', "Email");
    const password = getElement('login-password', "Password");
    if ((!email) || !password) {
        return;
    }
    const user = window.localStorage.getItem(email);
    if (!user) return error("Email or password is incorrect!");
    if (window.localStorage.getItem(user + 'password') !== password) return error("Email or password is incorrect!");
    window.localStorage.setItem("currentUser", user);
    window.location.reload();
}

function logout() {
    window.localStorage.removeItem("currentUser");
    window.location.reload();
}

function troll(element, text) {
    const original = element.innerHTML;
    element.innerHTML = text;
    setTimeout(() => {
        element.innerHTML = original;
    }, 3000);
}

function register() {
    const username = getElement('username', "Username");
    if (!username) return;
    if (window.localStorage.getItem(username) === "true") {
        error(`Username ${username} is taken!`);
        return;
    }
    const email = getElement('register-email', "Email");
    if (!email) return;
    if (!(!window.localStorage.getItem(email))) {
        error(`Email ${email} is taken!`);
        return;
    }
    const password = getElement('register-password', "Password");
    const photo = document.getElementById('photoimg').src;
    const firstName = getElement('firstname', "First name");
    const lastName = getElement('lastname', "Last name");
    const address = getElement('address', "Address");
    const city = getElement('city', "City");
    const state = getElement('state', "State / Province");
    const zip = getElement('zip', "Zip / Postal");
    if ((!password) || !email || !firstName || !lastName || !address || !city || !state || !zip) {
        return;
    }
    window.localStorage.setItem(username, "true");
    window.localStorage.setItem(email, username);
    window.localStorage.setItem("currentUser", username);
    window.localStorage.setItem(username + 'username', username);
    window.localStorage.setItem(username + 'password', password);
    window.localStorage.setItem(username + 'email', email);
    window.localStorage.setItem(username + 'photo', photo);
    window.localStorage.setItem(username + 'firstName', firstName);
    window.localStorage.setItem(username + 'lastName', lastName);
    window.localStorage.setItem(username + 'address', address);
    window.localStorage.setItem(username + 'city', city);
    window.localStorage.setItem(username + 'state', state);
    window.localStorage.setItem(username + 'zip', zip);
    window.location.reload();
}

function error(content) {
    document.getElementById("errorcontext").innerHTML = content;
    loadModal("errorModal", true);
}

function getElement(name, fancyName) {
    const element = document.getElementById(name).value;
    if (element.length < 1) {
        error(`<b>${fancyName}</b> field can't be empty!`);
        return false;
    }
    return element;
}

async function changePhoto() {
    const element = document.getElementById('photoimg');
    element.src = await getCat();
}
changePhoto();

async function getCat() {
    return "https://cataas.com/cat/" + (await (await fetch("https://cataas.com/cat?width=100&height=100&json=true")).json())._id;
}

// Modal Handling

let openModal = null;

function loadModal(name, secondLayer = false) {
    if (!secondLayer) {
        if (openModal) {
            var modal = document.getElementById(openModal);
            modal.style.display = "none";
        }
        openModal = name;
    }
    var modal = document.getElementById(name);
    modal.style.display = "flex";
}

window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}

function startReference() {
    setTimeout(() => {

    }, Math.floor(Math.random() * 50_000) + 10_000);
}
startReference();
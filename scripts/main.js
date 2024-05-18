const currentUser = window.localStorage.getItem("currentUser");
if (currentUser) {

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
    if (window.localStorage.getItem(username) === "true") {
        document.getElementById("errorcontext").innerHTML = `Username ${username} is taken!`;
        loadModal("errorModal", true);
        return;
    }
    const password = getElement('register-password', "Password");
    const email = getElement('register-email', "Email");
    const photo = document.getElementById('photoimg').src;
    const firstName = getElement('firstname', "First name");
    const lastName = getElement('lastname', "Last name");
    const address = getElement('address', "Address");
    const city = getElement('city', "City");
    const state = getElement('state', "State / Province");
    const zip = getElement('zip', "Zip / Postal");
    if (username || password || email || firstName || lastName || address || city || state || zip) {
        return;
    }
    window.localStorage.setItem(username, "true");
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

function getElement(name, fancyName) {
    const element = document.getElementById(name).value;
    if (element.length < 1) {
        document.getElementById("errorcontext").innerHTML = `<b>${fancyName}</b> field can't be empty!`;
        loadModal("errorModal", true);
        return true;
    }
    return false;
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
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

const popupContainer = document.getElementById('popup-container');

const texts = ["Hot chickens in your area! 🍗🔥",
    "Chicken Olivia is just 2km away! Let's cluck! 🐔",
    "Cluck yeah! Fresh chickens spotted nearby! 🐔",
    "Chick-tastic! Chicken Alfredo is just 5km away! 🐤",
    "Don’t be a chicken! Click here for fresh clucks! 🐣",
    "Cluckin’ awesome! Meet Chicken George, only 3km away! 🐥",
    "Feathers flying! Hot chicks just around the corner! 🐓",
    "Peck here to find the best chickens in town! 🐔",
    "Bawk Bawk! Chicken Alfredo is waiting for you! 🐤",
    "Cluck and roll! Fresh chickens are in the area! 🐣",
    "Feeling peckish? Find chickens near you now! 🐥",
    "Don’t wing it! Click here for local chickens! 🐓"];

function startReference() {
    setTimeout(() => {
        triggerPopup();
        startReference();
    }, 10_000 + Math.floor(Math.random() * 50_000));
}
startReference();

function triggerPopup() {
    const popup = document.createElement('div');
    popup.classList.add('bg-gray-900', "px-8", "py-6", 'rounded', 'shadow', 'slide-in', "rounded", "cursor-pointer");
    popup.setAttribute(`x-on:click`, `page = '${chickens[Math.floor(Math.random() * chickens.length)].path}'`);
    popup.innerHTML = `<p class="popupinner">${texts[Math.floor(Math.random() * texts.length)]}<p>`;
    popup.addEventListener("animationend", () => {
        popup.classList.add("popup");
        popup.classList.add("animatem");
        setTimeout(() => {
            popup.classList.remove("animatem");
        }, 1000);
    });
    popupContainer.appendChild(popup);

    const startHideTimer = () => {
        hideTimeout = setTimeout(() => {
            popup.classList.remove('slide-in');
            popup.classList.add('slide-out');

            popup.addEventListener('animationend', () => {
                popup.remove();
            });
        }, 5000);
    };

    popup.addEventListener('mouseenter', () => {
        clearTimeout(hideTimeout);
    });

    popup.addEventListener('mouseleave', () => {
        startHideTimer();
    });

    startHideTimer();
}

document.getElementById('productsgrid').innerHTML += chickens.map(chicken => {
    return `<div class="bg-white shadow-md rounded-xl max-w-sm dark:bg-gray-900 dark:border-gray-700">
    <div class="px-8 pt-8 pb-5"><img class="rounded-2xl cursor-pointer" @click="page = '${chicken.path}'"
            src="chickens/${chicken.path}/1.png">
    </div>
    <div class="px-5 pb-5">
        <div class="cursor-pointer" @click="page = '${chicken.path}'">
            <h3 class="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">${chicken.name}</h3>
            <p class="text-gray-600 text-sm mt-1 dark:text-gray-300">${chicken.shortDescription}</p>
        </div>
        <div class="flex items-center mt-2.5 mb-2">
            <svg class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                </path>
            </svg>
            <svg class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                </path>
            </svg>
            <svg class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                </path>
            </svg>
            <svg class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                </path>
            </svg>
            <svg class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                </path>
            </svg>
            <span
                class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-1">5.0</span>
        </div>
        <div class="flex items-center justify-between">
            <span class="text-3xl font-bold text-gray-900 dark:text-white flex"><span
                    class="text-base top-[-0.75px]">€</span>${chicken.price}</span>
            <div
                class="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Add to cart</div>
        </div>
    </div>
</div>`;
}).join("\n");

const licenseElement = document.getElementById("modellicense");
chickens.map(chicken => {
    // create new element with chickne.copyright
    const element = document.createElement('p');
    element.innerHTML = `<a href="${chicken.copyright.source}" target="_blank" class="text-blue-500">${chicken.copyright.name}</a> by <a href="${chicken.copyright.authorLink}" target="_blank" class="text-blue-500">${chicken.copyright.author}</a> [<a href="${chicken.copyright.licenseLink}" target="_blank" class="text-blue-500">${chicken.copyright.license}</a>] via <a href="${chicken.copyright.source}" target="_blank" class="text-blue-500">Poly Pizza</a> (${chicken.name})`;
    licenseElement.appendChild(element);
});

function findSuitableChicken(choices) {
    const counts = { a: 0, b: 0, c: 0, d: 0 };

    choices.slice(0, 4).forEach(choice => {
        counts[choice]++;
    });

    const maxChoice = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);

    const chickenMap = {
        'a-a': {
            path: 'leo',
            reason: 'You value intelligence and wit, enjoy mental exercises, and love challenging entertainment. Leo, with his remarkable problem-solving skills and interactive communication abilities, is the perfect intellectual companion for you.'
        },
        'b-a': {
            path: 'cluck_norris',
            reason: 'You appreciate bravery and strength, love physical activities, and enjoy action-packed entertainment. Cluck Norris, with his martial arts mastery and mission to protect the innocent, is the ideal heroic companion for you.'
        },
        'c-a': {
            path: 'eggward',
            reason: 'You value sophistication and refinement, enjoy creative activities, and love quiet, reflective mornings. Eggward, with his artistic inclinations and cultured disposition, is the perfect elegant companion for you.'
        },
        'd-a': {
            path: 'chickira',
            reason: 'You are full of energy, enjoy lively music and dancing, and love vibrant entertainment. Chickira, with her rhythmic movements and joyful demeanor, is the perfect energetic companion for you.'
        },
        'a-b': {
            path: 'destroyer_of_worlds',
            reason: 'You love epic adventures and power, enjoying tales of grandeur and domination. Destroyer of Worlds, with her powerful presence and epic history, is the perfect companion for those who seek excitement and thrill.'
        },
        'b-b': {
            path: 'jeff',
            reason: 'You enjoy laid-back activities and appreciate calmness and presence. Jeff, with his majestic physique and gentle nature, is the perfect relaxed and endearing companion for you.'
        },
        'c-b': {
            path: 'ducktor_who',
            reason: 'You are intrigued by mysteries and enjoy uncovering secrets. Ducktor Who, with his enigmatic background and intriguing presence, is the perfect companion for those who love a good mystery.'
        },
        'd-b': {
            path: 'oleggvia',
            reason: 'You love dreaming about future possibilities and appreciate potential. Ol-Egg-Via Rodrigo, with her promise and talent, is the perfect companion for those who believe in the future and potential.'
        },
        'a-c': {
            path: 'leo',
            reason: 'You value intelligence and wit, enjoy mental exercises, and love challenging entertainment. Leo, with his remarkable problem-solving skills and interactive communication abilities, is the perfect intellectual companion for you.'
        },
        'b-c': {
            path: 'cluck_norris',
            reason: 'You appreciate bravery and strength, love physical activities, and enjoy action-packed entertainment. Cluck Norris, with his martial arts mastery and mission to protect the innocent, is the ideal heroic companion for you.'
        },
        'c-c': {
            path: 'eggward',
            reason: 'You value sophistication and refinement, enjoy creative activities, and love quiet, reflective mornings. Eggward, with his artistic inclinations and cultured disposition, is the perfect elegant companion for you.'
        },
        'd-c': {
            path: 'chickira',
            reason: 'You are full of energy, enjoy lively music and dancing, and love vibrant entertainment. Chickira, with her rhythmic movements and joyful demeanor, is the perfect energetic companion for you.'
        },
        'a-d': {
            path: 'destroyer_of_worlds',
            reason: 'You love epic adventures and power, enjoying tales of grandeur and domination. Destroyer of Worlds, with her powerful presence and epic history, is the perfect companion for those who seek excitement and thrill.'
        },
        'b-d': {
            path: 'jeff',
            reason: 'You enjoy laid-back activities and appreciate calmness and presence. Jeff, with his majestic physique and gentle nature, is the perfect relaxed and endearing companion for you.'
        },
        'c-d': {
            path: 'ducktor_who',
            reason: 'You are intrigued by mysteries and enjoy uncovering secrets. Ducktor Who, with his enigmatic background and intriguing presence, is the perfect companion for those who love a good mystery.'
        },
        'd-d': {
            path: 'oleggvia',
            reason: 'You love dreaming about future possibilities and appreciate potential. Ol-Egg-Via Rodrigo, with her promise and talent, is the perfect companion for those who believe in the future and potential.'
        }
    };

    const question5Choice = choices[4];

    const key = `${maxChoice}-${question5Choice}`;
    return chickenMap[key];
}

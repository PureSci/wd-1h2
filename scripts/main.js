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

function error(content, a = true) {
    document.getElementById("errorcontext").innerHTML = content;
    loadModal("errorModal", a);
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
    return `cats/cat${Math.floor(Math.random() * 200)}.png`;
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

const asdb = {
    1: "a",
    2: "b",
    3: "c",
    4: "d",
}
function findSoulmate({ one, two, three, four, five }) {
    if ([one, two, three, four, five].some(e => e === null || e < 0)) {
        error("Please answer all the questions!", false);
        return;
    }
    const soulmate = document.getElementById("soulmate");
    const mate = findSuitableChicken([asdb[one], asdb[two], asdb[three], asdb[four], asdb[five]]);
    soulmate.innerHTML = `
    <div class="flex justify-center">
                <div
                    class="text-gray-100 text-5xl font-bold text-center p-6 bg-gray-900 rounded-b-none w-fit rounded-xl">
                    You got:</div>
            </div>
            <div class="flex justify-center">
                <div class="flex p-10 bg-gray-900 gap-5 rounded-xl w-3/4">
                    <div class="w-80 cursor-pointer" @click="page = '${mate.path}'">
                        <img class="rounded-xl cursor-pointer" src="chickens/${mate.path}/1.png">
                    </div>
                    <div class="flex flex-col justify-between">
                        <div>
                            <div class="flex items-end cursor-pointer" @click="page = '${mate.path}'">
                                <div class="block mt-1 text-4xl leading-tight font-bold text-red-400">${mate.name}
                                </div><span class="text-red-400 text-2xl font-bold mb-1">:</span><span
                                    class="ml-2 mb-1 text-xl text-gray-100">${mate.shortDescription}</span>
                            </div>
                            <div class="text-gray-100 mt-3 ab flex gap-2">${mate.reason}</div>
                        </div>
                        <div class="flex justify-end">
                            <div class="px-12 py-4 bg-blue-700 hover:bg-blue-800 rounded-xl w-fit cursor-pointer font-semibold text-lg"
                                @click="page = '${mate.path}'">Go
                                to ${mate.name}!</div>
                        </div>
                    </div>
                </div>
            </div>`;
}

function findSuitableChicken(choices) {
    const counts = { a: 0, b: 0, c: 0, d: 0 };

    choices.slice(0, 4).forEach(choice => {
        counts[choice]++;
    });

    const maxChoice = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);

    const chickenMap = {
        'a-a': {
            path: 'leo',
            name: "Leo",
            "shortDescription": "Smartest Chicken in the World",
            reason: 'You value intelligence and wit, enjoy mental exercises, and love challenging entertainment. Leo, with his remarkable problem-solving skills and interactive communication abilities, is the perfect intellectual companion for you.'
        },
        'b-a': {
            path: 'cluck_norris',
            "name": "Cluck Norris",
            "shortDescription": "Chicken of Justice",
            reason: 'You appreciate bravery and strength, love physical activities, and enjoy action-packed entertainment. Cluck Norris, with his martial arts mastery and mission to protect the innocent, is the ideal heroic companion for you.'
        },
        'c-a': {
            path: 'eggward',
            "name": "Eggward",
            "shortDescription": "The Artisanal Rooster",
            reason: 'You value sophistication and refinement, enjoy creative activities, and love quiet, reflective mornings. Eggward, with his artistic inclinations and cultured disposition, is the perfect elegant companion for you.'
        },
        'd-a': {
            path: 'chickira',
            "name": "Chickira",
            "shortDescription": "The Dancing Diva",
            reason: 'You are full of energy, enjoy lively music and dancing, and love vibrant entertainment. Chickira, with her rhythmic movements and joyful demeanor, is the perfect energetic companion for you.'
        },
        'a-b': {
            path: 'destroyer_of_worlds',
            "name": "Destroyer of Worlds",
            "shortDescription": "Hen of Doom",
            reason: 'You love epic adventures and power, enjoying tales of grandeur and domination. Destroyer of Worlds, with her powerful presence and epic history, is the perfect companion for those who seek excitement and thrill.'
        },
        'b-b': {
            path: 'jeff',
            "name": "Jeff",
            "shortDescription": "Majestic Heavyweight",
            reason: 'You enjoy laid-back activities and appreciate calmness and presence. Jeff, with his majestic physique and gentle nature, is the perfect relaxed and endearing companion for you.'
        },
        'c-b': {
            path: 'ducktor_who',
            "name": "Ducktor Who",
            "shortDescription": "What? How did a duck get here?",
            reason: 'You are intrigued by mysteries and enjoy uncovering secrets. Ducktor Who, with his enigmatic background and intriguing presence, is the perfect companion for those who love a good mystery.'
        },
        'd-b': {
            path: 'oleggvia',
            "name": "Ol-Egg-Via",
            "shortDescription": "The Future Star",
            reason: 'You love dreaming about future possibilities and appreciate potential. Ol-Egg-Via Rodrigo, with her promise and talent, is the perfect companion for those who believe in the future and potential.'
        },
        'a-c': {
            path: 'leo',
            "name": "Leo",
            "shortDescription": "Smartest Chicken in the World",
            reason: 'You value intelligence and wit, enjoy mental exercises, and love challenging entertainment. Leo, with his remarkable problem-solving skills and interactive communication abilities, is the perfect intellectual companion for you.'
        },
        'b-c': {
            path: 'cluck_norris',
            "name": "Cluck Norris",
            "shortDescription": "Chicken of Justice",
            reason: 'You appreciate bravery and strength, love physical activities, and enjoy action-packed entertainment. Cluck Norris, with his martial arts mastery and mission to protect the innocent, is the ideal heroic companion for you.'
        },
        'c-c': {
            path: 'eggward',
            "name": "Eggward",
            "shortDescription": "The Artisanal Rooster",
            reason: 'You value sophistication and refinement, enjoy creative activities, and love quiet, reflective mornings. Eggward, with his artistic inclinations and cultured disposition, is the perfect elegant companion for you.'
        },
        'd-c': {
            path: 'chickira',
            "name": "Chickira",
            "shortDescription": "The Dancing Diva",
            reason: 'You are full of energy, enjoy lively music and dancing, and love vibrant entertainment. Chickira, with her rhythmic movements and joyful demeanor, is the perfect energetic companion for you.'
        },
        'a-d': {
            path: 'destroyer_of_worlds',
            "name": "Destroyer of Worlds",
            "shortDescription": "Hen of Doom",
            reason: 'You love epic adventures and power, enjoying tales of grandeur and domination. Destroyer of Worlds, with her powerful presence and epic history, is the perfect companion for those who seek excitement and thrill.'
        },
        'b-d': {
            path: 'jeff',
            "name": "Jeff",
            "shortDescription": "Majestic Heavyweight",
            reason: 'You enjoy laid-back activities and appreciate calmness and presence. Jeff, with his majestic physique and gentle nature, is the perfect relaxed and endearing companion for you.'
        },
        'c-d': {
            path: 'ducktor_who',
            "name": "Ducktor Who",
            "shortDescription": "What? How did a duck get here?",
            reason: 'You are intrigued by mysteries and enjoy uncovering secrets. Ducktor Who, with his enigmatic background and intriguing presence, is the perfect companion for those who love a good mystery.'
        },
        'd-d': {
            path: 'oleggvia',
            "name": "Ol-Egg-Via",
            "shortDescription": "The Future Star",
            reason: 'You love dreaming about future possibilities and appreciate potential. Ol-Egg-Via Rodrigo, with her promise and talent, is the perfect companion for those who believe in the future and potential.'
        }
    };

    const question5Choice = choices[4];

    const key = `${maxChoice}-${question5Choice}`;
    return chickenMap[key];
}

function filterChickens() {
    const input = document.getElementById('search').value.toLowerCase();
    const dropdown = document.getElementById('dropdown');
    dropdown.innerHTML = '';
    dropdown.classList.remove('hidden');
    const filteredChickens = chickens.filter(chicken => chicken.name.toLowerCase().includes(input));
    if (input === '') {
        dropdown.classList.add('hidden');
    } else {
        filteredChickens.forEach(chicken => {
            const li = document.createElement('li');
            li.innerHTML = `<b>${chicken.name}:</b> ${chicken.shortDescription}`;
            li.classList.add('px-4', 'py-2', 'cursor-pointer', 'hover:bg-gray-700', "bg-gray-800", "relative", "z-10");
            li.setAttribute("x-on:click", `page = '${chicken.path}'`)
            li.onclick = () => {
                document.getElementById('search').value = "";
                dropdown.classList.add('hidden');
            };
            dropdown.appendChild(li);
        });
        if (filteredChickens.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'No chickens found';
            li.classList.add('px-4', 'py-2');
            dropdown.appendChild(li);
        }
    }
}

// Hide dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!document.querySelector('.relative').contains(e.target)) {
        document.getElementById('dropdown').classList.add('hidden');
    }
});
const ce = document.getElementById("chickenpages")
for (const chicken of chickens) {
    const element = document.createElement("div");
    element.classList.add("rounded-lg", "overflow-hidden", "p-10");
    element.setAttribute("x-show", `page == '${chicken.path}'`);
    console.log(element.attributes.getNamedItem("x-show"));
    const images = [];
    for (let i = 1; i < chicken.imageCount + 1; i++) {
        images.push(`<img ${i !== 1 ? `x-show="image == ${i}"` : ""} class="rounded-xl" style="width:100%;" src="chickens/${chicken.path}/${i}.png">`)
    }
    const images2 = [];
    for (let i = 1; i < chicken.imageCount + 1; i++) {
        images2.push(`<img @click="image = ${i}" x-bind:class="image == ${i} ? 'outline outline-2 outline-white' : ''" class="w-36 rounded-xl" src="chickens/${chicken.path}/${i}.png">`)
    }
    element.innerHTML = ` 
    <div class="flex">
        <div class="flex-shrink-0 flex flex-col w-2/5 h-full" x-data="{
            image: 0
        }">
            <div id="${chicken.path}_active" class="outline-gray-300 outline-1 outline rounded-xl flex-shrink-0">
            ${images.join("")}
            </div>
            <div class="flex h-36 gap-5 mt-5">
                <img @click="image = 0"
                    x-bind:class="image == 0 ? 'outline outline-2 outline-white' : 'outline outline-1 outline-gray-500'"
                    class="w-36 p-4 rounded-xl" src="public/3d_placeholder.png">
                ${images2.join("")}
            </div>
        </div>
        <div class="px-8">
            <div class="flex items-end">
                <h1 class="block mt-1 text-4xl leading-tight font-bold text-red-400">${chicken.name}
                </h1><span class="text-red-400 text-2xl font-bold mb-1">:</span><span
                    class="ml-2 mb-1 text-xl text-gray-100">${chicken.shortDescription}</span>
            </div>
            <div class="flex text-gray-100 items-center my-3">
                <span class="h-fit mb-[-2.5px] font-semibold pr-[0.375rem]">5.0</span>
                <div class="flex items-center h-fit">
                    <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                        <path
                            d="M12 .587l3.668 7.568L24 9.75l-6 5.851L19.336 24 12 19.885 4.664 24 6 15.601 0 9.75l8.332-1.595L12 .587z" />
                    </svg>
                    <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                        <path
                            d="M12 .587l3.668 7.568L24 9.75l-6 5.851L19.336 24 12 19.885 4.664 24 6 15.601 0 9.75l8.332-1.595L12 .587z" />
                    </svg>
                    <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                        <path
                            d="M12 .587l3.668 7.568L24 9.75l-6 5.851L19.336 24 12 19.885 4.664 24 6 15.601 0 9.75l8.332-1.595L12 .587z" />
                    </svg>
                    <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                        <path
                            d="M12 .587l3.668 7.568L24 9.75l-6 5.851L19.336 24 12 19.885 4.664 24 6 15.601 0 9.75l8.332-1.595L12 .587z" />
                    </svg>
                    <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                        <path
                            d="M12 .587l3.668 7.568L24 9.75l-6 5.851L19.336 24 12 19.885 4.664 24 6 15.601 0 9.75l8.332-1.595L12 .587z" />
                    </svg>
                </div>
                <span class="h-fit mb-[-2.6px] text-indigo-400 font-semibold pl-2">200 ratings</span>
            </div>
            <p class="mt-2 text-gray-100 flex items-start"><span>€</span><span
                    class="text-3xl font-bold">${chicken.price}</span><span>00</span></p>
            <div class="mt-5 gap-3 flex flex-col text-gray-100">
                ${chicken.description}
            </div>
            <div class="mt-6">
                <button class="bg-indigo-500 text-white px-5 py-3 rounded-lg flex gap-2 font-semibold"><svg
                        xmlns="http://www.w3.org/2000/svg" class="w-6"
                        viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                        <path style="fill: white"
                            d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20h44v44c0 11 9 20 20 20s20-9 20-20V180h44c11 0 20-9 20-20s-9-20-20-20H356V96c0-11-9-20-20-20s-20 9-20 20v44H272c-11 0-20 9-20 20z" />
                    </svg>Add to cart</button>
            </div>
        </div>
    </div>`
    ce.appendChild(element);
};

const qb = document.getElementById("quizbody");
const a = {
    "one": {
        "color": "blue-500",
        "question": "What's your ideal way to spend a Saturday afternoon?",
        "answers": [
            "Solving puzzles and brain teasers.",
            "Practicing martial arts or any physical activity.",
            "Engaging in artistic and creative activities.",
            "Dancing and enjoying lively music."
        ]
    },
    "two": {
        "color": "red-500",
        "question": "Which personality trait do you value most in a companion?",
        "answers": [
            "Intelligence and wit.",
            "Bravery and strength.",
            "Sophistication and refinement.",
            "Joyfulness and energy."
        ]
    },
    "three": {
        "color": "orange-500",
        "question": "How do you prefer to start your day?",
        "answers": [
            "With a challenging mental exercise.",
            "With a vigorous workout.",
            "With a quiet, reflective morning.",
            "With an upbeat dance routine."
        ]
    },
    "four": {
        "color": "purple-500",
        "question": "What’s your favorite type of entertainment?",
        "answers": [
            "Watching documentaries or solving puzzles.",
            "Action movies or martial arts shows.",
            "Visiting art galleries or listening to classical music.",
            "Attending concerts or dance performances."
        ]
    },
    "five": {
        "color": "teal-500",
        "question": "What's your favorite type of adventure?",
        "answers": [
            "Exploring the world of mysteries and enigmas.",
            "Imagining epic fantasy tales.",
            "Relaxing and enjoying laid-back activities.",
            "Dreaming about future possibilities."
        ]
    }
};
let i = 0;
for (const key of Object.keys(a)) {
    i++;
    const o = a[key];
    qb.innerHTML += `<div class="flex flex-col it">
<div>
    <div class="px-6 py-4 bg-${o.color} rounded-xl font-bold text-xl w-fit rounded-b-none">${i}. Question:
    </div>
    <div class="px-6 py-4 rounded-xl border-4 border-${o.color} rounded-tl-none border-spacing-2 text-lg rounded-bl-none">
        ${o.question}
    </div>
</div>
<div class="border-l-${o.color} h-5 border-l-4"></div>
<div class="flex flex-col">
    ${o.answers.map((answer, index) => {
        return `<div class="flex gap-3"><div class="border-l-${o.color} border-l-4"></div><div class="w-full leftside cursor-pointer px-4 py-4 flex items-center gap-4 rounded-xl border-gray-600 border-2"
        @click="toggle('${key}', ${index + 1})"
        x-bind:class="${key} == ${index + 1} ? 'selected': (${key} == ${(index + 1) * -1} ? 'selected-reverse': '')">
        <div class="outline outline-2 outline-gray-600 w-10 h-10 rounded-md flex items-center justify-center"
            x-bind:class="${key} == ${index + 1} ? 'selectedO': (${key}== ${(index + 1) * -1} ? 'selectedO-reverse' : '')">
            <div class="bg-green-400 rounded-md"
                x-bind:class="${key} == ${index + 1} ? 'quadrat' : (${key}== ${(index + 1) * -1} ? 'quadrat-reverse':'')"></div>
        </div>
        <div class="h-fit">${answer}</div>
    </div></div>`
    }).join(`
        <div class="border-l-${o.color} h-5 border-l-4"></div>
    `)}
    <div class="border-l-${o.color} h-2 border-l-4 rounded-b-md"></div>
</div>
</div>`
}

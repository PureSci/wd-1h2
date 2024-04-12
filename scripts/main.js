window.addEventListener("load", (event) => {
    // Assuming you have 3 images named 'dvd-logo1.png', 'dvd-logo2.png', 'dvd-logo3.png'
    const imagesSrc = ['blue.png', 'magenta.png', 'yellow.png'];
    const images = [];
    let currentImageIndex = 0;
    const canvas = document.getElementById('dvdlayer');
    const ctx = canvas.getContext('2d');

    // Set canvas size to fullscreen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Load images
    imagesSrc.forEach(src => {
        const img = new Image();
        img.src = src;
        images.push(img);
    });

    const imageWidth = 100;
    const imageHeight = 50;

    let x = canvas.width - imageWidth;
    let y = canvas.height - imageHeight;

    const startAt = Date.now();
    const time = 3 * 1000;
    const speed = 1;

    for (let i = 0; i < time * speed; i++) {
        x = - speed;
        y = - speed;
        if (x <= 0 || x >= canvas.width - imageWidth) {
            speed = -speed;
        }
    }

    function draw() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(images[currentImageIndex], x, y, imageWidth, imageHeight);



        requestAnimationFrame(draw);
    }

    draw();

});
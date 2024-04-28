window.addEventListener("load", () => {
    const imagesSrc = ['blue.png', 'magenta.png', 'yellow.png'];
    const images = [];
    let currentImageIndex = 0;
    const canvas = document.getElementById('dvdlayer');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    imagesSrc.forEach(src => {
        const img = new Image();
        img.src = src;
        images.push(img);
    });

    const imageWidth = 100;
    const imageHeight = 50;

    let x = canvas.width - imageWidth;
    let y = canvas.height - imageHeight;

    const fps = 60;
    const time = 3 * fps; // 3 seconds in miliseconds
    const speed = 20; // second factor

    let direction = 0; // 0: left-up, 1: left-down, 2: right-down, 3: right-up

    let lastBump;

    const move = (reverse = false, noBounce = false) => {
        if (direction == 0) {
            x -= speed;
            y -= speed;
        } else if (direction == 1) {
            x -= speed;
            y += speed;
        } else if (direction == 2) {
            x += speed;
            y += speed;
        } else if (direction == 3) {
            x += speed;
            y -= speed;
        }
        if (!noBounce) {
            let happening = 0;
            if (x < 0) happening = 1;
            else if (x > canvas.width - imageWidth) happening = 2;
            else if (y < 0) happening = 3;
            else if (y > canvas.height - imageHeight) happening = 4;
            console.log(happening, lastBump)
            if (happening > 0 && lastBump && happening !== lastBump) {
                lastBump = happening;
                revertDirection();
                move(false, true);
                revertDirection();
                currentImageIndex++;
                if (currentImageIndex >= images.length) currentImageIndex = 0;
                if (reverse) {
                    direction--;
                    if (direction < 0) direction = 3;
                } else {
                    direction++;
                    if (direction > 3) direction = 0;
                }
            }
        }
    }

    for (let i = 0; i < time; i++) {
        move();
    }

    let end = false;
    let stop = false;
    let openingWidth = 0;
    const openingSpeed = 20;

    ctx.fillStyle = 'black';
    let total = 0;
    function draw() {
        total++;
        if (total === time) {
            end = true;
            setTimeout(() => {
                stop = true;
                canvas.remove();
            }, 3000);
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (!end) {
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(images[currentImageIndex], x, y, imageWidth, imageHeight);
            move(true);
        } else {
            ctx.fillRect(0, 0, canvas.width - openingWidth, canvas.height);
            ctx.fillRect(0, 0, canvas.width, canvas.height - openingWidth);
            openingWidth += openingSpeed;
        }

        setTimeout(() => {
            if (!stop) requestAnimationFrame(draw);
        }, 1000 / fps);
    }

    function revertDirection() {
        if (direction === 0) direction = 2;
        else if (direction === 1) direction = 3;
        else if (direction === 2) direction = 0;
        else if (direction === 3) direction = 1;
    }

    revertDirection();
    draw();
});
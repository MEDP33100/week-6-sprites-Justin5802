class Sprite {
    constructor(data) {
        this.data = data;
        this.element = this.createSpriteElement();
    }

    createSpriteElement() {
        const sprite = document.createElement("div");
        sprite.classList.add("sprite");
        sprite.textContent = this.data.title;
        return sprite;
    }

    animate() {
        gsap.to(this.element, {
            duration: 1,
            rotation: 360,
            scale: 1.2,
            yoyo: true,
            repeat: -1,
            ease: "power1.inOut"
        });
    }
}

async function fetchData() {
    try {
        const response = await fetch("songs.json");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

async function renderSprites() {
    const container = document.getElementById("sprite-container");
    const songs = await fetchData();

    songs.forEach(song => {
        const sprite = new Sprite(song);
        container.appendChild(sprite.element);

        sprite.animate();
    });
}

renderSprites();
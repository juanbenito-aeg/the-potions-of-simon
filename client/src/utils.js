function createParticles(x, y) {
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement("div");

    particle.className = "particle";

    document.body.appendChild(particle);

    const size = Math.floor(Math.random() * 11 + 10);
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // |||||||||||||||| GENERATE A RANDOM X & Y DESTINATION WITHIN A DISTANCE OF 100PX FROM THE ORIGIN
    const destinationX = x + (Math.random() - 0.5) * 2 * 100;
    const destinationY = y + (Math.random() - 0.5) * 2 * 100;

    const rotation = Math.random() * 520;

    const animation = particle.animate(
      [
        {
          transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(0)`, // SET THE ORIGIN POSITION OF THE PARTICLE
          opacity: 1,
        },
        {
          transform: `translate(${destinationX}px, ${destinationY}px) rotate(${rotation}deg)`, // DEFINE THE FINAL COORDINATES
          opacity: 0,
        },
      ],
      {
        duration: Math.random() * 1000 + 1500,
        easing: "cubic-bezier(0, 0.9, 0.57, 1)",
        delay: Math.random() * 200,
      }
    );

    animation.addEventListener("finish", () => {
      particle.remove();
    });
  }
}

export { createParticles };

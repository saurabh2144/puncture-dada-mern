 tsParticles.load("tsparticles", {
        background: { color: "#1f2937" },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
            onClick: { enable: true, mode: "push" },
            resize: true,
          },
          modes: {
            repulse: { distance: 100, duration: 0.4 },
            push: { quantity: 4 },
          },
        },
        particles: {
          color: { value: "#ffffff" },
          links: { enable: true, color: "#ffffff", distance: 150 },
          move: { enable: true, speed: 2 },
          number: { value: 80 },
          size: { value: { min: 1, max: 5 } },
        },
      });

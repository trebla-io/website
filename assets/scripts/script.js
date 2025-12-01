document.getElementById("y").textContent = new Date().getFullYear();

// Scroll Reveal Animation
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    root: null,
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  }
);

revealElements.forEach((el) => revealObserver.observe(el));

// Navbar Scroll Effect
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add(
      "bg-black/80",
      "backdrop-blur-md",
      "border-b",
      "border-white/5"
    );
  } else {
    navbar.classList.remove(
      "bg-black/80",
      "backdrop-blur-md",
      "border-b",
      "border-white/5"
    );
  }
});

// Spotlight Effect
const cardsContainer = document.getElementById("cards-container");
const cards = document.querySelectorAll(".spotlight-card");

cardsContainer.onmousemove = (e) => {
  for (const card of cards) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  }
};

// Parallax Effect
document.addEventListener("mousemove", (e) => {
  const x = (window.innerWidth - e.pageX * 2) / 100;
  const y = (window.innerHeight - e.pageY * 2) / 100;

  const grid = document.querySelector(".bg-grid-pattern");
  if (grid) {
    grid.style.transform = `translate(${x}px, ${y}px)`;
  }
});

// Text Scramble Effect
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

document.querySelectorAll("[data-value]").forEach((element) => {
  element.onmouseover = (event) => {
    let iteration = 0;

    clearInterval(event.target.interval);

    event.target.interval = setInterval(() => {
      event.target.innerText = event.target.innerText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return event.target.dataset.value[index];
          }

          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iteration >= event.target.dataset.value.length) {
        clearInterval(event.target.interval);
      }

      iteration += 1 / 3;
    }, 30);
  };
});

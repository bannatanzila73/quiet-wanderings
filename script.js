/* ============================================================
   QUIET WANDERINGS — custom JavaScript
   1) showWelcomeMessage()  -> time-aware greeting, index only
   2) Mood check-in         -> an original function that takes
      user input (a click) and returns a matching quote + a
      linked "moment" from the site. Not copied from any template.
   ============================================================ */

/* ---------- 1. Welcome message (index page only) ---------- */
function showWelcomeMessage() {
  const hour = new Date().getHours();
  let greeting;
  if (hour < 5) greeting = "You're up late";
  else if (hour < 12) greeting = "Good morning";
  else if (hour < 17) greeting = "Good afternoon";
  else if (hour < 21) greeting = "Good evening";
  else greeting = "Good evening";

  const banner = document.getElementById('welcome-banner');
  if (!banner) return;

  banner.innerHTML = `
    <button class="close-banner" aria-label="Close">&times;</button>
    <strong>${greeting} 🌾</strong><br>
    Welcome to Quiet Wanderings — take your time here, there's no rush.
  `;

  banner.querySelector('.close-banner').addEventListener('click', () => {
    banner.classList.remove('show');
  });

  setTimeout(() => banner.classList.add('show'), 250);
}

/* ---------- 2. Mood check-in widget ---------- */
const MOODS = {
  calm: {
    label: "Calm",
    emoji: "🌿",
    quote: "\u201CSome days all you need is quiet, and that's enough.\u201D",
    text: "That sounds like a slow-morning kind of day.",
    linkPage: "cozy-morning.html",
    linkLabel: "Revisit a cozy morning",
  },
  restless: {
    label: "Restless",
    emoji: "🥾",
    quote: "\u201CWhen my mind is loud, I go find a mountain.\u201D",
    text: "Maybe it's time to get outside and move.",
    linkPage: "mountain-hike.html",
    linkLabel: "See a hike that helped",
  },
  dreamy: {
    label: "Dreamy",
    emoji: "🌅",
    quote: "\u201CI keep chasing skies like that one.\u201D",
    text: "Sounds like a golden-hour kind of mood.",
    linkPage: "bali-sunset.html",
    linkLabel: "Revisit that sunset",
  },
  creative: {
    label: "Creative",
    emoji: "🎨",
    quote: "\u201CMake something, even if it's small and a little messy.\u201D",
    text: "Let's get your hands busy today.",
    linkPage: "sketching-art.html",
    linkLabel: "See a sketching afternoon",
  },
};

function renderMoodBox() {
  const box = document.getElementById("mood-app");
  if (!box) return;

  box.innerHTML = `
    <h3>How are you feeling today?</h3>
    <p class="mood-sub">Pick what feels closest — I'll leave you with something small.</p>
    <div class="mood-options">
      ${Object.entries(MOODS)
        .map(
          ([key, m]) =>
            `<button type="button" data-mood="${key}"><span class="emoji">${m.emoji}</span>${m.label}</button>`
        )
        .join("")}
    </div>
    <div id="mood-result"></div>
  `;

  box.querySelectorAll(".mood-options button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const mood = MOODS[btn.getAttribute("data-mood")];
      document.getElementById("mood-result").innerHTML = `
        <div class="mood-result">
          <p class="quote">${mood.quote}</p>
          <p>${mood.text}</p>
          <a class="btn btn-outline" href="${mood.linkPage}">${mood.linkLabel}</a>
          <br>
          <button class="mood-restart" onclick="renderMoodBox()">Pick a different mood</button>
        </div>
      `;
    });
  });
}

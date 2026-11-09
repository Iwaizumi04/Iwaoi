
function checkPassword() {

    const enteredPassword =
        document.getElementById("password").value;

    const correctPassword = "0104";

    if (enteredPassword === correctPassword) {

        document.getElementById("password-screen").style.display = "none";

        document.getElementById("welcome").style.display = "flex";

    } else {

        document.getElementById("wrong-password").textContent =
            "Wrong password ❤️ Try again.";

    }

}


/* =========================================================
   THE LITTLE GOTHIC GRIMOIRE
   Loading -> Password -> Welcome -> Main website
   ========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);

  /* ---------- SCREEN SEQUENCE ---------- */

  const loadingScreen = $("loading-screen");
  const passwordScreen = $("password-screen");
  const welcomeScreen = $("welcome");
  const website = $("website");
  const progressBar = $("loading-progress");
  const percentText = $("loading-percent");
  const loadingText = $("loading-text");

  passwordScreen.hidden = true;
  welcomeScreen.hidden = true;
  website.hidden = true;

  const loadingMessages = [
    [0, "Gathering memories..."],
    [20, "Finding my favourite moments..."],
    [40, "Remembering all our adventures..."],
    [60, "Collecting all the reasons I love you..."],
    [80, "Almost ready..."],
    [95, "Welcome to our little world ♡"]
  ];

  let progress = 0;

  const loadingInterval = window.setInterval(() => {
    progress = Math.min(progress + 1, 100);

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    if (percentText) {
      percentText.textContent = `${progress}%`;
    }

    const message = [...loadingMessages]
      .reverse()
      .find(([at]) => progress >= at);

    if (message && loadingText) {
      loadingText.textContent = message[1];
    }

    if (progress >= 100) {
      window.clearInterval(loadingInterval);

      window.setTimeout(() => {
        loadingScreen.classList.add("fade-out");

        window.setTimeout(() => {
          loadingScreen.hidden = true;
          passwordScreen.hidden = false;
          $("password")?.focus();
        }, 950);

      }, 450);
    }

  }, 25);


  /* ---------- PASSWORD GATE ---------- */

  const passwordForm = $("password-form");

  passwordForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const entered = $("password")?.value ?? "";

    if (entered === "0104") {
      passwordScreen.hidden = true;
      welcomeScreen.hidden = false;
      $("wrong-password").textContent = "";
    } else {
      $("wrong-password").textContent = "Wrong password ♡ Try again.";
      $("password").value = "";
      $("password").focus();
    }
  });


  /* ---------- ENTER WEBSITE ---------- */

  $("enter-site")?.addEventListener("click", () => {
    welcomeScreen.hidden = true;
    website.hidden = false;

    showPage("home");

    updateRavenDisplay();
    updateChestDisplay();
  });


  /* ---------- PAGE NAVIGATION ---------- */

  const pages = [...document.querySelectorAll(".page")];

  const navButtons = [
    ...document.querySelectorAll(".nav-button")
  ];

  function showPage(pageName) {
    pages.forEach((page) => {
      page.classList.toggle("active", page.id === pageName);
    });

    navButtons.forEach((button) => {
      button.classList.toggle(
        "active",
        button.dataset.page === pageName
      );
    });

    if (pageName === "scratch") {
      window.setTimeout(setupScratch, 80);
    }
  }

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      showPage(button.dataset.page);
    });
  });

  document.querySelectorAll("[data-go]").forEach((button) => {
    button.addEventListener("click", () => {
      showPage(button.dataset.go);
    });
  });


  /* ---------- CURSOR HEART TRAIL ---------- */

  const cursorHeart = document.querySelector(".cursor-heart");
  const trailContainer = document.querySelector(".cursor-trail-container");

  let lastTrailTime = 0;

  document.addEventListener("mousemove", (event) => {

    if (cursorHeart) {
      cursorHeart.style.left = `${event.clientX}px`;
      cursorHeart.style.top = `${event.clientY}px`;
    }

    const now = Date.now();

    if (trailContainer && now - lastTrailTime > 110) {

      const trail = document.createElement("span");

      trail.className = "cursor-trail";
      trail.textContent = "♡";
      trail.style.left = `${event.clientX}px`;
      trail.style.top = `${event.clientY}px`;

      trailContainer.appendChild(trail);

      window.setTimeout(() => trail.remove(), 850);

      lastTrailTime = now;
    }

  });


  /* ---------- TAROT CARDS ---------- */

  const tarotCards = [
    ...document.querySelectorAll(".tarot-card")
  ];

  const tarotCaption = $("tarot-caption");

  const tarotMeanings = [
    "The Sun — You bring warmth, happiness, and light into my life.",
    "The Moon — Even in the mystery and darkness, I would always find you.",
    "The Lovers — A connection chosen freely, deeply, and again and again."
  ];

  tarotCards.forEach((card, index) => {

    card.addEventListener("click", () => {

      card.classList.toggle("flipped");

      if (tarotCaption) {
        tarotCaption.textContent =
          card.classList.contains("flipped")
            ? tarotMeanings[index]
            : "Choose a card to reveal its meaning.";
      }

    });

  });

  $("shuffle-tarot")?.addEventListener("click", () => {

    tarotCards.forEach((card) => {
      card.classList.remove("flipped");
    });

    if (tarotCaption) {
      tarotCaption.textContent =
        "Choose a card to reveal its meaning.";
    }

  });


  /* ---------- SECRET SEALS / MESSAGES ---------- */

  $("secret-seal")?.addEventListener("click", () => {

    const message = $("secret-message");

    if (!message) return;

    message.classList.toggle("hidden");

    $("secret-seal").textContent =
      message.classList.contains("hidden")
        ? "✦ Break the seal ✦"
        : "❦ The secret is yours ❦";

  });

  $("reveal-secret")?.addEventListener("click", () => {
    $("secretMessage")?.classList.toggle("hidden");
  });

  $("final-button")?.addEventListener("click", () => {
    $("final")?.classList.toggle("hidden");
  });


  /* ---------- SONG ---------- */

  $("play-song")?.addEventListener("click", async () => {

    const song = $("ourSong");

    if (!song) return;

    try {
      await song.play();
    } catch (error) {
      console.warn(
        "The song could not be played. Check that song.mp3 is in the same folder.",
        error
      );
    }

  });


  /* ---------- MINI QUIZ ---------- */

  const correctAnswers = {
    1: "d",
    2: "c",
    3: "c",
    4: "d"
  };

  const quizAnswers = {};

  document.querySelectorAll(".quiz-question button[data-q]")
    .forEach((button) => {

      button.addEventListener("click", () => {

        const q = button.dataset.q;

        if (quizAnswers[q]) return;

        quizAnswers[q] = button.dataset.a;

        const question = button.closest(".quiz-question");

        question?.querySelectorAll("button").forEach((choice) => {

          choice.disabled = true;

          if (choice.dataset.a === correctAnswers[q]) {
            choice.classList.add("correct");
          } else if (choice === button) {
            choice.classList.add("wrong");
          }

        });

        if (Object.keys(quizAnswers).length === 4) {

          const score = Object.keys(correctAnswers)
            .filter((key) => quizAnswers[key] === correctAnswers[key])
            .length;

          const result = $("quiz-result");

          if (result) {

            result.innerHTML =
              score === 4
                ? "4 / 4 ♡<br>You really do know us."
                : score >= 2
                  ? `${score} / 4 ♡<br>Not bad... I'll let you stay.`
                  : `${score} / 4<br>Skill issue.`;

          }

        }

      });

    });


  /* ---------- ANNIVERSARY MEMORY GAME ---------- */

  const memoryGrid = $("anniversary-memory-grid");
  const memoryStatus = $("anniversary-memory-status");

  const memoryItems = [
    "🖤", "🖤",
    "🌙", "🌙",
    "☀️", "☀️",
    "💋", "💋",
    "🏐", "🏐",
    "🎵", "🎵"
  ];

  let firstCard = null;
  let secondCard = null;
  let memoryLocked = false;
  let memoryMatches = 0;
  let memoryTimer = null;

  function shuffle(items) {

    const result = [...items];

    for (let i = result.length - 1; i > 0; i--) {

      const j = Math.floor(Math.random() * (i + 1));

      [result[i], result[j]] = [result[j], result[i]];

    }

    return result;
  }

  function createMemoryGame() {

    if (!memoryGrid) return;

    window.clearTimeout(memoryTimer);

    memoryGrid.innerHTML = "";

    firstCard = null;
    secondCard = null;
    memoryLocked = false;
    memoryMatches = 0;

    if (memoryStatus) {
      memoryStatus.textContent = "Find all the matching pairs ♡";
    }

    shuffle(memoryItems).forEach((symbol) => {

      const card = document.createElement("button");

      card.type = "button";
      card.className = "anniversary-memory-card";
      card.dataset.memory = symbol;
      card.setAttribute("aria-label", "Hidden memory card");

      card.innerHTML = `
        <span class="memory-inner">
          <span class="memory-front">♡</span>
          <span class="memory-back">${symbol}</span>
        </span>
      `;

      card.addEventListener("click", () => {
        flipMemoryCard(card);
      });

      memoryGrid.appendChild(card);

    });

  }

  function flipMemoryCard(card) {

    if (
      memoryLocked ||
      card.classList.contains("is-flipped") ||
      card.classList.contains("is-matched")
    ) {
      return;
    }

    card.classList.add("is-flipped");

    if (!firstCard) {
      firstCard = card;
      return;
    }

    secondCard = card;

    if (firstCard.dataset.memory === secondCard.dataset.memory) {

      firstCard.classList.add("is-matched");
      secondCard.classList.add("is-matched");

      firstCard = null;
      secondCard = null;

      memoryMatches++;

      if (
        memoryMatches === memoryItems.length / 2 &&
        memoryStatus
      ) {
        memoryStatus.textContent =
          "You found them all! ♡ I love you.";
      }

    } else {

      memoryLocked = true;

      memoryTimer = window.setTimeout(() => {

        firstCard?.classList.remove("is-flipped");
        secondCard?.classList.remove("is-flipped");

        firstCard = null;
        secondCard = null;

        memoryLocked = false;

      }, 900);

    }

  }

  $("anniversary-memory-reset")?.addEventListener(
    "click",
    createMemoryGame
  );

  createMemoryGame();


  /* ---------- SMALL GROWING GARDEN ---------- */

  const garden = $("garden");

  $("garden-button")?.addEventListener("click", () => {

    if (!garden) return;

    garden.classList.remove("bloom");

    void garden.offsetWidth;

    garden.textContent = "🌱  🌿  🌷  🥀  🌹  ✧";

    garden.classList.add("bloom");

  });


  /* ---------- RAVEN AND GOTHIC KEY ---------- */

  const ravenMessages = [
    "In every life, Ill search for you",
    "You are my reason to live, My heart",
    "I crave you like my body craves oxygen"
  ];

  let ravenIndex = 0;
  let ravenBusy = false;

  let hasGothicKey =
    localStorage.getItem("hasGothicKey") === "true";

  const ravenFlight = $("raven-flight");
  const ravenNote = $("raven-note");
  const ravenButton = $("raven-button");
  const ravenCounter = $("raven-counter");
  const droppedItem = $("dropped-item");
  const keyNotice = $("key-notice");
  const gothicKey = $("gothic-key");


  function updateRavenDisplay() {

    if (!ravenButton) return;

    if (hasGothicKey) {

      gothicKey?.classList.remove("hidden");
      keyNotice?.classList.remove("hidden");

      ravenButton.textContent =
        "The raven has completed its deliveries";

      ravenButton.disabled = true;

      if (ravenCounter) {
        ravenCounter.textContent =
          "All messages and the key have been delivered.";
      }

      return;
    }

    ravenButton.disabled = ravenBusy;

    ravenButton.textContent = ravenBusy
      ? "The raven is on its way..."
      : "Call the raven";

    if (ravenCounter) {

      const remaining = Math.max(
        0,
        ravenMessages.length - ravenIndex
      );

      ravenCounter.textContent = remaining
        ? `${remaining} ${remaining === 1 ? "message" : "messages"} remain.`
        : "The raven is carrying one final gift.";

    }

  }


  function deliverRaven() {

    if (ravenBusy || hasGothicKey || !ravenFlight) {
      return;
    }

    ravenBusy = true;

    updateRavenDisplay();

    droppedItem?.classList.add("hidden");

    ravenFlight.classList.remove("fly");

    void ravenFlight.offsetWidth;

    ravenFlight.classList.add("fly");

    window.setTimeout(() => {

      if (ravenIndex < ravenMessages.length) {

        if (ravenNote) {
          ravenNote.textContent = ravenMessages[ravenIndex];
        }

        if (droppedItem) {
          droppedItem.textContent = "✉";
          droppedItem.classList.remove("hidden");
        }

        ravenIndex++;

      } else {

        if (ravenNote) {
          ravenNote.textContent =
            "A final gift. The key to what has been kept for you.";
        }

        if (droppedItem) {
          droppedItem.textContent = "⚿";
          droppedItem.classList.remove("hidden");
        }

        hasGothicKey = true;

        localStorage.setItem("hasGothicKey", "true");
        localStorage.setItem("gothicChestOpen", "false");

        chestIsOpen = false;

        keyNotice?.classList.remove("hidden");
        gothicKey?.classList.remove("hidden");

        updateChestDisplay();

      }

      ravenBusy = false;

      updateRavenDisplay();

    }, 2250);

  }

  ravenButton?.addEventListener("click", deliverRaven);


  /* ---------- TREASURE CHEST / COUPONS ---------- */

  const treasureChest = $("treasure-chest");
  const chestButton = $("chest-button");
  const chestStatus = $("chest-status");
  const chestIntro = $("chest-intro");
  const chestLock = $("chest-lock");
  const couponArea = $("coupon-area");

  let chestIsOpen =
    localStorage.getItem("gothicChestOpen") === "true";


  function updateChestDisplay() {

    if (!treasureChest || !chestButton || !couponArea) {
      return;
    }

    const ownsKey =
      localStorage.getItem("hasGothicKey") === "true";

    hasGothicKey = ownsKey;

    if (!ownsKey) {

      chestIsOpen = false;

      treasureChest.classList.remove("open");
      treasureChest.classList.add("locked");

      couponArea.classList.add("hidden");

      chestLock?.classList.remove("hidden");

      chestButton.disabled = true;
      chestButton.textContent = "The chest is locked";

      if (chestStatus) {
        chestStatus.textContent =
          "The chest is locked. Find the raven's gothic key.";
      }

      if (chestIntro) {
        chestIntro.textContent =
          "The raven may have something special for you.";
      }

      return;
    }

    chestButton.disabled = false;

    treasureChest.classList.remove("locked");

    if (chestIntro) {
      chestIntro.textContent =
        "The raven has delivered the key. Your treasure awaits.";
    }

    if (chestIsOpen) {

      treasureChest.classList.add("open");

      chestLock?.classList.add("hidden");

      couponArea.classList.remove("hidden");

      chestButton.textContent = "The chest is open";

      if (chestStatus) {
        chestStatus.textContent =
          "Your treasures have been revealed. ♡";
      }

    } else {

      treasureChest.classList.remove("open");

      chestLock?.classList.remove("hidden");

      couponArea.classList.add("hidden");

      chestButton.textContent = "Unlock the chest";

      if (chestStatus) {
        chestStatus.textContent =
          "You have the key. Open your treasure.";
      }

    }

  }


  chestButton?.addEventListener("click", () => {

    if (localStorage.getItem("hasGothicKey") !== "true") {

      if (chestStatus) {
        chestStatus.textContent =
          "You need the raven's gothic key first.";
      }

      return;
    }

    chestIsOpen = true;

    localStorage.setItem("gothicChestOpen", "true");

    updateChestDisplay();

  });


  /* ---------- RAVEN RESET ---------- */

  $("raven-reset")?.addEventListener("click", () => {

    ravenIndex = 0;
    ravenBusy = false;
    hasGothicKey = false;
    chestIsOpen = false;

    localStorage.removeItem("hasGothicKey");
    localStorage.removeItem("gothicChestOpen");

    if (ravenNote) {
      ravenNote.textContent =
        "The raven has not delivered anything yet.";
    }

    droppedItem?.classList.add("hidden");
    keyNotice?.classList.add("hidden");
    gothicKey?.classList.add("hidden");
    ravenFlight?.classList.remove("fly");

    updateRavenDisplay();
    updateChestDisplay();

  });


  /* ---------- COUPON REDEMPTION ---------- */

  document.querySelectorAll(".coupon-redeem").forEach((button) => {

    button.addEventListener("click", () => {

      const coupon = button.closest(".coupon");

      if (!coupon || coupon.classList.contains("redeemed")) {
        return;
      }

      coupon.classList.add("redeemed");

      button.textContent = "Redeemed ♡";
      button.disabled = true;

    });

  });


  /* ---------- SCRATCH CARD ---------- */

  const scratchCanvas = $("scratch-canvas");
  const scratchContext = scratchCanvas?.getContext("2d");

  let isScratching = false;
  let scratchReady = false;


  function setupScratch() {

    if (
      !scratchCanvas ||
      !scratchContext ||
      !scratchCanvas.offsetWidth
    ) {
      return;
    }

    const rect = scratchCanvas.getBoundingClientRect();

    const ratio = window.devicePixelRatio || 1;

    scratchCanvas.width = Math.round(rect.width * ratio);
    scratchCanvas.height = Math.round(rect.height * ratio);

    scratchContext.setTransform(ratio, 0, 0, ratio, 0, 0);

    scratchContext.globalCompositeOperation = "source-over";

    scratchContext.fillStyle = "#5c0017";

    scratchContext.fillRect(
      0,
      0,
      rect.width,
      rect.height
    );

    scratchContext.fillStyle = "#f0dce2";

    scratchContext.font = "700 17px Cinzel, Georgia, serif";
    scratchContext.textAlign = "center";

    scratchContext.fillText(
      "SCRATCH HERE",
      rect.width / 2,
      rect.height / 2 - 5
    );

    scratchContext.font = "600 13px Georgia, serif";

    scratchContext.fillText(
      "✦ A little secret awaits ✦",
      rect.width / 2,
      rect.height / 2 + 22
    );

    scratchContext.globalCompositeOperation = "destination-out";

    scratchReady = true;

  }


  function scratchAt(event) {

    if (!scratchReady || !scratchCanvas || !scratchContext) {
      return;
    }

    const rect = scratchCanvas.getBoundingClientRect();

    scratchContext.beginPath();

    scratchContext.arc(
      event.clientX - rect.left,
      event.clientY - rect.top,
      19,
      0,
      Math.PI * 2
    );

    scratchContext.fill();

  }


  scratchCanvas?.addEventListener("pointerdown", (event) => {

    isScratching = true;

    scratchCanvas.setPointerCapture?.(event.pointerId);

    scratchAt(event);

  });


  scratchCanvas?.addEventListener("pointermove", (event) => {

    if (isScratching) {
      scratchAt(event);
    }

  });


  ["pointerup", "pointercancel", "pointerleave"].forEach((name) => {

    scratchCanvas?.addEventListener(name, () => {
      isScratching = false;
    });

  });


  $("scratch-reset")?.addEventListener("click", setupScratch);


  window.addEventListener("resize", () => {

    if ($("scratch")?.classList.contains("active")) {
      setupScratch();
    }

  });


  /* ---------- DAILY NOTE ---------- */

  const dailyMessages = [

    "If I could keep one thing from every moment of my life, it would be the feeling of being loved by you.",

    "In every version of the world, I would still look for you.",

    "You make even the ordinary moments feel like something worth remembering.",

    "If the world ever grows dark, I hope you remember that you will always have a light in me.",

    "I would choose your hand to hold in every lifetime."

  ];

  const today = new Date();

  const dayNumber = Math.floor(
    new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    ).getTime() / 86400000
  );

  if ($("daily-message")) {
    $("daily-message").textContent =
      dailyMessages[dayNumber % dailyMessages.length];
  }


  /* ---------- INITIAL STATE ---------- */

  updateRavenDisplay();
  updateChestDisplay();

});
// Змінна для керування активним таймером
let timerInterval = null;

// ==============================
// 1. ДАНІ НАСТРОЇВ
// ==============================
const moodData = {
    super: {
        emoji: "😎",
        title: "СУПЕР КЛАС!!! 🔥",
        cardClass: "super-card",
        photo: "images/super.jpg",
        body: `
            Оце я розумію настрій 😎<br>
            Я дуже радий, що в тебе сьогодні все добре ❤️
        `,
        smallText: `
            Так тримати! Сьогодні тобі офіційно дозволено
            бути найщасливішою дівчиною 😌✨
        `
    },
    good: {
        emoji: "🙂",
        title: "О, ЦЕ ВЖЕ ДОБРЕ ❤️",
        cardClass: "good-card",
        photo: "images/good.jpg",
        body: `
            Приємно чути, що в тебе хороший настрій.
        `,
        smallText: `
            Але знаєш що?<br>
            Я думаю, що його можна зробити ще кращим 😉
        `,
        extraContent: `
            <div class="secret">
                💌 Маленьке нагадування:<br><br>
                Ти дуже класна ❤️
            </div>
        `
    },
    normal: {
        emoji: "😐",
        title: "НУ, ТАКЕ... 😐",
        cardClass: "normal-card",
        photo: "images/normal.jpg",
        body: `
            Не погано, але й до «вау» трохи не дотягує.
        `,
        smallText: `
            А якщо нічого з цього не допоможе —<br><br>
            просто знай: десь є людина, яка хоче бачити твою посмішку ❤️
        `
    },
    bad: {
        emoji: "🥲",
        title: "ЕЙ, НЕ СУМУЙ ❤️",
        cardClass: "bad-card",
        photo: "images/bad.jpg",
        body: `
            Ти крута. Правда.<br><br>
            А принцескам плакати не можна 👑<br>
            Хіба що від щастя 😌
        `,
        smallText: `
            Що б сьогодні не сталося — це не назавжди.<br>
            Завтра може бути набагато краще ❤️
        `,
        extraContent: `
            <div class="hug">
                🫂<br>
                <span>Віртуальні обійми вже виїхали.</span>
            </div>
        `
    },
    surprise: {
        emoji: "🦔",
        title: "СЕКРЕТНИЙ СЮРПРИЗ! 🎉",
        cardClass: "surprise-card",
        photo: "images/hedgehog.jpg",
        body: `
            Просто посміхнись, і я вже буду цьому дуже радий ❤️
        `,
        smallText: `
            Цей маленький їжачок передає тобі свій привіт 🦔✨
        `
    }
};

const normalRecommendations = [
    "🍫 Щось смачненьке + улюблена музика",
    "🎬 Подивись щось, що давно хотіла",
    "🛋️ Загорнись у ковдру і просто відпочинь",
    "🎧 Навушники у вуха — і нехай світ почекає",
    "☕ Зроби собі щось смачне і влаштуй маленький chill"
];

// ==============================
// 2. ФУНКЦІЯ КЕРУВАННЯ ПОКАЗОМ
// ==============================
function showMood(mood) {
    const result = document.getElementById("result");
    if (!result || !moodData[mood]) return;

    // Скидаємо діючий таймер при перемиканні
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    // Якщо сюрприз — запускаємо зворотний відлік
    if (mood === "surprise") {
        startSurpriseTimer();
        return;
    }

    renderCard(mood);
}

// Запускає таймер очікування для сюрпризу
function startSurpriseTimer() {
    const result = document.getElementById("result");
    let countdown = 3;

    result.innerHTML = `
        <div class="timer-card">
            <p>🎁 Відкриваємо секретний подарунок...</p>
            <div class="timer-number">${countdown}</div>
        </div>
    `;

    result.classList.remove("show");
    void result.offsetWidth;
    result.classList.add("show");

    timerInterval = setInterval(() => {
        countdown--;
        const timerNum = document.querySelector(".timer-number");
        
        if (timerNum) {
            timerNum.innerText = countdown;
        }

        if (countdown <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            renderCard("surprise");
        }
    }, 1000);
}

// Відмальовка картки
function renderCard(mood) {
    const result = document.getElementById("result");
    const data = moodData[mood];
    let extraHTML = data.extraContent || "";

    if (mood === "normal") {
        const randomRec = normalRecommendations[
            Math.floor(Math.random() * normalRecommendations.length)
        ];
        extraHTML = `
            <div class="recommendation">
                <strong>💡 Рекомендація дня:</strong>
                <p>${randomRec}</p>
            </div>
        `;
    }

    result.innerHTML = `
        <div class="mood-card ${data.cardClass}">
            <div class="big-emoji">${data.emoji}</div>
            <h2>${data.title}</h2>
            <p>${data.body}</p>
            ${extraHTML}
            <p class="small-text">${data.smallText}</p>
            <img src="${data.photo}" alt="Фото настрою" loading="lazy" onerror="this.style.display='none'">
        </div>
    `;

    result.classList.remove("show");
    void result.offsetWidth;
    result.classList.add("show");

    triggerEffects(mood);
}

// ==============================
// 3. ЕФЕКТИ
// ==============================
function triggerEffects(mood) {
    const container = document.getElementById("confetti");
    if (!container) return;

    container.innerHTML = "";
    const fragment = document.createDocumentFragment();

    if (mood === "super") {
        const colors = ["#ff6b81", "#ffda79", "#1dd1a1", "#54a0ff", "#5f27cd"];
        for (let i = 0; i < 45; i++) {
            const piece = document.createElement("div");
            piece.classList.add("effect-item", "confetti-piece");
            piece.style.left = `${Math.random() * 100}%`;
            piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            piece.style.animationDuration = `${Math.random() * 2 + 2}s`;
            piece.style.animationDelay = `${Math.random() * 0.3}s`;
            fragment.appendChild(piece);
        }
    } else if (mood === "good") {
        const symbols = ["❤️", "💖", "✨", "🌸", "💕"];
        for (let i = 0; i < 20; i++) {
            const piece = document.createElement("div");
            piece.classList.add("effect-item", "floating-heart");
            piece.innerText = symbols[Math.floor(Math.random() * symbols.length)];
            piece.style.left = `${Math.random() * 90 + 5}%`;
            piece.style.fontSize = `${Math.random() * 12 + 16}px`;
            piece.style.animationDuration = `${Math.random() * 2 + 2.5}s`;
            piece.style.animationDelay = `${Math.random() * 0.4}s`;
            fragment.appendChild(piece);
        }
    } else if (mood === "normal") {
        for (let i = 0; i < 15; i++) {
            const piece = document.createElement("div");
            piece.classList.add("effect-item", "bubble");
            const size = Math.random() * 25 + 15;
            piece.style.width = `${size}px`;
            piece.style.height = `${size}px`;
            piece.style.left = `${Math.random() * 90 + 5}%`;
            piece.style.animationDuration = `${Math.random() * 3 + 2.5}s`;
            piece.style.animationDelay = `${Math.random() * 0.5}s`;
            fragment.appendChild(piece);
        }
    } else if (mood === "bad") {
        const symbols = ["⭐", "✨", "💫", "☀️"];
        for (let i = 0; i < 22; i++) {
            const piece = document.createElement("div");
            piece.classList.add("effect-item", "starlight");
            piece.innerText = symbols[Math.floor(Math.random() * symbols.length)];
            piece.style.left = `${Math.random() * 95}%`;
            piece.style.fontSize = `${Math.random() * 12 + 15}px`;
            piece.style.animationDuration = `${Math.random() * 2 + 2}s`;
            piece.style.animationDelay = `${Math.random() * 0.4}s`;
            fragment.appendChild(piece);
        }
    } else if (mood === "surprise") {
        const symbols = ["🦔", "🎁", "✨", "💛", "🍎"];
        for (let i = 0; i < 25; i++) {
            const piece = document.createElement("div");
            piece.classList.add("effect-item", "surprise-pop");
            piece.innerText = symbols[Math.floor(Math.random() * symbols.length)];
            piece.style.left = `${Math.random() * 90 + 5}%`;
            piece.style.fontSize = `${Math.random() * 16 + 18}px`;
            piece.style.animationDuration = `${Math.random() * 2 + 2}s`;
            piece.style.animationDelay = `${Math.random() * 0.3}s`;
            fragment.appendChild(piece);
        }
    }

    container.appendChild(fragment);

    setTimeout(() => {
        container.innerHTML = "";
    }, 4200);
}
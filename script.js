// ==============================
// 1. ДАНІ ДЛЯ КОЖНОГО НАСТРОЮ
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
// 2. ГОЛОВНА ФУНКЦІЯ ПОКАЗУ
// ==============================
function showMood(mood) {
    const result = document.getElementById("result");
    if (!result || !moodData[mood]) return;

    const data = moodData[mood];
    let extraHTML = data.extraContent || "";

    // Випадкова рекомендація для настрою "normal"
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

    // Формуємо картку
    result.innerHTML = `
        <div class="mood-card ${data.cardClass}">
            <div class="big-emoji">${data.emoji}</div>
            <h2>${data.title}</h2>
            <p>${data.body}</p>
            ${extraHTML}
            <p class="small-text">${data.smallText}</p>
            <img src="${data.photo}" alt="Фото настрою" loading="lazy">
        </div>
    `;

    // Перезапускаємо анімацію появи
    result.classList.remove("show");
    void result.offsetWidth; // Примусовий reflow для плавної анімації
    result.classList.add("show");

    // Запускаємо конфеті, якщо настрій "super"
    if (mood === "super") {
        createConfetti();
    }
}

// ==============================
// 3. ФУНКЦІЯ КОНФЕТІ
// ==============================
function createConfetti() {
    const container = document.getElementById("confetti");
    if (!container) return;

    container.innerHTML = "";
    const colors = ["#ff6b81", "#ffda79", "#1dd1a1", "#54a0ff", "#5f27cd"];
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 60; i++) {
        const piece = document.createElement("div");
        piece.classList.add("confetti-piece");

        piece.style.left = `${Math.random() * 100}%`;
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDuration = `${Math.random() * 2 + 2}s`;
        piece.style.animationDelay = `${Math.random() * 0.4}s`;

        fragment.appendChild(piece);
    }

    container.appendChild(fragment);

    // Очищаємо елементи після завершення анімації
    setTimeout(() => {
        container.innerHTML = "";
    }, 4500);
}
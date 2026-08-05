/* =========================
   USERNAME / START SURPRISE
========================= */

function startSurprise() {


    const input =
        document.getElementById("usernameInput");

    const name =
        input.value.trim();

    const error =
        document.getElementById("errorMessage");

    // Require uppercase-only input
    if (name === "") {

        error.innerText =
            "Please enter your name first ❤️";

        input.focus();

        return;

    }

    if (name !== name.toUpperCase()) {

        error.innerText =
            "Please enter your name in CAPITAL LETTERS only."

        input.focus();

        return;

    }

    // name is already uppercase
    const upperName = name;


    error.innerText = "";


    /*
       Put the entered name
       everywhere on the page.
    */

    document.getElementById("birthdayName")
        .innerText = upperName;

    document.getElementById("messageName")
        .innerText = upperName;

    document.getElementById("finalName")
        .innerText = "Happy Birthday, " + upperName + "!";

    document.getElementById("footerName")
        .innerText = upperName;


    // After entering name, ask the user to tap their birth date.
    const calendar = document.getElementById("calendarContainer");

    const calendarError = document.getElementById("calendarError");

    if (calendar) {
        calendar.classList.remove("hidden");
    }

    if (calendarError) calendarError.innerText = "";

    buildAugust2026Calendar();

}


let countdownInterval;

function getSurpriseTarget() {

    const now = new Date();

    const target = new Date(
        now.getFullYear(),
        7,
        6,
        0,
        0,
        0,
        0
    );

    return now < target ? target : null;

}

function pad(value) {

    return value.toString().padStart(2, "0");

}

function showBirthdayPagePreview() {

    document.getElementById("loginPage").style.display = "none";

    document.getElementById("birthdayPage").style.display = "block";

    window.scrollTo(0, 0);

}

/* =========================
   CALENDAR (AUGUST 2026)
   User must tap 6th to open birthday page
========================= */

function buildAugust2026Calendar() {

    const grid = document.getElementById("calendarGrid");

    if (!grid) return;

    grid.innerHTML = "";

    const daysOfWeek = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    daysOfWeek.forEach(d => {
        const h = document.createElement("div");
        h.className = "day-header";
        h.innerText = d;
        grid.appendChild(h);
    });

    const year = 2026;
    const month = 7; // August (0-based)

    const first = new Date(year, month, 1);
    const startDay = first.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // empty cells before first day
    for (let i = 0; i < startDay; i++) {
        const empty = document.createElement("div");
        grid.appendChild(empty);
    }

    for (let day = 1; day <= daysInMonth; day++) {

        const cell = document.createElement("div");
        const btn = document.createElement("button");
        btn.className = "date-btn";
        btn.innerText = day;
        btn.dataset.day = day;
        btn.addEventListener("click", function() {
            onDateSelected(parseInt(this.dataset.day, 10));
        });

        cell.appendChild(btn);
        grid.appendChild(cell);

    }

}

function onDateSelected(day) {

    // highlight selection briefly
    document.querySelectorAll('.date-btn').forEach(b => b.classList.remove('selected'));
    const btn = Array.from(document.querySelectorAll('.date-btn')).find(b => parseInt(b.innerText,10) === day);
    if (btn) btn.classList.add('selected');

    if (day === 6) {
        proceedAfterDateSelection(true);
    } else {
        const err = document.getElementById("calendarError");
        if (err) err.innerText = "That's not the right date. Try again ❤️";
        proceedAfterDateSelection(false);
    }

}

function proceedAfterDateSelection(isCorrect) {

    const calendar = document.getElementById("calendarContainer");

    const loginCountdown = document.getElementById("loginCountdown");

    const pageCountdown = document.getElementById("pageCountdown");

    const countdownPage = document.getElementById("countdownPage");

    const button = document.querySelector(".input-box button");

    if (!isCorrect) {
        // keep calendar open, do nothing else
        return;
    }


    // hide calendar and show the dedicated countdown page
    if (calendar) calendar.classList.add('hidden');

    if (document.getElementById('loginPage')) {
        document.getElementById('loginPage').style.display = 'none';
    }

    if (countdownPage) {
        countdownPage.classList.remove('hidden');
        countdownPage.style.display = 'flex';
    }

    if (pageCountdown) pageCountdown.classList.remove("hidden");
    if (loginCountdown) loginCountdown.classList.remove("hidden");

    const target = getSurpriseTarget();

    if (!target) {
        revealBirthdayPage();
        return;
    }

    if (button) {
        button.disabled = true;
        button.classList.add("disabled");
        button.innerText = "Wait for the surprise";
    }

    updateCountdown();

    countdownInterval = setInterval(updateCountdown, 1000);

}

function revealBirthdayPage() {

    clearInterval(countdownInterval);

    document.getElementById("loginPage")
        .style.display = "none";

    const countdownPage = document.getElementById('countdownPage');
    if (countdownPage) countdownPage.classList.add('hidden');

    document.getElementById("birthdayPage")
        .style.display = "block";

    startFireworks();

    startConfetti();

    startFloatingHearts();

    const music =
        document.getElementById("birthdayMusic");

    music.play().catch(() => {

        console.log(
            "Music will start after user interaction."
        );

    });

    window.scrollTo(0, 0);

}

// Skip the countdown and reveal the birthday page immediately
function skipCountdown() {
    clearInterval(countdownInterval);
    revealBirthdayPage();
}

function updateCountdown() {

    const loginCountdown = document.getElementById("loginCountdown");

    const pageCountdown = document.getElementById("pageCountdown");

    const button = document.querySelector(".input-box button");

    const target = getSurpriseTarget();

    if (!target) {

        const readyText = "🎉 The surprise is ready now!";

        if (loginCountdown) {
            loginCountdown.innerText = readyText;
            loginCountdown.classList.add("hidden");
        }

        if (pageCountdown) {
            pageCountdown.innerText = readyText;
            pageCountdown.classList.add("hidden");
        }

        if (button) {
            button.disabled = false;
            button.classList.remove("disabled");
        }

        revealBirthdayPage();

        return;

    }

    const now = new Date();

    const diff = target - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    const seconds = Math.floor((diff % (1000 * 60)) / 1000);


    const countdownText = `Surprise opens in ${pad(days)}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;

    if (loginCountdown) loginCountdown.innerText = countdownText;

    if (pageCountdown) {
        // initialize vertical countdown structure once
        if (!window._countdownInit) {
            initVerticalCountdown(pageCountdown);
            window._countdownInit = true;
        }

        // update units with sliding animation
        updateUnit('days', pad(days));
        updateUnit('hours', pad(hours));
        updateUnit('minutes', pad(minutes));
        updateUnit('seconds', pad(seconds));
    }

    if (button) {
        button.disabled = true;
        button.classList.add("disabled");
        button.innerText = "Wait for the surprise";
    }

}


/* =========================
   ENTER KEY
========================= */

document
    .getElementById("usernameInput")
    .addEventListener("keydown", function(event) {

        if (event.key === "Enter") {

            startSurprise();

        }

    });


/* =========================
   SCROLL TO MEMORIES
========================= */

function scrollToMemories() {

    document
        .getElementById("memories")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================
   MUSIC
========================= */

let musicPlaying = false;

function toggleMusic() {

    const music =
        document.getElementById("birthdayMusic");

    const button =
        document.querySelector(".music-button");


    if (musicPlaying) {

        music.pause();

        button.innerHTML = "🎵";

        musicPlaying = false;

    }

    else {

        music.play();

        button.innerHTML = "🔊";

        musicPlaying = true;

    }

}


/* =========================
   FLOATING HEARTS
========================= */

function createHeart() {

    const heart =
        document.createElement("div");

    heart.className =
        "floating-heart";

    const hearts = [
        "❤️",
        "💖",
        "💕",
        "💗",
        "💓",
        "💞"
    ];

    heart.innerText =
        hearts[
            Math.floor(
                Math.random() * hearts.length
            )
        ];


    heart.style.left =
        Math.random() * 100 + "vw";


    heart.style.fontSize =
        (15 + Math.random() * 30) + "px";


    heart.style.animationDuration =
        (5 + Math.random() * 5) + "s";


    document
        .querySelector(".floating-hearts")
        .appendChild(heart);


    setTimeout(() => {

        heart.remove();

    }, 10000);

}


function startFloatingHearts() {

    setInterval(
        createHeart,
        600
    );

}


/* =========================
   CONFETTI
========================= */

function startConfetti() {

    const container =
        document.getElementById(
            "confettiContainer"
        );


    for (let i = 0; i < 150; i++) {

        const piece =
            document.createElement("div");


        piece.style.position =
            "fixed";

        piece.style.width =
            "8px";

        piece.style.height =
            "14px";

        piece.style.left =
            Math.random() * 100 + "vw";

        piece.style.top =
            "-20px";


        piece.style.background =
            getRandomColor();


        piece.style.zIndex =
            "-1";

        piece.style.pointerEvents =
            "none";


        const duration =
            3 + Math.random() * 5;


        piece.style.animation =
            `confettiFall ${duration}s linear forwards`;


        piece.style.transform =
            `rotate(${Math.random() * 360}deg)`;


        container.appendChild(piece);


        setTimeout(() => {

            piece.remove();

        }, duration * 1000);

    }

}


function getRandomColor() {

    const colors = [

        "#ff4d8d",
        "#ffcc00",
        "#7df9ff",
        "#b967ff",
        "#ffffff",
        "#ff8fab",
        "#64ffda"

    ];

    return colors[
        Math.floor(
            Math.random() * colors.length
        )
    ];

}


/* =========================
   CONFETTI CSS DYNAMICALLY
========================= */

const confettiStyle =
    document.createElement("style");

confettiStyle.innerHTML = `

@keyframes confettiFall {

    from {

        transform:
            translateY(0)
            rotate(0deg);

        opacity: 1;

    }

    to {

        transform:
            translateY(110vh)
            rotate(720deg);

        opacity: 0;

    }

}
`;

document.head.appendChild(
    confettiStyle
);


/* =========================
   FIREWORKS
========================= */

const canvas =
    document.getElementById(
        "fireworksCanvas"
    );

const ctx =
    canvas.getContext("2d");


function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);


let particles = [];


class Particle {

    constructor(
        x,
        y,
        color,
        angle,
        speed
    ) {

        this.x = x;

        this.y = y;

        this.color = color;

        this.angle = angle;

        this.speed = speed;

        this.alpha = 1;

        this.gravity = 0.04;

    }


    update() {

        this.x +=
            Math.cos(this.angle)
            * this.speed;

        this.y +=
            Math.sin(this.angle)
            * this.speed;

        this.speed *= 0.97;

        this.y += this.gravity;

        this.alpha -= 0.012;

    }


    draw() {

        ctx.save();

        ctx.globalAlpha =
            this.alpha;

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            2,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            this.color;

        ctx.fill();

        ctx.restore();

    }

}


function createFirework() {

    const x =
        Math.random()
        * canvas.width;

    const y =
        Math.random()
        * canvas.height
        * 0.5 + 80;


    const colors = [

        "#ff4d8d",
        "#ffd166",
        "#7df9ff",
        "#b967ff",
        "#ffffff",
        "#64ffda"

    ];


    const color =
        colors[
            Math.floor(
                Math.random() * colors.length
            )
        ];


    for (
        let i = 0;
        i < 80;
        i++
    ) {

        const angle =
            (Math.PI * 2 * i) / 80;


        const speed =
            2 + Math.random() * 5;


        particles.push(
            new Particle(
                x,
                y,
                color,
                angle,
                speed
            )
        );

    }

}


function animateFireworks() {

    ctx.fillStyle =
        "rgba(8, 0, 16, 0.2)";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles =
        particles.filter(
            particle =>
                particle.alpha > 0
        );


    particles.forEach(
        particle => {

            particle.update();

            particle.draw();

        }
    );


    requestAnimationFrame(
        animateFireworks
    );

}


function startFireworks() {

    animateFireworks();


    /*
       First big fireworks
    */

    for (
        let i = 0;
        i < 8;
        i++
    ) {

        setTimeout(
            createFirework,
            i * 500
        );

    }


    /*
       Continue fireworks
    */

    setInterval(
        createFirework,
        2200
    );

}

// ---- Vertical sliding countdown implementation ----
function initVerticalCountdown(container) {
    container.innerHTML = `
        <div class="vertical-countdown">
            <div class="unit" data-unit="days">
                <div class="label">DAYS</div>
                <div class="viewport"><div class="num-wrapper"><div class="num">00</div><div class="num">00</div></div></div>
            </div>
            <div class="unit" data-unit="hours">
                <div class="label">HOURS</div>
                <div class="viewport"><div class="num-wrapper"><div class="num">00</div><div class="num">00</div></div></div>
            </div>
            <div class="unit" data-unit="minutes">
                <div class="label">MIN</div>
                <div class="viewport"><div class="num-wrapper"><div class="num">00</div><div class="num">00</div></div></div>
            </div>
            <div class="unit" data-unit="seconds">
                <div class="label">SEC</div>
                <div class="viewport"><div class="num-wrapper"><div class="num">00</div><div class="num">00</div></div></div>
            </div>
        </div>
    `;

    // store references
    window._countdownUnits = {};
    ['days','hours','minutes','seconds'].forEach(name => {
        const unitEl = container.querySelector(`.unit[data-unit="${name}"]`);
        const wrapper = unitEl.querySelector('.num-wrapper');
        const nums = unitEl.querySelectorAll('.num');
        window._countdownUnits[name] = { unitEl, wrapper, nums };
    });
}

function updateUnit(name, newValue) {
    const u = window._countdownUnits && window._countdownUnits[name];
    if (!u) return;

    // if same value, do nothing
    const current = u.nums[0].innerText;
    if (current === newValue) return;

    // set next value in second element
    u.nums[1].innerText = newValue;

    // trigger sliding by adding class to viewport
    const viewport = u.unitEl.querySelector('.viewport');
    viewport.classList.add('sliding');

    // when transition ends, copy second to first and reset
    const wrapper = u.wrapper;
    const onEnd = () => {
        u.nums[0].innerText = newValue;
        // reset position
        wrapper.style.transform = '';
        viewport.classList.remove('sliding');
        wrapper.removeEventListener('transitionend', onEnd);
    };

    // apply transform to wrapper to slide up
    // use requestAnimationFrame to ensure layout
    requestAnimationFrame(() => {
        wrapper.style.transform = 'translateY(-100%)';
        wrapper.addEventListener('transitionend', onEnd);
    });
}

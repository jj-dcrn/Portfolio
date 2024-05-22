"use strict";


import {gsap} from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

var siHome = document.querySelector('.formations');
if (window.matchMedia("(max-width: 600px)").matches) {

  if (siHome){
    const blockAnim = document.querySelector('.formations__p');
  
    //texte de mon bloc
    const animtext = blockAnim.innerHTML;
    const textTableau = animtext.trim().split(' ');
    
    blockAnim.textContent=''; // vide l'élément
    
    textTableau.forEach(function(word) {
        blockAnim.innerHTML += '<span>' + word + '</span> ';
    });
    
    gsap.from('.formations__p span', {
        opacity: 0.3,
        stagger: 0.5,
        scrollTrigger: {
            trigger: '.formations__h2',
            start: 'bottom bottom',
            scrub: true,
            pin: false,
        }
    });
  
  
  
    const blockAnim2 = document.querySelector('.formations__p--2');
  
    //texte de mon bloc
    const animtext2 = blockAnim2.innerHTML;
    const textTableau2 = animtext2.trim().split(' ');
  
    blockAnim2.textContent=''; 
  
    textTableau2.forEach(function(word) {
        blockAnim2.innerHTML += '<span>' + word + '</span> ';
    });
  
    gsap.from('.formations__p--2 span', {
        opacity: 0.3,
        stagger: 0.5,
        scrollTrigger: {
            trigger: '.formations__p',
            start: 'bottom bottom', 
            scrub: true,
            pin: false, 
        }
    });
  
  
    const blockAnim3 = document.querySelector('.formations__p--3');
  
    //texte de mon bloc
    const animtext3 = blockAnim3.innerHTML;
    const textTableau3 = animtext3.trim().split(' ');
  
    blockAnim3.textContent=''; 
  
    textTableau3.forEach(function(word) {
        blockAnim3.innerHTML += '<span>' + word + '</span> ';
    });
  
    gsap.from('.formations__p--3 span', {
        opacity: 0.3,
        stagger: 0.5,
        scrollTrigger: {
            trigger: '.formations__p--2',
            start: 'bottom bottom', 
            scrub: true,
            pin: false, 
        }
    });
  }
}

var siIndex = document.querySelector('#indexJs');
if (siIndex){

  /* -----------swiper -----------*/
  var swiper = new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 50,
      loop: true,
      grabCursor: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
  });
  
  
  /*------------- dark light mode ------------*/
  let darkModeIcon = document.querySelector('#darkMode-icon');
  
  darkModeIcon.onclick = () => {
      darkModeIcon.classList.toggle('bx-sun');
      document.body.classList.toggle('dark-mode');
  };
  
  
  /*------------- scroll reveal ----------*/
  ScrollReveal({
      // reset: true,
      distance: '80px',
      duration: 2000,
      delay: 200
  });
  
  ScrollReveal().reveal('.home__content, .heading', { origin: 'top' });
  ScrollReveal().reveal('.home__img img, .services__container, .portfolio__box, .hobby__wrapper, .contact__form', { origin: 'bottom' });
  ScrollReveal().reveal('.home__title, .about__img img', { origin: 'left' });
  ScrollReveal().reveal('.home__h3, .home__text, .about__content', { origin: 'right' });

  /* ---------- WATER EFFECT ---------- */
  
  const canvas = document.querySelector('#canvas');
  
  // condition : ne run que si l'élément canvas existe
  if (canvas) {
    const rippleSettings = {
      maxSize: 100,
      animationSpeed: 5,
      strokeColor: [107, 117, 159],
    };
  
    const canvasSettings = {
      blur: 8,
      ratio: 1,
    };
  
    function Coords(x, y) {
      this.x = x || null;
      this.y = y || null;
    }
  
    const Ripple = function Ripple(x, y, circleSize, ctx) {
      this.position = new Coords(x, y);
      this.circleSize = circleSize;
      this.maxSize = rippleSettings.maxSize;
      this.opacity = 1;
      this.ctx = ctx;
      this.strokeColor = `rgba(${Math.floor(rippleSettings.strokeColor[0])},
      ${Math.floor(rippleSettings.strokeColor[1])},
      ${Math.floor(rippleSettings.strokeColor[2])},
      ${this.opacity})`;
  
      this.animationSpeed = rippleSettings.animationSpeed;
      this.opacityStep = (this.animationSpeed / (this.maxSize - circleSize)) / 2;
    };
  
    Ripple.prototype = {
      update: function update() {
        this.circleSize = this.circleSize + this.animationSpeed;
        this.opacity = this.opacity - this.opacityStep;
        this.strokeColor = `rgba(${Math.floor(rippleSettings.strokeColor[0])},
        ${Math.floor(rippleSettings.strokeColor[1])},
        ${Math.floor(rippleSettings.strokeColor[2])},
        ${this.opacity})`;
      },
      draw: function draw() {
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.strokeColor;
        this.ctx.arc(this.position.x, this.position.y, this.circleSize, 0,
          2 * Math.PI);
        this.ctx.stroke();
      },
      setStatus: function setStatus(status) {
        this.status = status;
      },
    };
  
    const ctx = canvas.getContext('2d');
    const ripples = [];
  
    const section = document.querySelector('#canvasize'); // Changement ici
    const sectionRect = section.getBoundingClientRect();
  
    const rippleStartStatus = 'start';
  
    const isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
  
    canvas.style.filter = `blur(${canvasSettings.blur}px)`;
  
    canvas.width = sectionRect.width * canvasSettings.ratio;
    canvas.height = sectionRect.height * canvasSettings.ratio;
  
    canvas.style.width = `${sectionRect.width}px`;
    canvas.style.height = `${sectionRect.height}px`;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
  
    let animationFrame;
  
    // Function which is executed on mouse hover on canvas
    const canvasMouseOver = (e) => {
      const x = e.clientX - sectionRect.left;
      const y = e.clientY - sectionRect.top;
      ripples.unshift(new Ripple(x * canvasSettings.ratio, y * canvasSettings.ratio, 2, ctx));
    };
  
    const animation = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      const length = ripples.length;
      for (let i = length - 1; i >= 0; i -= 1) {
        const r = ripples[i];
  
        r.update();
        r.draw();
  
        if (r.opacity <= 0) {
          ripples[i] = null;
          delete ripples[i];
          ripples.pop();
        }
      }
      animationFrame = window.requestAnimationFrame(animation);
    };
  
    animation();
    section.addEventListener('mousemove', canvasMouseOver);
  
  }
}







var siPiano = document.querySelector('#pianoJs');
if (siPiano) {
  const pianoKeys = document.querySelectorAll(".wrapper__Allkeys .key"),
  volumeSlider = document.querySelector(".wrapper__volume input"),
  keysCheckbox = document.querySelector(".wrapper__show input");
  
  let allKeys = [],
  audio = new Audio(`assets/tunes/a.wav`); // par défaut, l'audio src est un morceau "a"

  const playTune = (key) => {
      audio.src = `assets/tunes/${key}.wav`; // passer le src audio en fonction de la touche pressée
      audio.play(); // jouer l'audio

      const clickedKey = document.querySelector(`[data-key="${key}"]`); // obtenir un élément clé cliqué
      clickedKey.classList.add("active"); //ajouter la classe active à l'élément clé cliqué
      setTimeout(() => { // retirer la classe active après 150ms de l'élément clé cliqué
          clickedKey.classList.remove("active");
      }, 150);
  }

  pianoKeys.forEach(key => {
      allKeys.push(key.dataset.key); // ajout d'une valeur de clé de données au tableau allKeys
      // appeler la fonction playTune en passant la valeur de la clé de données comme argument
      key.addEventListener("click", () => playTune(key.dataset.key));
  });

  const handleVolume = (e) => {
      audio.volume = e.target.value; // passer la valeur du curseur du slider en tant que volume audio
  }

  const showHideKeys = () => {
      // en toggle masquer la classe de chaque clé sur la case cliquée
      pianoKeys.forEach(key => key.classList.toggle("hide"));
  }

  const pressedKey = (e) => {
      // si la touche enfoncée est dans le tableau allKeys, appelez uniquement la fonction playTune
      if(allKeys.includes(e.key)) playTune(e.key);
  }

  keysCheckbox.addEventListener("click", showHideKeys);
  volumeSlider.addEventListener("input", handleVolume);
  document.addEventListener("keydown", pressedKey);
}


var siPaint = document.querySelector('.paintJS');
if (siPaint) {
  document.addEventListener('DOMContentLoaded', () => {
    const canvasPaint = document.getElementById('canvasPaint');
    const ctx3 = canvasPaint.getContext('2d');
    const colorPicker = document.getElementById('colorPicker');
    const eraserButton = document.getElementById('eraser');
    const clearCanvasButton = document.getElementById('clearCanvas'); // Nouveau bouton
  
    // Définir la taille du canvas
    canvasPaint.width = window.innerWidth * 0.8;
    canvasPaint.height = window.innerHeight * 0.6;
  
    let painting = false;
    let erasing = false;
  
    function startPosition2(e) {
      painting = true;
      draw2(e);
    }
  
    function endPosition2() {
      painting = false;
      ctx3.beginPath();
    }
  
    function draw2(e) {
      if (!painting) return;
  
      ctx3.lineWidth = 5;
      ctx3.lineCap = 'round';
  
      if (erasing) {
        ctx3.strokeStyle = '#fff'; // Utiliser la couleur blanche pour gommer
        ctx3.lineWidth = 20; // Augmenter la taille du pinceau pour une meilleure gomme
      } else {
        ctx3.strokeStyle = colorPicker.value; // Utiliser la couleur sélectionnée
      }
  
      ctx3.lineTo(e.clientX - canvasPaint.offsetLeft, e.clientY - canvasPaint.offsetTop);
      ctx3.stroke();
      ctx3.beginPath();
      ctx3.moveTo(e.clientX - canvasPaint.offsetLeft, e.clientY - canvasPaint.offsetTop);
    }
  
    canvasPaint.addEventListener('mousedown', startPosition2);
    canvasPaint.addEventListener('mouseup', endPosition2);
    canvasPaint.addEventListener('mousemove', draw2);
  
    eraserButton.addEventListener('click', () => {
      erasing = !erasing; // Inverser l'état du mode de gommage
      if (erasing) {
        eraserButton.innerHTML = '<i class="fas fa-pencil-alt"></i>'; // Utiliser l'icône du crayon quand le mode gomme est activé
      } else {
        eraserButton.innerHTML = '<i class="fas fa-eraser"></i>'; // Utiliser l'icône de la gomme quand le mode gomme est désactivé
      }
    });
  
    clearCanvasButton.addEventListener('click', () => {
      ctx3.clearRect(0, 0, canvasPaint.width, canvasPaint.height); // Effacer tout le contenu du canvas
    });
  });

}

var siAim = document.querySelector('#trainiing');
if (siAim){
  document.addEventListener('DOMContentLoaded', function() {
    const gameArea = document.querySelector('#gameArea');
    const startBtn = document.querySelector('#startBtn');
    const scoreDisplay = document.querySelector('#score');
    const timerDisplay = document.querySelector('#timer');
    const gameTimeSelect = document.querySelector('#gameTime');
    let score = 0;
    let gameTime = parseInt(gameTimeSelect.value);
    let timeLeft = gameTime;
    let gameInterval;
    let timerInterval;

    startBtn.addEventListener('click', startGame);
    gameTimeSelect.addEventListener('change', function() {
        gameTime = parseInt(gameTimeSelect.value);
        timeLeft = gameTime;
        timerDisplay.textContent = `Temps restant: ${timeLeft} secondes`;
    });

    function startGame() {
        score = 0;
        scoreDisplay.textContent = `Score: ${score}`;
        startBtn.disabled = true;
        gameTimeSelect.disabled = true;
        startTimer();
        gameInterval = setInterval(createTarget, 600); // pour mettre un intervalle de temps entre les boules
        gameArea.addEventListener('click', handleClick);
    }

    function startTimer() {
        timerDisplay.textContent = `Temps restant: ${timeLeft} secondes`;
        timerInterval = setInterval(function() {
            timeLeft--;
            timerDisplay.textContent = `Temps restant: ${timeLeft} secondes`;
            if (timeLeft === 0) {
                endGame();
            }
        }, 1000);
    }

    function createTarget() {
        const target = document.createElement('div');
        target.classList.add('target');
        const x = Math.random() * (gameArea.offsetWidth - 20);
        const y = Math.random() * (gameArea.offsetHeight - 20);
        target.style.left = `${x}px`;
        target.style.top = `${y}px`;
        gameArea.appendChild(target);
        setTimeout(() => {
            gameArea.removeChild(target);
        }, 3000);
    }

    function handleClick(event) {
        if (event.target.classList.contains('target')) {
            gameArea.removeChild(event.target);
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
        }
    }

    function endGame() {
        clearInterval(gameInterval);
        clearInterval(timerInterval);
        gameArea.removeEventListener('click', handleClick);
        startBtn.disabled = false;
        gameTimeSelect.disabled = false;
        timeLeft = gameTime;
        timerDisplay.textContent = `Temps restant: ${timeLeft} secondes`;
    }
});
}








console.log("Non, vous ne trouverez pas d'erreur ici ;)");
'use strict';

// This site works without GSAP.
// Motion is progressive enhancement.

const reducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

// ========================================
// 1. OPENING SCREEN
// ========================================

const gate = document.getElementById('gate');
const begin = document.getElementById('begin');
const skip = document.getElementById('skip');

function enterExperience() {
  if (gate.hidden) return;

  sessionStorage.setItem('spaceJourneyEntered', 'yes');

  if (window.gsap && !reducedMotion) {
    gsap.to(gate, {
      yPercent: -105,
      duration: 1.05,
      ease: 'power3.inOut',

      onComplete: () => {
        gate.hidden = true;
      }
    });
  } else {
    gate.hidden = true;
  }
}

begin.addEventListener('click', enterExperience);
skip.addEventListener('click', enterExperience);

// Allow repeat visitors to enter without
// being stuck behind the overlay.

if (sessionStorage.getItem('spaceJourneyEntered') === 'yes') {
  gate.hidden = true;
}

// ========================================
// 2. MISSION INFORMATION
// ========================================

const missions = {
  rover: {
    label: 'MOON / APOLLO 15–17 / 1971–1972',

    title: 'THE MOON BUGGY.',

    teaser:
      'Three foldable, battery-powered rovers carried astronauts beyond walking distance to investigate lunar geology.',

    stat: '~35 KM',

    statCaption:
      'total driving distance on Apollo 17',

    image:
     'images/lunar-rover.jpg',

    alt:
      'Apollo 17 lunar roving vehicle on the Moon',

    source:
      'https://science.nasa.gov/resource/apollo-17-gene-cernan-in-lunar-roving-vehicle/',

    credit:
      'NASA / Harrison Schmitt · Apollo 17 imagery',

    details: [
      [
        'WHAT WAS IT?',
        'A lightweight four-wheeled electric vehicle, about 210 kg on Earth, driven by two astronauts.'
      ],

      [
        'WHY DID WE NEED IT?',
        'To carry tools, cameras and samples to geological locations farther from the lunar module.'
      ],

      [
        'HOW DID IT WORK?',
        'Two 36-volt silver-zinc batteries supplied four wheel motors. Astronauts steered with a hand controller.'
      ],

      [
        'WHAT HAPPENED NEXT?',
        'The Apollo 15, 16 and 17 rovers remain on the Moon. They are not operating today.'
      ]
    ]
  },

  alsep: {
    label: 'MOON / APOLLO 12, 14–17 / 1969–1977',

    title: 'THE MOON LISTENERS.',

    teaser:
      'Long after the astronauts left, instrument stations quietly recorded the Moon shaking beneath them.',

    stat: '1977',

    statCaption:
      'year the five ALSEP stations were shut down',

    image: 'images/alsep.jpg',
    
    alt:
      'Apollo experiments deployed on the lunar surface',

    source:
      'https://www.nasa.gov/wp-content/uploads/static/history/alsj/HamishALSEP.html',

    credit:
      'NASA / Apollo lunar surface experiment imagery',

    details: [
      [
        'WHAT WAS IT?',
        'Five Apollo Lunar Surface Experiments Package stations with instruments such as seismometers, magnetometers and other sensors.'
      ],

      [
        'WHY DID WE NEED IT?',
        "To gather long-term data on the Moon's internal structure, seismic activity, magnetic fields, and thin atmosphere over several years. "
      ],

      [
        'HOW DID IT WORK?',
        'Apollo astronauts positioned instruments and connected them to central radio stations powered by radioisotope generators.'
      ],

      [
        'WHAT DID THEY DISCOVER?',
        'Seismometers detected deep and shallow moonquakes, thermal effects and meteoroid impacts. The stations were switched off in September 1977.'
      ]
    ]
  },

  parachute: {
    label: 'MARS / PERSEVERANCE / 2021',

    title: 'THE FINAL DESCENT.',

    teaser:
      'The parachute and protective backshell did their job in minutes—then became part of the Martian landscape.',

    stat: '21.5 M',

    statCaption:
      'approximate diameter of the supersonic parachute',

    image:
      'https://images-assets.nasa.gov/image/PIA25219/PIA25219~orig.jpg',

    alt:
      'Perseverance backshell and parachute remains seen from the air on Mars',

    source:
      'https://science.nasa.gov/photojournal/rovers-backshell-seen-from-the-air/',

    credit:
      'NASA/JPL-Caltech · Ingenuity flight 26, April 2022',

    details: [
      [
        'WHAT WAS IT?',
        'A cone-shaped protective backshell and a supersonic parachute that helped deliver Perseverance to Jezero Crater.'
      ],

      [
        'WHY DID WE NEED IT?',
        'Mars has a thin atmosphere. The parachute reduced the vehicle’s speed before its powered landing.'
      ],

      [
        'HOW DID IT WORK?',
        'The parachute deployed at supersonic speed; later the backshell and parachute separated and struck the surface.'
      ],

      [
        'WHAT HAPPENED NEXT?',
        'The Ingenuity helicopter photographed the backshell and parachute on April 19, 2022, giving engineers valuable evidence about landing-system performance.'
      ]
    ]
  }
};

// ========================================
// 3. MISSION TABS AND IMAGE HANDLING
// ========================================

const tabs = [
  ...document.querySelectorAll('.mission-tab')
];

const missionImage = document.getElementById(
  'mission-image'
);

missionImage.addEventListener('error', function () {
  // Keep the photo area legible if NASA
  // changes an image endpoint.

  this.style.opacity = '.22';

  this.alt =
    'Image could not load. Use the NASA image source link below.';
});

function showMission(id) {
  const mission = missions[id];

  if (!mission) return;

  tabs.forEach(tab => {
    const active = tab.dataset.mission === id;

    tab.classList.toggle('active', active);

    tab.setAttribute(
      'aria-selected',
      active ? 'true' : 'false'
    );
  });

  document.getElementById(
    'mission-label'
  ).textContent = mission.label;

  document.getElementById(
    'mission-title'
  ).textContent = mission.title;

  document.getElementById(
    'mission-teaser'
  ).textContent = mission.teaser;

  document.getElementById(
    'mission-stat'
  ).textContent = mission.stat;

  document.getElementById(
    'mission-stat-caption'
  ).textContent = mission.statCaption;

  document.getElementById(
    'mission-credit'
  ).firstChild.textContent = mission.credit + ' · ';

  document.getElementById(
    'mission-image-source'
  ).href = mission.source;

  document.getElementById(
    'mission-source'
  ).href = mission.source;

  const details = document.getElementById(
    'mission-details'
  );

  details.replaceChildren();

  mission.details.forEach(([label, body]) => {
    const p = document.createElement('p');
    const strong = document.createElement('strong');

    strong.textContent = label + ' ';

    p.append(
      strong,
      document.createTextNode(body)
    );

    details.append(p);
  });

  missionImage.style.opacity = '1';
  missionImage.alt = mission.alt;
  missionImage.src = mission.image;
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    showMission(tab.dataset.mission);
  });

  tab.addEventListener('keydown', event => {
    let target;

    if (event.key === 'ArrowRight') {
      target = tabs[
        (index + 1) % tabs.length
      ];
    }

    if (event.key === 'ArrowLeft') {
      target = tabs[
        (index - 1 + tabs.length) % tabs.length
      ];
    }

    if (target) {
      event.preventDefault();
      target.focus();
      showMission(target.dataset.mission);
    }
  });
});

// ========================================
// 4. QUIZ QUESTIONS
// ========================================

const questions = [
  {
    question:
      'Which Apollo equipment recorded moonquakes?',

    answers: [
      'The lunar rover',
      'ALSEP seismic instruments',
      'Perseverance’s parachute'
    ],

    correct: 1,

    explanation:
      'ALSEP seismometers recorded natural and impact-related vibrations on the Moon.'
  },

  {
    question:
      'Where were the Apollo lunar rovers left after their missions?',

    answers: [
      'On the Moon',
      'In Earth orbit',
      'On Mars'
    ],

    correct: 0,

    explanation:
      'The Apollo 15, 16 and 17 vehicles remain at their respective landing sites.'
  },

  {
    question:
      'What photographed Perseverance’s discarded backshell in 2022?',

    answers: [
      'A human astronaut',
      'The Hubble Telescope',
      'The Ingenuity helicopter'
    ],

    correct: 2,

    explanation:
      'Ingenuity captured images from above during its 26th flight in April 2022.'
  }
];

// ========================================
// 5. QUIZ STATE AND ELEMENTS
// ========================================

let quizIndex = 0;
let score = 0;
let answered = false;

const qCount = document.getElementById(
  'quiz-count'
);

const qScore = document.getElementById(
  'quiz-score'
);

const qTitle = document.getElementById(
  'quiz-question'
);

const qAnswers = document.getElementById(
  'quiz-answers'
);

const qFeedback = document.getElementById(
  'quiz-feedback'
);

const qNext = document.getElementById(
  'quiz-next'
);

// ========================================
// 6. DISPLAY QUIZ QUESTION
// ========================================

function showQuestion() {
  answered = false;

  const q = questions[quizIndex];

  qCount.textContent =
    `QUESTION ${String(quizIndex + 1).padStart(2, '0')} / 03`;

  qScore.textContent = `SCORE ${score}`;

  qTitle.textContent = q.question;

  qAnswers.replaceChildren();

  qFeedback.textContent = '';

  qNext.hidden = true;

  q.answers.forEach((answer, index) => {
    const btn = document.createElement('button');

    btn.type = 'button';
    btn.textContent = answer;

    btn.addEventListener('click', () => {
      if (answered) return;

      answered = true;

      const right = index === q.correct;

      if (right) {
        score += 1;
      }

      [...qAnswers.children].forEach((b, i) => {
        b.disabled = true;

        if (i === q.correct) {
          b.classList.add('correct');
        } else if (i === index) {
          b.classList.add('incorrect');
        }
      });

      qScore.textContent = `SCORE ${score}`;

      qFeedback.textContent =
        (right ? 'Correct! ' : 'Not quite. ') +
        q.explanation;

      qNext.hidden = false;

      qNext.textContent =
        quizIndex === questions.length - 1
          ? 'SEE MY RESULT →'
          : 'NEXT QUESTION →';
    });

    qAnswers.append(btn);
  });
}

// ========================================
// 7. NEXT QUESTION AND RESULTS
// ========================================

qNext.addEventListener('click', () => {
  if (quizIndex < questions.length - 1) {
    quizIndex++;
    showQuestion();
    return;
  }

  qCount.textContent = 'MISSION COMPLETE';

  qScore.textContent =
    `${score} / ${questions.length}`;

  qTitle.textContent =
    score === 3
      ? 'YOU ARE A SPACE ARCHIVIST!'
      : 'EVERY DISCOVERY COUNTS.';

  qFeedback.textContent =
    `You answered ${score} out of 3 correctly. Explore the missions and try again.`;

  qAnswers.replaceChildren();

  qNext.textContent = 'RESTART QUIZ ↻';

  qNext.onclick = () => {
    quizIndex = 0;
    score = 0;
    qNext.onclick = null;
    showQuestion();
  };

  qNext.hidden = false;
});

showQuestion();

// ========================================
// 8. PAGE SCROLL PROGRESS
// ========================================

function updateProgress() {
  const total =
    document.documentElement.scrollHeight -
    window.innerHeight;

  const percentage =
    total > 0
      ? (window.scrollY / total) * 100
      : 0;

  document.getElementById(
    'progress'
  ).style.width = percentage + '%';
}

window.addEventListener(
  'scroll',
  updateProgress,
  { passive: true }
);

updateProgress();

// ========================================
// 9. OPTIONAL GSAP ANIMATIONS
// ========================================

if (
  window.gsap &&
  window.ScrollTrigger &&
  !reducedMotion
) {
  gsap.registerPlugin(ScrollTrigger);

  // Reveal text and content as it enters view.

  gsap.utils.toArray('.reveal').forEach(el => {
    gsap.from(el, {
      y: 50,
      opacity: 0,
      duration: 0.85,
      ease: 'power2.out',

      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        toggleActions: 'play none none none'
      }
    });
  });

  // Earth movement and zoom while scrolling.

  gsap.to('.planet-earth', {
    yPercent: 18,
    scale: 1.12,
    ease: 'none',

    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  // Recalculate animation positions after
  // images and other page assets finish loading.

  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });
}
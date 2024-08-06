const canvas = document.querySelector('#canvas');
const canvas2 = document.querySelector('#canvas2');
const level = document.querySelector('#level');
const score = document.querySelector('#score');
const capD = document.querySelector('#cap-div');
const cap = document.querySelector('#cap');
const finalScore = document.querySelector('#final-score');

const c = canvas.getContext('2d');
const c2 = canvas2.getContext('2d');

let lines = 0;

// Control panel
let gameSpeed = 1000;
let gameHighSpeed = 200;
let speedIncRate = 10;
let fallSpeed = 60;
const colorD = '#ff8000';
const colorI = 'limegreen';
const colorE = '#ff1900';
const colorZ = '#e1de41';
const colorZn = 'dodgerblue';
const colorL = 'deeppink';
const colorLn = 'blueviolet';

// Generate Random Block Id
const randomBlockId = () => {
  let blockId = (Math.random() * 6).toFixed();

  return blockId;
};

const up = 'ArrowUp';
const down = 'ArrowDown';
const right = 'ArrowRight';
const left = 'ArrowLeft';

// Game Switch
let play = true;
let gameOver = false;
let canProcess = true;
setInterval(() => {
  canProcess = true;
}, fallSpeed);

// *** ram Control
// Half Length of Block Square
const bDis = 32;
const hl = 14;
const hl2 = 15;
// Bricks Initial Position
let bpX = 144;
let bpY = 16;
// Bricks Current Direction
let cDir = 'none';
// Current Brick
let preId = randomBlockId();
let bId = randomBlockId();
let bAng = 'a';
let bColor = '';
// Blocks of Brick
let childBrick = [];
let cBrick = [];

let moved = false;
let touchedRight = false;
let touchedLeft = false;
let touchedBottom = false;
let touchedStops = false;

// Stop Points
let stops = [
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
];

// Key Down Listener
document.addEventListener('keydown', k => {
  const dir = k.key;

  if (play && canProcess && dir == right) {
    cDir = right;
    ram();
  } else if (play && canProcess && dir == left) {
    cDir = left;
    ram();
  } else if (play && canProcess && dir == down) {
    cDir = down;
    ram();
  } else if (play && canProcess && dir == up) {
    cDir = up;
    handleUpDir();
  } else if (dir == ' ' || dir == 'p') {
    gameOver ? window.location.reload() : ((play = !play), handleCap());
  }

  canProcess = false;
});

// Bricks Interval
let fallInterval = setInterval(() => {
  play && cDir != down && ram();
}, gameSpeed);

// Handle Up Direction
const handleUpDir = () => {
  (bId == 1 || bId == 3 || bId == 4) &&
    (bAng == 'a' ? (bAng = 'b') : (bAng = 'a'));

  (bId == 2 || bId == 5 || bId == 6) &&
    (bAng == 'a'
      ? (bAng = 'b')
      : bAng == 'b'
      ? (bAng = 'c')
      : bAng == 'c'
      ? (bAng = 'd')
      : (bAng = 'a'));

  ram();
};

// Game ram
const ram = () => {
  handleDir();
  block();
};

// Handle Directions
const handleDir = () => {
  cDir == right
    ? (bpX = bpX + bDis)
    : cDir == left
    ? (bpX = bpX - bDis)
    : cDir == down || cDir == 'none'
    ? (bpY = bpY + bDis)
    : (bpX, bpY);
};

// Make Current Block & Angle By id & ang
const block = () => {
  let id = bId;
  let a = bAng;

  id == 0 && (bColor = colorD);
  id == 1 && (bColor = colorI);
  id == 2 && (bColor = colorE);
  id == 3 && (bColor = colorZ);
  id == 4 && (bColor = colorZn);
  id == 5 && (bColor = colorL);
  id == 6 && (bColor = colorLn);

  drawNext();

  // Center
  xyPN('e', 'e');

  // D 0
  id == 0 && (xyPN('p', 'e'), xyPN('p', 'n'), xyPN('e', 'n'));

  // I 1
  id == 1 &&
    (a == 'a' && (xyPN('e', 'n'), xyPN('e', 'nn'), xyPN('e', 'p')),
    a == 'b' && (xyPN('n', 'e'), xyPN('nn', 'e'), xyPN('p', 'e')));

  // E 2
  id == 2 &&
    (a == 'a' && (xyPN('n', 'e'), xyPN('e', 'n'), xyPN('p', 'e')),
    a == 'b' && (xyPN('e', 'p'), xyPN('n', 'e'), xyPN('e', 'n')),
    a == 'c' && (xyPN('p', 'e'), xyPN('e', 'p'), xyPN('n', 'e')),
    a == 'd' && (xyPN('e', 'n'), xyPN('p', 'e'), xyPN('e', 'p')));

  // Z 3
  id == 3 &&
    (xyPN('e', 'n'),
    a == 'a' && (xyPN('n', 'n'), xyPN('p', 'e')),
    a == 'b' && (xyPN('n', 'e'), xyPN('n', 'p')));

  // !Z 4
  id == 4 &&
    (xyPN('n', 'e'),
    a == 'a' && (xyPN('e', 'n'), xyPN('p', 'n')),
    a == 'b' && (xyPN('e', 'p'), xyPN('n', 'n')));

  // L 5
  id == 5 &&
    (a == 'a' && (xyPN('n', 'e'), xyPN('p', 'e'), xyPN('p', 'n')),
    a == 'b' && (xyPN('e', 'n'), xyPN('e', 'p'), xyPN('n', 'n')),
    a == 'c' && (xyPN('n', 'e'), xyPN('p', 'e'), xyPN('n', 'p')),
    a == 'd' && (xyPN('e', 'n'), xyPN('e', 'p'), xyPN('p', 'p')));

  // !L 6
  id == 6 &&
    (a == 'a' && (xyPN('n', 'e'), xyPN('p', 'e'), xyPN('n', 'n')),
    a == 'b' && (xyPN('e', 'n'), xyPN('e', 'p'), xyPN('n', 'p')),
    a == 'c' && (xyPN('n', 'e'), xyPN('p', 'e'), xyPN('p', 'p')),
    a == 'd' && (xyPN('e', 'n'), xyPN('e', 'p'), xyPN('p', 'n')));
};
// Count Brick Squares Position
const xyPN = (xpn, ypn) => {
  let x = bpX;
  let y = bpY;

  childBrick.push({
    x:
      xpn == 'p'
        ? x + bDis
        : xpn == 'pp'
        ? x + bDis * 2
        : xpn == 'n'
        ? x - bDis
        : xpn == 'nn'
        ? x - bDis * 2
        : x,
    y:
      ypn == 'p'
        ? y + bDis
        : ypn == 'pp'
        ? y + bDis * 2
        : ypn == 'n'
        ? y - bDis
        : ypn == 'nn'
        ? y - bDis * 2
        : y,
    cl: bColor,
  });

  childBrick.length == 4 && checkCond();
};
// Check Brick Conditions
const checkCond = () => {
  childBrick.map(cb => {
    let { x, y, cl } = cb;

    x < 16 && (touchedLeft = true);
    x > 304 && (touchedRight = true);
    y > 624 && (touchedBottom = true);
    stops.map(stp => {
      stp.map(st => {
        cb.x == st.x && cb.y == st.y && (touchedStops = true);
      });
    });
  });

  processor();
};

// Take Action based on Brick Condition
const processor = () => {
  if (touchedRight) {
    childBrick = [];
    bpX = bpX - bDis;
    moved = 'left';
    touchedRight = false;
    block();
  } else if (touchedLeft) {
    childBrick = [];
    bpX = bpX + bDis;
    moved == false ? (moved = 'right') : moved == 'right' && (moved = 'right2');
    touchedLeft = false;
    block();
  } else if ((cDir == right || cDir == left) && touchedStops) {
    cDir == right ? (bpX = bpX - bDis) : (bpX = bpX + bDis);
    touchedStops = false;
    drawBrick();
  } else if (cDir == up && (touchedStops || touchedBottom)) {
    revertAng();
    moved != false && (revertPos(), (moved = false));
    touchedStops = false;
    touchedBottom = false;
    drawBrick();
  } else if (
    (cDir == down || cDir == 'none') &&
    (touchedStops || touchedBottom)
  ) {
    setStops();
    drawBrick();
    resetData();

    handleStopRows();
  } else {
    cBrick = childBrick;
    drawBrick();
    moved = false;
  }
};

// Revert Angle
const revertAng = () => {
  bAng == 'd'
    ? (bAng = 'a')
    : bAng == 'c'
    ? (bAng = 'b')
    : bAng == 'b'
    ? (bAng = 'a')
    : bAng == 'a' &&
      ((bId == 1 || bId == 3 || bId == 4) && (bAng = 'b'),
      (bId == 2 || bId == 5 || bId == 6) && (bAng = 'd'));
};
// Revert Position
const revertPos = () => {
  moved == 'left' && (bpX = bpX + bDis);
  moved == 'right' && (bpX = bpX - bDis);
  moved == 'right2' && (bpX = bpX - bDis * 2);
};

// Draw Brick
const drawBrick = () => {
  childBrick = [];
  cDir = 'none';

  c.reset();
  stops.map(stp => {
    stp.map(st => {
      drawSq(st.x, st.y, st.cl);
    });
  });
  cBrick.map(cb => {
    drawSq(cb.x, cb.y, cb.cl);
  });
};
// Draw Block Squares
const drawSq = (x, y, color) => {
  c.beginPath();
  c.moveTo(x - hl, y - hl2);
  c.lineTo(x + hl, y - hl2);
  c.lineTo(x + hl2, y - hl);
  c.lineTo(x + hl2, y + hl);
  c.lineTo(x + hl, y + hl2);
  c.lineTo(x - hl, y + hl2);
  c.lineTo(x - hl2, y + hl);
  c.lineTo(x - hl2, y - hl);
  c.lineTo(x - hl, y - hl2);
  c.fillStyle = color;
  c.fill();
};

// Set new Brick to Stops
const setStops = () => {
  cBrick.map(cb => {
    for (let i = 0; i <= 19; i++) {
      cb.y == 624 - i * 32 && stops[i].push(cb);
    }
  });
};

// Reset Data
const resetData = () => {
  bpX = 144;
  bpY = 16;
  cDir = 'none';
  bId = preId;
  preId = randomBlockId();
  bAng = 'a';
  bColor = '';
  cBrick = [];

  moved = false;
  touchedRight = false;
  touchedLeft = false;
  touchedBottom = false;
  touchedStops = false;
};

// Draw Next Brick
const drawNext = () => {
  c2.reset();
  c2.beginPath();

  preId == 0 &&
    (c2.moveTo(68.5, 42),
    c2.lineTo(93.5, 42),
    c2.lineTo(93.5, 67),
    c2.lineTo(68.5, 67),
    c2.lineTo(68.5, 42),
    c2.lineTo(81, 42),
    (c2.strokeStyle = colorD));

  preId == 1 &&
    (c2.moveTo(43.5, 55), c2.lineTo(118.5, 55), (c2.strokeStyle = colorI));

  preId == 2 &&
    (c2.moveTo(43.5, 67),
    c2.lineTo(118.5, 67),
    c2.lineTo(81, 67),
    c2.lineTo(81, 29.5),
    (c2.strokeStyle = colorE));

  preId == 3 &&
    (c2.moveTo(43.5, 42),
    c2.lineTo(81, 42),
    c2.lineTo(81, 67),
    c2.lineTo(118.5, 67),
    (c2.strokeStyle = colorZ));

  preId == 4 &&
    (c2.moveTo(118.5, 42),
    c2.lineTo(81, 42),
    c2.lineTo(81, 67),
    c2.lineTo(43.5, 67),
    (c2.strokeStyle = colorZn));

  preId == 5 &&
    (c2.moveTo(43.5, 67),
    c2.lineTo(106, 67),
    c2.lineTo(106, 29.5),
    (c2.strokeStyle = colorL));

  preId == 6 &&
    (c2.moveTo(56, 29.5),
    c2.lineTo(56, 67),
    c2.lineTo(118.5, 67),
    (c2.strokeStyle = colorLn));

  c2.lineWidth = '25';
  c2.stroke();
};

// Check is Row Filled & Take Actions
const handleStopRows = () => {
  const newStops = stops.filter(stp => stp.length != 10);

  let filledRows = 20 - newStops.length;

  for (let i = 0; i <= filledRows; i++) {
    i != 0 && newStops.push([]);
  }

  if (filledRows > 0) {
    stops = newStops;

    // Fill Gaps
    for (let i = 0; i <= 19; i++) {
      stops[i].map(nst => {
        nst.y = 624 - 32 * i;
      });
    }

    increaseSpeed(filledRows);
    countScore(filledRows);
  }

  // Check Game Over
  stops[18].map(st => {
    st.x >= 112 && st.x <= 176 && handleEnd();
  });
};

// Increase Game Speed
const increaseSpeed = filledRows => {
  clearInterval(fallInterval);

  let newGameSpeed = gameSpeed - filledRows * speedIncRate;
  newGameSpeed >= gameHighSpeed && (gameSpeed = newGameSpeed);

  fallInterval = setInterval(() => {
    play && cDir != down && ram();
  }, gameSpeed);
};
// Count Level & Score
const countScore = filledRows => {
  lines = lines + filledRows;
  level.textContent = (lines + 10)
    .toString()
    .slice(0, (lines + 10).toString().length - 1);
  score.textContent = lines;
};

// Handle Game End
const handleEnd = () => {
  (gameOver = true),
    (play = false),
    (cap.textContent = `Game Over`),
    (finalScore.textContent = `Score : ${lines}`),
    handleCap();
};

// Handle Game Play, Pause & End
const handleCap = () => {
  !play && (capD.classList.remove('hidden'), capD.classList.add('flex-center'));

  play && (capD.classList.remove('flex-center'), capD.classList.add('hidden'));
};

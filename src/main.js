let targets = [];
let shooter;
let bullets = [];

// Bullet Maths
let magMaxCount = 8;
let bulletCount = 120;
let magBulletCount = magMaxCount;
let isReloading = false;

// Sound assets loading
let shooting_sound;
let dry_shooting_sound;
let reloading_sound;
let impact;
let destroy;
let assets_loaded = false;

// Timer
let timer = 0;
let isTimerStarted = false;

// Images
let bulletRotate = 0;

function preload() {
  bulletsImage = loadImage("assets/bullets.png");
  infoImage = loadImage("assets/info.png");

  shooting_sound = loadSound("assets/pistolShot.mp3");
  reloading_sound = loadSound("assets/pistolReload.mp3");
  dry_shooting_sound = loadSound("assets/pistolDryShot.mp3");
  impact = loadSound("assets/impact.mp3");
  destroy = loadSound("assets/destroy.mp3");

  assets_loaded = true;
}
function convertSeconds(s) {
  var sec = floor(s / 60);
  var ms = s % 100;
  return nf(sec, 2) + ":" + int(ms, 2);
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  imageMode(CENTER);
  angleMode(DEGREES);
  noStroke();
  shooter = new Shooter();
  for (let i = 0; i < magMaxCount; i++) {
    targets.push(
      new Target(
        random(100, width - 100),
        random(100, height - 100),
        random(width / 40, width / 10 + 100)
      )
    );
  }
}

function draw() {
  background(0);

  push();
  translate(150, 35);
  rotate(bulletRotate);
  imageMode(CENTER);
  if (!isReloading) {
    image(bulletsImage, 0, 0);
  }
  pop();

  push();
  fill(255);
  textSize(20);
  text(`    ${magBulletCount} / ${bulletCount}`, 30, 30);
  text(`${convertSeconds(timer)} ms`, 40, 50);
  pop();

  push();
  image(infoImage, width - 20, 30);
  pop();

  targets.forEach((target, index) => {
    target.show();
    if (target.life < 40) {
      if (index > -1) {
        targets.splice(index, 1);
        destroy.play();
      }
    }
  });
  bullets.forEach((bullet, index) => {
    bullet.show();
    if (bullet.life < 40) {
      if (index > -1) {
        bullets.splice(bullet, 1);
      }
    }
    bullet.life -= 0.25;
  });

  if (targets.length < 1) {
    isTimerStarted = false;
  }
  if (isTimerStarted) {
    timer += 0.9;
  }
  shooter.show();
}

function reloadGun() {
  if (bulletCount > 0 && !isReloading) {
    isReloading = true;
    reloading_sound.play();
    sleep(1000).then(() => {
      let prevBullet = magBulletCount;
      magBulletCount = magMaxCount;
      if (bulletCount > 6) {
        bulletCount = bulletCount - (magMaxCount - prevBullet);
      } else {
        bulletCount = 0;
      }
      isReloading = false;
    });
  }
}
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
function keyPressed() {
  if (keyCode === 82) {
    reloadGun();
  } else if (keyCode == 32) {
    isTimerStarted = true;
  }
}

function mouseClicked() {
  //   background(255);
  if (magBulletCount > 0 && !isReloading) {
    magBulletCount -= 1;
    shooting_sound.play();
    bulletRotate += 90;

    targets.forEach((target) => {
      let d = dist(mouseX, mouseY, target.x, target.y);
      if (d < target.r / 2) {
        bullets.push(new BulletHole(mouseX, mouseY, 5));
        isTimerStarted = true;

        impact.play();
        target.shot((1 / d) * 2500);
      }
    });
  } else {
    if (!isReloading) {
      dry_shooting_sound.play();
    }
  }
  if (dist(mouseX, mouseY, width - 20, 30) < 40) {
    document.getElementById("infoBar").style.display = "block";
  }
}
function is_numeric(str) {
  return /^\d+$/.test(str);
}
function infoClicked() {
  print("s");
}

function saveSettings1() {
  let targetNumbers = document.getElementById("targetCount").value;
  if (is_numeric(targetNumbers)) {
    targets = [];

    targetNumbers = int(targetNumbers);
    if (targetNumbers > 1 && targetNumbers < 100) {
      for (let i = 0; i < targetNumbers; i++) {
        targets.push(
          new Target(
            random(100, width - 100),
            random(100, height - 100),
            random(width / 40, width / 10 + 100)
          )
        );
      }
    } else {
      document.getElementById("t_label").innerHTML =
        "Put a number between 1 and 100!";
    }
  } else {
    document.getElementById("t_label").innerHTML = "Put a number not letter!";
  }
}

function saveSettings2() {
  let bulletNumber = document.getElementById("bulletCount").value;
  if (is_numeric(bulletNumber)) {
    magMaxCount = int(bulletNumber);

    bulletNumber = int(bulletNumber);
    if (bulletNumber > 1 && bulletNumber < 1000) {
      magBulletCount = bulletNumber;
    } else {
      document.getElementById("t_label2").innerHTML =
        "Put a number from 1 to 999!";
    }
  } else {
    document.getElementById("t_label2").innerHTML = "Put a number not letter!";
  }
}

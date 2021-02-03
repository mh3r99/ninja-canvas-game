const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const backgroundImg = document.createElement("img");
backgroundImg.src =
  "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/items/860950/55a82ea7e41681d44f6fdeb7025207d789729d4b.jpg";

const heroImg = document.createElement("img");
heroImg.src = "https://pngimg.com/uploads/ninja/ninja_PNG14.png";

const starImg = document.createElement("img");
starImg.src =
  "https://blog.knife-depot.com/wp-content/uploads/2020/03/shuriken-676x676.png";

const rabbitImg = document.createElement("img");
rabbitImg.src =
  "https://preview.redd.it/4e15s7ljf2o41.png?width=256&format=png&auto=webp&s=99b4d97d6c2eeacbb218fc6e31773bd3aecc385c";

const stabAudio = document.createElement("audio");
stabAudio.src = "https://soundbible.com//mp3/Stab-SoundBible.com-766875573.mp3";

const audio = document.createElement("audio");
audio.src =
  "http://www.slspencer.com/Sounds/Star%20Trek%20Sounds/sounds/PhotonTorp.mp3";

let data = {
  hero: {
    xDelta: 0,
    yDelta: 0,
    x: 10,
    y: 450,
    width: 150,
    height: 150,
  },
  bullets: [],
  rabbits: [],
};

function intersect(rect1, rect2) {
  const x = Math.max(rect1.x, rect2.x),
    num1 = Math.min(rect1.x + rect1.width, rect2.x + rect2.width),
    y = Math.max(rect1.y, rect2.y),
    num2 = Math.min(rect1.y + rect1.height, rect2.y + rect2.height);
  return num1 >= x && num2 >= y;
}

function update() {
  data.hero.x += data.hero.xDelta;
  data.hero.y += data.hero.yDelta;

  data.bullets.forEach(function (bullet) {
    data.rabbits.forEach(function (rabbit) {
      if (intersect(rabbit, bullet)) {
        stabAudio.currentTime = 0;
        stabAudio.play();
        bullet.deleteMe = true;
        rabbit.deleteMe = true;
      }
    });
  });

  data.bullets = data.bullets.filter(function (bullet) {
    return bullet.deleteMe !== true;
  });

  data.rabbits = data.rabbits.filter(function (rabbit) {
    return rabbit.deleteMe !== true;
  });

  data.bullets.forEach(function (bullet) {
    bullet.x += bullet.xDelta;
  });

  data.bullets = data.bullets.filter(function (bullet) {
    if (bullet.x > canvas.width) {
      return false;
    }
    return true;
  });

  data.rabbits.forEach(function (rabbit) {
    rabbit.x += rabbit.xDelta;
  });
  if (data.rabbits.length === 0) {
    data.rabbits.push({
      xDelta: -1,
      x: canvas.width - 100,
      y: data.hero.y + 50,
      width: 100,
      height: 100,
    });
  }
}

function draw() {
  context.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
  context.drawImage(
    heroImg,
    data.hero.x,
    data.hero.y,
    data.hero.width,
    data.hero.height
  );

  data.bullets.forEach(function (bullet) {
    context.drawImage(starImg, bullet.x, bullet.y, bullet.width, bullet.height);
  });
  data.rabbits.forEach(function (rabbit) {
    context.drawImage(
      rabbitImg,
      rabbit.x,
      rabbit.y,
      rabbit.width,
      rabbit.height
    );
  });
}

function loop() {
  requestAnimationFrame(loop);
  update();
  draw();
}

loop();

document.addEventListener("keydown", function (e) {
  if (e.code === "ArrowRight") {
    data.hero.xDelta = 1;
  } else if (e.code === "ArrowLeft") {
    data.hero.xDelta = -1;
  } else {
    audio.currentTime = 0;
    audio.play();
    data.bullets.push({
      xDelta: 5,
      x: data.hero.x + 100,
      y: data.hero.y + 95,
      width: 20,
      height: 20,
    });
  }
});
document.addEventListener("keyup", function (e) {
  data.hero.xDelta = 0;
});

class Scene1 extends Phaser.Scene {
  constructor() {
    // ID of this scene
    super("bootGame");
  }

  preload() {
    // functions for image loading
    // args: (image ID, URL)
    this.load.image("background", "game-2/assets/background.png");

    this.load.spritesheet("ship", "game-2/assets/spritesheets/ship.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("ship2", "game-2/assets/spritesheets/ship2.png", {
      frameWidth: 32,
      frameHeight: 16
    });
    this.load.spritesheet("ship3", "game-2/assets/spritesheets/ship3.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet(
      "explosion",
      "game-2/assets/spritesheets/explosion.png",
      {
        frameWidth: 16,
        frameHeight: 16
      }
    );
    this.load.spritesheet(
      "power-up",
      "game-2/assets/spritesheets/power-up.png",
      {
        frameWidth: 16,
        frameHeight: 16
      }
    );

    // load player spritesheet
    this.load.spritesheet("player", "game-2/assets/spritesheets/player.png", {
      frameWidth: 16,
      frameHeight: 24
    });

    // load beam spritesheep
    this.load.spritesheet("beam", "game-2/assets/spritesheets/beam.png", {
      frameWidth: 16,
      frameHeight: 16
    });

    // load font
    this.load.bitmapFont("pixelFont", "game-2/assets/font/font.png", "game-2/assets/font/font.xml");
  }

  create() {
    // args: (x, y, text)
    this.add.text(20, 20, "Loading game...");
    // jump to other scene
    this.scene.start("playGame");

    this.loadAnimations();
  }

  loadAnimations() {
    // animations for ships
    this.anims.create({
      key: "ship1_anim",
      frames: this.anims.generateFrameNumbers("ship"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "ship2_anim",
      frames: this.anims.generateFrameNumbers("ship2"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "ship3_anim",
      frames: this.anims.generateFrameNumbers("ship3"),
      frameRate: 20,
      repeat: -1
    });

    // animations for power-ups
    this.anims.create({
      key: "red",
      frames: this.anims.generateFrameNumbers("power-up", {
        start: 0,
        end: 1
      }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "gray",
      frames: this.anims.generateFrameNumbers("power-up", {
        start: 2,
        end: 3
      }),
      frameRate: 20,
      repeat: -1
    });

    // create animation for explosion
    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    });

    // animations for player
    this.anims.create({
      key: "thrust",
      frames: this.anims.generateFrameNumbers("player"),
      frameRate: 20,
      repeat: -1,
    });

    // animations for beam
    this.anims.create({
      key: "beam_anim",
      frames: this.anims.generateFrameNumbers("beam"),
      frameRate: 20,
      repeat: -1,
    });
  }
}

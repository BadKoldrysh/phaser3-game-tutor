class Scene1 extends Phaser.Scene {
  constructor() {
    // ID of this scene
    super("bootGame");
  }

  preload() {
    // functions for image loading
    // args: (image ID, URL)
    this.load.image("background", "game-2/assets/background.png");

    this.load.spritesheet("ship", "game-2/assets/spritesheets/ship.png",
    {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet("ship2", "game-2/assets/spritesheets/ship2.png",
    {
      frameWidth: 32,
      frameHeight: 16,
    });
    this.load.spritesheet("ship3", "game-2/assets/spritesheets/ship3.png",
    {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("explosion", "game-2/assets/spritesheets/explosion.png",
    {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet("power-up", "game-2/assets/spritesheets/power-up.png",
    {
      frameWidth: 16,
      frameHeight: 16,
    });
  }

  create() {
    // args: (x, y, text)
    this.add.text(20, 20, "Loading game...");
    // jump to other scene
    this.scene.start("playGame");
  }
}

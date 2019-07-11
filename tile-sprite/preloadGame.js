class preloadGame extends Phaser.Scene {
  constructor() {
    super("PreloadGame");
  }

  preload() {
    // load all assets tile sprites
    this.load.image("bg_1", "tile-sprite/assets/bg-1.png");
    this.load.image("bg_2", "tile-sprite/assets/bg-2.png");
    this.load.image("ground", "tile-sprite/assets/ground.png");

    // load spritesheet
    this.load.spritesheet("player", "tile-sprite/assets/bee.png", {
      frameWidth: 37,
      frameHeight: 39
    });
  }

  create() {
    this.scene.start("PlayGame");
  }
}

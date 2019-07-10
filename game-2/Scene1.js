class Scene1 extends Phaser.Scene {
  constructor() {
    // ID of this scene
    super("bootGame");
  }

  preload() {
    // functions for image loading
    // args: (image ID, URL)
    this.load.image("background", "game-2/assets/background.png");
    this.load.image("ship", "game-2/assets/ship.png");
    this.load.image("ship-2", "game-2/assets/ship-2.png");
    this.load.image("ship-3", "game-2/assets/ship-3.png");
  }

  create() {
    // args: (x, y, text)
    this.add.text(20, 20, "Loading game...");

    // jump to other scene
    this.scene.start("playGame");
  }
}

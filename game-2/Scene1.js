class Scene1 extends Phaser.Scene {
  constructor() {
    // ID of this scene
    super("bootGame");
  }

  create() {
    // args: (x, y, text)
    this.add.text(20, 20, "Loading game...");

    // jump to other scene
    this.scene.start("playGame");
  }
}

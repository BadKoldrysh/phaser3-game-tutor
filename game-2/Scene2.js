class Scene2 extends Phaser.Scene {
  constructor() {
    // ID of this scene
    super("playGame");
  }

  create() {
      // text with basic style
      this.add.text(10, 10, "Playing game...", {font: "20px monospace", fill: "yellow"});
  }
}

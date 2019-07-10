class Scene2 extends Phaser.Scene {
  constructor() {
    // ID of this scene
    super("playGame");
  }

  create() {
    // create an element with adding background image
    this.background = this.add.image(0, 0, "background");
    this.background.setOrigin(0, 0);
    
    // text with basic style
    this.add.text(10, 10, "Playing game...", {
      font: "13px monospace",
      fill: "yellow"
    });
  }
}

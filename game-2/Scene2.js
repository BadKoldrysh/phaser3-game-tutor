class Scene2 extends Phaser.Scene {
  constructor() {
    // ID of this scene
    super("playGame");
  }

  create() {
    // create an element with adding background image
    this.background = this.add.image(0, 0, "background");
    this.background.setOrigin(0, 0);

    // adding images for ships
    this.ship1 = this.add.image(
      config.width / 2 - 50,
      config.height / 2,
      "ship"
    );
    this.ship2 = this.add.image(config.width / 2, config.height / 2, "ship-2");
    this.ship3 = this.add.image(
      config.width / 2 + 50,
      config.height / 2,
      "ship-3"
    );

    // some transforms
    this.ship1.setScale(2);
    this.ship2.flipY = true;

    // text with basic style
    this.add.text(10, 10, "Playing game...", {
      font: "13px monospace",
      fill: "yellow"
    });
  }

  update() {
    // some transforms
    this.ship3.angle += 1;
    this.ship1.angle -= 2;
  }
}

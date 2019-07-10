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

    this.ship1.setOrigin(0, 0);
    this.ship2.setOrigin(0, 0);
    this.ship3.setOrigin(0, 0);

    // text with basic style
    this.add.text(10, 10, "Playing game...", {
      font: "13px monospace",
      fill: "yellow"
    });
  }

  update() {
    this.moveShip(this.ship1, 1);
    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 3);
  }

  // method for ship moving
  moveShip(ship, speed) {
    ship.y += speed;

    if (ship.y > config.height) {
      this.resetShipPos(ship);
    }
  }

  // return ship to start position
  resetShipPos(ship) {
    ship.y = -ship.height;
    var randomX = Phaser.Math.Between(0, config.width);
    ship.x = randomX;
  }
}

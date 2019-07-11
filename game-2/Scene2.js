class Scene2 extends Phaser.Scene {
  constructor() {
    // ID of this scene
    super("playGame");
  }

  // method for loading ships sprites and animations
  loadShips() {
    // adding sprites for ships
    this.ship1 = this.add.sprite(config.width / 2 - 50, config.height / 2, "ship");
    this.ship2 = this.add.sprite(config.width / 2, config.height / 2, "ship2");
    this.ship3 = this.add.sprite(config.width / 2 + 50, config.height / 2, "ship3");

    this.ship1.setOrigin(0, 0);
    this.ship2.setOrigin(0, 0);
    this.ship3.setOrigin(0, 0);

    // create animations for ships
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
  }

  create() {
    // for running background
    this.background = this.add.tileSprite(
      0,
      0,
      config.width,
      config.height,
      "background"
    );
    this.background.setOrigin(0, 0);

    this.loadShips();

    // create animation for explosion
    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    });

    // start ships animations
    this.ship1.play("ship1_anim");
    this.ship2.play("ship2_anim");
    this.ship3.play("ship3_anim");

    this.ship1.setInteractive();
    this.ship2.setInteractive();
    this.ship3.setInteractive();

    // event listener for clicking on game objects
    this.input.on('gameobjectdown', this.destroyShip, this);

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

    // run background
    this.background.tilePositionY -= 0.5;
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

  // destroy ship
  destroyShip(pointer, gameObject) {
    // when object is clicked - we're switching texture to explosion
    gameObject.setTexture("exposion");
    gameObject.play("explode");
  }
}

class Scene2 extends Phaser.Scene {
  constructor() {
    // ID of this scene
    super("playGame");
  }

  // method for loading ships sprites
  loadShips() {
    // adding sprites for ships
    this.ship1 = this.add.sprite(
      config.width / 2 - 50,
      config.height / 2,
      "ship"
    );
    this.ship2 = this.add.sprite(config.width / 2, config.height / 2, "ship2");
    this.ship3 = this.add.sprite(
      config.width / 2 + 50,
      config.height / 2,
      "ship3"
    );

    this.ship1.setOrigin(0, 0);
    this.ship2.setOrigin(0, 0);
    this.ship3.setOrigin(0, 0);
  }

  // method for loading power-ups
  loadPowerUps() {
    // for adding physics laws
    this.powerUps = this.physics.add.group();

    // random position power-ups on the ground
    var maxObjects = 4;
    for (var i = 0; i < maxObjects; i++) {
      var powerUp = this.physics.add.sprite(16, 16, "power-up");
      this.powerUps.add(powerUp);
      powerUp.setRandomPosition(0, 0, game.config.width, game.config.height);

      // random adding power-ups to scene
      if (Math.random() > 0.5) {
        powerUp.play("red");
      } else {
        powerUp.play("gray");
      }

      // speed up
      powerUp.setVelocity(100, 100);
      // set collide with game walls
      powerUp.setCollideWorldBounds(true);
      powerUp.setBounce(1);

    }
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

    // start ships animations
    this.ship1.play("ship1_anim");
    this.ship2.play("ship2_anim");
    this.ship3.play("ship3_anim");

    this.ship1.setInteractive();
    this.ship2.setInteractive();
    this.ship3.setInteractive();

    // event listener for clicking on game objects
    this.input.on("gameobjectdown", this.destroyShip, this);

    this.loadPowerUps();

    // set player
    this.player = this.physics.add.sprite(config.width / 2 - 8, config.height - 64, "player");
    this.player.play("thrust");

    // a variable to listen for Keyboard Events
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);
  }

  update() {
    this.moveShip(this.ship1, 1);
    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 3);

    // run background
    this.background.tilePositionY -= 0.5;

    this.movePlayerManager();
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

  // method for listening player's actions
  movePlayerManager() {
    if (this.cursorKeys.left.isDown) {
      this.player.setVelocityX(-gameSettings.playerSpeed);
    } else if (this.cursorKeys.right.isDown) {
      this.player.setVelocityX(gameSettings.playerSpeed);
    }
  }
}

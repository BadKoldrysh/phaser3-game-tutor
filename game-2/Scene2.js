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

    this.enemies = this.physics.add.group();
    this.enemies.add(this.ship1);
    this.enemies.add(this.ship2);
    this.enemies.add(this.ship3);

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

    // 3.1 Add HUD background
    this.displayScoreBg();

    this.score = 0;

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
    this.player = this.physics.add.sprite(
      config.width / 2 - 8,
      config.height - 64,
      "player"
    );
    this.player.play("thrust");

    // a variable to listen for Keyboard Events
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);

    // set spacebar
    this.spacebar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    // variable for store our projectiles
    this.projectiles = this.add.group();

    this.physics.add.collider(this.projectiles, this.powerUps, function(
      projectile,
      powerUp
    ) {
      projectile.destroy();
    });

    this.physics.add.overlap(
      this.player,
      this.powerUps,
      this.pickPowerUp,
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.enemies,
      this.hurtPlayer,
      null,
      this
    );

    this.physics.add.overlap(
      this.projectiles,
      this.enemies,
      this.hitEnemy,
      null,
      this
    );

    this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE 00", 16);
  }

  update() {
    this.moveShip(this.ship1, 1);
    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 3);

    // run background
    this.background.tilePositionY -= 0.5;

    this.movePlayerManager();

    for (var i = 0; i < this.projectiles.getChildren().length; i++) {
      var beam = this.projectiles.getChildren()[i];
      beam.update();
    }
  }

  zeroPad(number, size) {
    var stringNumber = String(number);
    while (stringNumber.length < (size || 2)) {
      stringNumber = "0" + stringNumber;
    }
    return stringNumber;
  }

  // displaying black background for score
  displayScoreBg() {
    var graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.beginPath();
    graphics.moveTo(0, 0);
    graphics.lineTo(config.width, 0);
    graphics.lineTo(config.width, 20);
    graphics.lineTo(0, 20);
    graphics.lineTo(0, 0);
    graphics.closePath();
    graphics.fillPath();
  }

  // collision between beems and enemies
  hitEnemy(projectile, enemy) {
    var explosion = new Explosion(this, enemy.x, enemy.y);

    projectile.destroy();

    this.score += 15;
    var scoreFormatted = this.zeroPad(this.score, 6);
    this.scoreLabel.text = "SCORE " + scoreFormatted;

    this.resetShipPos(enemy);
  }

  // method for collision between ships and player
  hurtPlayer(player, enemy){
    this.resetShipPos(enemy);

    if (this.player.alpha < 1) {
      return;
    }

    var explosion = new Explosion(this, player.x, player.y);
    player.disableBody(true, true);

    this.time.addEvent({
      delay: 1000,
      callback: this.resetPlayer,
      callbackScope: this,
      loop: false,
    });
  }

  resetPlayer() {
    var x = config.width / 2 - 8;
    var y = config.height + 48;
    this.player.enableBody(true, x, y, true, true);

    this.player.alpha = 0.5;

    var tween = this.tweens.add({
      targets: this.player,
      y: config.height - 64,
      ease: "Power1",
      duration: 1500,
      repeat: 0,
      onComplete: function(){
        this.player.alpha = 1;
      },
      callbackScope: this,
    });
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
    ship.y = 20;
    var randomX = Phaser.Math.Between(0, config.width);
    ship.x = randomX;
  }

  // destroy ship
  destroyShip(pointer, gameObject) {
    // when object is clicked - we're switching texture to explosion
    gameObject.setTexture("explosion");
    gameObject.play("explode");
  }

  // method for listening player's actions
  movePlayerManager() {
    var drag = gameSettings.playerSpeed * 6;

    if (this.cursorKeys.left.isDown) {
      this.player.setVelocityX(-gameSettings.playerSpeed);
    } else if (this.cursorKeys.right.isDown) {
      this.player.setVelocityX(gameSettings.playerSpeed);
    } else {
      // for stop player
      this.player.setDragX(drag);
    }

    if (this.cursorKeys.up.isDown) {
      this.player.setVelocityY(-gameSettings.playerSpeed);
    } else if (this.cursorKeys.down.isDown) {
      this.player.setVelocityY(gameSettings.playerSpeed);
    } else {
      // for stop player
      this.player.setDragY(drag);
    }

    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      if (this.player.active){
        this.shootBeam();
      }
    }
  }

  shootBeam() {
    var beam = new Beam(this);
  }

  pickPowerUp(player, powerUp) {
    // first arg: disableGameObject
    // sec arg: hideGameObject
    powerUp.disableBody(true, true);
  }
}

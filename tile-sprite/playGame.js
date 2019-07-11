class playGame extends Phaser.Scene {
  constructor() {
    super("PlayGame");
  }

  create() {
    // create an tilled sprite with the size of our game screen
    // in this way the image is stretched and its pattern is repeated
    // across the screen
    this.bg_1 = this.add.tileSprite(
      0,
      0,
      game.config.width,
      game.config.height,
      "bg_1"
    );
    // it's important to set origin and fix position
    // to prevent it from moving
    this.bg_1.setOrigin(0, 0);
    this.bg_1.setScrollFactor(0);

    // add second background (repeat first)
    this.bg_2 = this.add.tileSprite(
      0,
      0,
      game.config.width,
      game.config.height,
      "bg_2"
    );
    this.bg_2.setOrigin(0, 0);
    this.bg_2.setScrollFactor(0);

    // add ground layer
    this.ground = this.add.tileSprite(0, 0, game.config.width, 48, "ground");
    this.ground.setOrigin(0, 0);
    this.ground.setScrollFactor(0);
    // position this layer on the bottom of screen
    this.ground.y = 12 * 16;

    // add player
    this.player = this.add.sprite(game.config.width, game.config.height / 2, "player");
    // create animations
    this.anims.create({
      key: "fly",
      frames: this.anims.generateFrameNumbers("player"),
      frameRate: 20,
      repeat: -1,
    });
    this.player.play("fly");

    // allow keys inputs to control the player
    this.cursors = this.input.keyboard.createCursorKeys();

    // set world bound to allow camera to follow the player
    this.myCam = this.cameras.main;
    this.myCam.setBounds(0, 0, game.config.width * 3, game.config.height);

    // making the camera following the player
    this.myCam.startFollow(this.player);
  }

  update() {
    // move the player when the arrow keys are pressed
    if (this.cursors.left.isDown && this.player.x > 0) {
      this.player.x -= 3;
      this.player.scaleX = 1;
    } else if (this.cursors.right.isDown && this.player.x < game.config.width * 3) {
      this.player.x += 3;
      this.player.scaleX = -1;
    }

    // scroll the texture of the tilesprites proportionally to the camera scroll
    this.bg_1.tilePositionX = this.myCam.scrollX * .3;
    this.bg_2.tilePositionX = this.myCam.scrollX * .6;
    this.ground.tilePositionX = this.myCam.scrollX;
  }
}

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
    this.player = this.add.sprite(game.config.width * 1.5, game.config.height / 2, "player");
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
  }
}

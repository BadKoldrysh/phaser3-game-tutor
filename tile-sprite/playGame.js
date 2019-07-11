class playGame extends Phaser.Scene {
  constructor() {
    super("PlayGame");
  }

  create() {
      // create an tilled sprite with the size of our game screen
      // in this way the image is stretched and its pattern is repeated
      // across the screen
      this.bg_1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "bg_1");
      this.bg_1.setOrigin(0, 0);
      this.bg_1.setScrollFactor(0);
  }
}

var config = {
    width: 384,
    height: 240,
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 0,
            }
        }
    },
    scene: [preloadGame, playGame],
}

var game = new Phaser.Game(config);
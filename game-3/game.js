const params = {
    tileSize: 16,
    root: "game-3/",
    assets: "game-3/assets/",
}

const config = {
    width: 5 * params.tileSize,
    height: 15 * params.tileSize,
    backgroundColor: 0xfcf8e8,
    scene: [Scene1],
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade:{
            debug: false,
        },
    }, 
}


let game = new Phaser.Game(config);
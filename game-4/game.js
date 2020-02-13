const params = {
    tileSize: 16,
    root: "game-4/",
    assets: "game-4/assets/",
}

const config = {
    width: 20 * params.tileSize,
    height: 20 * params.tileSize,
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
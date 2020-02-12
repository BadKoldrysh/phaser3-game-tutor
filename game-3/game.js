const params = {
    tileSize: 16,
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
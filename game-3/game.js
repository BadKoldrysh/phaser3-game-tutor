const config = {
    width: 320,
    height: 400,
    backgroundColor: 0x999da6,
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
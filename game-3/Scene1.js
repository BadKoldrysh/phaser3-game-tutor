class Scene1 extends Phaser.Scene
{
    constructor()
    {
        // id of this scene
        super("bootGame");
    }

    preload()
    {
        this.load.image('tiles', params.assets + "block.png");

        this.load.spritesheet("player", params.assets + "player.png", {
            frameWidth: params.tileSize,
            frameHeight: params.tileSize,
        });
    }

    create()
    {
        let level = [
            [0, 0, 1, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 1, 1, 1, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 1, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 1, 0, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 1, 0],
            [0, 1, 1, 1, 0],
            [0, 1, 1, 1, 0],
            [0, 1, 0, 1, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0],
        ]

        let map = this.make.tilemap({
            data: level,
            tileWidth: params.tileSize,
            tileHeight: params.tileSize
        });
        let tiles = map.addTilesetImage('tiles');
        let layer = map.createStaticLayer(0, tiles, 0, 0);
        let player = this.add.sprite(32 + 8, 8, "player");

    }
}
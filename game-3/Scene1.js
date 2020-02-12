class Scene1 extends Phaser.Scene
{
    constructor()
    {
        // id of this scene
        super("bootGame");
    }

    preload()
    {
        this.load.image('tiles', "game-3/assets/block.png");
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
    }
}
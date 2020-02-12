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
            [0, 0, 0, 0, 0],
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

        let player = this.add.sprite(32 + 8, 16 + 8, "player");

        this.input.keyboard.on('keydown_DOWN', function(event) {
            let tile = layer.getTileAtWorldXY(player.x, player.y + 16, true);
            if (tile.index === 0) {
                //  Blocked, we can't move
            } else {
                player.y += 16;
            }
        });

        this.input.keyboard.on('keydown_UP', function(event) {
            let tile = layer.getTileAtWorldXY(player.x, player.y - 16, true);
            if (tile.index === 0) {
                //  Blocked, we can't move
            } else {
                player.y -= 16;
            }
        });

        this.input.keyboard.on('keydown_LEFT', function(event) {
            let tile = layer.getTileAtWorldXY(player.x - 16, player.y, true);
            if (tile.index === 0) {
                //  Blocked, we can't move
            } else {
                player.x -= 16;
            }
        });

        this.input.keyboard.on('keydown_RIGHT', function(event) {
            let tile = layer.getTileAtWorldXY(player.x + 16, player.y, true);
            if (tile.index === 0) {
                //  Blocked, we can't move
            } else {
                player.x += 16;
            }
        });
    }
}
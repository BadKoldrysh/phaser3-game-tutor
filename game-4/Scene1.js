class Scene1 extends Phaser.Scene
{
    constructor()
    {
        // id of this scene
        super("bootGame");
    }
    
    preload()
    {
        this.load.image('tiles', params.assets + "terrain.png");
        this.load.tilemapCSV('map', params.assets + 'csv/green-world.csv');
        
        this.load.spritesheet("player", params.assets + "player.png", {
            frameWidth: params.tileSize,
            frameHeight: params.tileSize,
        });
        
    }
    
    create()
    {
        const step = params.tileSize;

        let map = this.make.tilemap({
            key: 'map',
            tileWidth: params.tileSize,
            tileHeight: params.tileSize
        });
        let tiles = map.addTilesetImage('tiles');
        let layer = map.createStaticLayer(0, tiles, 0, 0);
        
        let player = this.add.sprite((step * 2) + 8, step + 8, "player");
        
        this.input.keyboard.on('keydown', function(event) {
            let x = 0;
            let y = 0;
            if (event.key === 'ArrowDown') {
                y = step;
            } else if(event.key === 'ArrowUp') {
                y = -step;
            } else if(event.key === 'ArrowRight') {
                x = step;
            } else if(event.key === 'ArrowLeft') {
                x = -step;
            } else {
                return;
            }
            
            let tile = layer.getTileAtWorldXY(player.x + x, player.y + y, true);
            if (tile.index === 0) {
                player.x += x;
                player.y += y;
            } else {
                //  Blocked, we can't move
            }
        });
    }
}
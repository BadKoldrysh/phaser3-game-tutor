class Scene1 extends Phaser.Scene
{
    constructor()
    {
        // id of this scene
        super("bootGame");
    }

    preload()
    {

    }

    create()
    {
        this.scene.start("playGame");
    }
}
class Beam extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        var x = scene.player.x;
        var y = scene.player.y;

        super(scene, x, y, "beam");

        scene.add.existing(this);

        this.play("beam_anim");
        scene.physics.world.enableBody(this);
        scene.projectiles.add(this);
    }
}

namespace SpaceShip {
    export class EnemyBullet extends Phaser.Sprite {
        constructor(
            game: Phaser.Game,
            x: number,
            y: number
        ) {
            super(game, x, y, Sprites.BULLET);

            this.anchor.setTo(0.5);
            this.checkWorldBounds = true;
            this.outOfBoundsKill = true;
        }
    }
}
namespace SpaceShip {

    export class PlayerBullet extends Phaser.Sprite {
        constructor(game: Game, x: number, y: number) {
            super(game, x, y, Sprites.BULLET);

            this.anchor.setTo(0.5);
            this.checkWorldBounds = true;
            this.outOfBoundsKill = true;
        }
    }
}
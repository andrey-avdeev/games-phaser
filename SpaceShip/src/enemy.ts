namespace SpaceShip {
    export class Enemy extends Phaser.Sprite {
        constructor(game: Phaser.Game,
            x: number,
            y: number,
            key: string,
            public health: number,
            public enemyBullets: Phaser.Group
        ) {
            super(game, x, y, key);
            console.log('enemy init');
            this.animations.add('getHit', [0, 1, 2, 1, 0], 25, false);
            this.anchor.setTo(0.5);
        }
    }
}
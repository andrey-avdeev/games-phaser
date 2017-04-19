namespace SpaceShip {
    export class Enemy extends Phaser.Sprite {
        public health: number;
        public enemyBullets: Phaser.Group;
        public enemyTimer: Phaser.Timer;

        constructor(
            game: Phaser.Game,
            x: number,
            y: number,
            key: string,
            health: number,
            enemyBullets: Phaser.Group
        ) {
            super(game, x, y, key);

            this.animations.add('getHit', [0, 1, 2, 1, 0], 25, false);
            this.anchor.setTo(0.5);

            this.health = health;
            this.enemyBullets = enemyBullets;

            this.enemyTimer = this.game.time.create(false);
            this.enemyTimer.start();

            this.scheduleShooting();
        }

        update() {
            if (this.position.x < 0.05 * this.game.world.width) {
                this.position.x = 0.05 * this.game.world.width + 2;
                this.body.velocity.x *= -1;
            } else if (this.position.x > 0.95 * this.game.world.width) {
                this.position.x = 0.95 * this.game.world.width - 2;
                this.body.velocity.x *= -1;
            }

            if (this.position.y > this.game.world.height) this.kill();
        }
        damage(amount: number): Phaser.Sprite {
            let sprite = super.damage(amount);
            this.play('getHit');

            if (this.health <= 0) {
                let emitter = this.game.add.emitter(this.x, this.y, 100);
                emitter.makeParticles('enemyParticle');
                emitter.minParticleSpeed.setTo(-200, -200);
                emitter.maxParticleSpeed.setTo(200, 200);
                emitter.gravity = 0;
                emitter.start(true, 500, null, 100);

                this.enemyTimer.pause();
            }

            return sprite;
        }
        resetEnemy(key: string, scale: number, vx: number, vy: number, x: number, y: number, health?: number): Phaser.Sprite {
            let sprite = super.reset(x, y, health);

            this.loadTexture(key);
            this.scale.setTo(scale);
            this.body.velocity.x = vx;
            this.body.velocity.y = vy;

            this.enemyTimer.resume();

            return sprite;
        }

        scheduleShooting() {
            this.shoot();

            this.enemyTimer.add(Phaser.Timer.SECOND * 2, this.scheduleShooting, this);
        }
        shoot() {
            var bullet = this.enemyBullets.getFirstExists(false) as SpaceShip.EnemyBullet;

            if (!bullet) {
                bullet = new SpaceShip.EnemyBullet(this.game, this.x, this.bottom);
                this.enemyBullets.add(bullet);
            } else {
                bullet.reset(this.x, this.y);
            }

            bullet.body.velocity.y = 100;
        }
    }
}
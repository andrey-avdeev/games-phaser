namespace SpaceShip {
    export class Main extends Phaser.State {
        private PLAYER_SPEED = 200;
        private BULLET_SPEED = -1000;

        private background: Phaser.TileSprite;
        private player: Phaser.Sprite;
        private playerBullets: Phaser.Group;
        private shootingTimer: Phaser.TimerEvent;

        private enemyBullets: Phaser.Group;

        init() {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            this.game.physics.startSystem(Phaser.Physics.ARCADE);
        }
        create() {
            this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, Sprites.SPACE);
            this.background.autoScroll(0, 30);

            this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.height - 50, Sprites.PLAYER);
            this.player.anchor.setTo(0.5);
            this.game.physics.arcade.enable(this.player);
            this.player.body.collideWorldBounds = true;

            this.initBullets();
            this.shootingTimer = this.game.time.events.loop(Phaser.Timer.SECOND / 5, this.createPlayerBullet, this);

            let enemy = new Enemy(this.game, 100, 100, Sprites.ENEMY_GREEN, 10, this.enemyBullets);
            this.game.add.existing(enemy);
        }

        update() {
            this.player.body.velocity.x = 0;

            if (this.game.input.activePointer.isDown) {
                var targetX = this.game.input.activePointer.position.x;

                var direction = targetX > this.game.world.centerX ? 1 : -1;

                this.player.body.velocity.x = direction * this.PLAYER_SPEED;
            }
        }

        initBullets() {
            this.playerBullets = this.game.add.group();
            this.playerBullets.enableBody = true;

            this.enemyBullets = this.game.add.group();
            this.enemyBullets.enableBody = true;
        }
        createPlayerBullet() {
            let bullet = this.playerBullets.getFirstExists(false);

            if (!bullet) {
                bullet = new PlayerBullet(this.game, this.player.x, this.player.top);
                this.playerBullets.add(bullet);
            } else {
                bullet.reset(this.player.x, this.player.top);
            }

            bullet.body.velocity.y = this.BULLET_SPEED;
        }
    }
}

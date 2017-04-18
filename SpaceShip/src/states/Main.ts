namespace SpaceShip {
    export class Main extends Phaser.State {
        private PLAYER_SPEED = 200;
        private BULLET_SPEED = -1000;
        private numLevels = 3;
        private currentLevel: number;
        private currentEnemyIndex: number = 0;

        private endOfLevelTimer: Phaser.TimerEvent;
        private nextEnemyTimer: Phaser.TimerEvent;

        private levelData: any;

        private background: Phaser.TileSprite;
        private player: Phaser.Sprite;
        private playerBullets: Phaser.Group;
        private enemies: Phaser.Group;
        private shootingTimer: Phaser.TimerEvent;

        private enemyBullets: Phaser.Group;

        private music: Phaser.Sound;

        public static BASE_PATH = 'assets/images/';
        public static FILE_EXTENSION = '.png';
        public static SPACE = 'space';
        public static PLAYER = 'player';
        public static BULLET = 'bullet';
        public static ENEMY_PARTICLE = 'enemyParticle';
        public static ENEMY_YELLOW = 'yellowEnemy';
        public static ENEMY_RED = 'redEnemy';
        public static ENEMY_GREEN = 'greenEnemy';

        init(currentLevel?: number) {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            this.currentLevel = currentLevel ? currentLevel : 1;
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

            this.initEnemies();
            this.loadLevel();

            this.music = this.game.add.audio('music');
            this.music.play();
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
        initEnemies() {
            this.enemies = this.add.group();
            this.enemies.enableBody = true;

            this.enemyBullets = this.add.group();
            this.enemyBullets.enableBody = true;
        }
        damageEnemy(bullet: Phaser.Sprite, enemy: Phaser.Sprite) {
            enemy.damage(1);
            bullet.kill();
        }
        killPlayer() {
            this.player.kill();
            this.music.stop();
            this.game.state.start("Home");
        }

        createEnemy(
            x: number,
            y: number,
            health: number,
            key: string,
            scale: number,
            vx: number,
            vy: number
        ) {
            let enemy = this.enemies.getFirstExists(false);

            if (!enemy) {
                enemy = new SpaceShip.Enemy(this.game, x, y, key, health, this.enemyBullets);
                this.enemies.add(enemy);
            }

            enemy.resetEnemy(key, scale, vx, vy, x, y, health);
        }

        loadLevel() {
            this.currentEnemyIndex = 0;

            this.levelData = JSON.parse(this.game.cache.getText("level" + this.currentLevel));

            this.endOfLevelTimer = this.game.time.events.add(this.levelData.duration * 1000,
                () => {
                    console.log("Level was ended");
                    this.music.stop();

                    if (this.currentLevel < this.numLevels) {
                        this.currentLevel++;
                    } else {
                        this.currentLevel = 1;
                    }

                    this.game.state.start("GameState", true, false, this.currentLevel);
                }, this);

            this.scheduleNextEnemy();
        }
        scheduleNextEnemy() {
            let nextEnemy = this.levelData.enemies[this.currentEnemyIndex];

            if (nextEnemy) {
                let nextTime = 1000 * (nextEnemy.time - (this.currentEnemyIndex == 0 ? 0 : this.levelData.enemies[this.currentEnemyIndex - 1].time));

                this.nextEnemyTimer = this.game.time.events.add(nextTime, () => {
                    this.createEnemy(nextEnemy.x * this.game.world.width, -100, nextEnemy.health, nextEnemy.key, nextEnemy.scale, nextEnemy.speedX, nextEnemy.speedY);

                    this.currentEnemyIndex++;
                    this.scheduleNextEnemy();
                }, this);
            }
        }
    }
}

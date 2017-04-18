namespace SpaceShip {
    export class Preloader extends Phaser.State {

        preload() {
            this.load.image(Sprites.SPACE, Sprites.BASE_PATH + Sprites.SPACE + Sprites.FILE_EXTENSION);
            this.load.image(Sprites.PLAYER, Sprites.BASE_PATH + Sprites.PLAYER + Sprites.FILE_EXTENSION);
            this.load.image(Sprites.BULLET, Sprites.BASE_PATH + Sprites.BULLET + Sprites.FILE_EXTENSION);

            this.load.image(Sprites.ENEMY_PARTICLE, Sprites.BASE_PATH + Sprites.ENEMY_PARTICLE + Sprites.FILE_EXTENSION);
            this.load.spritesheet(Sprites.ENEMY_YELLOW, Sprites.BASE_PATH + Sprites.ENEMY_YELLOW + Sprites.FILE_EXTENSION, 50, 46, 3, 1, 1);
            this.load.spritesheet(Sprites.ENEMY_RED, Sprites.BASE_PATH + Sprites.ENEMY_RED + Sprites.FILE_EXTENSION, 50, 46, 3, 1, 1);
            this.load.spritesheet(Sprites.ENEMY_GREEN, Sprites.BASE_PATH + Sprites.ENEMY_GREEN + Sprites.FILE_EXTENSION, 50, 46, 3, 1, 1);

            this.load.text('level1', 'assets/levels/level1.json');
            this.load.text('level2', 'assets/levels/level2.json');
            this.load.text('level3', 'assets/levels/level3.json');

            this.load.audio('music', ['assets/audio/8bit-orchestra.mp3', 'assets/audio/8bit-orchestra.ogg']);
        }

        create() {
            this.game.state.start("Home");
        }
    }
}

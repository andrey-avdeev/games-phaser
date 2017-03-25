namespace Farm {

    export class Preloader extends Phaser.State {

        preload() {
            this.load.image("background", "assets/images/background.png");
            this.load.image("arrow", "assets/images/arrow.png");

            this.load.spritesheet("chiken", "assets/images/chiken_spritesheet.png", 131, 200, 3);
            this.load.spritesheet("horse", "assets/images/horse_spritesheet.png", 212, 200, 3);
            this.load.spritesheet("pig", "assets/images/pig_spritesheet.png", 297, 200, 3);
            this.load.spritesheet("sheep", "assets/images/sheep_spritesheet.png", 244, 200, 3);

            this.load.audio("chikenSound", ["assets/audio/chiken.ogg", "assets/audio/chiken.mp3"]);
            this.load.audio("horseSound", ["assets/audio/horse.ogg", "assets/audio/horse.mp3"]);
            this.load.audio("pigSound", ["assets/audio/pig.ogg", "assets/audio/pig.mp3"]);
            this.load.audio("sheepSound", ["assets/audio/sheep.ogg", "assets/audio/sheep.mp3"]);
        }

        create() {
            this.game.state.start("Main");
        }
    }
}

namespace Pet {

    export class Preloader extends Phaser.State {

        preload() {
            this.load.image('background', 'assets/images/background.png');
            this.load.image('apple', 'assets/images/apple.png');
            this.load.image('candy', 'assets/images/candy.png');
            this.load.image('rotate', 'assets/images/rotate.png');
            this.load.image('toy', 'assets/images/rubber_duck.png');
            this.load.image('arrow', 'assets/images/arrow.png');
            this.load.spritesheet('pet', 'assets/images/pet.png', 97, 83, 5, 1, 1);
        }

        create() {
            this.game.state.start("Main");
        }
    }
}

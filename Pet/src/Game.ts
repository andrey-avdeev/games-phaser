namespace Pet {

    export class Game extends Phaser.Game {

        constructor() {
            super(800, 600, Phaser.AUTO);

            this.state.add("Boot", Pet.Boot);
            this.state.add("Preloader", Pet.Preloader);
            this.state.add("Main", Pet.Main);

            this.state.start("Boot");
        }
    }
}

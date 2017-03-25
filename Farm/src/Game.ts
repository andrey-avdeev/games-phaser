namespace Farm {

    export class Game extends Phaser.Game {

        constructor() {
            super(800, 600, Phaser.AUTO);

            this.state.add("Boot", Farm.Boot);
            this.state.add("Preloader", Farm.Preloader);
            this.state.add("Main", Farm.Main);

            this.state.start("Boot");
        }
    }
}

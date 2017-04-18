namespace DonkeyKong {

    export class Game extends Phaser.Game {

        constructor() {
            super(800, 600, Phaser.AUTO);

            this.state.add("Boot", DonkeyKong.Boot);
            this.state.add("Preloader", DonkeyKong.Preloader);
            this.state.add("Home", DonkeyKong.Home);
            this.state.add("Main", DonkeyKong.Main);

            this.state.start("Boot");
        }
    }
}

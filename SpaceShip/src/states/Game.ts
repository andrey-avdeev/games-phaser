namespace SpaceShip {

    export class Game extends Phaser.Game {

        constructor() {
            super('100%', '100%', Phaser.AUTO);

            this.state.add("Boot", SpaceShip.Boot);
            this.state.add("Preloader", SpaceShip.Preloader);
            this.state.add("Main", SpaceShip.Main);

            this.state.start("Boot");
        }
    }
}

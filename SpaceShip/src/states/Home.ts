namespace SpaceShip {

    export class Home extends Phaser.State {

        preload() {

        }

        create() {
            

            this.game.state.start("Main");
        }
    }
}

namespace Pet {

    export class Boot extends Phaser.State {

        preload() {
            this.load.image('bar', 'assets/images/bar.png');
            this.load.image('logo', 'assets/images/logo.png');
        }

        create() {
            this.game.stage.backgroundColor = '#fff';
            // Disable multitouch
            this.input.maxPointers = 1;

            // Pause if browser tab loses focus
            this.stage.disableVisibilityChange = true;

            if (this.game.device.desktop) {
                // Desktop settings
            } else {
                // Mobile settings
            }

            this.game.state.start("Preloader");
        }
    }
}

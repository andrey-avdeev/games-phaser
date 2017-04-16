namespace Pet {

    export class Home extends Phaser.State {
        public message: string;

        init(message: string) {
            this.message = message;
        }
        create() {
            let background = this.game.add.sprite(0, 0, 'background');
            background.inputEnabled = true;

            background.events.onInputDown.add(() => {
                this.state.start('Main');
            }, this);

            let style = { font: '35px Arial', fill: '#fff' };
            this.game.add.text(30, this.game.world.centerY + 200, 'TOUCH TO START', style);

            if (this.message) {
                this.game.add.text(60, this.game.world.centerY - 200, this.message, style);
            }
        }
    }
}

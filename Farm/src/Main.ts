namespace Farm {

    export class Main extends Phaser.State {

        public background: Phaser.Sprite;

        create() {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;

            this.background = this.game.add.sprite(0, 0, "background");
        }
    }
}

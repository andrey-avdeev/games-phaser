namespace Farm {

    export class Main extends Phaser.State {

        public background: Phaser.Sprite;

        public chiken: Phaser.Sprite;
        public horse: Phaser.Sprite;
        public pig: Phaser.Sprite;
        public sheep: Phaser.Sprite;

        public rightArrow: Phaser.Sprite;
        public leftArrow: Phaser.Sprite;

        init() {
            //scalling screen
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
        }

        create() {
            this.background = this.game.add.sprite(0, 0, "background");

            this.chiken = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY / 2, 'chiken');
            this.chiken.anchor.setTo(0.5);
            this.chiken.scale.setTo(1.5);

            this.horse = this.game.add.sprite(100, 200, 'horse');
            this.horse.anchor.setTo(0.5);

            this.pig = this.game.add.sprite(150, 100, 'pig');
            this.pig.anchor.setTo(0.5);

            this.sheep = this.game.add.sprite(100, 100, 'sheep');
            this.sheep.anchor.setTo(0.5);

            this.rightArrow = this.game.add.sprite(this.game.width - 100, this.game.world.centerY, 'arrow');
            this.leftArrow = this.game.add.sprite(100, this.game.world.centerY, 'arrow');
            this.leftArrow.scale.setTo(-1, 0);

        }
    }
}

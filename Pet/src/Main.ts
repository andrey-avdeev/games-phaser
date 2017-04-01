namespace Pet {

    export class Main extends Phaser.State {
        public background: Phaser.Sprite;
        public pet: Phaser.Sprite;
        public apple: Phaser.Sprite;
        public candy: Phaser.Sprite;
        public toy: Phaser.Sprite;
        public rotate: Phaser.Sprite;
        public buttons: Phaser.Sprite[];
        public selected: Phaser.Sprite = null;
        public isUiBlocked: boolean;
        init() {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
        }

        create() {
            this.background = this.game.add.sprite(0, 0, 'background');
            this.background.inputEnabled = true;
            this.background.input.pixelPerfectClick = true;
            this.background.events.onInputDown.add(this.placeItem, this);

            this.pet = this.game.add.sprite(100, 400, 'pet');
            this.pet.anchor.setTo(0.5);
            this.pet.data = { health: 100, fun: 100 };
            this.pet.inputEnabled = true;
            this.pet.input.enableDrag();

            this.apple = this.game.add.sprite(72, 570, 'apple');
            this.apple.anchor.setTo(0.5);
            this.apple.inputEnabled = true;
            this.apple.events.onInputDown.add(this.pickItem, this);
            this.apple.data = {
                health: 20
            }

            this.candy = this.game.add.sprite(144, 570, 'candy');
            this.candy.anchor.setTo(0.5);;
            this.candy.inputEnabled = true;
            this.candy.events.onInputDown.add(this.pickItem, this);
            this.candy.data = {
                health: -10,
                fun: 10
            }

            this.toy = this.game.add.sprite(216, 570, 'toy');
            this.toy.anchor.setTo(0.5);
            this.toy.inputEnabled = true;
            this.toy.events.onInputDown.add(this.pickItem, this);
            this.toy.data = {
                fun: 20
            }

            this.rotate = this.game.add.sprite(288, 570, 'rotate');
            this.rotate.anchor.setTo(0.5);
            this.rotate.inputEnabled = true;
            this.rotate.events.onInputDown.add(this.rotatePet, this);

            this.buttons = [this.apple, this.candy, this.toy, this.rotate];
            //nothing is selected

        }
        placeItem(sprite: Phaser.Sprite, event: any) {
            let x = event.position.x;
            let y = event.position.y;

            //var newItem = this.game.add.sprite(x,y,this.se)
        }
        pickItem(sprite: Phaser.Sprite, event: any) {
            if (!this.isUiBlocked) {
                console.log('pick item');

                this.clearSelection();

                sprite.alpha = 0.4;

                this.selected = sprite;
            }
        }
        clearSelection() {
            this.buttons.forEach((sprite: Phaser.Sprite, index: number) =>
                sprite.alpha = 1);

            this.selected = null;
        }
        rotatePet(sprite: Phaser.Sprite, event: any) {
            if (!this.isUiBlocked) {
                console.log('rotate pet');

                this.isUiBlocked = true;

                this.clearSelection();
                sprite.alpha = 0.4;

                let rotation = this.game.add.tween(this.pet);
                rotation.to({ angle: '+1080' }, 1200);
                rotation.onComplete.add(() => {
                    this.isUiBlocked = false;
                    sprite.alpha = 1;
                    this.pet.data.fun += 10;
                }, this);
                rotation.start();
            }
        }
    }
}

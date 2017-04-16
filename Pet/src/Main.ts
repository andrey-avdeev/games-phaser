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
        public healthText: Phaser.Text;
        public funnyText: Phaser.Text;
        public statsDecreaser: Phaser.TimerEvent;
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
            this.pet.animations.add('funny', [1, 2, 3, 2, 1], 7, false);

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

            var style = { font: '20px Arial', fill: '#fff' };
            this.game.add.text(10, 20, 'Health:', style);
            this.game.add.text(140, 20, 'Fun:', style);

            this.healthText = this.game.add.text(80, 20, '', style);
            this.funnyText = this.game.add.text(185, 20, '', style);

            this.refreshStats();

            this.statsDecreaser = this.game.time.events.loop(Phaser.Timer.SECOND * 5, this.reduceStats, this);
        }
        placeItem(sprite: Phaser.Sprite, event: any) {
            if (this.selected && !this.isUiBlocked) {
                let x = event.position.x;
                let y = event.position.y;

                var newItem = this.game.add.sprite(x, y, this.selected.key);
                newItem.anchor.setTo(0.5);
                newItem.data = this.selected.data;
                console.log(newItem.data);
                this.isUiBlocked = true;

                var petMovement = this.game.add.tween(this.pet);
                petMovement.to({ x: x, y: y }, 700);
                petMovement.onComplete.add(() => {
                    this.pet.animations.play('funny');

                    this.isUiBlocked = false;

                    var stat: any;
                    for (stat in newItem.data) {
                        if (newItem.data.hasOwnProperty(stat)) {
                            this.pet.data[stat] += newItem.data[stat];
                        }
                    }

                    this.refreshStats();

                    newItem.destroy();
                }, this);

                petMovement.start();
            }
        }
        refreshStats() {
            this.healthText.text = this.pet.data.health;
            this.funnyText.text = this.pet.data.fun;
        }

        reduceStats() {
            this.pet.data.health -= 10;
            this.pet.data.fun -= 20;
            this.refreshStats();
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

                    this.refreshStats();
                }, this);

                rotation.start();
            }
        }
        update() {
            if (this.pet.data.health <= 0 || this.pet.data.fun <= 0) {
                this.pet.frame = 4;
                this.isUiBlocked = true;

                this.game.time.events.add(2000, this.gameOver, this);
            }
        }
        gameOver() {
            this.game.state.start('Home', true, false, 'GAME OVER!');
        }
    }
}

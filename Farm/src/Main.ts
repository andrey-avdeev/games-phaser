namespace Farm {

    export class Main extends Phaser.State {

        public background: Phaser.Sprite;

        public animals: Phaser.Group;

        public chicken: Phaser.Sprite;
        public horse: Phaser.Sprite;
        public pig: Phaser.Sprite;
        public sheep: Phaser.Sprite;

        public current: Phaser.Sprite;

        public rightArrow: Phaser.Sprite;
        public leftArrow: Phaser.Sprite;
        public isMoving: boolean = false;
        public animalText: Phaser.Text;

        init() {

        }

        create() {
            //scalling screen
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;

            this.background = this.game.add.sprite(0, 0, "background");

            let animalData = [
                { key: 'chicken', text: 'CHIKEN' },
                { key: 'horse', text: 'HORSE' },
                { key: 'pig', text: 'PIG' },
                { key: 'sheep', text: 'SHEEP' }
            ];

            this.animals = this.game.add.group();

            animalData.forEach((data) => {
                let animal = this.animals.create(-1000, this.game.world.centerY, data.key, 0);
                animal.anchor.setTo(0.5);
                animal.animations.add('animate', [0, 1, 2, 1, 0, 1], 3, false);
                animal.data = {
                    text: data.text,
                    sound: this.game.add.audio(data.key)
                };
                animal.inputEnabled = true;
                animal.input.pixelPerfectClick = true;
                animal.events.onInputDown.add(this.animate, this);
            });
            this.current = this.animals.next();
            this.current.position.set(this.game.world.centerX, this.game.world.centerY);
            this.showText(this.current);

            //left arrow
            this.leftArrow = this.game.add.sprite(60, this.game.world.centerY, 'arrow');
            this.leftArrow.anchor.setTo(0.5);
            this.leftArrow.scale.setTo(-1, 1);
            this.leftArrow.data = { direction: -1 };
            this.leftArrow.inputEnabled = true;
            this.leftArrow.input.pixelPerfectClick = true;
            this.leftArrow.events.onInputDown.add(this.change, this);

            //right arrow
            this.rightArrow = this.game.add.sprite(580, this.game.world.centerY, 'arrow');
            this.rightArrow.anchor.setTo(0.5);
            this.rightArrow.data = { direction: 1 };
            this.rightArrow.inputEnabled = true;
            this.rightArrow.input.pixelPerfectClick = true;
            this.rightArrow.events.onInputDown.add(this.change, this);
        }

        change(sprite: Phaser.Sprite, event: any) {
            if (this.isMoving) {
                return false;
            }
            this.isMoving = true;

            this.animalText.visible = false;

            let newAnimal:any;
            let endX = 0;

            if (sprite.data.direction > 0) {
                newAnimal = this.animals.next();
                newAnimal.x = -newAnimal.width / 2;
                endX = 640 + this.current.width / 2;
            } else {
                newAnimal = this.animals.previous();
                newAnimal.x = 640 + newAnimal.width / 2;
                endX = -this.current.width / 2;
            }

            let newAnimalMovement = this.game.add.tween(newAnimal);
            newAnimalMovement.to({ x: this.game.world.centerX }, 1000);
            newAnimalMovement.onComplete.add(() => {
                this.isMoving = false;
                this.showText(newAnimal);
            }, this);
            newAnimalMovement.start();

            let currentMovement = this.game.add.tween(this.current);
            currentMovement.to({ x: endX }, 1000);
            currentMovement.start();

            this.current = newAnimal;
        }

        animate(sprite: Phaser.Sprite, event: any) {
            sprite.play('animate');
            sprite.data.sound.play();
        }

        showText(sprite: Phaser.Sprite) {
            if (!this.animalText) {
                let style = {
                    font: 'bold 30pt Arial',
                    fill: '#D0171B',
                    align:'center'
                }
                this.animalText = this.game.add.text(this.game.width / 2, this.game.height * 0.85, '', style);
                this.animalText.anchor.setTo(0.5);
            }

            this.animalText.setText(sprite.data.text);
            this.animalText.visible = true;
        }

        update() {

        }
    }
}

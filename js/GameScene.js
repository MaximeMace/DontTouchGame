export const gameOptions = {
    // bird gravity, will make bird fall if you dont flap
    birdGravity: 800,

    // flap thrust
    birdFlapPower: 300,

    spike: [],
}

export default class GameScene extends Phaser.Scene {
    /**
     * Constructor
     */
    constructor() {
        super('GameScene');
    }

    /**
     * Preload standard method
     */
    preload() {
        // Load assets
        this.load.svg('player', 'assets/svg/chicken-character-r.svg');

        this.load.svg('spike', 'assets/svg/spike.svg');

        this.load.svg('eggs', 'assets/svg/eggs-icon.svg');

        // Load border sprite sheet
        this.load.spritesheet('border-l', './assets/svg/border-left.svg', {
            frameWidth: 0,
            frameHeight: this.game.config.height
        });

        this.load.spritesheet('border-r', './assets/svg/border-right.svg', {
            frameWidth: 0,
            frameHeight: this.game.config.height
        });
    }

    /**
     * Create standard method
     */
    create() {
        this.directionWay = 1;

        // Change color background to black
        this.cameras.main.setBackgroundColor('#F6F6F6');

        // border game
        this.borderLeft = this.physics.add.staticGroup().create(20, this.game.config.height / 2, 'border-l').refreshBody();
        this.borderRight = this.physics.add.staticGroup().create(this.game.config.width - 20, this.game.config.height / 2, 'border-r').refreshBody();

        this.player = this.physics.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'player');

        this.player.body.gravity.y = gameOptions.birdGravity;
        this.input.on('pointerdown', this.flap, this);

        // Detect collision between player and borders
        this.physics.add.collider(this.borderLeft, this.player, function() {
            this.directionWay = 1;
            this.flap();
            this.killSpike();
            this.generateEggs();
            this.generateSpike("right");
        }, null, this);

        this.physics.add.collider(this.borderRight, this.player, function() {
            this.directionWay = -1;
            this.flap();
            this.killSpike();
            this.generateEggs();
            this.generateSpike("left");
        }, null, this);

        this.generateSpike("right");
    }

    /**
     * Update standard method
     */
    update() {}

    /**
     * Make bird flying
     */
    flap() {
        this.player.body.velocity.y = -gameOptions.birdFlapPower;
        this.player.body.velocity.x = this.directionWay * gameOptions.birdFlapPower;
    }

    /**
     * Create spikes
     * 
     * @param {*} placement 
     */
    generateSpike(placement) {
        let numberOfSpikes = Phaser.Math.Between(1, 4);
        let numberGrid = 8;
        let countSpike = 0;
        let matriceSpikes = [];

        // Matrix 1,8 with 0 = no spike 1 = a spike
        for (let i = 0; i < numberGrid; i++) {
            let isSpike = countSpike < numberOfSpikes ? Phaser.Math.Between(0, 1) : 0;
            matriceSpikes.push(isSpike);

            if (isSpike == 1) {
                countSpike++;
            }
        }

        for (let i = 0; i < numberGrid; i++) {
            if (matriceSpikes[i] == 1) {
                if (placement == "right") {
                    var spike = this.physics.add.staticGroup().create(this.game.config.width - 70, this.game.config.height - this.game.config.height / numberGrid * i - 50, 'spike').refreshBody();

                    this.physics.add.collider(spike, this.player, function() {
                        this.endGame();
                    }, null, this);

                    gameOptions.spike.push(spike);
                }

                if (placement == "left") {
                    var spike = this.physics.add.staticGroup().create(70, this.game.config.height - this.game.config.height / numberGrid * i - 50, 'spike').refreshBody();
                    spike.rotation = 15.71;

                    this.physics.add.collider(spike, this.player, function() {
                        this.endGame();
                    }, null, this);

                    gameOptions.spike.push(spike);
                }
            }
        }
    }

    /**
     * Create eggs
     */
    generateEggs() {
        let randX = Phaser.Math.Between(-1, 1) + Phaser.Math.Between(0, this.game.config.width / 4);
        let randY = Phaser.Math.Between(-1, 1) + Phaser.Math.Between(0, this.game.config.height / 4);

        var eggs = this.physics.add.staticGroup().create(this.game.config.width / 2 + randX, this.game.config.height / 2 + randY, 'eggs').refreshBody();
        eggs.setDepth(1);

        this.physics.add.overlap(this.player, eggs, function() {
            eggs.destroy();
        });
    }

    /**
     * Destroy spikes
     */
    killSpike() {
        for (let i = 0; i < gameOptions.spike.length; i++) {
            gameOptions.spike[i].destroy();
        }
    }

    /**
     * End game event
     */
    endGame() {
        this.scene.start('StartScene');
    }
}
export default class StartScene extends Phaser.Scene {
    /**
     * Constructor
     */
    constructor() {
        super('StartScene');
    }

    /**
     * Create and init game assets
     */
    create() {
        // // Init text title menu
        let titleMenu = this.add.text(
            0,
            0,
            'DONTTOUCHSPIKES', {
                fontSize: '40px',
                fill: '#000',
            });
        titleMenu.x = this.game.config.width / 2 - titleMenu.width / 2;
        titleMenu.y = 100;

        // Init player vs computer button
        let playBtn = this.add.text(100, 100, 'Play');
        playBtn.setPadding(10);
        playBtn.setStyle({ backgroundColor: '#e55c90', fontSize: 32 });
        playBtn.setInteractive();

        playBtn.x = this.game.config.width / 2 - playBtn.width / 2;
        playBtn.y = this.game.config.height / 4 - playBtn.height / 2;


        playBtn.on('pointerdown', () => {
            this.goToGameScene();
        });
    }

    /**
     * Go to Main scene
     */
    goToGameScene(choice = null) {
        this.scene.start('GameScene', { choice: choice });
    }
}
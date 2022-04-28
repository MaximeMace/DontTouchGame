export default class EndScene extends Phaser.Scene {
    /**
     * Constructor
     */
    constructor() {
        super('EndScene');
    }

    /**
     * Init the scene with data sent in another scene
     */
    init() {}

    /**
     * Load the game assets.
     */
    preload() {
        // Change color background to black
        this.cameras.main.setBackgroundColor('#000000');
    }

    /**
     * Create and init assets
     */
    create() {}
}
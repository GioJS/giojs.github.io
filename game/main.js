
var config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 320,
    height: 240,
    zoom: 2,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: [
        BootScene,
        PreludeScene,
        InitialScene,
        BattleScene,
        UIScene,
        MainMenu,
        ItemsMenu,
        UsePotion,
        UseRevive,
        Status
    ]
};
var game = new Phaser.Game(config);

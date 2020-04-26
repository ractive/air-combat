class PowereUp {
    private sprite: Sprite;
    constructor(img: Image, spriteKind: number, interval: number, chance: number) {
        this.sprite = sprites.create(img, spriteKind);
        this.hide();
        this.sprite.z = 5;

        game.onUpdateInterval(interval, function () {
            if (game.runtime() > 5000 && Math.percentChance(chance)) {
                this.sprite.setPosition(Math.randomRange(10, scene.screenWidth() - 10), Math.randomRange(10, scene.screenHeight() - 10))
                this.show();
                setTimeout(function () {
                    this.hide();
                }, 2000)
            }
        })
    }

    private show() {
        this.sprite.setFlag(SpriteFlag.Invisible | SpriteFlag.Ghost, false);
    }

    private hide() {
        this.sprite.setFlag(SpriteFlag.Invisible | SpriteFlag.Ghost, true);
    }

    public caught() {
        music.baDing.play();
        this.sprite.startEffect(effects.fountain, 500);
        this.hide();
    }
}
class Player {
    private static readonly maxLifes = 5;
    private hits = 0;
    private bombs = 0;
    private weaponLevel = 1;
    private lastHit = 0;
    private readonly sprite: Sprite;
    private readonly bombSprites: Sprite[];
    private static readonly bombImage: Image = img`
        . . 6 6 6 . . f
        . 6 6 6 6 6 f .
        6 6 6 6 6 6 f f
        . 6 6 6 6 b f .
        . . b b b . . f
    `;
    private static readonly projectileImg = img`
        1
        1
    `;
    private static readonly planeLeft = img`
        . . . . . 4 . . . . . . . . . .
        . . 4 . . 4 . . e . . . . . . .
        . 9 9 9 4 8 e 9 9 9 . . . . . .
        . . 4 . 4 8 e . e . . . . . . .
        4 4 4 4 4 4 4 4 4 e . . . . . .
        e e e e e 4 b b b b e . . . . .
        6 4 4 4 4 4 4 4 4 e 6 . . . . .
        . . 4 e . . . 4 e . . . . . . .
        . . 4 e . . . 4 e . . . . . . .
        . . 4 e . . . 4 e . . . . . . .
        . 4 4 4 . . . 4 e e . . . . . .
        . 3 4 2 e e e 2 e 3 . . . . . .
        4 4 4 4 4 4 4 4 4 e e . . . . .
        . . 4 e . . . 4 e . . . . . . .
    `;
    private static readonly planeStraight = img`
        . . . . . . . 4 4 . . . . . . .
        . . . 4 . . . 4 4 . . . 4 . . .
        . . 6 6 6 . 4 8 8 e . 6 6 6 . .
        . . . 4 . . 4 8 8 e . . 4 . . .
        . 4 4 4 4 4 4 4 4 4 4 4 4 4 4 .
        4 4 e e e e e e b b b b b b 4 e
        . 6 4 4 4 4 4 4 4 4 4 4 4 4 6 .
        . . . 4 e . . . . . . 4 e . . .
        . . . 4 e . . . . . . 4 e . . .
        . . . 4 e . . . . . . 4 e . . .
        . . 4 4 4 e . . . . 4 4 4 e . .
        . . 3 4 2 3 e e e e 3 2 4 3 . .
        d 4 4 4 4 4 4 4 4 4 4 4 4 4 4 e
        . . . 4 e . . . . . . 4 e . . .
    `;
    private static readonly planeRight = img`
        . . . . . . . . . . 4 . . . . .
        . . . . . . . 4 . . 4 . . 4 . .
        . . . . . . 9 9 9 4 8 4 9 9 9 .
        . . . . . . . 4 . 4 8 4 . 4 . .
        . . . . . 3 4 4 4 4 4 4 4 4 4 4
        . . . . . 3 e e e e 4 b b b b 4
        . . . . . 6 4 4 4 4 4 4 4 4 4 6
        . . . . . . . 4 4 . . . 4 4 . .
        . . . . . . . 4 4 . . . 4 4 . .
        . . . . . . . 4 4 . . . 4 4 . .
        . . . . . . 4 4 4 . . . 4 4 4 .
        . . . . . . 3 4 2 e e e 2 4 3 .
        . . . . . 3 4 4 4 4 4 4 4 4 4 4
        . . . . . . . 4 e . . . 4 e . .
    `;
    private lastDirection: Direction = Direction.UP;

    constructor() {
        info.setLife(Player.maxLifes);
        this.showLifeLights();

        this.sprite = sprites.create(Player.planeStraight, SpriteKind.Player)
        this.sprite.y = 110;
        this.sprite.z = 100;

        controller.moveSprite(this.sprite);
        this.sprite.setFlag(SpriteFlag.StayInScreen, true);

        const bomb1 = sprites.create(Player.bombImage, SpriteKind.BombPowerup);
        const bomb2 = sprites.create(Player.bombImage, SpriteKind.BombPowerup);
        const bomb3 = sprites.create(Player.bombImage, SpriteKind.BombPowerup);

        bomb1.setFlag(SpriteFlag.RelativeToCamera, false);
        bomb2.setFlag(SpriteFlag.RelativeToCamera, false);
        bomb3.setFlag(SpriteFlag.RelativeToCamera, false);
        bomb1.setFlag(SpriteFlag.Ghost | SpriteFlag.Invisible, true);
        bomb2.setFlag(SpriteFlag.Ghost | SpriteFlag.Invisible, true);
        bomb3.setFlag(SpriteFlag.Ghost | SpriteFlag.Invisible, true);

        bomb1.setPosition(5, scene.screenHeight() - 5);
        bomb2.setPosition(14, scene.screenHeight() - 5);
        bomb3.setPosition(23, scene.screenHeight() - 5);

        bomb1.z = 1000;
        bomb2.z = 1000;
        bomb3.z = 1000;

        this.bombSprites = [bomb1, bomb2, bomb3];

        this.drawBombs();

        controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
            if (this.bombs > 0) {
                this.bombs -= 1;
                this.sprite.startEffect(effects.halo, 2000);
                scene.cameraShake(10, 2000);
                Enemies.destroyAll(bomb1);
                this.drawBombs();
            }
        });

        controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
            this.shoot();
        });

        game.onUpdateInterval(250, function () {
            if (controller.B.isPressed()) {
                this.shoot();
            }
            
            if (controller.left.isPressed() && this.lastDirection !== Direction.LEFT) {
                if (this.lastDirection === Direction.RIGHT) {
                    this.sprite.setImage(Player.planeStraight);
                    this.lastDirection = Direction.UP;
                } else {
                    this.sprite.setImage(Player.planeLeft);
                    this.lastDirection = Direction.LEFT;
                }
            } else if (controller.right.isPressed() && this.lastDirection !== Direction.RIGHT) {
                if (this.lastDirection === Direction.LEFT) {
                    this.sprite.setImage(Player.planeStraight);
                    this.lastDirection = Direction.UP;
                } else {
                    this.sprite.setImage(Player.planeRight);
                    this.lastDirection = Direction.RIGHT;
                }
            } else if (!controller.left.isPressed() && !controller.right.isPressed()) {
                this.sprite.setImage(Player.planeStraight);
                this.lastDirection = Direction.UP;
            }
        });

        sprites.onOverlap(SpriteKind.EnemyProjectile, SpriteKind.Player, function (enemyProjectile, playerSprite) {
            this.gotHit(enemyProjectile)
        });

        sprites.onOverlap(SpriteKind.Powerup, SpriteKind.Player, function (powerUpSprite, playerSprite) {
            info.changeScoreBy(30);
            this.weaponLevel = Math.min(this.weaponLevel + 1, 4);
            powerUp.caught();
        });

        sprites.onOverlap(SpriteKind.BombPowerup, SpriteKind.Player, function (powerUpSprite, playerSprite) {
            info.changeScoreBy(50);
            this.bombs = Math.min(this.bombs + 1, 3);
            this.drawBombs();
            bombPowerUp.caught();
        });
        sprites.onOverlap(SpriteKind.LifePowerup, SpriteKind.Player, function (lifeUpSprite, playerSprite) {
            info.setLife(Math.min(info.life() + 1, Player.maxLifes));
            info.changeScoreBy(100);
            this.showLifeLights();
            lifePowerUp.caught();
        });

        sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (enemySprite, playerSprite) {
            const enemy: Enemy = SpriteWrapper.fromSprite(enemySprite) as Enemy;
            if (enemySprite.z < 10) {
                // no collision with low objects like vehicles or ships
                return;
            }
            this.gotHit();
            scene.cameraShake(3, 700);
            enemy.gotHitBy();
            const pushedBy: number = 20;
            switch (Math.randomRange(0, 3)) {
                case 0:
                    playerSprite.x += pushedBy;
                    break;
                case 1:
                    playerSprite.x -= pushedBy;
                    break;
                case 2:
                    playerSprite.y += pushedBy;
                    break;
                default:
                    playerSprite.y -= pushedBy;
                    break;
            }
        });
    }

    private showLifeLights() {
        for (let i = 0; i < 5; i++) {
            light.setPixelColor(i, light.colors(i + 1 <= info.life() ? Colors.Green : Colors.Red));
        }
    }

    private drawBombs() {
        this.bombSprites.forEach((sprite: Sprite, index: number) => {
            sprite.setFlag(SpriteFlag.Invisible, this.bombs < index + 1);
        });
    }

    public getSprite(): Sprite {
        return this.sprite;
    }

    public shoot() {
        if (this.weaponLevel === 1) {
            sprites.createProjectileFromSprite(Player.projectileImg, this.sprite, 0, -100);
        } else if (this.weaponLevel >= 2) {
            const p1 = sprites.createProjectileFromSprite(Player.projectileImg, this.sprite, 0, -100);
            const p2 = sprites.createProjectileFromSprite(Player.projectileImg, this.sprite, 0, -100);
            p1.setPosition(p1.x - 1, p1.y);
            p2.setPosition(p2.x + 1, p2.y);
        }

        if (this.weaponLevel >= 3) {
            sprites.createProjectileFromSprite(Player.projectileImg, this.sprite, -50, -87);
            sprites.createProjectileFromSprite(Player.projectileImg, this.sprite, 50, -87)
        }
        if (this.weaponLevel >= 4) {
            sprites.createProjectileFromSprite(Player.projectileImg, this.sprite, -87, -50);
            sprites.createProjectileFromSprite(Player.projectileImg, this.sprite, 87, -50);
        }
    }

    public gotHit(otherSprite?: Sprite) {
        // Add some grace time when got hit
        if (game.runtime() - this.lastHit > 500) {
            if (this.weaponLevel > 1) {
                this.weaponLevel -= 1;
                music.playSound("G5:1 C5:1");
            } else {
                if (info.life() === 1) {
                    // will be game over
                    light.showAnimation(light.runningLightsAnimation, 500);
                }
                info.changeLifeBy(-1);
                this.showLifeLights();
                music.playSound("G5:1 E5:1 C5:2");
            }

            this.sprite.startEffect(effects.spray, 200);
            if (otherSprite) {
                otherSprite.destroy(effects.fire, 100);
            }
        } else {
            if (otherSprite) {
                otherSprite.destroy();
            }
        }

        this.lastHit = game.runtime();
    }
}
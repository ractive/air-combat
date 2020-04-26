namespace SpriteKind {
    export const Powerup = SpriteKind.create()
    export const BombPowerup = SpriteKind.create()
    export const LifePowerup = SpriteKind.create()
    export const EnemyProjectile = SpriteKind.create()
}

enum Direction { UP, LEFT, DOWN, RIGHT };

function rotate(img: Image, direction: Direction): Image {
    function rotateImage(img: Image, deg: number): Image {
        function transpose(img: Image): Image {
            const result = image.create(img.height, img.width);
            for (let x = 0; x < img.width; x++) {
                for (let y = 0; y < img.height; y++) {
                    result.setPixel(y, x, img.getPixel(x, y));
                }
            }
            return result;
        }

        if (deg == -90 || deg == 270) {
            const r = transpose(img);
            r.flipY();
            return r;
        } else if (deg == 180 || deg == -180) {
            const r = img.clone();
            r.flipX();
            r.flipY();
            return r;
        } else if (deg == 90) {
            const r = transpose(img);
            r.flipX();
            return r;
        } else {
            return img;
        }
    }

    switch (direction) {
        case Direction.DOWN: return img;
        case Direction.UP: return rotateImage(img, 180);
        case Direction.LEFT: return rotateImage(img, 90);
        case Direction.RIGHT: return rotateImage(img, 270);
    }
}

interface Element {
    destroy(): void;
    getSprite(): Sprite;
    getMovement(): Movement;
}

interface Enemy extends Element {
    getScore(): number;
    gotHitBy(projectile?: Sprite): void;
}

interface Movement {
    direction: Direction;
    pos: number;
    v: number;
}

abstract class BaseObject {
    protected readonly sprite: Sprite;
    protected movement: Movement;

    constructor(image: Image, mov: Movement) {
        this.sprite = sprites.create(rotate(image, mov.direction), SpriteKind.Enemy);
        this.sprite.setFlag(SpriteFlag.AutoDestroy, true);
        this.movement = mov;

        let x: number, y: number, vx: number, vy: number;
        switch (mov.direction) {
            case Direction.DOWN:
                x = mov.pos;
                y = -image.height / 2 + 2;
                vx = 0;
                vy = mov.v;
                break;
            case Direction.UP:
                x = mov.pos;
                y = scene.screenHeight() + image.height / 2 - 2;
                vx = 0;
                vy = -mov.v;
                break;
            case Direction.LEFT:
                x = scene.screenWidth() + image.width / 2 - 2;
                y = mov.pos;
                vx = -mov.v;
                vy = 0;
                break;
            case Direction.RIGHT:
                x = -image.width / 2 + 2;
                y = mov.pos;
                vx = mov.v;
                vy = 0;
                break;
        }

        this.sprite.setPosition(x, y)
        this.sprite.setVelocity(vx, vy)
    }

    public destroy(): void {
        // override in derived classes
    }

    public getSprite(): Sprite {
        return this.sprite
    }

    public getMovement(): Movement {
        return this.movement;
    }
}

abstract class BaseEnemy extends BaseObject {
    protected remainingHits: number = 1;
    protected hits: number = 1;

    constructor(image: Image, mov: Movement, hits: number = 1) {
        super(image, mov);

        this.remainingHits = hits;
        this.hits = hits;
    }

    public getScore(): number {
        return 10;  
    }
    
    public gotHitBy(projectile?: Sprite): void {
        if (projectile && projectile.kind() === SpriteKind.BombPowerup) {
            this.remainingHits = Math.max(this.remainingHits - 11, 0);
        } else {
            this.remainingHits -= 1;
        }

        if (this.remainingHits == 0) {
            this.sprite.destroy(effects.fire, 100);
            info.changeScoreBy(this.getScore())
            music.playSound("C4:1");
        } else if (this.remainingHits < this.hits / 2) {
            this.sprite.startEffect(effects.fire);
        }

        if (projectile && projectile.kind() === SpriteKind.Projectile) {
            projectile.destroy();
        }
    }
}

abstract class Ship extends BaseEnemy {
    constructor(image: Image, mov: Movement, hits: number = 6) {
        super(image, mov, hits);
        this.sprite.z = 0;
    }
}

abstract class Plane extends BaseEnemy {
    constructor(image: Image, mov: Movement, hits: number = 1) {
        super(image, mov, hits);
        this.sprite.z = 15; // above the clouds
    }
}

class GreenPlane extends Plane implements Enemy {
    private static readonly image: Image = img`
        . . . . . . . 7 7 . . . . . . .
        . . . . 7 7 6 7 7 6 7 7 . . . .
        . . . . . . 7 7 7 7 . . . . . .
        . . . . . . . 7 7 . . . . . . .
        . . . . . . . 7 7 . . . . . . .
        . . . . . . . 7 7 . . . . . . .
        . . . 7 7 7 7 7 7 7 7 7 7 . . .
        . 6 7 7 6 7 e 7 7 e 7 6 7 7 6 .
        . . . . . 7 7 8 8 7 7 . . . . .
        . . . . . . . 8 8 . . . . . . .
        . . . . . . . 7 7 . . . . . . .
        . . . . . 9 9 9 9 9 9 . . . . .
    `;

    constructor(mov: Movement) {
        super(GreenPlane.image, mov);
        this.sprite.z = 8; // below the clouds
    }
}

class RedPlane extends Plane implements Enemy {
    private static readonly image: Image = img`
        . . . . . . . 2 . . . . . . . .
        . . . . . . . 2 . . . . . . . .
        . . . . 2 2 2 c 2 2 2 . . . . .
        . . . . . . 2 2 2 . . . . . . .
        . . . . . . 2 2 2 . . . . . . .
        . . . . . . 2 2 2 . . . . . . .
        . . . . c c 2 2 3 4 4 . . . . .
        . . c c 2 2 2 2 3 3 3 4 4 . . .
        c c 2 2 2 2 c 8 9 3 3 3 3 4 4 .
        c 2 2 2 2 2 c 8 9 3 3 3 3 3 4 .
        c c 2 2 2 2 c 8 9 3 3 3 3 4 4 .
        . . . . 2 2 2 2 2 2 2 . . . . .
        . . . . . 2 2 2 2 2 . . . . . .
        . . . . 9 9 9 8 9 9 9 . . . . .
    `;

    constructor(mov: Movement) {
        super(RedPlane.image, mov);
    }
}

class GrayPlane extends Plane implements Enemy {
    private static readonly projectileImage: Image = img`
        b 2 b
        b f b
        . f .
        . f .
        c f c
        . c .
    `;
    
    private static readonly image: Image = img`
        . . . 2 4 2 . . . . 2 4 2 . . .
        . b b 6 6 6 6 6 6 6 6 6 6 6 6 .
        . . b 6 6 6 6 6 6 6 6 6 6 6 . .
        . . . b 6 6 6 6 6 6 6 6 6 . . .
        . . . b 6 6 6 6 6 6 6 6 6 . . .
        . . . . b 6 6 6 6 6 6 6 . . . .
        . . . . b 6 6 6 6 6 6 6 . . . .
        . . . . . b 6 8 8 6 6 . . . . .
        . . . . . b 6 8 8 6 6 . . . . .
        . . . . . . b 8 8 6 . . . . . .
        . . . . . . b 6 6 6 . . . . . .
        . . . . . . . b 6 . . . . . . .
        . . . . . . . b 6 . . . . . . .
        . . . . . . . b 6 . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `;

    constructor(mov: Movement) {
        super(GrayPlane.image, mov, 2);
        this.shoot();
    }

    private shoot(): void {
        let vx =  50 * Math.sign(this.sprite.vx);
        let vy =  50 * Math.sign(this.sprite.vy);
        let ax = 200 * Math.sign(this.sprite.vx);
        let ay = 200 * Math.sign(this.sprite.vy);

        const projectile = sprites.createProjectileFromSprite(
            rotate(GrayPlane.projectileImage, this.movement.direction),
            this.sprite,
            vx,
            vy
        );
        projectile.ax = ax;
        projectile.ay = ay;
        projectile.setKind(SpriteKind.EnemyProjectile);
        // Make sure the projectile is on the screen so
        // that it does not get auto destoryed immediately
        let x = projectile.x, y = projectile.y;
        switch(this.movement.direction) {
            case Direction.DOWN: y = 1; break;
            case Direction.UP: y = scene.screenHeight(); break;
            case Direction.LEFT: x = scene.screenWidth(); break;
            case Direction.RIGHT: x = 0; break;
        }
        projectile.setPosition(x, y);
    }

    public getScore(): number {
        return 20;
    }
}

class BigPlane extends Plane implements Enemy {
    private static readonly projectileImage: Image = img`
        5 2 5
        2 4 2
        5 2 5
    `;
    private static readonly image: Image = img`
        . . . . . . . . . . . 7 7 7 . . . . . . . . . .
        . . . . . . . . 7 7 7 7 7 7 7 7 7 . . . . . . .
        . . . . . . . . b b b 7 7 7 b b b . . . . . . .
        . . . . . . . . . . . 7 7 7 . . . . . . . . . .
        . . . . . . . . . . . 7 7 7 . . . . . . . . . .
        . . . . . . . . . . . 7 7 7 . . . . . . . . . .
        . . . . . . . . . . . 7 7 7 . . . . . . . . . .
        . . . . . . . . . . . 7 7 7 . . . . . . . . . .
        . . . . . . . . . . b 7 2 7 d . . . . . . . . .
        . . . . . . . . b b 7 2 7 2 7 d d . . . . . . .
        . . . . . b b b 7 7 7 7 7 7 7 7 7 d d d . . . .
        . b b b b 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d d d .
        b 7 7 7 7 7 7 b b b b 7 7 7 d d d d 7 7 7 7 7 d
        . . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . .
        . . . . . . . 7 . . . 2 7 2 . . . 7 . . . . . .
        . . . . . b 9 9 9 1 . 7 2 7 . b 9 9 9 1 . . . .
        . . . . . . . . . . . 2 7 2 . . . . . . . . . .
        . . . . . . . . . . . . 2 . . . . . . . . . . .
    `;

    private readonly interval: number;

    constructor(mov: Movement) {
        super(BigPlane.image, mov, 3);
        this.sprite.z = 8; // below the clouds
        this.shoot();
        this.interval = setInterval(() => {
            this.shoot();
        }, 1200);
    }

    private shoot(): void {
        const projectile = sprites.createProjectileFromSprite(BigPlane.projectileImage, this.sprite, 0, 70)
        projectile.setKind(SpriteKind.EnemyProjectile)
    }

    public destroy() {
        clearInterval(this.interval);
    }

    public getScore(): number {
        return 30;
    }
}

class BomberPlane extends Plane implements Enemy {
    private static readonly projectileImage: Image = img`
        5 2 5
        2 4 2
        5 2 5
    `;
    private static readonly image: Image = img`
        . . . . . . . . . . . . . . . . . . . . . . . 2 2 . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . b b b d d c d d d d d d . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . b d d 4 d d c d d d 4 d d d . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . b d d d c d d d d d . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . d 6 d d . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . d 6 d d . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . d 6 d d . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . d 6 d d . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . d 6 d d . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . d 6 d d . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . d 6 d d . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . b d d d d 3 . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . b b b b d d d d d d 3 3 3 3 . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . b b b b b d d d d d d d d d d d d d d 3 3 3 3 3 . . . . . . . . . . . .
        . . . . . . . b b b b b d d d d d d d d d d d d d d d d d d d d d d d d 3 3 3 3 3 . . . . . . .
        . b b b b b b d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 3 3 3 3 3 3 .
        b d d d d d d d 6 d d d d 6 d d d d d d d d d d d d d d d d d d d d 6 d d d d 6 d d d d d d d d
        b d d d d 4 4 d d d 4 4 d d d 4 4 d d d d d d d d d d d d d d 4 4 d d d 4 4 d d d 4 4 d d d d d
        b d d d d 4 4 d d d 4 4 d d d 4 4 d d d d d 8 d d 8 d d d d d 4 4 d d d 4 4 d d d 4 4 d d d d d
        . b d d d d d d d d d d d d d d d d d d d d d 8 8 d d d d d d d d d d d d d d d d d d d d d d .
        . . . . . . d d . . . . . . . d d . . . . . d d d d . . . . . d d . . . . . . . d d . . . . . .
        . . . . . . d d . . . . . . . d d . . . . . d 8 8 d . . . . . d d . . . . . . . d d . . . . . .
        . . . . b 6 6 6 6 c . . . b 6 6 6 6 c . . . d 8 8 d . . . b 6 6 6 6 c . . . b 6 6 6 6 c . . . .
        . . . . . . . . . . . . . . . . . . . . . . d d d d . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . 6 2 2 6 . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . 2 d d 2 . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . d 2 2 d . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . 2 d d 2 . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . 2 2 . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    `;

    private readonly interval: number;

    constructor(mov: Movement) {
        super(BomberPlane.image, mov, 20);
        this.sprite.z = 8; // below the clouds
        this.shoot();
        this.interval = setInterval(() => {
            this.shoot();
        }, 800);
    }

    public shoot(): void {
        let projectile = sprites.createProjectileFromSprite(BomberPlane.projectileImage, this.sprite, 0, 100);
        projectile.setKind(SpriteKind.EnemyProjectile);

        projectile = sprites.createProjectileFromSprite(BomberPlane.projectileImage, this.sprite, -50, 87);
        projectile.setKind(SpriteKind.EnemyProjectile);
        
        projectile = sprites.createProjectileFromSprite(BomberPlane.projectileImage, this.sprite, 50, 87);
        projectile.setKind(SpriteKind.EnemyProjectile);
    }

    public destroy() {
        clearInterval(this.interval);
    }

    public getScore(): number {
        return 100;
    }
}

class Frigate extends Ship implements Enemy {
    private readonly interval: number;
    private static readonly projectileImage: Image = img`
        5 4 5
        4 f 4
        5 4 5
    `;
    private static readonly image: Image = img`
        . . . . 1 . 1 . 1 . 1 . . . . .
        . . . . . 1 . 1 . 1 . . . . . .
        . . . . c c c c c c c . . . . .
        . . . . c 6 6 6 6 6 c . . . . .
        . . . . c 6 e e e 6 c . . . . .
        . . . . c 6 e e e 6 c . . . . .
        . . . . c 6 b b b 6 c . . . . .
        . . . . c 6 b f b 6 c . . . . .
        . . . . c 6 b f b 6 c . . . . .
        . . . . c 6 b b b 6 c . . . . .
        . . . . c 6 8 8 8 6 c . . . . .
        . . . . c 6 6 6 6 6 c . . . . .
        . . . . c c 6 6 6 c c . . . . .
        . . . . . c 6 6 6 c . . . . . .
        . . . . . c 6 6 6 c . . . . . .
        . . . . . . c c c . . . . . . .
    `;

    constructor(mov: Movement) {
        super(Frigate.image, mov);
        this.interval = setInterval(() => {
            this.shoot();
        }, 3000);
    }

    private shoot(): void {
        const dx: number = player.getSprite().x - this.sprite.x;
        const dy: number = player.getSprite().y - this.sprite.y;
        const a = Math.atan(dy/dx);

        const v = 30;
        const vx = v * Math.cos(a) * Math.sign(dx);
        const vy = v * Math.sin(a) * Math.sign(dx);
        const projectile = sprites.createProjectileFromSprite(Frigate.projectileImage, this.sprite, vx, vy)
        projectile.setKind(SpriteKind.EnemyProjectile)
    }

    public destroy() {
        clearInterval(this.interval);
    }

    public getScore() {
        return 20;
    }
}

class BattleShip extends Ship implements Enemy {
    private readonly interval: number;
    private static readonly projectileImage: Image = img`
        5 4 5
        4 f 4
        5 4 5
    `;
    private static readonly image: Image = img`
        . . . . . . . . 1 . 1 . 1 . . . . . . . . . . . . . . 1 . 1 . 1 . . . . . . . .
        . . . . . . . 1 . 1 . 1 . 1 . . . . . . . . . . . . 1 . 1 . 1 . 1 . . . . . . .
        . . . . . . . . 1 . 1 . 1 . . . . . . . . . . . . . . 1 . 1 . 1 . . . . . . . .
        . . . . . . . 1 . 1 . 1 . 1 . . . . . . . . . . . . 1 . 1 . 1 . 1 . . . . . . .
        . . . . . . . . 1 . 1 . 1 . . . . . . . . . . . . . . 1 . 1 . 1 . . . . . . . .
        . . . . . . . 1 . 1 . 1 . 1 . . . . . . . . . . . . 1 . 1 . 1 . 1 . . . . . . .
        . . . . . . . . 1 . 1 . 1 . . . . . . . . . . . . . . 1 . 1 . 1 . . . . . . . .
        . . . . . . . 1 . 1 . 1 . 1 . . . . . . . . . . . . 1 . 1 . 1 . 1 . . . . . . .
        . . . . . . . . 1 . 1 . 1 . . . . . . . . . . . . . . 1 . 1 . 1 . . . . . . . .
        . . . 1 . . . 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 . . 1 . . . .
        . . . . . 1 6 6 d 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 d 6 6 1 . . . . .
        . . . . . . 6 6 d d d d d d d d d d d d d d d d d d d d d d d d 6 6 . . . . . .
        . . . . 1 . 6 6 d 6 6 c b b b b b b b b b b b b b b b b c 6 6 d 6 6 . 1 . . . .
        . . . . . 1 6 6 d 6 6 c d d d d d f f d d f f d d d d d c 6 6 d 6 6 1 . . . . .
        . . . . . . 6 6 d 6 6 c d d d d d d d d d d d d d d d d c 6 6 d 6 6 . . . . . .
        . . . . 1 . 6 6 d 6 6 c d d 2 d d 1 1 1 1 1 1 d d 2 d d c 6 6 d 6 6 . 1 . . . .
        . . . 1 . 1 6 6 d 6 6 c d d d d 1 d d d d d d 1 d d d d c 6 6 d 6 6 1 . 1 . . .
        . . . . 1 6 6 6 d 6 6 c d d d 1 d d d d d d d d 1 d d d b c 6 6 d 6 6 1 . . . .
        . . . . . 6 6 d 6 6 c b d d 1 d d d 1 d d 1 d d d 1 d d b c 6 6 d 6 6 . . . . .
        . . . 1 . 6 6 d 6 6 c b d d 1 d d d 1 d d 1 d d d 1 d d d c 6 6 d 6 6 . 1 . . .
        . . . . 1 6 6 d 6 6 c d d d 1 d d d 1 1 1 1 d d d 1 d d d c 6 6 d 6 6 1 . . . .
        . . . . . 6 6 d 6 6 c d d d 1 d d d 1 1 1 1 d d d 1 d d d c 6 6 d 6 6 . . . . .
        . . . 1 . 6 6 d 6 6 c d f d 1 d d d 1 d d 1 d d d 1 d f d c 6 6 d 6 6 . 1 . . .
        . . . . 1 6 6 d 6 6 c d f d 1 d d d 1 d d 1 d d d 1 d f d c 6 6 d 6 6 1 . . . .
        . . . . . 6 6 d 6 6 c d d d d 1 d d d d d d d d 1 d d d d c 6 6 d 6 6 . . . . .
        . . . 1 . 6 6 d 6 6 c d d d d d 1 d d d d d d 1 d d d d d c 6 6 d 6 6 . 1 . . .
        . . . . 1 6 6 d 6 6 c d d d 2 d d 1 1 1 1 1 1 d d 2 d d d c 6 6 d 6 6 1 . . . .
        . . 1 . 6 6 6 d 6 6 c d d d d d d d d d d d d d d d d d d c 6 6 d 6 6 6 . 1 . .
        . . . 1 6 6 d 6 6 c b d d a b b b b b b b b b b b b 6 d d b c 6 6 d 6 6 1 . . .
        . . . . 6 6 d 6 6 c b d a b b b b b b b b b b b b b b 6 d b c 6 6 d 6 6 . . . .
        . . 1 . 6 6 d 6 6 c d d a b 3 1 3 b b b b b b 3 1 3 b 6 d d c 6 6 d 6 6 . 1 . .
        . . . 1 6 6 d 6 6 c d d a b 1 1 1 b b 2 2 b b 1 1 1 b 6 d d c 6 6 d 6 6 1 . . .
        . . . . 6 6 d 6 6 c d d a b 3 1 3 b b b b b b 3 1 3 b 6 d d c 6 6 d 6 6 . . . .
        . . 1 . 6 6 d 6 6 c d d a b b b b b 1 b 1 b b b b b b 6 d d c 6 6 d 6 6 . 1 . .
        . . . 1 6 6 d 6 6 c d d a b b 2 b b b 1 b 1 b b 2 b b 6 d d c 6 6 d 6 6 1 . . .
        . . . . 6 6 d 6 6 c d d a b b 2 b b 1 b 1 b b b 2 b b 6 d d c 6 6 d 6 6 . . . .
        . . 1 . 6 6 d 6 6 c d d a b b b b b b 1 b 1 b b b b b 6 d d c 6 6 d 6 6 . 1 . .
        . . . 1 6 6 d 6 6 c d d a b 3 7 3 b b b b b b 3 7 3 b 6 d d c 6 6 d 6 6 1 . . .
        . . . . 6 6 d 6 6 c d d a b 7 7 7 b b 2 2 b b 7 7 7 b 6 d d c 6 6 d 6 6 . . . .
        . . 1 . 6 6 d 6 6 c d d a b 3 7 3 b b b b b b 3 7 3 b 6 d d c 6 6 d 6 6 . 1 . .
        . . . 1 6 6 d 6 6 c d d a b b b b b b b b b b b b b b 6 d d c 6 6 d 6 6 1 . . .
        . . . . 6 6 d 6 6 c d d d a b b b b b b b b b b b b 6 d d d c 6 6 d 6 6 . . . .
        . . 1 . 6 6 d 6 6 c d 7 d d d d d d d d d d d d d d d d 7 d c 6 6 d 6 6 . 1 . .
        . . . 1 6 6 d 6 6 c d d d d d f d f d f d f d f d f d d d d c 6 6 d 6 6 1 . . .
        . . . . 6 6 d 6 6 c d e 4 d f d f d f d f d f d f d d e 4 d c 6 6 d 6 6 . . . .
        . . . . 6 6 d 6 6 c d e e d d f d f d f d f d f d f d e 4 d c 6 6 d 6 6 . . . .
        . . 1 . 6 6 d 6 6 c d e 4 d f d f d f d f d f d f d d e e d c 6 6 d 6 6 . 1 . .
        . . . 1 6 6 d 6 6 c d e 4 d d f d f d f d f d f d f d e 4 d c 6 6 d 6 6 1 . . .
        . . . . 6 6 d 6 6 c d e 4 d d d d d d d d d d d d d d e 4 d c 6 6 d 6 6 . . . .
        . . 1 . 6 6 d 6 6 c d e 4 d d a b b b b b b b b 6 d d e 4 d c 6 6 d 6 6 . 1 . .
        . . . 1 6 6 d 6 6 c d e e d a b 6 6 6 6 6 6 6 6 b 6 d e e d c 6 6 d 6 6 1 . . .
        . . . . 6 6 d 6 6 c d e 4 d a b 6 6 6 6 6 6 6 6 b 6 d e 4 d c 6 6 d 6 6 . . . .
        . . 1 . 6 6 d 6 6 c d e 4 d a b 6 f f 6 6 f f 6 b 6 d e 4 d c 6 6 d 6 6 . 1 . .
        . . . . 6 6 d 6 6 c d e 4 d a b 6 f f 6 6 f f 6 b 6 d e 4 d c 6 6 d 6 6 . . . .
        . . . 1 6 6 d 6 6 c d e e d a b b f f b b f f b b 6 d e e d c 6 6 d 6 6 1 . . .
        . . 1 . 6 6 d 6 6 c d e 4 d a b b f f b b f f b b 6 d e 4 d c 6 6 d 6 6 . 1 . .
        . 1 . 1 6 6 d 6 6 c d e 4 d a b b f f b b f f b b 6 d e 4 d c 6 6 d 6 6 1 . 1 .
        . . 1 . 6 6 d 6 6 c d e 4 d a b b 2 2 b b 2 2 b b 6 d e 4 d c 6 6 d 6 6 . 1 . .
        . 1 . 1 6 6 d 6 6 c d e e d a b b b b b b b b b b 6 d e e d c 6 6 d 6 6 1 . 1 .
        . . 1 . 6 6 d 6 6 c d e 4 d a b 8 8 8 8 8 8 8 8 b 6 d e 4 d c 6 6 d 6 6 . 1 . .
        . 1 . 1 6 6 d 6 6 c d e 4 d d a b b b b b b b b 6 d d e 4 d c 6 6 d 6 6 1 . 1 .
        . . 1 . 6 6 d 6 6 c d e 4 d d d d d d d d d d d d d d e 4 d c 6 6 d 6 6 . 1 . .
        . 1 . 1 6 6 d 6 6 c d e e d d b d d a b b 6 d d b d d e e d c 6 6 d 6 6 1 . 1 .
        1 . 1 . 6 6 d 6 6 c d e 4 d d b d d b f f b d d b d d e 4 d c 6 6 d 6 6 . 1 . 1
        . 1 . 1 6 6 d 6 6 c d e 4 d d b d d b f f b d d b d d e 4 d c 6 6 d 6 6 1 . 1 .
        1 . 1 . 6 6 d 6 6 c d e 4 d d d d d a b b 6 d d d d d e 4 d c 6 6 d 6 6 . 1 . 1
        . 1 . 1 . 6 d 6 6 c d d d d d d d d d d d d d d d d d d d d c 6 6 d 6 . 1 . 1 .
        1 . 1 . 1 6 d 6 6 c b d d e 4 d b d a b b 6 d b d e 4 d d b c 6 6 d 6 1 . 1 . 1
        . 1 . 1 . 6 d 6 6 c b d d e e d b d b f f b d b d e e d d b c 6 6 d 6 . 1 . 1 .
        1 . 1 . 1 6 6 d 6 6 c d d e 4 d b d b f f b d b d e 4 d d c 6 6 d 6 6 1 . 1 . 1
        . 1 . 1 . 6 6 d 6 6 c d d e e d d d a b b 6 d d d e e d d c 6 6 d 6 6 . 1 . 1 .
        . . 1 . 1 . 6 d 6 6 c b d e 4 d d d d d d d d d d e 4 d b c 6 6 d 6 . 1 . 1 . .
        . . . 1 . 1 6 6 d 6 6 c d d d d d d d d d d d d d d d d c 6 6 d 6 6 1 . 1 . . .
        . . . . 1 . 6 6 d 6 6 c b d d b f b d a b d b f b d d b c 6 6 d 6 6 . 1 . . . .
        . . . . . 1 . 6 d 6 6 c b d d d d d d a b d d d d d d b c 6 6 d 6 . 1 . . . . .
        . . . . 1 . 1 6 6 d 6 6 c d d d d d d d d d d d d d d c 6 6 d 6 6 1 . 1 . . . .
        . . . . . 1 . 6 6 d 6 6 c b d d d d d d d d d d d d b c 6 6 d 6 6 . 1 . . . . .
        . . . . . . 1 . 6 6 d 6 6 c d d d b d a b d b d d d c 6 6 d 6 6 . 1 . . . . . .
        . . . . . . . . 6 6 d 6 6 c b d d d d a b d d d d b c 6 6 d 6 6 . . . . . . . .
        . . . . . . . 1 . 6 6 d 6 6 c d d d d d d d d d d c 6 6 d 6 6 . 1 . . . . . . .
        . . . . . . . . . 6 6 d 6 6 c b d d d d d d d d b c 6 6 d 6 6 . . . . . . . . .
        . . . . . . . . 1 . 6 6 d 6 6 c d d d b b d d d c 6 6 d 6 6 . 1 . . . . . . . .
        . . . . . . . . . . 6 6 d 6 6 c b d d d d d d b c 6 6 d 6 6 . . . . . . . . . .
        . . . . . . . . . 1 . 6 6 d 6 6 c d d b b d d c 6 6 d 6 6 . 1 . . . . . . . . .
        . . . . . . . . . . . 6 6 d d 6 c b d d d d b c 6 6 d 6 6 . . . . . . . . . . .
        . . . . . . . . . . 1 . 6 6 d 6 6 c d d d d c 6 6 d 6 6 . 1 . . . . . . . . . .
        . . . . . . . . . . . . 6 6 d 6 6 c b d d b c 6 6 d 6 6 . . . . . . . . . . . .
        . . . . . . . . . . . 1 . 6 6 d 6 6 c d d c 6 6 d 6 6 . 1 . . . . . . . . . . .
        . . . . . . . . . . . . . 6 6 d 6 6 c b b c 6 6 d 6 6 . . . . . . . . . . . . .
        . . . . . . . . . . . . 1 . 6 6 d 6 6 c c 6 6 d 6 6 . 1 . . . . . . . . . . . .
        . . . . . . . . . . . . . . 6 6 d 6 6 c c 6 6 d 6 6 . . . . . . . . . . . . . .
        . . . . . . . . . . . . . 1 . 6 6 d 6 6 6 6 d 6 6 . 1 . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . 6 6 d 6 6 6 6 d 6 6 . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . 1 . 6 6 d 6 6 d 6 6 . 1 . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . 6 6 d 6 6 d 6 6 . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . 1 . 6 6 d d 6 6 . 1 . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . 6 6 d d 6 6 . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . 6 6 6 6 . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . 6 6 6 6 . . . . . . . . . . . . . . . . . .
    `;

    constructor(mov: Movement) {
        super(BattleShip.image, mov, 40);
        this.interval = setInterval(() => {
            this.shoot();
        }, 5000);
    }

    private shoot(): void {
        const dx: number = player.getSprite().x - this.sprite.x;
        const dy: number = player.getSprite().y - this.sprite.y;
        const a = Math.atan(dy / dx);

        const v = 100;
        const vx = v * Math.cos(a) * Math.sign(dx);
        const vy = v * Math.sin(a) * Math.sign(dx);
        const projectile = sprites.createProjectileFromSprite(BattleShip.projectileImage, this.sprite, vx, vy)
        projectile.setKind(SpriteKind.EnemyProjectile)
    }

    public destroy() {
        clearInterval(this.interval);
    }

    public getScore() {
        return 300;
    }
}

class Cloud extends BaseObject implements Element {
    private static readonly cloud1: Image = img`
        . . . . d 1 1 1 . . . . . . . 1 1 1 1 . . d 1 1 1 . . . . . . .
        . . . . 1 1 1 1 1 . . . . . d 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . .
        . . d 1 1 1 1 1 1 1 . 1 1 1 d 1 1 d 1 1 1 1 1 1 1 1 1 1 1 1 . .
        . d 1 1 1 d d 1 1 1 d 1 1 1 1 1 1 1 1 1 1 1 1 d d 1 1 1 1 1 1 .
        . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d 1 1 d 1 1 1 1 1 .
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 d d d d 1 1 1 1 1 1 1 1 1 1 1 1 1 .
        1 1 1 1 1 1 1 1 1 1 1 1 1 d 1 1 1 1 d 1 1 1 1 1 1 1 1 1 1 1 . .
        1 1 1 1 d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . .
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d 1 1 1 1 1 d 1 1 1 . . .
        . 1 1 1 1 1 1 1 1 d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . .
        . . 1 1 d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . .
        . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d 1 1 1 1 1 1 1 1 1 1 . . . .
        . . . . 1 1 1 1 1 1 1 1 1 1 d 1 1 1 1 1 1 1 . . . . . . . . . .
        . . . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . . . . . . . . .
        . . . . . . . . 1 1 1 1 1 1 1 1 1 1 . . . . . . . . . . . . . .
    `;
    private static readonly cloud2: Image = img`
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . 1 1 1 1 1 d . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 d . . . . .
        . . . . . . . . . . . . d d d . . . . . . . . . . . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . .
        . . . . . . . . . . 1 1 1 1 1 1 1 . . . . . . . . . d 1 1 1 1 1 1 1 1 1 1 1 1 1 . . 1 1 1 1 1 1 . .
        . . . . . . . . . . 1 1 1 1 1 1 1 . . . . . . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . .
        . . . . . . . . . . 1 1 1 1 1 1 1 . . 1 1 d . . . . 1 1 1 1 d 1 1 1 1 d . 1 1 1 1 d 1 d 1 1 d 1 1 .
        . . . . . . d . . . . . 1 1 1 1 1 1 1 1 1 1 d . . . 1 1 1 d 1 d 1 1 1 1 . 1 1 1 d 1 1 1 1 . 1 d 1 .
        . . . . . 1 1 1 d . . . 1 1 . . 1 1 1 1 1 1 1 d . . 1 1 1 1 1 1 1 1 1 d . 1 1 1 1 1 1 . . . 1 1 1 .
        . . . . 1 1 1 1 1 1 1 1 1 1 . . 1 1 1 1 1 1 1 1 . . . 1 1 1 1 1 1 1 1 d . 1 1 1 1 1 1 . . 1 1 1 1 .
        . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . 1 1 1 1 1 1 1 1 . . 1 1 1 1 1 1 1 1 1 1 1 1 .
        . . 1 1 1 1 1 1 1 1 d d 1 1 1 1 1 d d d 1 1 1 1 1 . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d 1 d 1 1 1 1 .
        . . 1 1 1 1 d d 1 1 1 1 1 1 1 1 . . . 1 1 1 1 1 1 1 . . . d 1 1 1 1 1 1 1 . . 1 d 1 1 1 1 1 1 1 1 .
        . . 1 1 1 . . 1 1 1 1 1 1 1 1 . . . . 1 1 1 1 1 1 1 d . . . 1 1 1 1 1 1 . . . 1 1 1 1 1 1 1 d 1 1 .
        . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . 1 1 1 1 1 1 1 1 d . . . d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . .
        . . 1 1 1 1 1 1 1 d 1 1 1 d d 1 1 1 1 1 1 1 1 1 1 1 1 . . . . . . 1 1 1 d . . . . . . . . . . . . .
        . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . 1 1 1 d d d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . 1 1 1 1 1 1 1 1 1 . . 1 1 1 1 1 1 1 1 1 d . . . . . 1 d d d . . . . . . . . . . . . . . . . . . .
        . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d d 1 1 1 . . . . 1 1 1 1 1 1 1 1 1 1 1 d . . . . . . . . . . . . .
        . . . . . 1 1 1 1 1 1 1 . . . 1 1 1 1 1 1 . . . . 1 1 1 1 1 d 1 1 1 1 1 1 1 . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . 1 1 1 1 . . . . 1 1 1 1 1 . . d 1 1 1 1 1 1 d . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . 1 1 d 1 1 1 1 1 1 1 1 1 1 1 1 1 d . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . d 1 1 1 1 1 1 1 1 1 1 . . d 1 1 1 1 . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 1 1 1 1 1 1 1 1 1 d 1 1 1 d . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 1 1 1 1 . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    `;

    constructor(mov: Movement, cloud: number) {
        super(cloud === 1 ? Cloud.cloud1 : Cloud.cloud2, mov);
        this.sprite.setFlag(SpriteFlag.Ghost, true);
        this.sprite.z = 10;
    }
}

sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (projectile, enemiesprite) {
    const plane = Enemies.fromSprite(enemiesprite);
    if (plane) {
        plane.gotHitBy(projectile);
    }
})

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// onStart
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

light.setBrightness(7);
light.setLength(5);
scene.setBackgroundColor(9);
const player = new Player();

const powerUp = new PowereUp(img`
    . . . . . . . .
    . . 7 7 7 7 7 .
    . 7 7 1 1 1 7 7
    . 7 7 1 7 1 7 7
    . 7 7 1 1 1 7 7
    . 7 7 1 7 7 7 7
    . 7 7 1 7 7 7 7
    . . 7 7 7 7 7 .
`, SpriteKind.Powerup, 3000, 50);
const bombPowerUp = new PowereUp(img`
    . 6 6 6 6 . . c
    6 6 6 6 6 6 c .
    . b b b b . . c
`, SpriteKind.BombPowerup, 10000, 50);
const lifePowerUp = new PowereUp(img`
    . 2 2 . . 2 2 .
    2 2 2 2 2 2 3 2
    2 2 2 2 2 3 2 2
    c 2 2 2 2 2 2 2
    . c 2 2 2 2 2 .
    . . c 2 2 2 . .
    . . . c 2 . . .
`, SpriteKind.LifePowerup, 10000, 40);

const storyBook = new StoryBook();
storyBook.play();


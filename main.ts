namespace SpriteKind {
    export const Powerup = SpriteKind.create()
    export const BombPowerup = SpriteKind.create()
    export const LifePowerup = SpriteKind.create()
    export const EnemyProjectile = SpriteKind.create()
}

enum Direction { UP, LEFT, DOWN, RIGHT };

function transpose(img: Image): Image {
    const result = image.create(img.height, img.width);
    for (let x = 0; x < img.width; x++) {
        for (let y = 0; y < img.height; y++) {
            result.setPixel(y, x, img.getPixel(x, y));
        }
    }
    return result;
}

function rotateImage(img: Image, deg: number): Image {
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

function rotate(img: Image, direction: Direction): Image {
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

function isShip(toBeDetermined: Enemy): toBeDetermined is Ship {
    return toBeDetermined instanceof Ship;
}

class Elements {
    public static cloud1 = (mov: Movement) => new Cloud(mov, 1);
    public static cloud2 = (mov: Movement) => new Cloud(mov, 2);
}

class Enemies {
    private static enemies: Enemy[] = [];

    private static register(enemy: Enemy): void {

        Enemies.enemies.push(enemy);
        
        enemy.getSprite().onDestroyed(() => {
            enemy.destroy();
            Enemies.enemies = Enemies.enemies.filter(
                p => p.getSprite().id !== enemy.getSprite().id
            );
        });
        
    }

    public static fromSprite(sprite: Sprite): Enemy {
        return Enemies.enemies.find(e => e.getSprite().id === sprite.id);
    }

    public static redPlane = (mov: Movement) => Enemies.register(new RedPlane(mov));
    public static greenPlane = (mov: Movement) => Enemies.register(new GreenPlane(mov));
    public static grayPlane = (mov: Movement) => Enemies.register(new GrayPlane(mov));
    public static bigPlane = (mov: Movement) => Enemies.register(new BigPlane(mov));
    public static bomberPlane = (mov: Movement) => Enemies.register(new BomberPlane(mov));
    public static frigate = (mov: Movement) => Enemies.register(new Frigate(mov));
    public static battleShip = (mov: Movement) => Enemies.register(new BattleShip(mov));

    public static destroyAll(sprite: Sprite): void {
        Enemies.enemies.forEach((enemy: Enemy) => {
            enemy.gotHitBy(sprite);
        });
        sprites.allOfKind(SpriteKind.EnemyProjectile).forEach((projectile: Sprite) => {
            projectile.destroy();
        });
    }
}

class Player {
    private static readonly maxLifes = 5;
    private hits = 0
    private bombs = 0;
    private weaponLevel = 1
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
        . . 4 . . 4 . . 4 . . . . . . .
        . 9 9 9 4 8 e 9 9 9 . . . . . .
        . . 4 . 4 8 e . 4 . . . . . . .
        4 4 4 4 4 4 4 4 4 4 e . . . . .
        4 e e e e 4 b b b b e . . . . .
        6 4 4 4 4 4 4 4 4 4 6 . . . . .
        . . 4 e . . . 4 e . . . . . . .
        . . 4 e . . . 4 e . . . . . . .
        . . 4 e . . . 4 e . . . . . . .
        . 4 4 4 . . . 4 4 e . . . . . .
        . 3 4 2 e e e 2 4 3 . . . . . .
        4 4 4 4 4 4 4 4 4 4 e . . . . .
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
        . . . . . . 9 9 9 4 8 e 9 9 9 .
        . . . . . . . 4 . 4 8 e . 4 . .
        . . . . . 3 4 4 4 4 4 4 4 4 4 4
        . . . . . 3 e e e e 4 b b b b e
        . . . . . 6 4 4 4 4 4 4 4 4 4 6
        . . . . . . . 4 e . . . 4 e . .
        . . . . . . . 4 e . . . 4 e . .
        . . . . . . . 4 e . . . 4 e . .
        . . . . . . 4 4 4 . . . 4 4 e .
        . . . . . . 3 4 2 e e e 2 4 3 .
        . . . . . 3 4 4 4 4 4 4 4 4 4 4
        . . . . . . . 4 e . . . 4 e . .
    `;

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
            if (controller.left.isPressed()) {
                this.sprite.setImage(Player.planeLeft);
            } else if (controller.right.isPressed()) {
                this.sprite.setImage(Player.planeRight);
            } else {
                this.sprite.setImage(Player.planeStraight);
            }
        });

        sprites.onOverlap(SpriteKind.EnemyProjectile, SpriteKind.Player, function (enemyProjectile, playerSprite) {
            this.gotHit(enemyProjectile)
        });

        sprites.onOverlap(SpriteKind.Powerup, SpriteKind.Player, function (powerUpSprite, playerSprite) {
            this.weaponLevel = Math.min(this.weaponLevel + 1, 4);
            powerUp.caught();
        });

        sprites.onOverlap(SpriteKind.BombPowerup, SpriteKind.Player, function (powerUpSprite, playerSprite) {
            this.bombs = Math.min(this.bombs + 1, 3);
            this.drawBombs();
            bombPowerUp.caught();
        });
        sprites.onOverlap(SpriteKind.LifePowerup, SpriteKind.Player, function (lifeUpSprite, playerSprite) {
            info.setLife(Math.min(info.life() + 1, Player.maxLifes));
            this.showLifeLights();
            lifePowerUp.caught();
        });

        sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (enemySprite, playerSprite) {
            const enemy = Enemies.fromSprite(enemySprite);
            if (isShip(enemy)) {
                // no collision with a ship
                return;
            }
            this.gotHit();
            scene.cameraShake(3, 500);
            enemy.gotHitBy();
            const pushedBy: number = 30;
            switch (enemy.getMovement().direction) {
                case Direction.DOWN:
                    playerSprite.y += pushedBy;
                    break;
                case Direction.UP:
                    playerSprite.y -= pushedBy;
                    break;
                case Direction.LEFT:
                    playerSprite.x -= pushedBy;
                    break;
                case Direction.RIGHT:
                    playerSprite.x += pushedBy;
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
        this.sprite.startEffect(effects.spray, 200)
        if (otherSprite) {
            otherSprite.destroy(effects.fire, 100)
        }
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (projectile, enemiesprite) {
    const plane = Enemies.fromSprite(enemiesprite);
    if (plane) {
        plane.gotHitBy(projectile);
    }
})

/*
game.onUpdateInterval(5000, function () {
    if (Math.percentChance(10)) {
        const island = sprites.create(img`
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . b d b d . . . . d b . . . . . . . . .
            . . . . . . . . . . . d d d d d d b d d b d d d d . . . . . . .
            . . . . . . . b d b d b d d d d d d d d d d d d b . . . . . . .
            . . . . . . d d d d 7 6 7 6 7 7 d d d d d d d d d b . . . . . .
            . . . . . b d d 7 7 7 7 6 7 7 7 7 d d d d d d d d d d . . . . .
            . . . . b d d 7 7 7 6 7 7 7 6 7 7 7 d d d d 7 7 7 d d b . . . .
            . . . . d d 7 7 7 6 6 7 e 7 7 7 6 7 d d d d 7 7 7 7 d d d . . .
            . . . . d d 7 7 6 7 7 7 7 6 7 6 7 7 7 d d d 7 a 7 a d d d d . .
            . . . b d d 7 7 e 7 5 6 7 7 7 7 7 d d d d d 7 7 a 7 7 7 d d . .
            . . b d d d 7 7 5 6 7 4 7 6 6 8 8 8 8 d d d d 7 7 7 7 7 7 b . .
            . . d d 7 7 7 e 7 7 6 7 7 7 8 9 8 9 8 8 d d d 7 7 7 7 7 7 d . .
            . . b d 7 7 7 7 7 7 7 6 7 7 8 8 9 8 9 8 8 d d 7 5 7 7 7 7 d . .
            . . b d 7 7 7 6 7 6 7 7 7 7 8 9 8 9 8 9 8 d d 7 7 a 7 a d d . .
            . . d d 7 7 7 7 7 7 7 7 7 d d 8 8 8 8 8 d d d 7 5 7 a 7 d b . .
            . . b d 7 7 7 7 7 7 7 7 d d d d d d d d d d d 7 7 7 7 7 d d . .
            . . . d d d d d d d d d 2 2 d d d 2 2 d d d d 7 7 a 7 a d d . .
            . . . b d d d d d d d 2 2 2 d d 2 2 2 d d d d 7 7 7 a 7 d b . .
            . . . b d d 7 7 7 7 7 2 2 d d d 2 2 d d d d d 7 7 a 7 a d d . .
            . . . d d d 6 6 7 7 6 6 6 6 7 d d d d d d d d d 7 7 7 7 d d . .
            . . . b d d 6 6 6 6 6 6 6 6 6 6 7 d d d d d d d 7 7 7 d d b . .
            . . . . . d d 7 6 6 7 6 7 6 6 6 6 7 d d d e e d d d d d d d . .
            . . . . . b d 7 6 6 7 6 a 6 6 7 6 7 6 6 e e e d d 6 d d b . . .
            . . . . . b d 7 6 6 6 6 6 6 6 6 6 6 6 6 e e d 6 6 6 d . b . . .
            . . . . . d b d 7 7 7 6 6 6 6 6 6 6 6 d d d 6 6 d d d . . . . .
            . . . . . . . . d d 7 7 6 6 6 6 6 6 6 d d d 6 d d d b . . . . .
            . . . . . . . . b d d d d 7 7 7 7 7 7 d d d d d d b . . . . . .
            . . . . . . . . d b d d d d d d d d d d d d d d . . . . . . . .
            . . . . . . . . . . . d b d b d b d d b d d b d . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        `, SpriteKind.Food);
        island.setPosition(Math.randomRange(10, 100), -10);
        island.setVelocity(0, 5);
        island.setFlag(SpriteFlag.Ghost | SpriteFlag.AutoDestroy, true);
        island.z = -2;
    }
})


game.onUpdateInterval(3000, function () {
    const cloud = sprites.create(img`
        . . . . . . . 1 1 1 d . . 1 1 1 1 . . . . . . . 1 1 1 d . . . .
        . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 d . . . . . 1 1 1 1 1 . . . .
        . . 1 1 1 1 1 1 1 1 1 1 1 1 d 1 1 d 1 1 1 . 1 1 1 1 1 1 1 d . .
        . 1 1 1 1 1 1 d d 1 1 1 1 1 1 1 1 1 1 1 1 d 1 1 1 d d 1 1 1 d .
        . 1 1 1 1 1 d 1 1 d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
        . 1 1 1 1 1 1 1 1 1 1 1 1 1 d d d d 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        . . 1 1 1 1 1 1 1 1 1 1 1 d 1 1 1 1 d 1 1 1 1 1 1 1 1 1 1 1 1 1
        . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d 1 1 1 1
        . . . 1 1 1 d 1 1 1 1 1 d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d 1 1 1 1 1 1 1 1 .
        . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d 1 1 . .
        . . . . 1 1 1 1 1 1 1 1 1 1 d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . .
        . . . . . . . . . . 1 1 1 1 1 1 1 d 1 1 1 1 1 1 1 1 1 1 . . . .
        . . . . . . . . . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . . .
        . . . . . . . . . . . . . . 1 1 1 1 1 1 1 1 1 1 . . . . . . . .
    `, SpriteKind.Food);

    cloud.setPosition(Math.randomRange(6, 100), -6);
    cloud.setVelocity(0, Math.randomRange(15, 20));
    cloud.setFlag(SpriteFlag.Ghost | SpriteFlag.AutoDestroy, true);
    cloud.z = 10;
})
*/

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

interface Event {
    t: number;
    createElement(): void;
}

interface EventProps {
    t: number;
    v: number;
    delay?: number,
    pos: number,
    offset?: number,
    direction?: Direction;
    element: (mov: Movement) => void
}

class Ticks {
    private t: number = 0;

    constructor() { }

    public plus(t: number): number {
        return this.t += t;
    }
}

class StoryBook {
    private storyBook: Event[];

    private setup() {
        this.storyBook = [];
        const halfWidth: number = scene.screenWidth() / 2;
        const halfHeight: number = scene.screenHeight() / 2;

        const t = new Ticks();
        for (let i = 0; i < 1; i++) {

            this.add(1, { t: t.plus(10), v: 30, pos: 120, element: Elements.cloud1 });
            this.add(1, { t: t.plus(0), v: 40, pos: 10, direction: Direction.LEFT, element: Enemies.greenPlane});
            this.add(1, { t: t.plus(10), v: 35, pos: 60, element: Elements.cloud1 });
            this.add(1, { t: t.plus(10), v: 40, pos: 30, direction: Direction.RIGHT, element: Enemies.greenPlane });
            this.add(1, { t: t.plus(0), v: 30, pos: 60, element: Elements.cloud2 });
            this.add(1, { t: t.plus(0), v: 35, pos: 20, element: Elements.cloud1 });
            this.add(1, { t: t.plus(5), v: 25, pos: 120, element: Elements.cloud1 });
            this.add(1, { t: t.plus(15), v: 60, pos: 70, direction: Direction.RIGHT, element: Enemies.redPlane});
            this.add(1, { t: t.plus(0), v: 60, pos: 90, direction: Direction.LEFT, element: Enemies.redPlane });
            this.add(1, { t: t.plus(20), v: 35, pos: 20, element: Elements.cloud1 });
            this.add(1, { t: t.plus(10), v: 25, pos: 60, element: Elements.cloud1 });
            
            this.add(1, { t: t.plus(10), v: 80, pos: 40, direction: Direction.LEFT, element: Enemies.grayPlane});
            this.add(1, { t: t.plus(10), v: 80, pos: 60, direction: Direction.RIGHT, element: Enemies.grayPlane });
            this.add(1, { t: t.plus(0), v: 30, pos: 120, element: Elements.cloud1 });
            this.add(1, { t: t.plus(15), v: 30, pos: 40, element: Elements.cloud2 });
            this.add(1, { t: t.plus(5), v: 35, pos: 60, direction: Direction.DOWN, element: Enemies.bigPlane});

            this.add(2, { t: t.plus(20), v: 30, pos: 130, offset: -60, delay: 10, element: Elements.cloud1 });
            this.add(3, { t: t.plus(10), v: 50, pos: 50, direction: Direction.LEFT, element: Enemies.greenPlane});
            this.add(2, { t: t.plus(0), v: 23, pos: 100, offset: -60, delay: 10, element: Elements.cloud1 });
            this.add(1, { t: t.plus(30), v: 23, pos: halfWidth, offset: -60, delay: 10, element: Elements.cloud1 });
            this.add(4, { t: t.plus(0), delay: 2, v: 80, pos: 10, offset: 10, direction: Direction.RIGHT, element: Enemies.redPlane});

            this.add(3, { t: t.plus(15), v: 15, pos: 30, offset: 50, delay: 10, element: Elements.cloud2 });
            this.add(3, { t: t.plus(15), delay: 6, v: 30, pos: 40, offset: 20, direction: Direction.DOWN, element: Enemies.bigPlane});
            this.add(3, { t: t.plus(15), v: 15, pos:50, offset: 45, delay: 6, element: Elements.cloud2 });
            this.add(4, { t: t.plus(10), delay: 4, v: 30, pos: 120, offset: 0, direction: Direction.DOWN, element: Enemies.greenPlane });

            this.add(2, { t: t.plus(40), v: 10, pos: 140, offset: -70, delay: 10, element: Elements.cloud1 });
            this.add(2, { t: t.plus(10), v: 12, pos: 30, offset: 90, delay: 10, element: Elements.cloud1 });

            this.add(1, { t: t.plus(0), v: 5, pos: 65, direction: Direction.DOWN, element: Enemies.frigate });
            this.add(1, { t: t.plus(10), v: 5, pos: 120, direction: Direction.DOWN, element: Enemies.frigate });
            this.add(2, { t: t.plus(70), v: 20, pos: 120, offset: 0, delay: 20, element: Elements.cloud1 });
            this.add(1, { t: t.plus(0), v: 5, pos: 20, element: Elements.cloud2 });
            this.add(1, { t: t.plus(30), v: 5, pos: 30, element: Elements.cloud2 });
            this.add(1, { t: t.plus(30), v: 15, pos: 30, direction: Direction.DOWN, element: Enemies.battleShip });

            this.add(2, { t: t.plus(15), v: 25, pos: 95, offset: 45, delay: 10, element: Elements.cloud1 });
            this.add(1, { t: t.plus(15), v: 60, pos: halfHeight, direction: Direction.LEFT, element: Enemies.redPlane });
            this.add(1, { t: t.plus(0), v: 60, pos: halfHeight, direction: Direction.RIGHT, element: Enemies.redPlane });
            this.add(1, { t: t.plus(0), v: 60, pos: halfWidth, direction: Direction.DOWN, element: Enemies.redPlane });
            this.add(1, { t: t.plus(0), v: 60, pos: halfWidth, direction: Direction.UP, element: Enemies.redPlane });

            this.add(3, { t: t.plus(0), v: 27, pos: 30, offset: 45, delay: 20, element: Elements.cloud1 });
            this.add(2, { t: t.plus(25), v: 40, pos: 70, direction: Direction.LEFT, element: Enemies.greenPlane });
            this.add(2, { t: t.plus(10), v: 40, pos: 30, direction: Direction.RIGHT, element: Enemies.greenPlane });
            this.add(1, { t: t.plus(10), v: 30, pos: 30, offset: 80, delay: 40, element: Elements.cloud1 });
            this.add(2, { t: t.plus(40), v: 40, pos: 70, direction: Direction.LEFT, element: Enemies.greenPlane });
            this.add(2, { t: t.plus(10), v: 40, pos: 30, direction: Direction.RIGHT, element: Enemies.greenPlane });
            this.add(4, { t: t.plus(0), v: 38, pos: 130, offset: -35, delay: 5, element: Elements.cloud1 });
            this.add(1, { t: t.plus(15), v: 27, pos: 50, element: Elements.cloud2 });
            this.add(6, { t: t.plus(15), v: 15, delay: 0, pos: 10, offset: 27, direction: Direction.DOWN, element: Enemies.greenPlane });
            this.add(5, { t: t.plus(10), v: 30, delay: 0, pos: 25, offset: 27, direction: Direction.DOWN, element: Enemies.redPlane });
            this.add(6, { t: t.plus(10), v: 80, delay: 0, pos: 10, offset: 27, direction: Direction.DOWN, element: Enemies.grayPlane });

            this.add(2, { t: t.plus(20), v: 8, pos: halfWidth - 15, offset: 25, delay: 5, element: Elements.cloud2 });
            this.add(1, { t: t.plus(15), v: 15, pos: halfWidth, direction: Direction.DOWN, element: Enemies.bomberPlane });

            this.add(3, { t: t.plus(100), v: 20, pos: 30, offset: 45, delay: 20, element: Elements.cloud1 });
            this.add(1, { t: t.plus(30), v: 20, pos: halfWidth, direction: Direction.UP, element: Enemies.bomberPlane });

            this.add(2, { t: t.plus(15), v: 20, pos: 95, offset: 45, delay: 10, element: Elements.cloud1 });
            this.add(2, { t: t.plus(20), v: 17, pos: 40, offset: 70, delay: 5, element: Elements.cloud1 });
            this.add(1, { t: t.plus(30), v: 20, pos: halfHeight, direction: Direction.LEFT, element: Enemies.greenPlane });
            this.add(1, { t: t.plus(0), v: 20, pos: halfHeight, direction: Direction.RIGHT, element: Enemies.greenPlane });
            this.add(1, { t: t.plus(0), v: 20, pos: halfWidth, direction: Direction.DOWN, element: Enemies.greenPlane });
            this.add(1, { t: t.plus(0), v: 20, pos: halfWidth, direction: Direction.UP, element: Enemies.greenPlane });


            this.add(1, { t: t.plus(0), v: 60, pos: halfHeight, direction: Direction.LEFT, element: Enemies.grayPlane });
            this.add(1, { t: t.plus(0), v: 60, pos: halfHeight, direction: Direction.RIGHT, element: Enemies.grayPlane });
            this.add(1, { t: t.plus(0), v: 60, pos: halfWidth, direction: Direction.DOWN, element: Enemies.grayPlane });
            this.add(1, { t: t.plus(0), v: 60, pos: halfWidth, direction: Direction.UP, element: Enemies.grayPlane });

            this.add(3, { t: t.plus(0), v: 15, pos: 30, offset: 50, delay: 10, element: Elements.cloud2 });

            this.add(1, { t: t.plus(30), v: 5, pos: 50, direction: Direction.UP, element: Enemies.frigate });
            this.add(2, { t: t.plus(0), v: 15, pos: 120, offset: -30, delay: 10, element: Elements.cloud2 });
            this.add(1, { t: t.plus(10), v: 5, pos: 100, direction: Direction.UP, element: Enemies.frigate });
            this.add(1, { t: t.plus(10), v: 15, pos: 30, element: Elements.cloud1 });

            this.add(4, { t: t.plus(40), v: 15, pos: 5, offset: 4, delay: 20, element: Elements.cloud1 });
            this.add(4, { t: t.plus(15), v: 15, pos: 140, offset: -7, delay: 20, element: Elements.cloud1 });
            this.add(2, { t: t.plus(25), v: 50, pos: 40, direction: Direction.LEFT, element: Enemies.greenPlane });
            this.add(3, { t: t.plus(0), v: 15, pos: 50, offset: 30, delay: 10, element: Elements.cloud2 });
            this.add(2, { t: t.plus(20), v: 50, pos: 70, direction: Direction.RIGHT, element: Enemies.redPlane });
            this.add(3, { t: t.plus(0), v: 15, pos: 100, offset: -30, delay: 14, element: Elements.cloud2 });

            this.add(3, { t: t.plus(30), delay: 4, v: 30, pos: 40, offset: 30, direction: Direction.LEFT, element: Enemies.grayPlane });
            this.add(3, { t: t.plus(0), delay: 4, v: 30, pos: 25, offset: 30, direction: Direction.RIGHT, element: Enemies.grayPlane });

            this.add(3, { t: t.plus(30), v: 10, pos: 60, offset: 20, direction: Direction.UP, element: Enemies.bigPlane });
            this.add(3, { t: t.plus(0), v: 8, pos: 150, offset: -3, delay: 37, element: Elements.cloud1 });
            this.add(3, { t: t.plus(10), v: 10, pos: 5, offset: 4, delay: 27, element: Elements.cloud1 });
            this.add(3, { t: t.plus(20), v: 10, pos: 60, offset: 20, direction: Direction.UP, element: Enemies.bigPlane });

            this.add(3, { t: t.plus(91), v: 10, delay: 0, pos: 20, offset: 30, direction: Direction.LEFT, element: Enemies.frigate });
            this.add(3, { t: t.plus(0), v: 10, delay: 0, pos: 35, offset: 30, direction: Direction.RIGHT, element: Enemies.frigate });

            this.add(3, { t: t.plus(90), v: 7, pos: 50, offset: 40, delay: 15, element: Elements.cloud2 });
            this.add(2, { t: t.plus(30), v: 12, delay: 25, pos: 50, offset: 70, direction: Direction.DOWN, element: Enemies.bomberPlane });

            this.add(1, { t: t.plus(50), v: 15, pos: 30, element: Elements.cloud1 });
            this.add(1, { t: t.plus(50), v: 15, pos: 130, element: Elements.cloud1 });
            this.add(1, { t: t.plus(50), v: 15, pos: 80, element: Elements.cloud1 });

            this.add(3, { t: t.plus(0), v: 7, pos: 115, offset: -40, delay: 15, element: Elements.cloud2 });
            this.add(3, { t: t.plus(50), v: 10, delay: 0, pos: 25, offset: 54, direction: Direction.DOWN, element: Enemies.bomberPlane });

            this.add(2, { t: t.plus(0), v: 20, pos: 95, offset: 45, delay: 10, element: Elements.cloud1 });
            this.add(2, { t: t.plus(50), v: 70, delay: 0, pos: 50, offset: 60, direction: Direction.DOWN, element: Enemies.grayPlane });
            this.add(1, { t: t.plus(7), v: 70, delay: 0, pos: halfWidth, offset: 0, direction: Direction.DOWN, element: Enemies.grayPlane });
            this.add(2, { t: t.plus(7), v: 70, delay: 0, pos: 50, offset: 60, direction: Direction.DOWN, element: Enemies.grayPlane });
        }

        // Sort by ticks
        this.storyBook.sort((a, b) => {
            return a.t - b.t;
        });
    }

    private add(n: number, props: EventProps) {
        for (let i = 0; i < n; i++) {
            if (!props.delay && props.delay !== 0) {
                props.delay = 3;
            }
            if (!props.offset && props.offset !== 0) {
                props.offset = 10;
            }
            if (!props.direction && props.direction !== 0) {
                props.direction = Direction.DOWN;
            }
            this.storyBook.push(
                this.createEvent(props.t + i * props.delay, props.direction, props.pos + i * props.offset, props.v, props.element)
            );
        }
    }

    private createEvent(t: number, direction: Direction, pos: number, v: number, element: (mov: Movement) => void): Event {
        return {
            t,
            createElement: () => element({
                direction, pos, v
            })
        };
    }

    public play() {
        this.setup();
        let ticks = 0;
        game.onUpdateInterval(100, () => {
            ticks++;
            while (this.storyBook.length > 0 && this.storyBook[0].t <= ticks) {
                const event = this.storyBook.shift();
                event.createElement();
                if (this.storyBook.length == 0) {
                    setTimeout(function () {
                        light.showAnimation(light.runningLightsAnimation, 3000);
                        game.over(true);
                    }, 10000);
                }
            }
        })
    }
}

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


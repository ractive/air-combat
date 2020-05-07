namespace SpriteKind {
    export const Powerup = SpriteKind.create()
    export const BombPowerup = SpriteKind.create()
    export const LifePowerup = SpriteKind.create()
    export const EnemyProjectile = SpriteKind.create()
}

function angleBetween(sprite1: Sprite, sprite2: Sprite): number {
    const dx: number = sprite2.x - sprite1.x;
    const dy: number = sprite2.y - sprite1.y;
    const a = Math.atan2(dx, dy);
    return a;
}

function vComponents(v: number, angle: number): {vx: number, vy: number} {
    const vy = v * Math.cos(angle);
    const vx = v * Math.sin(angle);
    return {vx, vy};
}

function toRadian(degrees: number) {
    return degrees * (Math.PI/180);
}

function toDegrees(rad: number) {
    return rad * (180/Math.PI);
}

enum Direction { UP, LEFT, DOWN, RIGHT };
const cloudZ = 30;

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

function rotate(img: Image, direction: Direction): Image {
    switch (direction) {
        case Direction.DOWN: return img;
        case Direction.UP: return rotateImage(img, 180);
        case Direction.LEFT: return rotateImage(img, 90);
        case Direction.RIGHT: return rotateImage(img, 270);
    }
}

function rotate45(img: Image, img45: Image, angleDegrees: number): Image {
    switch(angleDegrees) {
        case 180:
        case -180:
            return rotateImage(img, 180);
        case 135:
            return rotateImage(img45, 180);
        case 90:
            return rotateImage(img, -90);
        case 45:
            return rotateImage(img45, -90);
        case 0:
            return img;
        case -45:
            return img45;
        case -90:
            return rotateImage(img, 90);
        case -135:
            return rotateImage(img45, 90);
        default:
            return img
    }
}

class Elements {
    public static cloud1 = (mov: Movement) => new Cloud(mov, 1);
    public static cloud2 = (mov: Movement) => new Cloud(mov, 2);

    public static island1 = (mov: Movement) => new Island(mov, 1);
    public static island2 = (mov: Movement) => new Island(mov, 2);
    public static island3 = (mov: Movement) => new Island(mov, 3);
    public static island4 = (mov: Movement) => new Island(mov, 4);
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
    public static combatHelicopter = (mov: Movement) => Enemies.register(new CombatHelicopter(mov));
    public static frigate = (mov: Movement) => Enemies.register(new Frigate(mov));
    public static battleShip = (mov: Movement) => Enemies.register(new BattleShip(mov));
    public static tank = (mov: Movement) => Enemies.register(new Tank(mov));
    public static antiAircraftTower = (mov: Movement) => Enemies.register(new AntiAircraftTower(mov));
    public static antiAircraftMissile = (x: number, y: number) => Enemies.register(new AntiAircraftMissile(x, y));

    public static destroyAll(sprite: Sprite): void {
        Enemies.enemies.forEach((enemy: Enemy) => {
            enemy.gotHitBy(sprite);
        });
        sprites.allOfKind(SpriteKind.EnemyProjectile).forEach((projectile: Sprite) => {
            projectile.destroy();
        });
    }
}


interface Element {
    destroy(): void;
    getSprite(): Sprite;
}

interface Enemy extends Element {
    getScore(): number;
    gotHitBy(projectile?: Sprite): void;
}

interface Movement {
    direction?: Direction;
    v?: number;
    pos?: number;
    startX?: number;
    startY?: number;
    vx?: number;
    vy?: number;
}

abstract class BaseObject {
    protected readonly sprite: Sprite;
    protected movement: Movement;
    private intervalFunctions: { (): void; } [] = [];

    constructor(image: Image, mov: Movement) {


        if (mov.direction != undefined && mov.pos != undefined && mov.v != undefined) {
            this.sprite = sprites.create(rotate(image, mov.direction), SpriteKind.Enemy);

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

            this.sprite.setPosition(x, y);
            this.sprite.setVelocity(vx, vy);
        } else if (mov.startX != undefined && mov.startY != undefined) {
            this.sprite = sprites.create(image, SpriteKind.Enemy);
            this.sprite.setPosition(mov.startX, mov.startY);
            this.sprite.setVelocity(mov.vx, mov.vy);
        }
        
        this.sprite.setFlag(SpriteFlag.AutoDestroy, true);
        this.movement = mov;
    }

    public destroy(): void {
        this.intervalFunctions.forEach((f) => f());
    }

    public onUpdateInterval(interval: number, f: () => void) {
        const removeInterval = Interval.on(interval, f);
        this.intervalFunctions.push(removeInterval);
    }

    public getSprite(): Sprite {
        return this.sprite
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

abstract class Vehicle extends BaseEnemy {
    constructor(image: Image, mov: Movement, hits: number = 10) {
        super(image, mov, hits);
        this.sprite.z = 1;
    }
}

abstract class Building extends BaseEnemy {
    constructor(image: Image, mov: Movement, hits: number = 20) {
        super(image, mov, hits);
        this.sprite.z = 1;
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
        this.sprite.z = cloudZ + 10; // above the clouds
    }
}

class Tank extends Vehicle implements Enemy {
    private static readonly projectileImage: Image = img`
        4 f 4
        f 5 f
        4 f 4
    `;
    private static readonly image: Image = img`
          . . c 4 c 4 c . .
          f f 6 6 6 6 6 f f
          e e 6 b 7 b 6 e e
          f f b 7 7 7 b f f
          e e 7 7 c 7 7 e e
          f f b 7 7 7 b f f
          e e 6 b 7 b 6 e e
          f f 6 6 7 6 6 f f
          e e 6 6 7 6 6 e e
          . . c 6 7 6 c . .
          . . . . f . . . .
      `;

    constructor(mov: Movement) {
        super(Tank.image, mov);
        this.onUpdateInterval(4000, () => {
            this.shoot();
        });
    }

    private shoot(): void {
        const a = angleBetween(this.sprite, player.getSprite());
        for (let angle of [a - toRadian(15), a, a + toRadian(15)]) {
            const v = vComponents(30, angle);
            sprites.createProjectile(Tank.projectileImage, v.vx, v.vy, SpriteKind.EnemyProjectile, this.sprite);
        }
    }
}

class AntiAircraftMissile extends Plane implements Enemy {
    public static readonly image: Image = img`
        . 1 . 1 .
        . . 1 . .
        d 2 d 2 d
        . d d d .
        . d d d .
        . d d d .
        . d d d .
        . d d d .
        . d d d .
        . d d d .
        . . d . .
        . . d . .
    `;
    public static readonly image45: Image = img`
        . . . . . . . 1 .
        . . . . . d 2 . 1
        . . . . . d . 2 .
        . . . . d d d d .
        . . . d d d . . .
        . . d d d . . . .
        . d d d . . . . .
        . d d . . . . . .
        d . . . . . . . .
    `;

    private timeout1: number = 0;
    private timeout2: number = 0;
    private timeout3: number = 0;

    constructor(x: number, y: number) {
        super(AntiAircraftMissile.image, { startX: x, startY: y, vx: 0, vy: 0});

        this.recalc(20);

        this.timeout1 = setTimeout(() => this.recalc(30), 1000);
        this.timeout2 = setTimeout(() => this.recalc(40), 2000);   
        this.timeout3 = setTimeout(() => this.recalc(50), 3000);
    }

    private recalc(v: number) {
        const r = AntiAircraftMissile.calc(this.sprite, player.getSprite(), v);
        this.sprite.setImage(r.image);
        this.sprite.setVelocity(r.vx, r.vy);
    }

    public static calc(sprite1: Sprite, sprite2: Sprite, v: number): {image: Image, vx: number, vy :number} {
        let a = angleBetween(sprite1, sprite2);
        // Align to 45° angles
        const degrees = Math.round(toDegrees(a) / 45) * 45;
        a = toRadian(degrees);
        const vc = vComponents(v, a);
        return {image: rotate45(AntiAircraftMissile.image, AntiAircraftMissile.image45, degrees), vx: vc.vx, vy: vc.vy};
    }



    public destroy() {
        if (this.timeout1) {
            clearTimeout(this.timeout1);
        }
        if (this.timeout2) {
            clearTimeout(this.timeout2);
        }
        if (this.timeout3) {
            clearTimeout(this.timeout3);
        }
    }
}

class AntiAircraftTower extends Building implements Enemy {
    private static readonly image: Image = img`
        . . . e e e e e e e e f . . .
        . . e b b b b b b b b b f . .
        . e b b c c c c c c c b b f .
        e b b c c c c c c c c a b b e
        e b c c c c c c c c c c a b f
        e b c c c c c b c c c c a b e
        e b c c c c b c b c c c a b f
        e b c c c b c c c b c c a b e
        e b c c c c b c b c c c a b f
        e b c c c c c b c c c c a b e
        e b c c c c c c c c c c a b f
        e b b c c c c c c c c a b b e
        . e b b c c c c c c c b b f .
        . . e b b b b b b b b b f . .
        . . . e e e e e e e e f . . .
    `;
    private missileLoaded: boolean = true;

    constructor(mov: Movement) {
        super(AntiAircraftTower.image, mov);
        const i = AntiAircraftTower.image.clone();
        i.drawTransparentImage(AntiAircraftMissile.image, 5, 5);
        this.sprite.setImage(i);
        this.onUpdateInterval(Math.randomRange(2200, 2500), () => this.shoot());
        this.onUpdateInterval(500, () => {
            if (this.missileLoaded) {
                const r = AntiAircraftMissile.calc(this.sprite, player.getSprite(), 10);
                const i = AntiAircraftTower.image.clone();
                const offsetX = (AntiAircraftTower.image.width - r.image.width) / 2;
                const offsetY = (AntiAircraftTower.image.height - r.image.height) / 2;
                i.drawTransparentImage(r.image, offsetX, offsetY);
                this.sprite.setImage(i);
            }
        });
    }

    public shoot(): void {
        Enemies.antiAircraftMissile(this.sprite.x + 1, this.sprite.y + 1);
        this.sprite.setImage(AntiAircraftTower.image);
        this.missileLoaded = false;
        setTimeout(() => this.missileLoaded = true, 1500);
    }
}

class CombatHelicopter extends Plane implements Enemy {
    private static readonly image: Image = img`
        . . . . . . . . . . . . b . . . . . . . . . .
        . . . . . . . . . . . 6 b . . . . . . . . . .
        . . . . . . . . . . . 6 b . . . . . . . . . .
        . . . . . . . . . . . 6 b . . . . . . . . . .
        . . . . . . . . . . . 6 . . . . . . . . . . .
        . . . . . . . . . . 6 6 6 . . . . . . . . . .
        . . . . . . . . . b b d b b . . . . . . . . .
        . . . . . . . b 1 d 6 b 6 d d b . . . . . . .
        . . . . . . . d b 1 6 b 6 d b 1 . . . . . . .
        . . . . . . b 1 d b 6 b 6 b 1 d b . . . . . .
        . . . . . . b d 7 6 b b b 6 a d b . . . . . .
        . . . . . . d b b b b f b b b b d . . . . . .
        . . . . . . b d 7 6 b b b 6 a d b . . . . . .
        . . . . . . b 1 7 b 6 b 6 b a d b . . . . . .
        . . . . . . . d b 6 6 b 6 6 b 1 . . . . . . .
        . . . . . . . b 1 d 8 b 8 d d b . . . . . . .
        . . . . . . . . . b b d b b . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . .
    `;
    private static readonly image45: Image = img`
            . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . b .
            . . . . . . . . . . . . . . . . . . . 6 b b .
            . . . . . . . . . . . . . . . . . . 6 b b . .
            . . . . . . . . . . . . . . . . 6 6 b b . . .
            . . . . . . . . . b b d b b . 6 6 6 . . . . .
            . . . . . . . b 1 d d b d d 6 b 6 . . . . . .
            . . . . . . . d b d 7 b 6 6 b 6 . . . . . . .
            . . . . . . b 1 d 7 6 b 6 6 6 d b . . . . . .
            . . . . . . b d 7 6 b b b 6 6 d b . . . . . .
            . . . . . . d b b b b f b b b b d . . . . . .
            . . . . . . b d 8 6 b b b 6 a d b . . . . . .
            . . . . . . b 1 d 8 6 b 6 a d d b . . . . . .
            . . . . . . . d b d 8 b a d b 1 . . . . . . .
            . . . . . . . b 1 d d b d d d b . . . . . . .
            . . . . . . . . . b b d b b . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . .
        `;
    private static readonly projectileImage: Image = img`
        . 2 .
        2 f 2
        . 2 .
    `;

    constructor(mov: Movement) {
        super(CombatHelicopter.image, mov, 5);
        this.sprite.z = cloudZ - 10; // below the clouds

        this.onUpdateInterval(400, () => {
            let a = angleBetween(this.sprite, player.getSprite());
            // Align to 45° angles
            const degrees = Math.round(toDegrees(a) / 45) * 45;
            this.sprite.setImage(rotate45(CombatHelicopter.image, CombatHelicopter.image45, degrees));
        });

        this.onUpdateInterval(1000, () => {
            const a = angleBetween(this.sprite, player.getSprite());
            const v = vComponents(100, a);
            sprites.createProjectile(CombatHelicopter.projectileImage, v.vx, v.vy, SpriteKind.EnemyProjectile, this.sprite);
        });
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
        this.sprite.z = cloudZ - 10; // below the clouds
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

        const projectile = sprites.createProjectile(
            rotate(GrayPlane.projectileImage, this.movement.direction),
            vx,
            vy,
            SpriteKind.EnemyProjectile,
            this.sprite
        );
        projectile.ax = ax;
        projectile.ay = ay;

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

    constructor(mov: Movement) {
        super(BigPlane.image, mov, 3);
        this.sprite.z = cloudZ - 15; // below the clouds
        this.shoot();
        this.onUpdateInterval(1500, () => {
            this.shoot();
        });
    }

    private shoot(): void {
        let vx =  70 * Math.sign(this.sprite.vx);
        let vy =  70 * Math.sign(this.sprite.vy);
        const projectile = sprites.createProjectile(BigPlane.projectileImage, vx, vy, SpriteKind.EnemyProjectile, this.sprite);
        projectile.setPosition(Math.max(projectile.x, 0), Math.max(projectile.y, 0));
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

    constructor(mov: Movement) {
        super(BomberPlane.image, mov, 20);
        this.sprite.z = cloudZ - 20; // below the clouds
        this.shoot();
        this.onUpdateInterval(800, () => {
            this.shoot();
        });
    }

    public shoot(): void {
        sprites.createProjectile(BomberPlane.projectileImage, 0, 100, SpriteKind.EnemyProjectile, this.sprite);
        sprites.createProjectile(BomberPlane.projectileImage, -50, 87, SpriteKind.EnemyProjectile, this.sprite);
        sprites.createProjectile(BomberPlane.projectileImage, 50, 87, SpriteKind.EnemyProjectile, this.sprite);
    }

    public getScore(): number {
        return 100;
    }
}

class Frigate extends Ship implements Enemy {
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
        this.onUpdateInterval(3000, () => {
            this.shoot();
        });
    }

    private shoot(): void {
        const dx: number = player.getSprite().x - this.sprite.x;
        const dy: number = player.getSprite().y - this.sprite.y;
        const a = Math.atan(dy/dx);

        const v = 30;
        const vx = v * Math.cos(a) * Math.sign(dx);
        const vy = v * Math.sin(a) * Math.sign(dx);
        sprites.createProjectile(Frigate.projectileImage, vx, vy, SpriteKind.EnemyProjectile, this.sprite);
    }

    public getScore() {
        return 20;
    }
}

class BattleShip extends Ship implements Enemy {
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
        this.onUpdateInterval(2000, () => {
            this.shoot();
        });
    }

    private shoot(): void {
        const a = angleBetween(this.sprite, player.getSprite());
        const v = vComponents(100, a);
        sprites.createProjectile(BattleShip.projectileImage, v.vx, v.vy, SpriteKind.EnemyProjectile, this.sprite);
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
        this.sprite.z = cloudZ;
    }
}

class Island extends BaseObject implements Element {
    private static readonly island: Image = img`
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . d d d d d d d d d d d d . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d . . . . . . . . . . . . . . . . . . . . . .
        . . . . d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d . . . . . . . . . . . . . . . . . . .
        . . . d d d d d d d 7 7 7 7 7 7 7 7 7 d d d d d d d d d d d d d d d d d d d d d d d d d d d d . . . . . . . . . . . . . . . . .
        . . . d d d d d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d d d d d d d d d d d d d d . . . . . . . . . . . . . . .
        . . d d d d d d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d d d d d d d d d d d d . . . . . . . . . . . . . .
        . . d d d d d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 e 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d d d d d d d d d . . . . . . . . . . . . .
        . d d d d d 7 7 7 7 7 7 7 e 7 6 7 7 7 6 7 5 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d d d d d d . . . . . . . . . . . . .
        . d d d d 7 7 7 7 7 6 7 7 7 7 7 7 7 7 7 6 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 e 7 7 7 7 7 7 7 7 7 7 7 d d d d d . . . . . . . . . . .
        . d d d d d 7 7 7 7 7 7 7 7 7 7 6 7 7 7 7 7 7 7 7 8 7 7 7 6 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d d d d . . . . . . . . . .
        . d d d d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 2 6 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d d d d . . . . . . . . .
        . d d d d 7 7 7 7 7 6 7 7 7 e 7 7 7 6 7 e 6 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 e 7 7 7 7 e 7 7 7 7 7 7 d d d d d . . . . . . . .
        . d d d d d 7 7 7 7 7 7 7 7 7 7 7 7 7 6 7 7 7 8 7 7 7 6 6 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 e 7 7 7 d d d d . . . . . . . .
        . . d d d d 7 7 7 7 7 7 6 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 e 7 7 7 7 7 7 7 6 7 7 7 7 7 7 7 7 7 7 d d d d . . . . . . .
        . . d d d d d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 6 7 2 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 6 7 7 6 7 7 7 7 7 7 7 7 7 d d d . . . . . . .
        . . d d d d d 7 7 6 7 7 7 7 7 7 7 7 7 6 7 7 7 7 7 7 7 e 7 7 7 7 7 7 7 8 7 7 7 7 7 7 7 7 7 8 7 7 7 8 7 7 7 7 7 d d d . . . . . .
        . . d d d d d 7 7 7 7 7 6 7 7 7 6 7 7 7 7 7 7 7 7 7 7 7 7 7 6 7 7 7 7 7 7 7 e 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d d d d . . . . .
        . . . d d d d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 5 7 7 6 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d d d d d . . . .
        . . . d d d d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8 7 7 7 7 7 7 7 8 7 7 d d d d d d . . .
        . . . . d d d d 7 7 7 7 e 7 7 7 7 7 7 7 7 7 7 7 7 6 7 7 7 7 7 7 7 7 7 7 6 7 7 7 7 7 7 7 7 7 7 7 2 7 7 e 7 7 7 d d d d d d . . .
        . . . . . d d d 7 7 7 7 7 7 7 7 2 7 7 e 7 7 7 7 7 7 7 7 7 7 7 2 7 7 7 7 7 7 7 7 7 6 7 7 7 7 7 7 7 7 7 7 7 7 7 d d d d d d . . .
        . . . . . d d d 7 7 7 7 7 6 7 7 7 7 7 7 7 7 7 7 7 7 7 e 7 7 7 7 7 7 2 7 7 7 7 e 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d d d d d d . . .
        . . . . . d d d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 6 7 6 7 7 7 7 7 7 7 7 7 7 7 e 7 7 7 7 7 7 7 7 d d d d d d . . .
        . . . . . d d d d 7 7 7 7 7 7 7 7 7 7 8 7 7 7 e 7 7 7 7 7 7 7 8 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 5 7 d d d d d d . . .
        . . . . . d d d d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 2 7 7 7 e 7 7 7 7 7 7 7 6 7 7 7 7 d d d d d d . . .
        . . . . . d d d d 7 7 7 7 7 7 7 7 6 7 7 7 7 7 7 7 7 7 7 7 7 6 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d d d d d . . .
        . . . . . d d d d 7 7 7 7 7 7 e 7 7 7 7 7 7 7 7 7 6 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 e 7 7 7 7 7 7 7 e 7 7 7 d d d d d . . .
        . . . . . d d d d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 e 7 7 7 7 6 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d d d d . . . .
        . . . . . d d d d 7 7 7 6 7 7 7 7 7 7 7 7 e 7 7 7 7 7 6 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8 7 7 7 7 7 7 7 d d d d . . . .
        . . . . . d d d d 7 7 7 7 7 7 7 7 6 7 7 7 7 7 7 7 7 7 7 7 7 7 2 7 7 7 7 7 7 8 7 7 7 7 7 7 7 7 7 7 7 7 7 e 7 7 7 d d d d . . . .
        . . . . . d d d d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8 7 7 7 7 7 7 7 e 7 7 7 7 7 7 7 7 7 7 e 7 7 7 7 7 7 7 7 7 7 d d d d d . . . .
        . . . . . . d d d 7 7 7 7 7 7 7 7 7 7 7 2 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 6 7 7 7 7 7 7 7 7 7 7 6 7 7 7 7 7 d d d d d . . . .
        . . . . . . d d d d d d 7 7 7 7 7 7 7 7 7 7 7 7 7 e 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 2 7 7 7 7 7 7 7 7 7 7 7 7 7 d d d d d . . . .
        . . . . . . d d d d d d d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 e 7 7 7 7 7 7 7 6 7 7 7 7 7 e 7 7 7 7 7 7 7 7 7 7 d d d d . . . . .
        . . . . . . . d d d d d d d 7 7 7 7 7 7 7 6 6 7 7 7 7 7 7 7 7 7 7 8 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8 7 7 7 7 7 7 d d d d . . . . .
        . . . . . . . d d d d d d d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 6 7 7 7 7 d d d d d . . . . .
        . . . . . . . . . d d d d d d d d d 7 7 7 7 7 7 7 7 7 7 7 6 7 7 7 7 7 7 e 7 7 7 6 7 7 7 7 7 7 7 7 7 7 7 7 7 d d d d d . . . . .
        . . . . . . . . . . . d d d d d d d d d d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d d d d d . . . . .
        . . . . . . . . . . . . . d d d d d d d d d d 7 7 7 7 7 7 7 7 e 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d d d d 7 7 d d d d d d . . . . .
        . . . . . . . . . . . . . . . . . . d d d d d d d d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d d d d d d d d d d d d d d d d d d . . . . . .
        . . . . . . . . . . . . . . . . . . . d d d d d d d d d d 7 7 7 7 7 7 7 d d d d d d d d d d d d d d d d d d d d d d . . . . . .
        . . . . . . . . . . . . . . . . . . . . . d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . d d d d d d d d d d d d d d d d d . . . . . . . d d d d d d d d d d d . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . d d d d d d d d d d d . . . . . . . . . . . . . d d d d d d d d . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . d d d d d d . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . d d . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    `;

    private static islandImg(island: number) {
        switch (island) {
            case 1: return Island.island;
            case 2: return rotate(Island.island, Direction.LEFT);
            case 3: return rotate(Island.island, Direction.RIGHT);
            case 4: return rotate(Island.island, Direction.UP);
            default: return Island.island;
        }
    }

    constructor(mov: Movement, island: number) {
        super(Island.islandImg(island), mov);
        this.sprite.setFlag(SpriteFlag.Ghost, true);
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

StoryBook.play();

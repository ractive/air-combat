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
    public static frigate = (mov: Movement) => Enemies.register(new Frigate(mov));
    public static battleShip = (mov: Movement) => Enemies.register(new BattleShip(mov));
    public static tank = (mov: Movement) => Enemies.register(new Tank(mov));
    public static antiAircraftTower = (mov: Movement) => Enemies.register(new AntiAircraftTower(mov));

    public static destroyAll(sprite: Sprite): void {
        Enemies.enemies.forEach((enemy: Enemy) => {
            enemy.gotHitBy(sprite);
        });
        sprites.allOfKind(SpriteKind.EnemyProjectile).forEach((projectile: Sprite) => {
            projectile.destroy();
        });
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
            this.add(1, { t: t.plus(0), v: 40, pos: 10, direction: Direction.LEFT, element: Enemies.greenPlane });
            this.add(1, { t: t.plus(10), v: 35, pos: 60, element: Elements.cloud1 });
            this.add(1, { t: t.plus(10), v: 40, pos: 30, direction: Direction.RIGHT, element: Enemies.greenPlane });
            this.add(1, { t: t.plus(0), v: 30, pos: 60, element: Elements.cloud2 });
            this.add(1, { t: t.plus(0), v: 35, pos: 20, element: Elements.cloud1 });
            this.add(1, { t: t.plus(5), v: 25, pos: 120, element: Elements.cloud1 });
            this.add(2, { t: t.plus(10), v: 10, pos: 10, offset: -50, element: Elements.island1 });
            this.add(1, { t: t.plus(15), v: 60, pos: 70, direction: Direction.RIGHT, element: Enemies.redPlane });
            this.add(1, { t: t.plus(0), v: 60, pos: 90, direction: Direction.LEFT, element: Enemies.redPlane });
            this.add(1, { t: t.plus(20), v: 35, pos: 20, element: Elements.cloud1 });
            this.add(1, { t: t.plus(10), v: 25, pos: 60, element: Elements.cloud1 });

            this.add(1, { t: t.plus(10), v: 80, pos: 40, direction: Direction.LEFT, element: Enemies.grayPlane });
            this.add(1, { t: t.plus(10), v: 80, pos: 60, direction: Direction.RIGHT, element: Enemies.grayPlane });
            this.add(1, { t: t.plus(0), v: 30, pos: 120, element: Elements.cloud1 });
            this.add(1, { t: t.plus(15), v: 30, pos: 40, element: Elements.cloud2 });
            this.add(1, { t: t.plus(5), v: 35, pos: 60, direction: Direction.DOWN, element: Enemies.bigPlane });

            this.add(2, { t: t.plus(20), v: 30, pos: 130, offset: -60, delay: 10, element: Elements.cloud1 });
            this.add(3, { t: t.plus(10), v: 50, pos: 50, direction: Direction.LEFT, element: Enemies.greenPlane });
            this.add(2, { t: t.plus(0), v: 23, pos: 100, offset: -60, delay: 10, element: Elements.cloud1 });
            this.add(1, { t: t.plus(30), v: 23, pos: halfWidth, offset: -60, delay: 10, element: Elements.cloud1 });
            this.add(4, { t: t.plus(0), delay: 2, v: 80, pos: 10, offset: 10, direction: Direction.RIGHT, element: Enemies.redPlane });

            this.add(3, { t: t.plus(15), v: 15, pos: 30, offset: 50, delay: 10, element: Elements.cloud2 });
            this.add(3, { t: t.plus(15), delay: 6, v: 30, pos: 40, offset: 20, direction: Direction.DOWN, element: Enemies.bigPlane });
            this.add(3, { t: t.plus(15), v: 15, pos: 50, offset: 45, delay: 6, element: Elements.cloud2 });
            this.add(4, { t: t.plus(10), delay: 4, v: 30, pos: 120, offset: 0, direction: Direction.DOWN, element: Enemies.greenPlane });

            this.add(2, { t: t.plus(40), v: 10, pos: 140, offset: -70, delay: 10, element: Elements.cloud1 });
            this.add(2, { t: t.plus(10), v: 12, pos: 30, offset: 90, delay: 10, element: Elements.cloud1 });
            this.add(1, { t: t.plus(0), v: 5, pos: 65, direction: Direction.DOWN, element: Enemies.frigate });
            this.add(1, { t: t.plus(10), v: 5, pos: 120, direction: Direction.DOWN, element: Enemies.frigate });
            this.add(2, { t: t.plus(70), v: 20, pos: 120, offset: 0, delay: 20, element: Elements.cloud1 });
            this.add(1, { t: t.plus(0), v: 5, pos: 20, element: Elements.cloud2 });
            this.add(1, { t: t.plus(30), v: 5, pos: 30, element: Elements.cloud2 });
            this.add(1, { t: t.plus(30), v: 15, pos: 30, direction: Direction.DOWN, element: Enemies.battleShip });

            this.add(2, { t: t.plus(10), v: 10, pos: 120, offset: -20, element: Elements.island1 });
            this.add(2, { t: t.plus(19), v: 10, pos: 95, offset: 30, delay: 15, element: Enemies.tank });
            this.add(1, { t: t.plus(10), v: 10, pos: 20, element: Elements.island4 });
            this.add(2, { t: t.plus(17), v: 10, pos: 10, offset: 10, delay: 15, element: Enemies.tank });

            this.add(2, { t: t.plus(15), v: 25, pos: 95, offset: 45, delay: 10, element: Elements.cloud1 });
            this.add(1, { t: t.plus(15), v: 60, pos: halfHeight, direction: Direction.LEFT, element: Enemies.redPlane });
            this.add(1, { t: t.plus(0), v: 60, pos: halfHeight, direction: Direction.RIGHT, element: Enemies.redPlane });
            this.add(1, { t: t.plus(0), v: 60, pos: halfWidth, direction: Direction.DOWN, element: Enemies.redPlane });
            this.add(1, { t: t.plus(0), v: 60, pos: halfWidth, direction: Direction.UP, element: Enemies.redPlane });

            this.add(1, { t: t.plus(10), v: 10, pos: halfWidth, element: Elements.island2 });
            this.add(3, { t: t.plus(0), v: 27, pos: 30, offset: 45, delay: 20, element: Elements.cloud1 });
            this.add(2, { t: t.plus(25), v: 40, pos: 70, direction: Direction.LEFT, element: Enemies.greenPlane });
            this.add(2, { t: t.plus(10), v: 40, pos: 30, direction: Direction.RIGHT, element: Enemies.greenPlane });
            this.add(1, { t: t.plus(10), v: 30, pos: 30, offset: 80, delay: 40, element: Elements.cloud1 });
            this.add(1, { t: t.plus(10), v: 10, pos: 130, element: Elements.island3 });
            this.add(2, { t: t.plus(40), v: 40, pos: 70, direction: Direction.LEFT, element: Enemies.greenPlane });
            this.add(2, { t: t.plus(10), v: 40, pos: 30, direction: Direction.RIGHT, element: Enemies.greenPlane });
            this.add(4, { t: t.plus(0), v: 38, pos: 130, offset: -35, delay: 5, element: Elements.cloud1 });
            this.add(1, { t: t.plus(15), v: 27, pos: 50, element: Elements.cloud2 });
            this.add(6, { t: t.plus(15), v: 15, delay: 0, pos: 10, offset: 27, direction: Direction.DOWN, element: Enemies.greenPlane });
            this.add(5, { t: t.plus(10), v: 30, delay: 0, pos: 25, offset: 27, direction: Direction.DOWN, element: Enemies.redPlane });
            this.add(6, { t: t.plus(10), v: 80, delay: 0, pos: 10, offset: 27, direction: Direction.DOWN, element: Enemies.grayPlane });

            t.plus(40);

            this.add(1, { t: t.plus(0), v: 10, pos: 7, element: Elements.island2 });
            this.add(1, { t: t.plus(5), v: 10, pos: 140, element: Elements.island4 });
            this.add(1, { t: t.plus(19), v: 10, pos: 15, element: Enemies.antiAircraftTower });
            this.add(1, { t: t.plus(9), v: 10, pos: 150, element: Enemies.antiAircraftTower });

            this.add(2, { t: t.plus(15), v: 20, pos: 30, offset: 60, delay: 10, element: Elements.cloud1 });
            this.add(2, { t: t.plus(40), v: 23, pos: 100, offset: -30, delay: 20, element: Elements.cloud1 });

            this.add(2, { t: t.plus(50), v: 8, pos: halfWidth - 15, offset: 25, delay: 5, element: Elements.cloud2 });
            this.add(1, { t: t.plus(0), v: 15, pos: 30, direction: Direction.DOWN, element: Enemies.bigPlane });
            this.add(2, { t: t.plus(15), v: 15, pos: 15, offset: 30, delay: 0, direction: Direction.DOWN, element: Enemies.frigate });
            this.add(1, { t: t.plus(15), v: 15, pos: 30, direction: Direction.DOWN, element: Enemies.battleShip });

            this.add(1, { t: t.plus(15), v: 15, pos: 115, direction: Direction.DOWN, element: Enemies.bigPlane });
            this.add(2, { t: t.plus(15), v: 15, pos: 100, offset: 30, delay: 0, direction: Direction.DOWN, element: Enemies.frigate });
            this.add(1, { t: t.plus(15), v: 15, pos: 115, direction: Direction.DOWN, element: Enemies.battleShip });

            this.add(1, { t: t.plus(10), v: 10, pos: 30, element: Elements.island2 });
            this.add(1, { t: t.plus(27), v: 10, pos: 35, element: Enemies.antiAircraftTower });

            this.add(3, { t: t.plus(70), v: 20, pos: 30, offset: 45, delay: 20, element: Elements.cloud1 });
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

            this.add(1, { t: t.plus(10), v: 10, pos: 150, offset: 0, delay: 20, element: Elements.island2 });
            this.add(3, { t: t.plus(10), v: 10, pos: 150, offset: 0, delay: 15, element: Enemies.tank });
            this.add(1, { t: t.plus(10), v: 10, pos: 10, offset: 0, delay: 20, element: Elements.island3 });
            this.add(3, { t: t.plus(12), v: 10, pos: 7, offset: 0, delay: 15, element: Enemies.tank });


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
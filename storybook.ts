interface Event {
    t: number;
    createElement(): void;
}

interface EventProps {
    v: number;
    pos: number;
    after?: number;
    delay?: number;
    offset?: number;
    direction?: Direction;
    times?: number;
    element: (mov: Movement) => void;
}

class Ticks {
    private _t: number = 0;

    constructor() { }

    get t(): number {
        return this._t;
    }

    public plus(t: number): number {
        return this._t += t;
    }
}

interface Level {
    level: number;
    storyBook: Event[];
}

class LevelBuilder {
    private gameBuilder: GameBuilder;
    private level: number;
    private storyBook: Event[] = [];
    private ticks = new Ticks();

    constructor(level: number, gameBuilder: GameBuilder) {
        this.level = level;
        this.gameBuilder = gameBuilder;
    }

    public static level(level: number, gameBuilder: GameBuilder): LevelBuilder {
        return new LevelBuilder(level, gameBuilder);
    }

    public wait(ticks: number): LevelBuilder {
        this.ticks.plus(ticks);
        return this;
    }

    public with(props: EventProps): LevelBuilder {
        if (!props.delay && props.delay !== 0) {
            props.delay = 3;
        }
        if (!props.after) {
            props.after = 0;
        }
        if (!props.offset && props.offset !== 0) {
            props.offset = 10;
        }
        if (!props.direction && props.direction !== 0) {
            props.direction = Direction.DOWN;
        }
        if (!props.times) {
            props.times = 1;
        }

        this.ticks.plus(props.after);

        for (let i = 0; i < props.times; i++) {
            const pos = props.pos + i * props.offset;
            const t = this.ticks.t + i * props.delay;
            this.storyBook.push(
                {
                    t,
                    createElement: () => props.element({
                        direction: props.direction,
                        pos,
                        v: props.v
                    })
                }
            );
        }

        return this;
    }

    public build(): GameBuilder {
        // Sort by ticks
        this.storyBook.sort((a, b) => {
            return a.t - b.t;
        });

        this.gameBuilder.addLevel({
            level: this.level,
            storyBook: this.storyBook
        });

        return this.gameBuilder;
    }
}

class GameBuilder {
    levels: Level[] = [];

    constructor() { }

    public nextLevel(): LevelBuilder {
        return LevelBuilder.level(this.levels.length + 1, this);
    }

    public addLevel(level: Level) {
        this.levels.push(level);
    }
}

class StoryBook {
    constructor() { }

    private setup(): Level[] {

        const halfWidth: number = scene.screenWidth() / 2;
        const halfHeight: number = scene.screenHeight() / 2;

        return new GameBuilder()
            .nextLevel()
                .with({ element: Elements.cloud1, after: 10, v: 30, pos: 120  })
                .with({ element: Enemies.greenPlane, v: 40, pos: 10, direction: Direction.LEFT })
                .with({ element: Elements.cloud1, after: 10, v: 35, pos: 60 })
                .with({ element: Enemies.greenPlane, after: 10, v: 40, pos: 30, direction: Direction.RIGHT })
                .with({ element: Elements.cloud2, v: 30, pos: 60 })
                .with({ element: Elements.cloud1, v: 35, pos: 20 })
                .with({ element: Elements.cloud1, after: 5, v: 25, pos: 120 })
                .with({ element: Elements.island1, after: 10, times: 2, v: 10, pos: 10, offset: -50 })
                .with({ element: Enemies.redPlane, after: 15, v: 60, pos: 70, direction: Direction.RIGHT })
                .with({ element: Enemies.redPlane, v: 60, pos: 90, direction: Direction.LEFT })
                .with({ element: Elements.cloud1, after: 20, v: 35, pos: 20 })
                .with({ element: Elements.cloud1, after: 10, v: 25, pos: 60 })
                .with({ element: Enemies.grayPlane, after: 10, v: 80, pos: 40, direction: Direction.LEFT })
                .with({ element: Enemies.grayPlane, after: 10, v: 80, pos: 60, direction: Direction.RIGHT })
                .with({ element: Elements.cloud1, v: 30, pos: 120 })
                .with({ element: Elements.cloud2, after: 15, v: 30, pos: 40 })
                .with({ element: Enemies.bigPlane, after: 5, v: 35, pos: 60 })
                .build()

            .nextLevel()
                .with({ element: Elements.cloud1, after: 20, times: 2, v: 30, pos: 130, offset: -60, delay: 10 })
                .with({ element: Enemies.greenPlane, after: 10, times: 3, v: 50, pos: 50, direction: Direction.LEFT })
                .with({ element: Elements.cloud1, times: 2, v: 23, pos: 100, offset: -60, delay: 10 })
                .with({ element: Elements.cloud1, after: 30, v: 23, pos: halfWidth, offset: -60, delay: 10 })
                .with({ element: Enemies.redPlane, times: 4, v: 80, pos: 10, offset: 10, delay: 2, direction: Direction.RIGHT })

                .with({ element: Elements.cloud2, after: 15, times: 3, v: 15, pos: 30, offset: 50, delay: 10 })
                .with({ element: Enemies.bigPlane, after: 15, times: 3, v: 30, pos: 40, offset: 20, delay: 6 })
                .with({ element: Elements.cloud2, after: 15, times: 3, v: 15, pos: 50, offset: 45, delay: 6 })
                .with({ element: Enemies.greenPlane, after: 10, times: 4, v: 30, pos: 120, offset: 0, delay: 4 })

                .with({ element: Elements.cloud1, after: 40, times: 2, v: 10, pos: 140, offset: -70, delay: 10 })
                .with({ element: Elements.cloud1, after: 10, times: 2, v: 12, pos: 30, offset: 90, delay: 10 })
                .with({ element: Enemies.frigate, v: 5, pos: 65 })
                .with({ element: Enemies.frigate, after: 10, v: 5, pos: 120 })
                .with({ element: Elements.cloud1, after: 70, times: 2, v: 20, pos: 120, offset: 0, delay: 20 })
                .with({ element: Elements.cloud2, v: 5, pos: 20 })
                .with({ element: Elements.cloud2, after: 30, v: 5, pos: 30 })
                .with({ element: Enemies.battleShip, after: 30, v: 15, pos: 30 })

                .with({ element: Elements.island1, after: 10, times: 2, v: 10, pos: 120, offset: -20 })
                .with({ element: Enemies.tank, after: 19, times: 2, v: 10, pos: 95, offset: 30, delay: 15 })
                .with({ element: Elements.island4, after: 10, v: 10, pos: 20 })
                .with({ element: Enemies.tank, after: 17, times: 2, v: 10, pos: 10, offset: 10, delay: 15 })

                .with({ element: Elements.cloud1, after: 15, times: 2, v: 25, pos: 95, offset: 45, delay: 10 })
                .with({ element: Enemies.redPlane, after: 15, v: 60, pos: halfHeight, direction: Direction.LEFT })
                .with({ element: Enemies.redPlane, v: 60, pos: halfHeight, direction: Direction.RIGHT })
                .with({ element: Enemies.redPlane, v: 60, pos: halfWidth })
                .with({ element: Enemies.redPlane, v: 60, pos: halfWidth, direction: Direction.UP })

                .with({ element: Elements.island2, after: 10, v: 10, pos: halfWidth })
                .with({ element: Elements.cloud1, times: 3, v: 27, pos: 30, offset: 45, delay: 20 })
                .with({ element: Enemies.greenPlane, after: 25, times: 2, v: 40, pos: 70, direction: Direction.LEFT })
                .with({ element: Enemies.greenPlane, after: 10, times: 2, v: 40, pos: 30, direction: Direction.RIGHT })
                .with({ element: Elements.cloud1, after: 10, v: 30, pos: 30, offset: 80, delay: 40 })
                .with({ element: Elements.island3, after: 10, v: 10, pos: 130 })
                .with({ element: Enemies.greenPlane, after: 40, times: 2, v: 40, pos: 70, direction: Direction.LEFT })
                .with({ element: Enemies.greenPlane, after: 10, times: 2, v: 40, pos: 30, direction: Direction.RIGHT })
                .with({ element: Elements.cloud1, times: 4, v: 38, pos: 130, offset: -35, delay: 5 })
                .with({ element: Elements.cloud2, after: 15, v: 27, pos: 50 })
                .with({ element: Enemies.greenPlane, after: 15, times: 6, v: 15, delay: 0, pos: 10, offset: 27 })
                .with({ element: Enemies.redPlane, after: 10, times: 5, v: 30, delay: 0, pos: 25, offset: 27 })
                .with({ element: Enemies.grayPlane, after: 10, times: 6, v: 80, delay: 0, pos: 10, offset: 27 })

                .with({ element: Elements.island2, after: 40, v: 10, pos: 7 })
                .with({ element: Elements.island4, after: 5, v: 10, pos: 140 })
                .with({ element: Enemies.antiAircraftTower, after: 19, v: 10, pos: 15 })
                .with({ element: Enemies.antiAircraftTower, after: 9, v: 10, pos: 150 })

                .with({ element: Elements.cloud1, after: 15, times: 2, v: 20, pos: 30, offset: 60, delay: 10 })
                .with({ element: Elements.cloud1, after: 40, times: 2, v: 23, pos: 100, offset: -30, delay: 20 })

                .with({ element: Elements.cloud2, after: 50, times: 2, v: 8, pos: halfWidth - 15, offset: 25, delay: 5 })
                .with({ element: Enemies.bigPlane, v: 15, pos: 30 })
                .with({ element: Enemies.frigate, after: 15, times: 2, v: 15, pos: 15, offset: 30, delay: 0 })
                .with({ element: Enemies.battleShip, after: 15, v: 15, pos: 30 })

                .with({ element: Enemies.bigPlane, after: 15, v: 15, pos: 115 })
                .with({ element: Enemies.frigate, after: 15, times: 2, v: 15, pos: 100, offset: 30, delay: 0 })
                .with({ element: Enemies.battleShip, after: 15, v: 15, pos: 115 })

                .with({ element: Elements.island2, after: 10, v: 10, pos: 30 })
                .with({ element: Enemies.antiAircraftTower, after: 27, v: 10, pos: 35 })

                .with({ element: Elements.cloud1, after: 70, times: 3, v: 20, pos: 30, offset: 45, delay: 20 })
                .with({ element: Enemies.bomberPlane, after: 30, v: 20, pos: halfWidth, direction: Direction.UP })

                .with({ element: Elements.cloud1, after: 15, times: 2, v: 20, pos: 95, offset: 45, delay: 10 })
                .with({ element: Elements.cloud1, after: 20, times: 2, v: 17, pos: 40, offset: 70, delay: 5 })
                .with({ element: Enemies.greenPlane, after: 30, v: 20, pos: halfHeight, direction: Direction.LEFT })
                .with({ element: Enemies.greenPlane, v: 20, pos: halfHeight, direction: Direction.RIGHT })

                .with({ element: Enemies.greenPlane, v: 20, pos: halfWidth })
                .with({ element: Enemies.greenPlane, v: 20, pos: halfWidth, direction: Direction.UP })

                .with({ element: Enemies.grayPlane, v: 60, pos: halfHeight, direction: Direction.LEFT })
                .with({ element: Enemies.grayPlane, v: 60, pos: halfHeight, direction: Direction.RIGHT })
                .with({ element: Enemies.grayPlane, v: 60, pos: halfWidth })
                .with({ element: Enemies.grayPlane, v: 60, pos: halfWidth, direction: Direction.UP })

                .with({ element: Elements.cloud2, times: 3, v: 15, pos: 30, offset: 50, delay: 10 })

                .with({ element: Elements.island2, after: 10, v: 10, pos: 150, offset: 0, delay: 20 })
                .with({ element: Enemies.tank, after: 10, times: 3, v: 10, pos: 150, offset: 0, delay: 15 })
                .with({ element: Elements.island3, after: 10, v: 10, pos: 10, offset: 0, delay: 20 })
                .with({ element: Enemies.tank, after: 12, times: 3, v: 10, pos: 7, offset: 0, delay: 15 })

                .with({ element: Enemies.frigate, after: 30, v: 5, pos: 50, direction: Direction.UP })
                .with({ element: Elements.cloud2, times: 2, v: 15, pos: 120, offset: -30, delay: 10 })
                .with({ element: Enemies.frigate, after: 10, v: 5, pos: 100, direction: Direction.UP })
                .with({ element: Elements.cloud1, after: 10, v: 15, pos: 30 })

                .with({ element: Elements.cloud1, after: 40, times: 4, v: 15, pos: 5, offset: 4, delay: 20 })
                .with({ element: Elements.cloud1, after: 15, times: 4, v: 15, pos: 140, offset: -7, delay: 20 })
                .with({ element: Enemies.greenPlane, after: 25, times: 2, v: 50, pos: 40, direction: Direction.LEFT })
                .with({ element: Elements.cloud2, times: 3, v: 15, pos: 50, offset: 30, delay: 10 })
                .with({ element: Enemies.redPlane, after: 20, times: 2, v: 50, pos: 70, direction: Direction.RIGHT })
                .with({ element: Elements.cloud2, times: 3, v: 15, pos: 100, offset: -30, delay: 14 })

                .with({ element: Enemies.grayPlane, after: 30, times: 3, v: 30, pos: 40, offset: 30, delay: 4, direction: Direction.LEFT })
                .with({ element: Enemies.grayPlane, times: 3, v: 30, pos: 25, offset: 30, delay: 4, direction: Direction.RIGHT })

                .with({ element: Enemies.bigPlane, after: 30, times: 3, v: 10, pos: 60, offset: 20, direction: Direction.UP })
                .with({ element: Elements.cloud1, times: 3, v: 8, pos: 150, offset: -3, delay: 37 })
                .with({ element: Elements.cloud1, after: 10, times: 3, v: 10, pos: 5, offset: 4, delay: 27 })
                .with({ element: Enemies.bigPlane, after: 20, times: 3, v: 10, pos: 60, offset: 20, direction: Direction.UP })

                .with({ element: Enemies.frigate, after: 91, times: 3, v: 10, delay: 0, pos: 20, offset: 30, direction: Direction.LEFT })
                .with({ element: Enemies.frigate, times: 3, v: 10, delay: 0, pos: 35, offset: 30, direction: Direction.RIGHT })

                .with({ element: Elements.cloud2, after: 90, times: 3, v: 7, pos: 50, offset: 40, delay: 15 })
                .with({ element: Enemies.bomberPlane, after: 30, times: 2, v: 12, delay: 25, pos: 50, offset: 70 })

                .with({ element: Elements.cloud1, after: 50, v: 15, pos: 30 })
                .with({ element: Elements.cloud1, after: 50, v: 15, pos: 130 })
                .with({ element: Elements.cloud1, after: 50, v: 15, pos: 80 })

                .with({ element: Elements.cloud2, times: 3, v: 7, pos: 115, offset: -40, delay: 15 })
                .with({ element: Enemies.bomberPlane, after: 50, times: 3, v: 10, delay: 0, pos: 25, offset: 54 })

                .with({ element: Elements.cloud1, times: 2, v: 20, pos: 95, offset: 45, delay: 10 })
                .with({ element: Enemies.grayPlane, after: 50, times: 2, v: 70, delay: 0, pos: 50, offset: 60 })
                .with({ element: Enemies.grayPlane, after: 7, v: 70, delay: 0, pos: halfWidth, offset: 0 })
                .with({ element: Enemies.grayPlane, after: 7, times: 2, v: 70, delay: 0, pos: 50, offset: 60 })
                .build()
            .levels;
    }

    public play() {
        const levels = this.setup();
        let currentLevel = levels.shift();
        StoryBook.levelInfo(currentLevel);
        let ticks = 0;
        game.onUpdateInterval(100, () => {
            ticks++;
            while (currentLevel && currentLevel.storyBook.length > 0 && currentLevel.storyBook[0].t <= ticks) {
                const event = currentLevel.storyBook.shift();
                event.createElement();
                if (currentLevel.storyBook.length == 0) {
                    setTimeout(() => {
                        currentLevel = levels.shift();
                        if (currentLevel) {
                            StoryBook.levelInfo(currentLevel);
                            ticks = 0;
                        } else {
                            light.showAnimation(light.runningLightsAnimation, 3000);
                            game.over(true);
                        }
                    }, 10000);
                }
            }
        })
    }

    private static levelInfo(level: Level): void {
        game.splash("Level " + level.level);
    }
} 
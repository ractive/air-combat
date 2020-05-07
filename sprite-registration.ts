namespace SpriteRegistration {
    export interface SpriteAttached {
        getSprite(): Sprite;
        destroy(): void;
    }

    let objects: SpriteAttached[] = [];

    export function register(object: SpriteAttached): void {
        objects.push(object);

        object.getSprite().onDestroyed(() => {
            object.destroy();
            objects = objects.filter(
                p => p.getSprite().id !== object.getSprite().id
            );
        });
    }

    export function fromSprite(sprite: Sprite): SpriteAttached {
        return objects.find(e => e.getSprite().id === sprite.id);
    }

    export function all(): SpriteAttached[] {
        return objects;
    }

}
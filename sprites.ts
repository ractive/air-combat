namespace Sprites {
    /**
     * Classes that wrap a Sprite and want to register instances
     * of it implement this interface. The destroy method is called
     * when the corresponding sprite is destroyed.
     */
    export interface SpriteWrapper {
        getSprite(): Sprite;
        destroy(): void;
    }

    let objects: SpriteWrapper[] = [];

    /**
     * Registers a SpriteWrapper object, which onDestroy
     * mehtod is called, when the wrapped sprite is destroyed.
     */
    export function register(object: SpriteWrapper): void {
        objects.push(object);

        object.getSprite().onDestroyed(() => {
            object.destroy();
            objects = objects.filter(
                p => p.getSprite().id !== object.getSprite().id
            );
        });
    }

    /**
     * Return the object that is associated to the given sprite.
     * This can be useful when a sprite is retrieved e.g. with
     * the sprites.onOverlap
     * 
     */
    export function fromSprite(sprite: Sprite): SpriteWrapper {
        return objects.find(e => e.getSprite().id === sprite.id);
    }

    /**
     * Returns all registered SpriteWrapper objects
     */
    export function all(): SpriteWrapper[] {
        return objects;
    }
}
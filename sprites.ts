namespace Sprites {
    /**
     * Classes that wrap a Sprite and want to register instances
     * of it implement this interface. The destroy method is called
     * when the corresponding sprite is destroyed.
     */
    export interface SpriteWrapper {
        sprite: Sprite;
        destroy(): void;
    }

    let objects: SpriteWrapper[] = [];
	
    /**
     * An abstract baase class you can use to derive your classes from.
     * All instances are registered with the "register" function after
     * being created.
     */
    export abstract class BaseSpriteWrapper implements SpriteWrapper {
        public readonly sprite: Sprite;
        constructor(sprite: Sprite) {
            this.sprite = sprite;
            register(this);
        }

        public destroy(): void {
            
        };
    }

    /**
     * Registers a SpriteWrapper object, which onDestroy
     * mehtod is called, when the wrapped sprite is destroyed.
     */
    export function register(object: SpriteWrapper): void {
        objects.push(object);

        object.sprite.onDestroyed(() => {
            object.destroy();
            objects = objects.filter(
                p => p.sprite.id !== object.sprite.id
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
        return objects.find(e => e.sprite.id === sprite.id);
    }

    /**
     * Returns all registered SpriteWrapper objects
     */
    export function all(): SpriteWrapper[] {
        return objects;
    }
}
# Air Combat ![Build Status Abzeichen](https://github.com/ractive/air-combat/workflows/MakeCode/badge.svg)

Air Combat is a classic arcade shooter game for arcade.makecode.com.

<img width="400" alt="air-combat" src="https://user-images.githubusercontent.com/783861/81269256-5ae21600-9049-11ea-8df7-f8ef9c46f561.png">

## How to play

Press and hold button B to shoot and drop bombs with A (if you collected any). In the browser, use key E or Enter for button B and Q or space for button A.

Collect the green powerups to upgrade your weapon and to get points.

The hearts will give you more lifes (max. 5). If you got shot or collide with an enemy, first the weapon upgrades are destroyed before you loose a life


## Code
This game was developed for the arcade.makecode.com platform. When [opening it in arcade.makecode.com](https://arcade.makecode.com/#pub:github:ractive/air-combat) you can also download it to supported devices like the [PyGamer](https://www.adafruit.com/product/4242).

Contributions are welcome. Some nicer artwork, some better tuned levels and more types of enemies would always be nice.

This game is written in Typescript and cannot be developed in block mode.
The game is split in various files:
### main.ts
Contains all the classes that represent the enemies and helper classes to create them.
### player.ts
Hosts the `Player` class, which draws the player's plane, handles the shooting and picking up powerups.
### powerup.ts
`PowereUp` class that shows and hides powerups in random intervals.
### storybook.ts
Contains the level configurations. It can be defined, which enemy or element should appear when, where, with what velocity.
The exported `play` function then makes those elements and enemies appear at the right time.
### interval.ts
Allows to subscribe **and unsubscribe** callbacks to be called regularly with `game.onUpdate`. This allows using `game.onUpdate` with short lived objects like the enemy objects.


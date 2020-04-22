namespace SpriteKind {
    export const Powerup = SpriteKind.create()
    export const BigEnemy = SpriteKind.create()
    export const EnemyProjectile = SpriteKind.create()
}

interface EnemyPlane {
    imgUp: Image;
    imgLeft: Image;
    imgDown: Image;
    imgRight: Image;
}

const greenPlane: EnemyPlane = {
    imgUp: img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . 9 9 9 9 9 9 . . . . .
        . . . . . . . 7 7 . . . . . . .
        . . . . . . . 8 8 . . . . . . .
        . . . . . 7 7 8 8 7 7 . . . . .
        . 6 7 7 6 7 e 7 7 e 7 6 7 7 6 .
        . . . 7 7 7 7 7 7 7 7 7 7 . . .
        . . . . . . . 7 7 . . . . . . .
        . . . . . . . 7 7 . . . . . . .
        . . . . . . . 7 7 . . . . . . .
        . . . . . . 7 7 7 7 . . . . . .
        . . . . 7 7 6 7 7 6 7 7 . . . .
        . . . . . . . 7 7 . . . . . . .
        . . . . . . . . . . . . . . . .
    `,

    imgLeft: img`
        . . . . . . . . . . . . . . . .
        . . . . . . . 6 . . . . . . . .
        . . . . . . . 7 . . . . . . . .
        . . . . . . . 7 7 . . . . . . .
        . . . . . . . 6 7 . . . . 7 . .
        . . . 9 . . 7 7 7 . . . . 7 . .
        . . . 9 . . 7 e 7 . . . 7 6 . .
        . . . 9 7 8 8 7 7 7 7 7 7 7 7 .
        . . . 9 7 8 8 7 7 7 7 7 7 7 7 .
        . . . 9 . . 7 e 7 . . . 7 6 . .
        . . . 9 . . 7 7 7 . . . . 7 . .
        . . . . . . . 6 7 . . . . 7 . .
        . . . . . . . 7 7 . . . . . . .
        . . . . . . . 7 . . . . . . . .
        . . . . . . . 6 . . . . . . . .
        . . . . . . . . . . . . . . . .
    `,
    imgDown: img`
        . . . . . . . . . . . . . . . .
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
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `,
    imgRight: img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . 6 . . . . . . .
        . . . . . . . . 7 . . . . . . .
        . . . . . . . 7 7 . . . . . . .
        . . 7 . . . . 7 6 . . . . . . .
        . . 7 . . . . 7 7 7 . . 9 . . .
        . . 6 7 . . . 7 e 7 . . 9 . . .
        . 7 7 7 7 7 7 7 7 8 8 7 9 . . .
        . 7 7 7 7 7 7 7 7 8 8 7 9 . . .
        . . 6 7 . . . 7 e 7 . . 9 . . .
        . . 7 . . . . 7 7 7 . . 9 . . .
        . . 7 . . . . 7 6 . . . . . . .
        . . . . . . . 7 7 . . . . . . .
        . . . . . . . . 7 . . . . . . .
        . . . . . . . . 6 . . . . . . .
        . . . . . . . . . . . . . . . .
    `
}

const grayPlane: EnemyPlane = {
    imgUp: img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . 6 b . . . . . . .
        . . . . . . . 6 b . . . . . . .
        . . . . . . . 6 b . . . . . . .
        . . . . . . 6 6 6 b . . . . . .
        . . . . . . 6 8 8 b . . . . . .
        . . . . . 6 6 8 8 6 b . . . . .
        . . . . . 6 6 8 8 6 b . . . . .
        . . . . 6 6 6 6 6 6 6 b . . . .
        . . . . 6 6 6 6 6 6 6 b . . . .
        . . . 6 6 6 6 6 6 6 6 6 b . . .
        . . . 6 6 6 6 6 6 6 6 6 b . . .
        . . 6 6 6 6 6 6 6 6 6 6 6 b . .
        . 6 6 6 6 6 6 6 6 6 6 6 6 b b .
        . . . 2 4 2 . . . . 2 4 2 . . .
    `,
    imgLeft: img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . 6 .
        . . . . . . . . . . . . . 6 6 .
        . . . . . . . . . . . 6 6 6 6 2
        . . . . . . . . . 6 6 6 6 6 6 4
        . . . . . . . 6 6 6 6 6 6 6 6 2
        . . . . . 6 6 6 6 6 6 6 6 6 6 .
        . . 6 6 6 6 8 8 8 6 6 6 6 6 6 .
        . . b b b 6 8 8 8 6 6 6 6 6 6 .
        . . . . . b b 6 6 6 6 6 6 6 6 .
        . . . . . . . b b 6 6 6 6 6 6 2
        . . . . . . . . . b b 6 6 6 6 4
        . . . . . . . . . . . b b 6 6 2
        . . . . . . . . . . . . . b b .
        . . . . . . . . . . . . . . b .
        . . . . . . . . . . . . . . . .
    `,
    imgDown: img`
        . . . 2 4 2 . . . . 2 4 2 . . .
        . 6 6 6 6 6 6 6 6 6 6 6 6 b b .
        . . 6 6 6 6 6 6 6 6 6 6 6 b . .
        . . . 6 6 6 6 6 6 6 6 6 b . . .
        . . . 6 6 6 6 6 6 6 6 6 b . . .
        . . . . 6 6 6 6 6 6 6 b . . . .
        . . . . 6 6 6 6 6 6 6 b . . . .
        . . . . . 6 6 8 8 6 b . . . . .
        . . . . . 6 6 8 8 6 b . . . . .
        . . . . . . 6 8 8 b . . . . . .
        . . . . . . 6 6 6 b . . . . . .
        . . . . . . . 6 b . . . . . . .
        . . . . . . . 6 b . . . . . . .
        . . . . . . . 6 b . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `,
    imgRight: img`
        . . . . . . . . . . . . . . . .
        . 6 . . . . . . . . . . . . . .
        . 6 6 . . . . . . . . . . . . .
        2 6 6 6 6 . . . . . . . . . . .
        4 6 6 6 6 6 6 . . . . . . . . .
        2 6 6 6 6 6 6 6 6 . . . . . . .
        . 6 6 6 6 6 6 6 6 6 6 . . . . .
        . 6 6 6 6 6 6 8 8 8 6 6 6 6 . .
        . 6 6 6 6 6 6 8 8 8 6 b b b . .
        . 6 6 6 6 6 6 6 6 b b . . . . .
        2 6 6 6 6 6 6 b b . . . . . . .
        4 6 6 6 6 b b . . . . . . . . .
        2 6 6 b b . . . . . . . . . . .
        . b b . . . . . . . . . . . . .
        . b . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `
}
const redPlane: EnemyPlane = {
    imgUp: img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . 9 9 9 8 9 9 9 . . . .
        . . . . . . 2 2 2 2 2 . . . . .
        . . . . . 2 2 2 2 2 2 2 . . . .
        . 4 4 3 3 3 3 9 8 c 2 2 2 2 c c
        . 4 3 3 3 3 3 9 8 c 2 2 2 2 2 c
        . 4 4 3 3 3 3 9 8 c 2 2 2 2 c c
        . . . 4 4 3 3 3 2 2 2 2 c c . .
        . . . . . 4 4 3 2 2 c c . . . .
        . . . . . . . 2 2 2 . . . . . .
        . . . . . . . 2 2 2 . . . . . .
        . . . . . . . 2 2 2 . . . . . .
        . . . . . 2 2 2 c 2 2 2 . . . .
        . . . . . . . . 2 . . . . . . .
        . . . . . . . . 2 . . . . . . .
    `,
    imgLeft: img`
        . . . . . . . . . . . . . . . .
        . . . . . 4 4 4 . . . . . . . .
        . . . . . 4 3 4 . . . . . . . .
        . . . . . 3 3 3 4 . . . . . . .
        . . . . . 3 3 3 4 . . . . . . .
        . . 9 . 2 3 3 3 3 4 . . . 2 . .
        . . 9 2 2 3 3 3 3 4 . . . 2 . .
        . . 9 2 2 9 9 9 3 3 2 2 2 2 . .
        . . 8 2 2 8 8 8 2 2 2 2 2 c 2 2
        . . 9 2 2 c c c 2 2 2 2 2 2 . .
        . . 9 2 2 2 2 2 2 c . . . 2 . .
        . . 9 . 2 2 2 2 2 c . . . 2 . .
        . . . . . 2 2 2 c . . . . . . .
        . . . . . 2 2 2 c . . . . . . .
        . . . . . c 2 c . . . . . . . .
        . . . . . c c c . . . . . . . .
    `,
    imgDown: img`
        . . . . . . . . 2 . . . . . . .
        . . . . . . . . 2 . . . . . . .
        . . . . . 2 2 2 c 2 2 2 . . . .
        . . . . . . . 2 2 2 . . . . . .
        . . . . . . . 2 2 2 . . . . . .
        . . . . . . . 2 2 2 . . . . . .
        . . . . . 4 4 3 2 2 c c . . . .
        . . . 4 4 3 3 3 2 2 2 2 c c . .
        . 4 4 3 3 3 3 9 8 c 2 2 2 2 c c
        . 4 3 3 3 3 3 9 8 c 2 2 2 2 2 c
        . 4 4 3 3 3 3 9 8 c 2 2 2 2 c c
        . . . . . 2 2 2 2 2 2 2 . . . .
        . . . . . . 2 2 2 2 2 . . . . .
        . . . . . 9 9 9 8 9 9 9 . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `,
    imgRight: img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . 4 4 4 . . . . .
        . . . . . . . . 4 3 4 . . . . .
        . . . . . . . 4 3 3 3 . . . . .
        . . . . . . . 4 3 3 3 . . . . .
        . . 2 . . . 4 3 3 3 3 2 . 9 . .
        . . 2 . . . 4 3 3 3 3 2 2 9 . .
        . . 2 2 2 2 3 3 9 9 9 2 2 9 . .
        2 2 c 2 2 2 2 2 8 8 8 2 2 8 . .
        . . 2 2 2 2 2 2 c c c 2 2 9 . .
        . . 2 . . . c 2 2 2 2 2 2 9 . .
        . . 2 . . . c 2 2 2 2 2 . 9 . .
        . . . . . . . c 2 2 2 . . . . .
        . . . . . . . c 2 2 2 . . . . .
        . . . . . . . . c 2 c . . . . .
        . . . . . . . . c c c . . . . .
    `
}
const bigPlane: EnemyPlane = {
    imgUp: img`
        . . . . . . . . . . . 2 . . . . . . . . . . . .
        . . . . . . . . . . 2 7 2 . . . . . . . . . . .
        . . . . 1 9 9 9 b . 7 2 7 . 1 9 9 9 b . . . . .
        . . . . . . 7 . . . 2 7 2 . . . 7 . . . . . . .
        . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . . .
        d 7 7 7 7 7 d d d d 7 7 7 b b b b 7 7 7 7 7 7 b
        . d d d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 b b b b .
        . . . . d d d 7 7 7 7 7 7 7 7 7 b b b . . . . .
        . . . . . . . d d 7 2 7 2 7 b b . . . . . . . .
        . . . . . . . . . d 7 2 7 b . . . . . . . . . .
        . . . . . . . . . . 7 7 7 . . . . . . . . . . .
        . . . . . . . . . . 7 7 7 . . . . . . . . . . .
        . . . . . . . . . . 7 7 7 . . . . . . . . . . .
        . . . . . . . . . . 7 7 7 . . . . . . . . . . .
        . . . . . . . . . . 7 7 7 . . . . . . . . . . .
        . . . . . . . b b b 7 7 7 b b b . . . . . . . .
        . . . . . . . 7 7 7 7 7 7 7 7 7 . . . . . . . .
        . . . . . . . . . . 7 7 7 . . . . . . . . . . .
        . . . . . . . . . . . 2 . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `,
    imgLeft: img`
        . . . . . d . . . . . . . . . . . . . .
        . . . . . 7 d . . . . . . . . . . . . .
        . . . . . 7 7 . . . . . . . . . . . . .
        . . . . . 7 7 . . . . . . . . . . . . .
        . . b . . 7 7 d . . . . . . . . . . . .
        . . 9 . 7 7 7 7 . . . . . . . . . . . .
        . . 9 7 7 d 7 7 . . . . . . . . . . . .
        . . 9 . 7 d 7 7 d . . . . . . b 7 . . .
        . . 1 . 7 d 7 7 7 . . . . . . b 7 . . .
        . . . . 7 d 7 7 7 d . . . . . b 7 . . .
        . 2 7 2 7 7 7 7 2 7 7 7 7 7 7 7 7 7 . .
        2 7 2 7 7 7 7 7 7 2 7 7 7 7 7 7 7 7 2 .
        . 2 7 2 7 7 7 7 2 7 7 7 7 7 7 7 7 7 . .
        . . . . 7 b 7 7 7 b . . . . . b 7 . . .
        . . b . 7 b 7 7 7 . . . . . . b 7 . . .
        . . 9 . 7 b 7 7 b . . . . . . b 7 . . .
        . . 9 7 7 b 7 7 . . . . . . . . . . . .
        . . 9 . 7 7 7 7 . . . . . . . . . . . .
        . . 1 . . 7 7 b . . . . . . . . . . . .
        . . . . . 7 7 . . . . . . . . . . . . .
        . . . . . 7 7 . . . . . . . . . . . . .
        . . . . . 7 7 . . . . . . . . . . . . .
        . . . . . 7 b . . . . . . . . . . . . .
        . . . . . b . . . . . . . . . . . . . .
    `,
    imgDown: img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . 2 . . . . . . . . . . . .
        . . . . . . . . . . 7 7 7 . . . . . . . . . . .
        . . . . . . . 7 7 7 7 7 7 7 7 7 . . . . . . . .
        . . . . . . . b b b 7 7 7 b b b . . . . . . . .
        . . . . . . . . . . 7 7 7 . . . . . . . . . . .
        . . . . . . . . . . 7 7 7 . . . . . . . . . . .
        . . . . . . . . . . 7 7 7 . . . . . . . . . . .
        . . . . . . . . . . 7 7 7 . . . . . . . . . . .
        . . . . . . . . . . 7 7 7 . . . . . . . . . . .
        . . . . . . . . . d 7 2 7 b . . . . . . . . . .
        . . . . . . . d 7 7 2 7 2 7 7 b . . . . . . . .
        . . . . d 7 7 7 7 7 7 7 7 7 7 7 7 7 b . . . . .
        . d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 b .
        d 7 7 7 7 7 d d d d 7 7 7 b b b b 7 7 7 7 7 7 b
        . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . . .
        . . . . . . 7 . . . 2 7 2 . . . 7 . . . . . . .
        . . . . b d d d 1 . 7 2 7 . b d d d 1 . . . . .
        . . . . . . . . . . 2 7 2 . . . . . . . . . . .
        . . . . . . . . . . . 2 . . . . . . . . . . . .
    `,
    imgRight: img`
        . . . . . . . . . . . . . . d . . . . .
        . . . . . . . . . . . . . d 7 . . . . .
        . . . . . . . . . . . . . 7 7 . . . . .
        . . . . . . . . . . . . . 7 7 . . . . .
        . . . . . . . . . . . . d 7 7 . . 1 . .
        . . . . . . . . . . . . 7 7 7 7 . 9 . .
        . . . . . . . . . . . . 7 7 d 7 7 9 . .
        . . . 7 b . . . . . . d 7 7 d 7 . 9 . .
        . . . 7 b . . . . . . 7 7 7 d 7 . b . .
        . . . 7 b . . . . . d 7 7 7 d 7 . . . .
        . . 7 7 7 7 7 7 7 7 7 2 7 7 7 7 2 7 2 .
        . 2 7 7 7 7 7 7 7 7 2 7 7 7 7 7 7 2 7 2
        . . 7 7 7 7 7 7 7 7 7 2 7 7 7 7 2 7 2 .
        . . . 7 b . . . . . b 7 7 7 b 7 . . . .
        . . . 7 b . . . . . . 7 7 7 b 7 . 1 . .
        . . . 7 b . . . . . . b 7 7 b 7 . 9 . .
        . . . . . . . . . . . . 7 7 b 7 7 9 . .
        . . . . . . . . . . . . 7 7 7 7 . 9 . .
        . . . . . . . . . . . . b 7 7 . . b . .
        . . . . . . . . . . . . . 7 7 . . . . .
        . . . . . . . . . . . . . 7 7 . . . . .
        . . . . . . . . . . . . . 7 7 . . . . .
        . . . . . . . . . . . . . b 7 . . . . .
        . . . . . . . . . . . . . . b . . . . .
    `
}

function randomPlane() {
    switch (Math.randomRange(0, 2)) {
        case 0: return greenPlane
        case 1: return redPlane
        default: return grayPlane
    }
}

function shoot() {
    const projectileImg = img`
        1
        1
    `
    if (weaponLevel >= 1) {
        sprites.createProjectileFromSprite(projectileImg, plane, 0, -100)
    }
    if (weaponLevel >= 2) {
        sprites.createProjectileFromSprite(projectileImg, plane, -50, -87)
        sprites.createProjectileFromSprite(projectileImg, plane, 50, -87)
    }
    if (weaponLevel >= 3) {
        sprites.createProjectileFromSprite(projectileImg, plane, -87, -50)
        sprites.createProjectileFromSprite(projectileImg, plane, 87, -50)
    }
}

function gotHit(player2: Sprite, otherSprite: Sprite) {
    if (weaponLevel > 1) {
        weaponLevel += 0 - 1
    } else {
        info.changeLifeBy(-1)
    }
    player2.startEffect(effects.spray, 200)
    otherSprite.destroy(effects.fire, 100)
}

sprites.onOverlap(SpriteKind.Projectile, SpriteKind.BigEnemy, function (projectile, bigEnemy) {
    hits = sprites.readDataNumber(bigEnemy, "hits") - 1
    if (hits == 0) {
        bigEnemy.destroy(effects.fire, 800)
        info.changeScoreBy(10)
    } else {
        sprites.setDataNumber(bigEnemy, "hits", hits)
    }
    projectile.destroy()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.EnemyProjectile, function (player2, otherSprite) {
    gotHit(player2, otherSprite)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.BigEnemy, function (player2, otherSprite) {
    gotHit(player2, otherSprite)
})
sprites.onOverlap(SpriteKind.Powerup, SpriteKind.Player, function (powerUp, player2) {
    weaponLevel += 1
    powerUp.destroy(effects.fountain, 300)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 100)
    sprite.destroy()
    info.changeScoreBy(10)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (player2, otherSprite) {
    gotHit(player2, otherSprite)
})


game.onUpdateInterval(1200, function () {
    sprites.allOfKind(SpriteKind.BigEnemy).forEach(function (enemy: Sprite, index: number) {
        const projectile = sprites.createProjectileFromSprite(img`
            5 2 5
            2 4 2
            5 2 5
        `, enemy, 0, 70)
        projectile.setKind(SpriteKind.EnemyProjectile)

    })
})

game.onUpdateInterval(5000, function () {
    if (Math.percentChance(10)) {
        const island = sprites.create(img`
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . b d b d . . . . d b . . . . . . . . .
            . . . . . . . . . . . d d d d d . . . . d d d d d . . . . . . .
            . . . . . . . b d b d b d d d d . . . . d d d d b . . . . . . .
            . . . . . . d d d d 7 7 7 7 7 7 d . . . . d d d d b . . . . . .
            . . . . . b d d 7 7 7 7 7 7 7 7 7 d . . . d d d d d d . . . . .
            . . . . b d d 7 7 7 6 7 7 7 6 7 7 7 d . . d 7 7 7 d d b . . . .
            . . . . d d 7 7 7 7 7 7 e 7 7 7 6 7 d . . d 7 7 7 7 d d d . . .
            . . . . d d 7 7 7 7 7 7 7 6 7 6 7 7 7 d . d 7 a 7 7 d d d d . .
            . . . b d d 7 7 e 7 5 6 7 7 7 7 7 d d d d d 7 7 7 7 7 7 d d . .
            . . b d d d 7 7 5 6 7 4 7 6 6 8 8 8 8 d d d d 7 7 7 7 7 7 b . .
            . . d d 7 7 7 e 7 7 6 7 7 7 8 9 8 9 8 8 d d d 7 7 7 7 7 7 d . .
            . . b d 7 7 7 7 7 7 7 6 7 7 8 8 9 8 9 8 8 d d 7 5 7 7 7 7 d . .
            . . b d 7 7 7 6 7 6 7 7 7 7 8 9 8 9 8 9 8 d d 7 7 a 7 7 d d . .
            . . d d 7 7 7 7 7 7 7 7 7 d d 8 8 8 8 8 d d d 7 5 7 7 7 d b . .
            . . b d 7 7 7 7 7 7 7 7 d d d d d d d d d d d 7 7 7 7 7 d d . .
            . . . d d d d d d d d 2 2 2 d d 2 2 2 d d d d 7 7 a 7 7 d d . .
            . . . b d d d d d d d 2 2 2 d d 2 2 2 d d d d 7 7 7 7 7 d b . .
            . . . b d d 7 7 7 7 7 2 2 2 d d 2 2 2 d d d d 7 7 a 7 7 d d . .
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
        `, SpriteKind.Food)
        island.setPosition(Math.randomRange(10, 100), -10)
        island.setVelocity(0, 5)
        island.setFlag(SpriteFlag.Ghost, true)
        island.z = -2
    }
})

game.onUpdateInterval(5000, function () {
    const enemy = sprites.create(bigPlane.imgDown, SpriteKind.BigEnemy)
    enemy.setVelocity(0, 20)
    enemy.setPosition(Math.randomRange(10, screen.width - 10), 0)
    sprites.setDataNumber(enemy, "hits", 3)
})

game.onUpdateInterval(3000, function () {
    const cloud = sprites.create(img`
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . 1 1 1 d . . 1 1 1 1 . . . . . . . 1 1 1 d . . . .
        . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 d . . . . . 1 1 1 1 1 . . . .
        . . . 1 1 1 1 1 1 1 1 1 1 1 d 1 1 d 1 1 1 . 1 1 1 1 1 1 1 d . .
        . 1 1 1 1 1 1 d d 1 1 1 1 1 1 1 1 1 1 1 1 d 1 1 1 d d 1 1 1 d .
        . 1 1 1 1 1 d 1 1 d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
        . 1 1 1 1 1 1 1 1 1 1 1 1 1 d d d d 1 1 1 1 1 1 1 1 1 1 1 1 1 d
        . . . 1 1 1 1 1 1 1 1 1 1 d 1 1 1 1 d 1 1 1 1 1 1 1 1 1 1 1 1 d
        . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d 1 1 1 d
        . . . 1 1 1 d 1 1 1 1 1 d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d
        . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d 1 1 1 1 1 1 1 1 .
        . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d 1 1 . .
        . . . . 1 1 1 1 1 1 1 1 1 1 d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . .
        . . . . . . . . . . 1 1 1 1 1 1 1 d 1 1 1 1 1 1 1 1 1 1 . . . .
        . . . . . . . . . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    `, SpriteKind.Food)
    cloud.setPosition(Math.randomRange(10, 100), -10)
    cloud.setVelocity(0, Math.randomRange(20, 50))
    cloud.setFlag(SpriteFlag.Ghost, true)
    cloud.z = -1
})

game.onUpdateInterval(3000, function () {
    if (Math.percentChance(50)) {
        const weaponPowerup = sprites.create(img`
            . . . . . . . .
            . . 7 7 7 7 7 .
            . 7 7 1 1 1 7 7
            . 7 7 1 7 1 7 7
            . 7 7 1 1 1 7 7
            . 7 7 1 7 7 7 7
            . 7 7 1 7 7 7 7
            . . 7 7 7 7 7 .
        `, SpriteKind.Powerup)
        weaponPowerup.setPosition(Math.randomRange(10, scene.screenWidth() - 10), Math.randomRange(10, scene.screenHeight() - 10))
        weaponPowerup.z = -1
        setInterval(function () {
            weaponPowerup.destroy()
        }, 3000)
    }
})

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    shoot()
})
game.onUpdateInterval(400, function () {
    if (controller.A.isPressed()) {
        shoot();
    }
})

game.onUpdateInterval(1000, function () {
    const currentEnemy: EnemyPlane = randomPlane()
    const  x = Math.randomRange(7, scene.screenWidth())
    const  y = Math.randomRange(7, scene.screenHeight() - 30)
    const vx = Math.randomRange(50, 90)
    const vy = Math.randomRange(50, 90)
    const side = Math.randomRange(0, 2)
    if (side == 0) {
        for (let Index = 0; Index <= Math.randomRange(0, 3); Index++) {
            const enemy = sprites.create(currentEnemy.imgDown, SpriteKind.Enemy)
            enemy.setPosition(x, Index * -15)
            enemy.setVelocity(0, vy)
        }
    } else if (side == 1) {
        for (let Index = 0; Index <= Math.randomRange(0, 3); Index++) {
            const enemy = sprites.create(currentEnemy.imgLeft, SpriteKind.Enemy)
            enemy.setPosition(scene.screenWidth() + Index * 15, y)
            enemy.setVelocity(-vx, 0)
        }
    } else {
        for (let Index = 0; Index <= Math.randomRange(0, 3); Index++) {
            const enemy = sprites.create(currentEnemy.imgRight, SpriteKind.Enemy)
            enemy.setPosition(Index * -15, y)
            enemy.setVelocity(vx, 0)
        }
    }
})

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// onStart
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

let hits = 0
let weaponLevel = 1
scene.setBackgroundColor(9)
let plane = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . 4 4 . . . . . . .
    . . . 4 . . . 4 4 . . . 4 . . .
    . . 9 9 9 . 4 8 8 e . 9 9 9 . .
    . . . 4 . . 4 8 8 e . . 4 . . .
    . 4 4 4 4 4 4 4 4 4 4 4 4 4 4 .
    4 4 e e e e e e b b b b b b 4 e
    . 6 4 4 4 4 4 4 4 4 4 4 4 4 6 .
    . . . 4 e . . . . . . 4 e . . .
    . . . 4 e . . . . . . 4 e . . .
    . . . 4 e . . . . . . 4 e . . .
    . . 4 4 4 e . . . . 4 4 4 e . .
    . . 3 4 2 3 e e e e 3 2 4 3 . .
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 e
    . . . 4 e . . . . . . 4 e . . .
`, SpriteKind.Player)
plane.y = 110
controller.moveSprite(plane)
plane.setFlag(SpriteFlag.StayInScreen, true)

info.setLife(5)

namespace SpriteKind {
    export const Zol = SpriteKind.create()
    export const Throwable = SpriteKind.create()
    export const Echo_zol = SpriteKind.create()
}
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (controller.A.isPressed() && steinsjekk == 0) {
        for (let value of [
        CollisionDirection.Left,
        CollisionDirection.Top,
        CollisionDirection.Right,
        CollisionDirection.Bottom
        ]) {
            if (tiles.tileIsWall(tiles.locationInDirection(tiles.locationOfSprite(zelda), value))) {
                if (tiles.tileIs(tiles.locationInDirection(tiles.locationOfSprite(zelda), value), assets.tile`myTile0`)) {
                    tiles.setTileAt(tiles.locationInDirection(tiles.locationOfSprite(zelda), value), assets.tile`myTile2`)
                    tiles.setWallAt(tiles.locationInDirection(tiles.locationOfSprite(zelda), value), false)
                    steinsjekk = 1
                    Rock.setImage(assets.image`carry_rock`)
                }
            }
        }
    }
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    direction = 1
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Echo_zol, function (sprite, otherSprite) {
    animation.stopAnimation(animation.AnimationTypes.All, zol_echo_shimmer)
    zol_echo_shimmer.setImage(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    game.showLongText("Hey listen!you found a echo!", DialogLayout.Bottom)
    game.showLongText("This is how you use it:", DialogLayout.Bottom)
    game.showLongText("Press B to spawn an echo.", DialogLayout.Bottom)
    game.showLongText("Hold B to Destroy echoes.", DialogLayout.Bottom)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (steinsjekk == 1) {
        Rock.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
        steinsjekk = 0
        if (direction == 0) {
            projectile = sprites.createProjectileFromSprite(assets.image`carry_rock`, Rock, -50, 10)
            zelda.setImage(assets.image`Zelda_left`)
        } else if (direction == 1) {
            projectile = sprites.createProjectileFromSprite(assets.image`carry_rock`, Rock, 0, -50)
            zelda.setImage(assets.image`Zelda_back`)
        } else if (direction == 2) {
            projectile = sprites.createProjectileFromSprite(assets.image`carry_rock`, Rock, 50, 10)
            zelda.setImage(assets.image`zelda_right`)
        } else if (direction == 3) {
            projectile = sprites.createProjectileFromSprite(assets.image`carry_rock`, Rock, 0, 50)
            zelda.setImage(assets.image`Zelda_front`)
        }
        pause(800)
        sprites.destroy(projectile)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Zol, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    zelda.startEffect(effects.warmRadial, 100)
    otherSprite.follow(zelda, 0)
    pause(1000)
    otherSprite.follow(zelda, 20)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    direction = 0
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    direction = 2
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    direction = 3
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Zol, function (sprite, otherSprite) {
    if (zol_kill_count == 0) {
        zol_echo_shimmer.setPosition(otherSprite.x, otherSprite.y)
        zol_echo_shimmer.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f 5 5 5 5 5 5 f . . . . 
            . . . f 5 5 5 1 1 5 5 5 f . . . 
            . . f 5 5 5 1 1 1 1 5 5 5 f . . 
            . . f 9 5 5 5 1 1 5 5 5 9 f . . 
            . . f 5 9 5 5 5 5 5 5 9 5 f . . 
            . . f 9 5 5 f 5 5 f 5 5 9 f . . 
            . . f 5 9 5 f 5 5 f 5 9 5 f . . 
            . . f f 5 5 5 5 5 5 5 5 f f . . 
            . . . f f 5 5 5 5 5 5 f f . . . 
            . . . . f f f f f f f f . . . . 
            `)
        zol_echo_shimmer.startEffect(effects.starField)
        animation.runImageAnimation(
        zol_echo_shimmer,
        assets.animation`Zol_echo_shimmer_animation`,
        500,
        true
        )
    }
    sprites.destroy(otherSprite, effects.disintegrate, 100)
    sprites.destroy(sprite, effects.ashes, 100)
    zol_kill_count += 1
})
let zol_kill_count = 0
let projectile: Sprite = null
let direction = 0
let woltzol: Sprite = null
let zelda: Sprite = null
let steinsjekk = 0
let Rock: Sprite = null
let zol_echo_shimmer: Sprite = null
zol_echo_shimmer = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Echo_zol)
Rock = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Throwable)
steinsjekk = 0
zelda = sprites.create(assets.image`Zelda_front`, SpriteKind.Player)
scene.cameraFollowSprite(zelda)
tiles.setCurrentTilemap(tilemap`level2`)
Rock.setFlag(SpriteFlag.GhostThroughWalls, true)
info.setLife(5)
for (let value of tiles.getTilesByType(assets.tile`myTile`)) {
    woltzol = sprites.create(assets.image`Gust_zol`, SpriteKind.Zol)
    tiles.placeOnTile(woltzol, value)
    animation.runImageAnimation(
    woltzol,
    assets.animation`Gust_zol_Animation`,
    650,
    true
    )
    woltzol.follow(zelda, 20)
}
game.onUpdate(function () {
    if (steinsjekk == 1) {
        controller.moveSprite(zelda, 27, 27)
        Rock.setPosition(zelda.x, zelda.top - 6)
        if (zelda.vx < 0) {
            if (Math.round(zelda.x / 10) % 2 == 0) {
                zelda.setImage(assets.image`Zelda_left_rock`)
            } else {
                zelda.setImage(assets.image`Zelda_left_rock_alt`)
            }
        } else if (zelda.vx > 0) {
            if (Math.round(zelda.x / 10) % 2 == 0) {
                zelda.setImage(assets.image`zelda_right_rock`)
            } else {
                zelda.setImage(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . f f f f f . . . . . 
                    . . . . . f c f f c c f f . . . 
                    . . . . f c f d d f c 5 5 f . . 
                    . . . f c c f d d f 5 5 5 f . . 
                    . . f c c c f f f f 5 5 f f . . 
                    . . f c c c f 1 1 f f f f . . . 
                    . . . f c c f 1 1 f d f d f f . 
                    . . . . f f f 1 1 f d f d d f . 
                    . . . . . f f 1 1 f d d d f . . 
                    . . . . . f f 1 1 f d 3 f . . . 
                    . . . . f f 6 f f a f f . . . . 
                    . . . f e f c 1 1 a a f . . . . 
                    . . . f e f f 1 1 a f f f . . . 
                    . . . f e e f f f f e e e f . . 
                    . . f f f f f f f f f f f f . . 
                    `)
            }
        } else if (zelda.vy > 0) {
            if (Math.round(zelda.y / 10) % 2 == 0) {
                zelda.setImage(assets.image`Zelda_front_stone`)
            } else {
                zelda.setImage(assets.image`Zelda_front_rock_alt`)
            }
        } else if (zelda.vy < 0) {
            if (0 == Math.round(zelda.y / 10) % 2) {
                zelda.setImage(assets.image`Zelda_back_rock`)
            } else {
                zelda.setImage(assets.image`Zelda_back_rock_alt`)
            }
        } else {
        	
        }
    } else {
        controller.moveSprite(zelda, 51, 51)
        if (zelda.vx < 0) {
            if (Math.round(zelda.x / 10) % 2 == 0) {
                zelda.setImage(assets.image`Zelda_left`)
            } else {
                zelda.setImage(assets.image`Zelda_left_alt`)
            }
        } else if (zelda.vx > 0) {
            if (Math.round(zelda.x / 10) % 2 == 0) {
                zelda.setImage(assets.image`zelda_right`)
            } else {
                zelda.setImage(assets.image`Zelda_right_alt`)
            }
        } else if (zelda.vy > 0) {
            if (Math.round(zelda.y / 10) % 2 == 0) {
                zelda.setImage(assets.image`Zelda_front`)
            } else {
                zelda.setImage(assets.image`Zelda_front_alt`)
            }
        } else if (zelda.vy < 0) {
            if (0 == Math.round(zelda.y / 10) % 2) {
                zelda.setImage(assets.image`Zelda_back`)
            } else {
                zelda.setImage(assets.image`Zelda_back_alt`)
            }
        } else {
        	
        }
    }
})

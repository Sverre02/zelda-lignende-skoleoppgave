namespace SpriteKind {
    export const Zol = SpriteKind.create()
    export const Throwable = SpriteKind.create()
    export const Echo_zol = SpriteKind.create()
    export const npc = SpriteKind.create()
    export const bar = SpriteKind.create()
    export const wand = SpriteKind.create()
    export const UI = SpriteKind.create()
    export const wall = SpriteKind.create()
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
                if (tiles.tileIs(tiles.locationInDirection(tiles.locationOfSprite(zelda), value), assets.tile`Stone`)) {
                    tiles.setTileAt(tiles.locationInDirection(tiles.locationOfSprite(zelda), value), assets.tile`Stone_replacementile`)
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
    effects.clearParticles(zol_echo_shimmer)
    zol_echo_shimmer.setImage(assets.image`empty`)
    game.setDialogFrame(assets.image`Info_box`)
    game.showLongText("You found a echo!", DialogLayout.Bottom)
    has_voltzol_echo += 1
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (steinsjekk == 1) {
        Rock.setImage(assets.image`empty`)
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
function LoadLevel (Level: number) {
    sprites.destroyAllSpritesOfKind(SpriteKind.npc)
    sprites.destroyAllSpritesOfKind(SpriteKind.wall)
    sprites.destroyAllSpritesOfKind(SpriteKind.bar)
    if (Level == 1) {
        lev = 1
        tiles.loadMap(tiles.createMap(tilemap`level2`))
    } else if (Level == 2) {
        lev = 2
        tiles.loadMap(tiles.createMap(tilemap`level9`))
    }
}
tiles.onMapLoaded(function (tilemap2) {
    if (lev == 1) {
        tiles.setWallAt(tiles.getTileLocation(7, 0), true)
        wall_hole = sprites.create(assets.image`Wall_hole`, SpriteKind.wall)
        bar2 = sprites.create(assets.image`Gate`, SpriteKind.bar)
        tiles.placeOnTile(wall_hole, tiles.getTileLocation(7, 0))
        tiles.placeOnTile(bar2, tiles.getTileLocation(7, 0))
        wall_hole.z = 1
        music.play(music.createSong(assets.song`Battle`), music.PlaybackMode.LoopingInBackground)
        game.setGameOverEffect(false, effects.melt)
        game.setGameOverPlayable(false, music.melodyPlayable(music.spooky), true)
        Henry_the_turmit = sprites.create(assets.image`empty`, SpriteKind.npc)
        for (let value2 of tiles.getTilesByType(assets.tile`Zol_placeholder`)) {
            woltzol = sprites.create(assets.image`Gust_zol`, SpriteKind.Enemy)
            tiles.placeOnTile(woltzol, value2)
            animation.runImageAnimation(
            woltzol,
            assets.animation`Gust_zol_Animation`,
            650,
            true
            )
            woltzol.follow(zelda, 20)
        }
    } else if (lev == 2) {
        for (let value of tiles.getTilesByType(assets.tile`Door_Placeholder`)) {
            dungeon_wall = sprites.create(assets.image`Dungeon doorway`, SpriteKind.wall)
            bar2 = sprites.create(assets.image`Gate`, SpriteKind.bar)
            tiles.placeOnTile(dungeon_wall, value)
            dungeon_wall.z = 1
            tiles.placeOnTile(bar2, value)
        }
        tiles.placeOnTile(zelda, tiles.getTileLocation(5, 9))
        zelda.setImage(assets.image`Zelda_back`)
        pause(500)
        tiles.setTileAt(tiles.getTileLocation(5, 10), assets.tile`Dungeon_wall_top0`)
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    direction = 0
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.bar, function (sprite, otherSprite) {
    LoadLevel(2)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    direction = 2
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    direction = 3
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.wand, function (sprite, otherSprite) {
    sprites.destroy(wand2)
    game.setDialogFrame(assets.image`Info_box`)
    game.showLongText("You Got a wand", DialogLayout.Bottom)
    animation.runImageAnimation(
    bar2,
    assets.animation`Bar_animation`,
    500,
    false
    )
    pause(5000)
    tiles.setWallAt(tiles.getTileLocation(7, 0), false)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (otherSprite == woltzol) {
        if (zol_kill_count == 0) {
            zol_echo_shimmer = sprites.create(assets.image`zol`, SpriteKind.Echo_zol)
            zol_echo_shimmer.setPosition(otherSprite.x, otherSprite.y)
            zol_echo_shimmer.setImage(assets.image`zol`)
            zol_echo_shimmer.startEffect(effects.starField)
            animation.runImageAnimation(
            zol_echo_shimmer,
            assets.animation`Zol_echo_shimmer_animation`,
            500,
            true
            )
        }
        zol_kill_count += 1
    }
    sprites.destroy(otherSprite, effects.disintegrate, 100)
    sprites.destroy(sprite, effects.ashes, 100)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    zelda.startEffect(effects.fire, 100)
    otherSprite.follow(zelda, 0)
    if (otherSprite == woltzol) {
        pause(1000)
        otherSprite.follow(zelda, 20)
    }
})
let zol_kill_count = 0
let wand2: Sprite = null
let dungeon_wall: Sprite = null
let woltzol: Sprite = null
let Henry_the_turmit: Sprite = null
let bar2: Sprite = null
let wall_hole: Sprite = null
let lev = 0
let projectile: Sprite = null
let has_voltzol_echo = 0
let zol_echo_shimmer: Sprite = null
let direction = 0
let steinsjekk = 0
let Rock: Sprite = null
let zelda: Sprite = null
LoadLevel(1)
zelda = sprites.create(assets.image`Zelda_front`, SpriteKind.Player)
Rock = sprites.create(assets.image`empty`, SpriteKind.Throwable)
scene.cameraFollowSprite(zelda)
info.setLife(5)
let A = sprites.create(assets.image`empty`, SpriteKind.UI)
A.setFlag(SpriteFlag.RelativeToCamera, true)
A.setPosition(150, 109)
Rock.setFlag(SpriteFlag.GhostThroughWalls, true)
game.onUpdate(function () {
    if (info.life() == 1) {
        music.play(music.melodyPlayable(music.sonar), music.PlaybackMode.UntilDone)
    }
    A.setImage(assets.image`empty`)
    if (1 == zol_kill_count && has_voltzol_echo == 1 && lev == 1) {
        music.stopAllSounds()
        music.play(music.createSong(assets.song`You_did_it`), music.PlaybackMode.InBackground)
        Henry_the_turmit = sprites.create(assets.image`Henry_the_turmit`, SpriteKind.npc)
        zol_kill_count = 0
        tiles.placeOnRandomTile(Henry_the_turmit, assets.tile`Henry_hiding`)
        Henry_the_turmit.setImage(assets.image`Henry_the_turmit`)
        animation.runImageAnimation(
        Henry_the_turmit,
        assets.animation`Henry_animation`,
        500,
        true
        )
        tiles.setTileAt(tiles.getTileLocation(9, 1), assets.tile`myTile4`)
        has_voltzol_echo = 5
    }
    if (tiles.tileIs(tiles.locationInDirection(tiles.locationOfSprite(zelda), CollisionDirection.Top), assets.tile`myTile4`)) {
        game.setDialogFrame(assets.image`Henry_plate`)
        A.setImage(assets.image`Button`)
        if (controller.A.isPressed() && 5 == has_voltzol_echo) {
            has_voltzol_echo += 1
            game.showLongText("Hello there. Thanks for taking care of Those pesky zols. My name is Henry the Turmit. Vendor of rare goods. As a thank you i will open the door over there", DialogLayout.Bottom)
            game.showLongText("Hey is that a echo shimmer. If you have a wand you can use it to have a enemy help you fight. HUH! you don't have a wand. Convenient that i have one in my stock right now. Do you want it?", DialogLayout.Bottom)
            wand2 = sprites.create(assets.image`Wand`, SpriteKind.wand)
            wand2.setPosition(Henry_the_turmit.left - 6, Henry_the_turmit.y)
            animation.runImageAnimation(
            wand2,
            assets.animation`wand animation`,
            1000,
            true
            )
        }
        if (controller.A.isPressed() && 6 == has_voltzol_echo) {
            A.setImage(assets.image`Button`)
            game.showLongText("Go ahead try it ", DialogLayout.Bottom)
        }
    }
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
                zelda.setImage(assets.image`zelda_right_rock_alt`)
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

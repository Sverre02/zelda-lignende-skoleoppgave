namespace SpriteKind {
    export const Zol = SpriteKind.create()
    export const Throwable = SpriteKind.create()
    export const Echo_shimmer = SpriteKind.create()
    export const npc = SpriteKind.create()
    export const bar = SpriteKind.create()
    export const wand = SpriteKind.create()
    export const UI = SpriteKind.create()
    export const wall = SpriteKind.create()
    export const Zol_echo = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.bar, function (sprite3, otherSprite2) {
    LoadLevel(2)
})
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
                } else if (tiles.tileIs(tiles.locationInDirection(tiles.locationOfSprite(zelda), value), assets.tile`bottle`)) {
                    tiles.setTileAt(tiles.locationInDirection(tiles.locationOfSprite(zelda), value), assets.tile`Dungeon floor`)
                    tiles.setWallAt(tiles.locationInDirection(tiles.locationOfSprite(zelda), value), false)
                    steinsjekk = 2
                    Rock.setImage(assets.image`Carry_bottle`)
                }
            }
        }
    }
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    direction = 1
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    Zol_echo2.setImage(assets.image`Wolt_zol`)
    animation.runImageAnimation(
    Zol_echo2,
    assets.animation`Wolt_zol_Animation`,
    650,
    true
    )
    if (direction == 0) {
        Zol_echo2.right = zelda.left
        Zol_echo2.y = zelda.y
    } else if (direction == 1) {
        Zol_echo2.bottom = zelda.top
        Zol_echo2.x = zelda.x
    } else if (direction == 2) {
        Zol_echo2.left = zelda.right
        Zol_echo2.y = zelda.y
    } else if (direction == 3) {
        Zol_echo2.top = zelda.bottom
        Zol_echo2.x = zelda.x
        nearest_enemy = null
shorted_distance = 9999999999
    }
    for (let value2 of sprites.allOfKind(SpriteKind.Enemy)) {
        Echo_matte = Math.sqrt(Math.abs(value2.x - zelda.x) ** 2 + Math.abs(value2.y - zelda.y) ** 2)
        if (Echo_matte < shorted_distance) {
            nearest_enemy = value2
        }
    }
    Zol_echo2.follow(nearest_enemy)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Echo_shimmer, function (sprite2, otherSprite) {
    animation.stopAnimation(animation.AnimationTypes.All, zol_echo_shimmer)
    effects.clearParticles(zol_echo_shimmer)
    zol_echo_shimmer.setImage(assets.image`empty`)
    game.setDialogFrame(assets.image`Info_box`)
    game.showLongText("You found a echo!", DialogLayout.Bottom)
    has_voltzol_echo += 1
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (steinsjekk >= 1) {
        Rock.setImage(assets.image`empty`)
        if (steinsjekk == 1) {
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
        } else if (steinsjekk == 2) {
            if (direction == 0) {
                projectile = sprites.createProjectileFromSprite(assets.image`Carry_bottle`, Rock, -50, 10)
                zelda.setImage(assets.image`Zelda_left`)
            } else if (direction == 1) {
                projectile = sprites.createProjectileFromSprite(assets.image`Carry_bottle`, Rock, 0, -50)
                zelda.setImage(assets.image`Zelda_back`)
            } else if (direction == 2) {
                projectile = sprites.createProjectileFromSprite(assets.image`Carry_bottle`, Rock, 50, 10)
                zelda.setImage(assets.image`zelda_right`)
            } else if (direction == 3) {
                projectile = sprites.createProjectileFromSprite(assets.image`Carry_bottle`, Rock, 0, 50)
                zelda.setImage(assets.image`Zelda_front`)
            }
        }
        steinsjekk = 0
        pause(800)
        if (randint(0, 1) == 0) {
            Heart.setImage(assets.image`Heart`)
            Heart.setPosition(projectile.x, projectile.y)
            animation.runImageAnimation(
            Heart,
            assets.animation`Heart_animation`,
            500,
            true
            )
        }
        sprites.destroy(projectile, effects.ashes, 100)
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
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    direction = 0
})
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
        for (let value22 of tiles.getTilesByType(assets.tile`Zol_placeholder`)) {
            woltzol = sprites.create(assets.image`Wolt_zol`, SpriteKind.Enemy)
            tiles.placeOnTile(woltzol, value22)
            animation.runImageAnimation(
            woltzol,
            assets.animation`Wolt_zol_Animation`,
            650,
            true
            )
            woltzol.follow(zelda, 20)
        }
    } else if (lev == 2) {
        for (let value3 of tiles.getTilesByType(assets.tile`Door_Placeholder`)) {
            dungeon_wall = sprites.create(assets.image`Dungeon doorway`, SpriteKind.wall)
            bar2 = sprites.create(assets.image`Gate`, SpriteKind.bar)
            tiles.placeOnTile(dungeon_wall, value3)
            dungeon_wall.z = 1
            tiles.placeOnTile(bar2, value3)
        }
        tiles.placeOnTile(zelda, tiles.getTileLocation(5, 9))
        zelda.setImage(assets.image`Zelda_back`)
        pause(500)
        tiles.setTileAt(tiles.getTileLocation(5, 10), assets.tile`Dungeon_wall_top0`)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite4, otherSprite3) {
    sprites.destroy(Heart)
    if (info.life() == 5) {
    	
    } else {
        info.changeLifeBy(1)
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    direction = 2
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.wand, function (sprite5, otherSprite4) {
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
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    direction = 3
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite7, otherSprite6) {
    info.changeLifeBy(-1)
    zelda.startEffect(effects.fire, 100)
    otherSprite6.follow(zelda, 0)
    if (otherSprite6 == woltzol) {
        pause(1000)
        otherSprite6.follow(zelda, 20)
    }
})
function Animations () {
    if (steinsjekk >= 1) {
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
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite6, otherSprite5) {
    if (otherSprite5 == woltzol) {
        if (zol_kill_count == 0) {
            zol_echo_shimmer = sprites.create(assets.image`zol`, SpriteKind.Echo_shimmer)
            zol_echo_shimmer.setPosition(otherSprite5.x, otherSprite5.y)
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
    sprites.destroy(otherSprite5, effects.disintegrate, 100)
    sprites.destroy(sprite6, effects.ashes, 100)
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
let nearest_enemy: Sprite = null
let Echo_matte = 0
let shorted_distance = 0
let direction = 0
let steinsjekk = 0
let Zol_echo2: Sprite = null
let Rock: Sprite = null
let zelda: Sprite = null
let Heart: Sprite = null
LoadLevel(1)
let nearest_enemy2 = 0
let Echo_matte2 = 0
Heart = sprites.create(assets.image`empty`, SpriteKind.Food)
zelda = sprites.create(assets.image`Zelda_front`, SpriteKind.Player)
Rock = sprites.create(assets.image`empty`, SpriteKind.Throwable)
Zol_echo2 = sprites.create(img`
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
    `, SpriteKind.Zol_echo)
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
    Animations()
})

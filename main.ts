namespace SpriteKind {
    export const Zol = SpriteKind.create()
    export const Throwable = SpriteKind.create()
    export const Echo_shimmer = SpriteKind.create()
    export const npc = SpriteKind.create()
    export const wand = SpriteKind.create()
    export const UI = SpriteKind.create()
    export const wall = SpriteKind.create()
    export const echo = SpriteKind.create()
    export const Follow = SpriteKind.create()
    export const web = SpriteKind.create()
    export const hidden_door = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    direction = 1
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
                } else if (tiles.tileIs(tiles.locationInDirection(tiles.locationOfSprite(zelda), value), assets.tile`mimmic placeholder`)) {
                    tiles.setTileAt(tiles.locationInDirection(tiles.locationOfSprite(zelda), value), assets.tile`Dungeon floor`)
                    tiles.setWallAt(tiles.locationInDirection(tiles.locationOfSprite(zelda), value), false)
                    Rock_mimic.setImage(assets.image`Rockmimic_front`)
                    Mimic_check = 1
                    Cursed_rock = sprites.create(assets.image`Rock_mimmic_hiding`, SpriteKind.Enemy)
                    animation.runImageAnimation(
                    Cursed_rock,
                    assets.animation`Mimic_animation`,
                    500,
                    true
                    )
                    Rock_mimic.follow(zelda, 20)
                    Rock_mimic.z = 1
                    Cursed_rock.z = 1
                }
            }
        }
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite62, otherSprite52) {
    if (otherSprite52 == Cursed_rock) {
        animation.stopAnimation(animation.AnimationTypes.All, Cursed_rock)
        Cursed_rock.setImage(assets.image`rockbackfallen`)
        Rock_mimic.setImage(assets.image`fallen backmimic`)
        dot_on = 1
        Rock_mimic.follow(zelda, 0)
        pause(4000)
        animation.runImageAnimation(
        Cursed_rock,
        assets.animation`Mimic_animation`,
        500,
        true
        )
        dot_on = 0
        Rock_mimic.follow(zelda, 20)
    } else if (otherSprite52 == Rock_mimic) {
        animation.stopAnimation(animation.AnimationTypes.All, Cursed_rock)
        Cursed_rock.setImage(assets.image`rockbackfallen`)
        Rock_mimic.setImage(assets.image`fallen backmimic`)
        dot_on = 1
        Rock_mimic.follow(zelda, 0)
        pause(4000)
        animation.runImageAnimation(
        Cursed_rock,
        assets.animation`Mimic_animation`,
        500,
        true
        )
        dot_on = 0
        Rock_mimic.follow(zelda, 20)
    } else {
        kill_count += 1
        if (kill_count == 1 && Lvl == 1) {
            zol_echo_shimmer = sprites.create(assets.image`zol`, SpriteKind.Echo_shimmer)
            zol_echo_shimmer.setPosition(otherSprite52.x, otherSprite52.y)
            zol_echo_shimmer.setImage(assets.image`zol`)
            zol_echo_shimmer.startEffect(effects.starField)
            animation.runImageAnimation(
            zol_echo_shimmer,
            assets.animation`Zol_echo_shimmer_animation`,
            500,
            true
            )
        }
        sprites.destroy(otherSprite52, effects.disintegrate, 100)
        sprites.destroy(sprite62, effects.ashes, 100)
    }
})
sprites.onOverlap(SpriteKind.web, SpriteKind.echo, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.destroy(otherSprite)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    sprites.destroy(Zol_echo2)
    Zol_echo2 = sprites.create(assets.image`empty`, SpriteKind.echo)
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
    }
    shorted_distance = 99999
    nearest_enemy = sprites.create(assets.image`empty`, SpriteKind.Follow)
    if (sprites.allOfKind(SpriteKind.Enemy).length == 0) {
    	
    } else {
        for (let value2 of sprites.allOfKind(SpriteKind.Enemy)) {
            Echo_matte = Math.sqrt(Math.abs(value2.x - zelda.x) ** 2 + Math.abs(value2.y - zelda.y) ** 2)
            if (Echo_matte < shorted_distance) {
                nearest_enemy = value2
            }
        }
        Zol_echo2.follow(nearest_enemy, 20)
    }
})
function statusbar_rules_en () {
    statusbar = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    statusbar.setColor(2, 15, 5)
    statusbar.setBarBorder(1, 15)
    statusbar.max = 3
    statusbar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
    statusbar.setFlag(SpriteFlag.Invisible, true)
}
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
        pause(800)
        sprites.destroy(projectile, effects.ashes, 100)
    }
})
sprites.onOverlap(SpriteKind.web, SpriteKind.Player, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    info.changeLifeBy(-1)
})
function LoadLevel (Level: number) {
    sprites.destroyAllSpritesOfKind(SpriteKind.npc)
    sprites.destroyAllSpritesOfKind(SpriteKind.wall)
    if (Level == 1) {
        tiles.loadMap(tiles.createMap(tilemap`level2`))
        Lvl = 1
    } else if (Level == 2) {
        tiles.loadMap(tiles.createMap(tilemap`level9`))
        Lvl = 2
    } else if (Level == 3) {
        tiles.loadMap(tiles.createMap(tilemap`level3`))
        Lvl = 3
    } else if (Level == 4) {
        tiles.loadMap(tiles.createMap(tilemap`level`))
        Lvl = 4
    } else if (Level == 5) {
        tiles.loadMap(tiles.createMap(tilemap`level6`))
        Lvl = 5
    }
    sprites.destroyAllSpritesOfKind(SpriteKind.echo)
}
function dialog (who: string) {
    if (who == "Basic") {
        game.setDialogFrame(assets.image`Info_box`)
        game.setDialogCursor(assets.image`Basic button`)
    } else if (who == "Henry") {
        game.setDialogFrame(assets.image`Henry_plate`)
        game.setDialogCursor(assets.image`Rupee_cursor`)
    } else if (who == "Nayru") {
        game.setDialogFrame(assets.image`Nayru_dialogbox`)
        game.setDialogCursor(assets.image`Nayru dialoge`)
    }
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    direction = 0
})
scene.onOverlapTile(SpriteKind.echo, assets.tile`cable_off`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`cable_on`)
    electricity_on += 1
})
tiles.onMapLoaded(function (tilemap2) {
    for (let value3 of tiles.getTilesByType(assets.tile`Door_Placeholder_down`)) {
        bar_up = sprites.create(assets.image`Gate_top`, SpriteKind.wall)
        tiles.placeOnTile(bar_up, value3)
        tiles.setWallAt(value3, true)
    }
    for (let value4 of tiles.getTilesByType(assets.tile`Door_Placeholder_up`)) {
        Bar_down = sprites.create(assets.image`bar bottom`, SpriteKind.wall)
        tiles.placeOnTile(Bar_down, value4)
        tiles.setWallAt(value4, true)
    }
    for (let value5 of tiles.getTilesByType(assets.tile`Door_Placeholder_right`)) {
        Bar_left = sprites.create(assets.image`bar_left`, SpriteKind.wall)
        tiles.placeOnTile(Bar_left, value5)
        tiles.setWallAt(value5, true)
    }
    for (let value6 of tiles.getTilesByType(assets.tile`Door_Placeholder2`)) {
        Bar_right = sprites.create(assets.image`Bar_right`, SpriteKind.wall)
        tiles.placeOnTile(Bar_right, value6)
        tiles.setWallAt(value6, true)
    }
    if (Lvl == 1) {
        tiles.placeOnTile(bar_up, tiles.getTileLocation(7, 0))
        music.play(music.createSong(assets.song`Battle`), music.PlaybackMode.LoopingInBackground)
        game.setGameOverEffect(false, effects.melt)
        game.setGameOverPlayable(false, music.melodyPlayable(music.spooky), true)
        Henry_the_turmit = sprites.create(assets.image`empty`, SpriteKind.npc)
        for (let value7 of tiles.getTilesByType(sprites.builtin.forestTiles10)) {
            bar_basic = sprites.create(assets.image`Gate_top`, SpriteKind.wall)
            wall_hole = sprites.create(assets.image`Wall_hole`, SpriteKind.wall)
            wall_hole.z = 1010
            tiles.placeOnTile(wall_hole, value7)
            tiles.placeOnTile(bar_basic, value7)
            tiles.setWallAt(value7, true)
        }
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
    } else if (Lvl == 2) {
        tiles.placeOnTile(zelda, tiles.getTileLocation(5, 9))
    } else if (Lvl == 3) {
        tiles.placeOnTile(zelda, tiles.getTileLocation(7, 13))
        spoder = sprites.create(assets.image`Spider`, SpriteKind.Enemy)
        tiles.placeOnTile(spoder, tiles.getTileLocation(4, 3))
        spoder.follow(zelda, 10)
        animation.runImageAnimation(
        spoder,
        assets.animation`spodermation`,
        500,
        true
        )
        if (Math.percentChance(5)) {
            animation.runImageAnimation(
            spoder,
            assets.animation`spoderman`,
            500,
            true
            )
        }
        spoder2 = sprites.create(assets.image`Spider`, SpriteKind.Enemy)
        tiles.placeOnTile(spoder2, tiles.getTileLocation(10, 3))
        spoder2.follow(zelda, 10)
        animation.runImageAnimation(
        spoder2,
        assets.animation`spodermation`,
        500,
        true
        )
    } else if (Lvl == 4) {
        tiles.setWallAt(tiles.getTileLocation(3, 3), true)
        Rock_mimic = sprites.create(assets.image`Rock_mimmic_hiding`, SpriteKind.Enemy)
        tiles.placeOnTile(Rock_mimic, tiles.getTileLocation(3, 3))
    } else if (Lvl == 5) {
        tiles.placeOnTile(zelda, tiles.getTileLocation(1, 5))
        for (let value of tiles.getTilesByType(img`myTile5`)) {
            hidden_door = sprites.create(assets.image`hidden_door`, SpriteKind.hidden_door)
            tiles.placeOnTile(hidden_door, value)
        }
    }
})
sprites.onDestroyed(SpriteKind.Enemy, function (sprite8) {
    if (Lvl == 2 && mySprite == 1) {
        mySprite = 2
        animation.runImageAnimation(
        bar_up,
        assets.animation`Bar_animation_top`,
        500,
        false
        )
        tiles.setWallAt(tiles.getTileLocation(5, 0), false)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite4, otherSprite3) {
    sprites.destroy(Heart)
    if (info.life() == 5) {
    	
    } else {
        info.changeLifeBy(1)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.wand, function (sprite5, otherSprite4) {
    sprites.destroy(wand2)
    dialog("Basic")
    game.showLongText("You Got a wand", DialogLayout.Bottom)
    animation.runImageAnimation(
    bar_basic,
    assets.animation`Bar_animation_top`,
    500,
    false
    )
    pause(5000)
    tiles.setWallAt(tiles.getTileLocation(7, 0), false)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    direction = 2
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.wall, function (sprite3, otherSprite2) {
    if (Lvl == 1) {
        dialog("Henry")
        game.showLongText("Hey you think you can just walk of with that wand.\\n you don't have any money well you touch it you bye it so you have to pay me in some way. what about you find the treasure in that cave and give it me. (huh huh huh i'm gonna be so rich)", DialogLayout.Bottom)
        LoadLevel(2)
    } else if (Lvl == 2) {
        LoadLevel(3)
    } else if (Lvl == 3) {
        LoadLevel(5)
    }
})
controller.combos.attachCombo("UUDDLRLRBA", function () {
    info.setLife(1000000)
    music.play(music.createSong(assets.song`PARTY`), music.PlaybackMode.LoopingInBackground)
    effects.confetti.startScreenEffect()
    zelda.startEffect(effects.confetti)
    game.splash("Party mode activated")
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    direction = 3
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite7, otherSprite6) {
    if (dot_on == 1) {
    	
    } else if (Lvl == 3) {
        info.changeLifeBy(-1)
        otherSprite6.follow(zelda, 0)
        pause(1000)
        otherSprite6.follow(zelda, 10)
    } else {
        info.changeLifeBy(-1)
        zelda.startEffect(effects.fire, 100)
        otherSprite6.follow(zelda, 0)
        pause(1000)
        otherSprite6.follow(zelda, 20)
    }
})
sprites.onOverlap(SpriteKind.echo, SpriteKind.Enemy, function (sprite6, otherSprite5) {
    if (otherSprite5 == Cursed_rock) {
        sprites.destroy(sprite6)
        if (dot_on == 1) {
            Mimic_health += -1
            Rock_mimic.startEffect(effects.ashes)
            animation.runImageAnimation(
            Cursed_rock,
            assets.animation`Mimic_animation`,
            500,
            true
            )
            dot_on = 0
            Rock_mimic.follow(zelda, 20)
        }
    } else if (otherSprite5 == Rock_mimic) {
        sprites.destroy(sprite6)
        if (dot_on == 1) {
            Mimic_health += -1
            Rock_mimic.startEffect(effects.ashes)
            animation.runImageAnimation(
            Cursed_rock,
            assets.animation`Mimic_animation`,
            500,
            true
            )
            dot_on = 0
            Rock_mimic.follow(zelda, 20)
        }
    } else {
        statusbar.setFlag(SpriteFlag.Invisible, false)
        if (0 == statusbar.value) {
            statusbar_rules_en()
        }
        statusbar.attachToSprite(otherSprite5)
        if (otherSprite5 == spoder2 || otherSprite5 == spoder) {
            statusbar.value += -1
        } else {
            statusbar.value += -1.5
        }
        statusbar.setFlag(SpriteFlag.Invisible, false)
        sprites.destroy(sprite6, effects.starField, 100)
        if (0 == statusbar.value) {
            kill_count += 1
            statusbar.setFlag(SpriteFlag.Invisible, true)
            sprites.destroy(otherSprite5)
            if (otherSprite5 == spoder) {
                spoderded1 += 1
            } else if (otherSprite5 == spoder2) {
                spoderded2 += 1
            }
        }
    }
})
function Animations () {
    if (Mimic_check == 1) {
        if (dot_on == 0) {
            if (Rock_mimic.vy < 0) {
                Cursed_rock.setImage(assets.image`Rock_back`)
                if (0 == Math.round(Rock_mimic.y / 10) % 2) {
                    Rock_mimic.setImage(assets.image`Rockmimic_back`)
                } else {
                    Rock_mimic.setImage(assets.image`Rockmimic_back_alt`)
                }
            } else if (Rock_mimic.vy > 0) {
                if (Math.round(Rock_mimic.y / 10) % 2 == 0) {
                    Rock_mimic.setImage(assets.image`Rockmimic_front`)
                } else {
                    Rock_mimic.setImage(assets.image`mimic_front`)
                }
            } else {
            	
            }
        }
    }
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
sprites.onOverlap(SpriteKind.Player, SpriteKind.Echo_shimmer, function (sprite2, otherSprite) {
    animation.stopAnimation(animation.AnimationTypes.All, zol_echo_shimmer)
    effects.clearParticles(zol_echo_shimmer)
    zol_echo_shimmer.setImage(assets.image`empty`)
    dialog("Basic")
    game.showLongText("You found a echo!", DialogLayout.Bottom)
    has_voltzol_echo += 1
})
controller.combos.attachCombo("a+ua+l", function () {
    game.splash("32qwwesdxz")
})
let web2: Sprite = null
let web: Sprite = null
let has_voltzol_echo = 0
let spoderded2 = 0
let spoderded1 = 0
let wand2: Sprite = null
let mySprite = 0
let hidden_door: Sprite = null
let spoder2: Sprite = null
let spoder: Sprite = null
let woltzol: Sprite = null
let wall_hole: Sprite = null
let bar_basic: Sprite = null
let Henry_the_turmit: Sprite = null
let Bar_right: Sprite = null
let Bar_left: Sprite = null
let Bar_down: Sprite = null
let bar_up: Sprite = null
let electricity_on = 0
let projectile: Sprite = null
let statusbar: StatusBarSprite = null
let Echo_matte = 0
let nearest_enemy: Sprite = null
let shorted_distance = 0
let Zol_echo2: Sprite = null
let zol_echo_shimmer: Sprite = null
let Lvl = 0
let kill_count = 0
let dot_on = 0
let Cursed_rock: Sprite = null
let Mimic_check = 0
let Rock_mimic: Sprite = null
let steinsjekk = 0
let direction = 0
let Rock: Sprite = null
let Heart: Sprite = null
let zelda: Sprite = null
LoadLevel(5)
zelda = sprites.create(assets.image`Zelda_front`, SpriteKind.Player)
let Echo_matte2 = 0
let nearest_enemy2 = 0
statusbar_rules_en()
Heart = sprites.create(assets.image`empty`, SpriteKind.Food)
let A = sprites.create(assets.image`empty`, SpriteKind.UI)
Rock = sprites.create(assets.image`empty`, SpriteKind.Throwable)
let Mimic_health = 3
scene.cameraFollowSprite(zelda)
info.setLife(5)
A.setFlag(SpriteFlag.RelativeToCamera, true)
A.setPosition(150, 109)
Rock.setFlag(SpriteFlag.GhostThroughWalls, true)
game.onUpdate(function () {
    if (spoderded1 == 1 && spoderded2 == 1) {
        spoderded2 += 1
        animation.runImageAnimation(
        Bar_right,
        assets.animation`bar_right_animation`,
        200,
        false
        )
        tiles.setWallAt(tiles.getTileLocation(14, 7), false)
    }
    if (Math.percentChance(5)) {
        sprites.destroy(web, effects.disintegrate, 100)
        sprites.destroy(web2, effects.disintegrate, 100)
    }
    while (Lvl == 3 && Math.percentChance(0.05)) {
        if (spoderded1 == 0) {
            web = sprites.create(assets.image`Web_bird`, SpriteKind.web)
            animation.runImageAnimation(
            web,
            assets.animation`Webbird`,
            200,
            true
            )
            web.setPosition(spoder.x, spoder.y)
            web.follow(zelda)
            if (0 != sprites.allOfKind(SpriteKind.echo).length) {
                web.follow(Zol_echo2)
            }
        }
        if (spoderded2 == 0) {
            web2 = sprites.create(assets.image`Web_bird`, SpriteKind.web)
            animation.runImageAnimation(
            web2,
            assets.animation`Webbird`,
            200,
            true
            )
            web2.setPosition(spoder2.x, spoder2.y)
            web2.follow(zelda)
            if (0 != sprites.allOfKind(SpriteKind.echo).length) {
                web2.follow(Zol_echo2)
            }
        }
    }
    if (Mimic_health == 0) {
        sprites.destroy(Rock_mimic, effects.halo, 500)
        sprites.destroy(Cursed_rock, effects.halo, 500)
    }
    A.setImage(assets.image`empty`)
    if (Mimic_check == 1) {
        Cursed_rock.z = 5
        Cursed_rock.setPosition(Rock_mimic.x - 1, Rock_mimic.top - 5)
    }
    if (info.life() == 0) {
        zelda.startEffect(effects.fire)
    }
    if (2 == kill_count && has_voltzol_echo == 1 && Lvl == 1) {
        music.stopAllSounds()
        music.play(music.createSong(assets.song`You_did_it`), music.PlaybackMode.InBackground)
        Henry_the_turmit = sprites.create(assets.image`Henry_the_turmit`, SpriteKind.npc)
        kill_count = 0
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
    if (Lvl == 1 && tiles.tileIs(tiles.locationInDirection(tiles.locationOfSprite(zelda), CollisionDirection.Top), assets.tile`myTile4`)) {
        A.setImage(assets.image`Button`)
        dialog("Henry")
        if (controller.A.isPressed() && 5 == has_voltzol_echo) {
            has_voltzol_echo += 1
            wand2 = sprites.create(assets.image`Wand`, SpriteKind.wand)
            wand2.setPosition(Henry_the_turmit.left - 6, Henry_the_turmit.y)
            game.showLongText("Hello there. Thanks for taking care of Those pesky zols. My name is Henry the Turmit. Vendor of rare goods. As a thank you i will open the door over there", DialogLayout.Bottom)
            game.showLongText("Hey is that a echo shimmer. If you have a wand you can use it to have a enemy help you fight. HUH! you don't have a wand. Convenient that i have one in my stock right now. Do you want it?", DialogLayout.Bottom)
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
    if (Lvl == 2 && tiles.tileIs(tiles.locationOfSprite(zelda), assets.tile`myTile`) && mySprite == 0) {
        effects.starField.startScreenEffect(5000)
        dialog("Nayru")
        game.showLongText("Zelda\\n \\n That wand was created by me to help a hero.\\n I see you've gotten yourself into trouble.\\n Well there's probably nothing else you can do but find the treasure and give it to him, Turmits can be dangerous when they're angry\\n \\n I nearly forgot i have to teach how to use the wand.\\n \\n When you make a new echo the old one Automaticlly get destroyed. If the enemy and your echo is equally strong both will get destroyed. your echo will often be weaker", DialogLayout.Bottom)
        mySprite = 1
        woltzol = sprites.create(assets.image`zol`, SpriteKind.Enemy)
        animation.runImageAnimation(
        woltzol,
        assets.animation`Wolt_zol_Animation`,
        650,
        true
        )
        tiles.placeOnTile(woltzol, tiles.getTileLocation(5, 2))
        woltzol.follow(zelda, 20)
    }
    Animations()
})

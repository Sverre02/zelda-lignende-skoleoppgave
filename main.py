@namespace
class SpriteKind:
    Zol = SpriteKind.create()
    Throwable = SpriteKind.create()
    Echo_shimmer = SpriteKind.create()
    npc = SpriteKind.create()
    bar = SpriteKind.create()
    wand = SpriteKind.create()
    UI = SpriteKind.create()
    wall = SpriteKind.create()
    Zol_echo = SpriteKind.create()

def on_up_pressed():
    global direction
    direction = 1
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def on_hit_wall(sprite, location):
    global steinsjekk
    if controller.A.is_pressed() and steinsjekk == 0:
        for value in [CollisionDirection.LEFT,
            CollisionDirection.TOP,
            CollisionDirection.RIGHT,
            CollisionDirection.BOTTOM]:
            if tiles.tile_is_wall(tiles.location_in_direction(tiles.location_of_sprite(zelda), value)):
                if tiles.tile_is(tiles.location_in_direction(tiles.location_of_sprite(zelda), value),
                    assets.tile("""
                        Stone
                    """)):
                    tiles.set_tile_at(tiles.location_in_direction(tiles.location_of_sprite(zelda), value),
                        assets.tile("""
                            Stone_replacementile
                        """))
                    tiles.set_wall_at(tiles.location_in_direction(tiles.location_of_sprite(zelda), value),
                        False)
                    steinsjekk = 1
                    Rock.set_image(assets.image("""
                        carry_rock
                    """))
                elif tiles.tile_is(tiles.location_in_direction(tiles.location_of_sprite(zelda), value),
                    assets.tile("""
                        bottle
                    """)):
                    tiles.set_tile_at(tiles.location_in_direction(tiles.location_of_sprite(zelda), value),
                        assets.tile("""
                            Dungeon floor
                        """))
                    tiles.set_wall_at(tiles.location_in_direction(tiles.location_of_sprite(zelda), value),
                        False)
                    steinsjekk = 2
                    Rock.set_image(assets.image("""
                        Carry_bottle
                    """))
scene.on_hit_wall(SpriteKind.player, on_hit_wall)

def on_b_pressed():
    global Echo_health, nearest_enemy, shorted_distance, Echo_matte
    Echo_health = 2
    Zol_echo2.set_image(assets.image("""
        Wolt_zol
    """))
    animation.run_image_animation(Zol_echo2,
        assets.animation("""
            Wolt_zol_Animation
        """),
        650,
        True)
    if direction == 0:
        Zol_echo2.right = zelda.left
        Zol_echo2.y = zelda.y
    elif direction == 1:
        Zol_echo2.bottom = zelda.top
        Zol_echo2.x = zelda.x
    elif direction == 2:
        Zol_echo2.left = zelda.right
        Zol_echo2.y = zelda.y
    elif direction == 3:
        Zol_echo2.top = zelda.bottom
        Zol_echo2.x = zelda.x
        nearest_enemy = sprites.create(img("""
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
            """),
            SpriteKind.player)
        shorted_distance = 9999999999
    for value2 in sprites.all_of_kind(SpriteKind.enemy):
        Echo_matte = Math.sqrt(abs(value2.x - zelda.x) ** 2 + abs(value2.y - zelda.y) ** 2)
        if Echo_matte < shorted_distance:
            nearest_enemy = value2
    Zol_echo2.follow(nearest_enemy, 20)
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def on_on_overlap(sprite2, otherSprite):
    global has_voltzol_echo
    animation.stop_animation(animation.AnimationTypes.ALL, zol_echo_shimmer)
    effects.clear_particles(zol_echo_shimmer)
    zol_echo_shimmer.set_image(assets.image("""
        empty
    """))
    game.set_dialog_frame(assets.image("""
        Info_box
    """))
    game.show_long_text("You found a echo!", DialogLayout.BOTTOM)
    has_voltzol_echo += 1
sprites.on_overlap(SpriteKind.player, SpriteKind.Echo_shimmer, on_on_overlap)

def on_a_pressed():
    global projectile, steinsjekk
    if steinsjekk >= 1:
        Rock.set_image(assets.image("""
            empty
        """))
        if steinsjekk == 1:
            if direction == 0:
                projectile = sprites.create_projectile_from_sprite(assets.image("""
                    carry_rock
                """), Rock, -50, 10)
                zelda.set_image(assets.image("""
                    Zelda_left
                """))
            elif direction == 1:
                projectile = sprites.create_projectile_from_sprite(assets.image("""
                    carry_rock
                """), Rock, 0, -50)
                zelda.set_image(assets.image("""
                    Zelda_back
                """))
            elif direction == 2:
                projectile = sprites.create_projectile_from_sprite(assets.image("""
                    carry_rock
                """), Rock, 50, 10)
                zelda.set_image(assets.image("""
                    zelda_right
                """))
            elif direction == 3:
                projectile = sprites.create_projectile_from_sprite(assets.image("""
                    carry_rock
                """), Rock, 0, 50)
                zelda.set_image(assets.image("""
                    Zelda_front
                """))
        elif steinsjekk == 2:
            if direction == 0:
                projectile = sprites.create_projectile_from_sprite(assets.image("""
                    Carry_bottle
                """), Rock, -50, 10)
                zelda.set_image(assets.image("""
                    Zelda_left
                """))
            elif direction == 1:
                projectile = sprites.create_projectile_from_sprite(assets.image("""
                    Carry_bottle
                """), Rock, 0, -50)
                zelda.set_image(assets.image("""
                    Zelda_back
                """))
            elif direction == 2:
                projectile = sprites.create_projectile_from_sprite(assets.image("""
                    Carry_bottle
                """), Rock, 50, 10)
                zelda.set_image(assets.image("""
                    zelda_right
                """))
            elif direction == 3:
                projectile = sprites.create_projectile_from_sprite(assets.image("""
                    Carry_bottle
                """), Rock, 0, 50)
                zelda.set_image(assets.image("""
                    Zelda_front
                """))
        steinsjekk = 0
        if randint(0, 1) == 0:
            Heart.set_image(assets.image("""
                Heart
            """))
            Heart.set_position(projectile.x, projectile.y)
            animation.run_image_animation(Heart,
                assets.animation("""
                    Heart_animation
                """),
                500,
                True)
        pause(800)
        sprites.destroy(projectile, effects.ashes, 100)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def LoadLevel(Level: number):
    global lev
    sprites.destroy_all_sprites_of_kind(SpriteKind.npc)
    sprites.destroy_all_sprites_of_kind(SpriteKind.wall)
    sprites.destroy_all_sprites_of_kind(SpriteKind.bar)
    if Level == 1:
        tiles.load_map(tiles.create_map(tilemap("""
            level2
        """)))
        lev = 1
    elif Level == 2:
        tiles.load_map(tiles.create_map(tilemap("""
            level9
        """)))
        lev = 2

def on_left_pressed():
    global direction
    direction = 0
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def on_map_loaded(tilemap2):
    global wall_hole, bar2, Henry_the_turmit, woltzol, dungeon_wall
    if lev == 1:
        tiles.set_wall_at(tiles.get_tile_location(7, 0), True)
        wall_hole = sprites.create(assets.image("""
            Wall_hole
        """), SpriteKind.wall)
        bar2 = sprites.create(assets.image("""
            Gate
        """), SpriteKind.bar)
        tiles.place_on_tile(wall_hole, tiles.get_tile_location(7, 0))
        tiles.place_on_tile(bar2, tiles.get_tile_location(7, 0))
        wall_hole.z = 1
        music.play(music.create_song(assets.song("""
                Battle
            """)),
            music.PlaybackMode.LOOPING_IN_BACKGROUND)
        game.set_game_over_effect(False, effects.melt)
        game.set_game_over_playable(False, music.melody_playable(music.spooky), True)
        Henry_the_turmit = sprites.create(assets.image("""
            empty
        """), SpriteKind.npc)
        for value22 in tiles.get_tiles_by_type(assets.tile("""
            Zol_placeholder
        """)):
            woltzol = sprites.create(assets.image("""
                Wolt_zol
            """), SpriteKind.enemy)
            tiles.place_on_tile(woltzol, value22)
            animation.run_image_animation(woltzol,
                assets.animation("""
                    Wolt_zol_Animation
                """),
                650,
                True)
            woltzol.follow(zelda, 20)
    elif lev == 2:
        for value3 in tiles.get_tiles_by_type(assets.tile("""
            Door_Placeholder
        """)):
            dungeon_wall = sprites.create(assets.image("""
                Dungeon doorway
            """), SpriteKind.wall)
            bar2 = sprites.create(assets.image("""
                Gate
            """), SpriteKind.bar)
            tiles.place_on_tile(dungeon_wall, value3)
            dungeon_wall.z = 1
            tiles.place_on_tile(bar2, value3)
        tiles.place_on_tile(zelda, tiles.get_tile_location(5, 9))
        zelda.set_image(assets.image("""
            Zelda_back
        """))
        pause(500)
        tiles.set_tile_at(tiles.get_tile_location(5, 10),
            assets.tile("""
                Dungeon_wall_top0
            """))
tiles.on_map_loaded(on_map_loaded)

def on_on_overlap2(sprite4, otherSprite3):
    sprites.destroy(Heart)
    if info.life() == 5:
        pass
    else:
        info.change_life_by(1)
sprites.on_overlap(SpriteKind.player, SpriteKind.food, on_on_overlap2)

def on_right_pressed():
    global direction
    direction = 2
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def on_on_overlap3(sprite5, otherSprite4):
    sprites.destroy(wand2)
    game.set_dialog_frame(assets.image("""
        Info_box
    """))
    game.show_long_text("You Got a wand", DialogLayout.BOTTOM)
    animation.run_image_animation(bar2,
        assets.animation("""
            Bar_animation
        """),
        500,
        False)
    pause(5000)
    tiles.set_wall_at(tiles.get_tile_location(7, 0), False)
sprites.on_overlap(SpriteKind.player, SpriteKind.wand, on_on_overlap3)

def on_down_pressed():
    global direction
    direction = 3
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

def on_on_overlap4(sprite7, otherSprite6):
    info.change_life_by(-1)
    zelda.start_effect(effects.fire, 100)
    otherSprite6.follow(zelda, 0)
    pause(1000)
    otherSprite6.follow(zelda, 20)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap4)

def Animations():
    if steinsjekk >= 1:
        controller.move_sprite(zelda, 27, 27)
        Rock.set_position(zelda.x, zelda.top - 6)
        if zelda.vx < 0:
            if Math.round(zelda.x / 10) % 2 == 0:
                zelda.set_image(assets.image("""
                    Zelda_left_rock
                """))
            else:
                zelda.set_image(assets.image("""
                    Zelda_left_rock_alt
                """))
        elif zelda.vx > 0:
            if Math.round(zelda.x / 10) % 2 == 0:
                zelda.set_image(assets.image("""
                    zelda_right_rock
                """))
            else:
                zelda.set_image(assets.image("""
                    zelda_right_rock_alt
                """))
        elif zelda.vy > 0:
            if Math.round(zelda.y / 10) % 2 == 0:
                zelda.set_image(assets.image("""
                    Zelda_front_stone
                """))
            else:
                zelda.set_image(assets.image("""
                    Zelda_front_rock_alt
                """))
        elif zelda.vy < 0:
            if 0 == Math.round(zelda.y / 10) % 2:
                zelda.set_image(assets.image("""
                    Zelda_back_rock
                """))
            else:
                zelda.set_image(assets.image("""
                    Zelda_back_rock_alt
                """))
        else:
            pass
    else:
        controller.move_sprite(zelda, 51, 51)
        if zelda.vx < 0:
            if Math.round(zelda.x / 10) % 2 == 0:
                zelda.set_image(assets.image("""
                    Zelda_left
                """))
            else:
                zelda.set_image(assets.image("""
                    Zelda_left_alt
                """))
        elif zelda.vx > 0:
            if Math.round(zelda.x / 10) % 2 == 0:
                zelda.set_image(assets.image("""
                    zelda_right
                """))
            else:
                zelda.set_image(assets.image("""
                    Zelda_right_alt
                """))
        elif zelda.vy > 0:
            if Math.round(zelda.y / 10) % 2 == 0:
                zelda.set_image(assets.image("""
                    Zelda_front
                """))
            else:
                zelda.set_image(assets.image("""
                    Zelda_front_alt
                """))
        elif zelda.vy < 0:
            if 0 == Math.round(zelda.y / 10) % 2:
                zelda.set_image(assets.image("""
                    Zelda_back
                """))
            else:
                zelda.set_image(assets.image("""
                    Zelda_back_alt
                """))
        else:
            pass

def on_on_overlap5(sprite3, otherSprite2):
    LoadLevel(2)
sprites.on_overlap(SpriteKind.player, SpriteKind.wall, on_on_overlap5)

def on_on_overlap6(sprite6, otherSprite5):
    global zol_kill_count, zol_echo_shimmer
    if otherSprite5 == woltzol:
        zol_kill_count += 1
        if zol_kill_count == 1:
            zol_echo_shimmer = sprites.create(assets.image("""
                zol
            """), SpriteKind.Echo_shimmer)
            zol_echo_shimmer.set_position(otherSprite5.x, otherSprite5.y)
            zol_echo_shimmer.set_image(assets.image("""
                zol
            """))
            zol_echo_shimmer.start_effect(effects.star_field)
            animation.run_image_animation(zol_echo_shimmer,
                assets.animation("""
                    Zol_echo_shimmer_animation
                """),
                500,
                True)
    sprites.destroy(otherSprite5, effects.disintegrate, 100)
    sprites.destroy(sprite6, effects.ashes, 100)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_on_overlap6)

zol_kill_count = 0
wand2: Sprite = None
dungeon_wall: Sprite = None
woltzol: Sprite = None
Henry_the_turmit: Sprite = None
bar2: Sprite = None
wall_hole: Sprite = None
lev = 0
projectile: Sprite = None
has_voltzol_echo = 0
zol_echo_shimmer: Sprite = None
Echo_matte = 0
shorted_distance = 0
nearest_enemy: Sprite = None
Echo_health = 0
steinsjekk = 0
direction = 0
Zol_echo2: Sprite = None
Rock: Sprite = None
zelda: Sprite = None
Heart: Sprite = None
nearest_enemy2 = 0
A = sprites.create(assets.image("""
    empty
"""), SpriteKind.UI)
Echo_matte2 = 0
Heart = sprites.create(assets.image("""
    empty
"""), SpriteKind.food)
zelda = sprites.create(assets.image("""
    Zelda_front
"""), SpriteKind.player)
Rock = sprites.create(assets.image("""
    empty
"""), SpriteKind.Throwable)
Zol_echo2 = sprites.create(img("""
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
    """),
    SpriteKind.Zol_echo)
scene.camera_follow_sprite(zelda)
info.set_life(5)
A.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)
A.set_position(150, 109)
Rock.set_flag(SpriteFlag.GHOST_THROUGH_WALLS, True)
LoadLevel(1)

def on_on_update():
    global Henry_the_turmit, zol_kill_count, has_voltzol_echo, wand2
    A.set_image(assets.image("""
        empty
    """))
    if 2 == zol_kill_count and has_voltzol_echo == 1 and lev == 1:
        music.stop_all_sounds()
        music.play(music.create_song(assets.song("""
                You_did_it
            """)),
            music.PlaybackMode.IN_BACKGROUND)
        Henry_the_turmit = sprites.create(assets.image("""
            Henry_the_turmit
        """), SpriteKind.npc)
        zol_kill_count = 0
        tiles.place_on_random_tile(Henry_the_turmit, assets.tile("""
            Henry_hiding
        """))
        Henry_the_turmit.set_image(assets.image("""
            Henry_the_turmit
        """))
        animation.run_image_animation(Henry_the_turmit,
            assets.animation("""
                Henry_animation
            """),
            500,
            True)
        tiles.set_tile_at(tiles.get_tile_location(9, 1),
            assets.tile("""
                myTile4
            """))
        has_voltzol_echo = 5
    if tiles.tile_is(tiles.location_in_direction(tiles.location_of_sprite(zelda), CollisionDirection.TOP),
        assets.tile("""
            myTile4
        """)):
        game.set_dialog_frame(assets.image("""
            Henry_plate
        """))
        A.set_image(assets.image("""
            Button
        """))
        if controller.A.is_pressed() and 5 == has_voltzol_echo:
            has_voltzol_echo += 1
            game.show_long_text("Hello there. Thanks for taking care of Those pesky zols. My name is Henry the Turmit. Vendor of rare goods. As a thank you i will open the door over there",
                DialogLayout.BOTTOM)
            game.show_long_text("Hey is that a echo shimmer. If you have a wand you can use it to have a enemy help you fight. HUH! you don't have a wand. Convenient that i have one in my stock right now. Do you want it?",
                DialogLayout.BOTTOM)
            wand2 = sprites.create(assets.image("""
                Wand
            """), SpriteKind.wand)
            wand2.set_position(Henry_the_turmit.left - 6, Henry_the_turmit.y)
            animation.run_image_animation(wand2,
                assets.animation("""
                    wand animation
                """),
                1000,
                True)
        if controller.A.is_pressed() and 6 == has_voltzol_echo:
            A.set_image(assets.image("""
                Button
            """))
            game.show_long_text("Go ahead try it ", DialogLayout.BOTTOM)
    Animations()
game.on_update(on_on_update)

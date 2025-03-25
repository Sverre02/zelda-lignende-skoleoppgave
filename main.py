@namespace
class SpriteKind:
    Zol = SpriteKind.create()
    Throwable = SpriteKind.create()
    Echo_shimmer = SpriteKind.create()
    npc = SpriteKind.create()
    wand = SpriteKind.create()
    UI = SpriteKind.create()
    wall = SpriteKind.create()
    echo = SpriteKind.create()
    Follow = SpriteKind.create()

def on_up_pressed():
    global direction
    direction = 1
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def on_hit_wall(sprite, location):
    global steinsjekk, Mimic_check, Cursed_rock
    if controller.A.is_pressed() and steinsjekk == 0:
        for value in [CollisionDirection.LEFT,
            CollisionDirection.TOP,
            CollisionDirection.RIGHT,
            CollisionDirection.BOTTOM]:
            if tiles.tile_is_wall(tiles.location_in_direction(tiles.location_of_sprite(zelda), value)):
                if tiles.tile_is(tiles.location_in_direction(tiles.location_of_sprite(zelda), value),
                    myTiles.tile3):
                    tiles.set_tile_at(tiles.location_in_direction(tiles.location_of_sprite(zelda), value),
                        myTiles.tile5)
                    tiles.set_wall_at(tiles.location_in_direction(tiles.location_of_sprite(zelda), value),
                        False)
                    steinsjekk = 1
                    Rock.set_image(assets.image("""
                        carry_rock
                        """))
                elif tiles.tile_is(tiles.location_in_direction(tiles.location_of_sprite(zelda), value),
                    myTiles.tile27):
                    tiles.set_tile_at(tiles.location_in_direction(tiles.location_of_sprite(zelda), value),
                        myTiles.tile18)
                    tiles.set_wall_at(tiles.location_in_direction(tiles.location_of_sprite(zelda), value),
                        False)
                    steinsjekk = 2
                    Rock.set_image(assets.image("""
                        Carry_bottle
                        """))
                elif tiles.tile_is(tiles.location_in_direction(tiles.location_of_sprite(zelda), value),
                    myTiles.tile39):
                    tiles.set_tile_at(tiles.location_in_direction(tiles.location_of_sprite(zelda), value),
                        myTiles.tile18)
                    tiles.set_wall_at(tiles.location_in_direction(tiles.location_of_sprite(zelda), value),
                        False)
                    Rock_mimic.set_image(assets.image("""
                        Rockmimic_front
                        """))
                    Mimic_check = 1
                    Cursed_rock = sprites.create(assets.image("""
                            Rock_mimmic_hiding
                            """),
                        SpriteKind.enemy)
                    animation.run_image_animation(Cursed_rock,
                        assets.animation("""
                            Mimic_animation
                            """),
                        500,
                        True)
                    Rock_mimic.follow(zelda, 20)
                    Rock_mimic.z = 1
                    Cursed_rock.z = 1
scene.on_hit_wall(SpriteKind.player, on_hit_wall)

def on_on_overlap(sprite62, otherSprite52):
    global dot_on, kill_count, zol_echo_shimmer
    if otherSprite52 == Cursed_rock:
        animation.stop_animation(animation.AnimationTypes.ALL, Cursed_rock)
        Cursed_rock.set_image(assets.image("""
            rockbackfallen
            """))
        Rock_mimic.set_image(assets.image("""
            fallen backmimic
            """))
        dot_on = 1
        Rock_mimic.follow(zelda, 0)
        pause(4000)
        animation.run_image_animation(Cursed_rock,
            assets.animation("""
                Mimic_animation
                """),
            500,
            True)
        dot_on = 0
        Rock_mimic.follow(zelda, 20)
    elif otherSprite52 == Rock_mimic:
        animation.stop_animation(animation.AnimationTypes.ALL, Cursed_rock)
        Cursed_rock.set_image(assets.image("""
            rockbackfallen
            """))
        Rock_mimic.set_image(assets.image("""
            fallen backmimic
            """))
        dot_on = 1
        Rock_mimic.follow(zelda, 0)
        pause(4000)
        animation.run_image_animation(Cursed_rock,
            assets.animation("""
                Mimic_animation
                """),
            500,
            True)
        dot_on = 0
        Rock_mimic.follow(zelda, 20)
    else:
        kill_count += 1
        if kill_count == 1 and lev == 1:
            zol_echo_shimmer = sprites.create(assets.image("""
                zol
                """), SpriteKind.Echo_shimmer)
            zol_echo_shimmer.set_position(otherSprite52.x, otherSprite52.y)
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
        sprites.destroy(otherSprite52, effects.disintegrate, 100)
        sprites.destroy(sprite62, effects.ashes, 100)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_on_overlap)

def on_b_pressed():
    global Zol_echo2, shorted_distance, nearest_enemy, Echo_matte
    sprites.destroy(Zol_echo2)
    Zol_echo2 = sprites.create(assets.image("""
        bar bottom
        """), SpriteKind.echo)
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
    shorted_distance = 99999
    nearest_enemy = sprites.create(assets.image("""
        empty
        """), SpriteKind.Follow)
    if len(sprites.all_of_kind(SpriteKind.enemy)) == 0:
        pass
    else:
        for value2 in sprites.all_of_kind(SpriteKind.enemy):
            Echo_matte = Math.sqrt(abs(value2.x - zelda.x) ** 2 + abs(value2.y - zelda.y) ** 2)
            if Echo_matte < shorted_distance:
                nearest_enemy = value2
        Zol_echo2.follow(nearest_enemy, 20)
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def statusbar_rules_en():
    global statusbar
    statusbar = statusbars.create(20, 4, StatusBarKind.enemy_health)
    statusbar.set_color(2, 15, 5)
    statusbar.set_bar_border(1, 15)
    statusbar.max = 2
    statusbar.set_status_bar_flag(StatusBarFlag.SMOOTH_TRANSITION, True)
    statusbar.set_flag(SpriteFlag.INVISIBLE, True)

def on_on_overlap2(sprite2, otherSprite):
    global has_voltzol_echo
    animation.stop_animation(animation.AnimationTypes.ALL, zol_echo_shimmer)
    effects.clear_particles(zol_echo_shimmer)
    zol_echo_shimmer.set_image(assets.image("""
        empty
        """))
    dialog("Basic")
    game.show_long_text("You found a echo!", DialogLayout.BOTTOM)
    has_voltzol_echo += 1
sprites.on_overlap(SpriteKind.player, SpriteKind.Echo_shimmer, on_on_overlap2)

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
    sprites.destroy_all_sprites_of_kind(SpriteKind.echo)
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
    elif Level == 3:
        tiles.load_map(tiles.create_map(tilemap("""
            level3
            """)))
        lev = 3
    elif Level == 4:
        tiles.load_map(tiles.create_map(tilemap("""
            level
            """)))
        lev = 4
def dialog(who: str):
    if who == "Basic":
        game.set_dialog_frame(assets.image("""
            Info_box
            """))
        game.set_dialog_cursor(assets.image("""
            Basic button
            """))
    elif who == "Henry":
        game.set_dialog_frame(assets.image("""
            Henry_plate
            """))
        game.set_dialog_cursor(assets.image("""
            Rupee_cursor
            """))
    elif who == "Nayru":
        game.set_dialog_frame(assets.image("""
            Nayru_dialogbox
            """))
        game.set_dialog_cursor(assets.image("""
            Nayru dialoge
            """))

def on_left_pressed():
    global direction
    direction = 0
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def on_map_loaded(tilemap2):
    global bar_up, Bar_down, Bar_right, Bar_left, Henry_the_turmit, bar_basic, wall_hole, woltzol, Rock_mimic
    for value3 in tiles.get_tiles_by_type(myTiles.tile15):
        bar_up = sprites.create(assets.image("""
            Gate_top
            """), SpriteKind.wall)
        tiles.place_on_tile(bar_up, value3)
        tiles.set_wall_at(value3, True)
    for value4 in tiles.get_tiles_by_type(myTiles.tile34):
        Bar_down = sprites.create(assets.image("""
            bar bottom
            """), SpriteKind.wall)
        tiles.place_on_tile(Bar_down, value4)
        tiles.set_wall_at(value4, True)
    for value5 in tiles.get_tiles_by_type(myTiles.tile35):
        Bar_right = sprites.create(assets.image("""
            Bar_right
            """), SpriteKind.wall)
        tiles.place_on_tile(Bar_right, value5)
        tiles.set_wall_at(value5, True)
    for value6 in tiles.get_tiles_by_type(myTiles.tile36):
        Bar_left = sprites.create(assets.image("""
            Bar_right
            """), SpriteKind.wall)
        tiles.place_on_tile(Bar_left, value6)
        tiles.set_wall_at(value6, True)
    if lev == 1:
        tiles.place_on_tile(bar_up, tiles.get_tile_location(7, 0))
        music.play(music.create_song(assets.song("""
                Battle
                """)),
            music.PlaybackMode.LOOPING_IN_BACKGROUND)
        game.set_game_over_effect(False, effects.melt)
        game.set_game_over_playable(False, music.melody_playable(music.spooky), True)
        Henry_the_turmit = sprites.create(assets.image("""
            empty
            """), SpriteKind.npc)
        for value7 in tiles.get_tiles_by_type(sprites.builtin.forest_tiles10):
            bar_basic = sprites.create(assets.image("""
                Gate_top
                """), SpriteKind.wall)
            wall_hole = sprites.create(assets.image("""
                Wall_hole
                """), SpriteKind.wall)
            wall_hole.z = 1010
            tiles.place_on_tile(wall_hole, value7)
            tiles.place_on_tile(bar_basic, value7)
            tiles.set_wall_at(value7, True)
        for value22 in tiles.get_tiles_by_type(myTiles.tile2):
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
        tiles.place_on_tile(zelda, tiles.get_tile_location(5, 9))
    elif lev == 3:
        tiles.place_on_tile(zelda, tiles.get_tile_location(7, 13))
    elif lev == 4:
        tiles.set_wall_at(tiles.get_tile_location(3, 3), True)
        Rock_mimic = sprites.create(assets.image("""
                Rock_mimmic_hiding
                """),
            SpriteKind.enemy)
        tiles.place_on_tile(Rock_mimic, tiles.get_tile_location(3, 3))
tiles.on_map_loaded(on_map_loaded)

def on_on_destroyed(sprite8):
    global mySprite
    if lev == 2 and mySprite == 1:
        mySprite = 2
        animation.run_image_animation(bar_up,
            assets.animation("""
                Bar_animation_top
                """),
            500,
            False)
        tiles.set_wall_at(tiles.get_tile_location(5, 0), False)
sprites.on_destroyed(SpriteKind.enemy, on_on_destroyed)

def on_on_overlap3(sprite4, otherSprite3):
    sprites.destroy(Heart)
    if info.life() == 5:
        pass
    else:
        info.change_life_by(1)
sprites.on_overlap(SpriteKind.player, SpriteKind.food, on_on_overlap3)

def on_right_pressed():
    global direction
    direction = 2
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def on_on_overlap4(sprite3, otherSprite2):
    if lev == 1:
        dialog("Henry")
        game.show_long_text("Hey you think you can just walk of with that wand.\\n you don't have any money well you touch it you bye it so you have to pay me in some way. what about you find the treasure in that cave and give it me. (huh huh huh i'm gonna be so rich)",
            DialogLayout.BOTTOM)
        LoadLevel(2)
    elif lev == 2:
        LoadLevel(3)
sprites.on_overlap(SpriteKind.player, SpriteKind.wall, on_on_overlap4)

def on_combos_attach_combo():
    info.set_life(1000000)
    music.play(music.create_song(assets.song("""
            PARTY
            """)),
        music.PlaybackMode.LOOPING_IN_BACKGROUND)
    effects.confetti.start_screen_effect()
    zelda.start_effect(effects.confetti)
    game.splash("Party mode activated")
controller.combos.attach_combo("UUDDLRLRBA", on_combos_attach_combo)

def on_on_overlap5(sprite5, otherSprite4):
    sprites.destroy(wand2)
    dialog("Basic")
    game.show_long_text("You Got a wand", DialogLayout.BOTTOM)
    animation.run_image_animation(bar_basic,
        assets.animation("""
            Bar_animation_top
            """),
        500,
        False)
    pause(5000)
    tiles.set_wall_at(tiles.get_tile_location(7, 0), False)
sprites.on_overlap(SpriteKind.player, SpriteKind.wand, on_on_overlap5)

def on_down_pressed():
    global direction
    direction = 3
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

def on_on_overlap6(sprite7, otherSprite6):
    if dot_on == 1:
        pass
    else:
        info.change_life_by(-1)
        zelda.start_effect(effects.fire, 100)
        otherSprite6.follow(zelda, 0)
        pause(1000)
        otherSprite6.follow(zelda, 20)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap6)

def on_on_overlap7(sprite6, otherSprite5):
    global Mimic_health, dot_on, kill_count
    if otherSprite5 == Cursed_rock:
        sprites.destroy(sprite6)
        if dot_on == 1:
            Mimic_health += -1
            Rock_mimic.start_effect(effects.ashes)
            animation.run_image_animation(Cursed_rock,
                assets.animation("""
                    Mimic_animation
                    """),
                500,
                True)
            dot_on = 0
            Rock_mimic.follow(zelda, 20)
    elif otherSprite5 == Rock_mimic:
        sprites.destroy(sprite6)
        if dot_on == 1:
            Mimic_health += -1
            Rock_mimic.start_effect(effects.ashes)
            animation.run_image_animation(Cursed_rock,
                assets.animation("""
                    Mimic_animation
                    """),
                500,
                True)
            dot_on = 0
            Rock_mimic.follow(zelda, 20)
    else:
        statusbar.set_flag(SpriteFlag.INVISIBLE, False)
        if 0 == statusbar.value:
            statusbar_rules_en()
        statusbar.attach_to_sprite(otherSprite5)
        if False:
            pass
        else:
            statusbar.value += -1
        statusbar.set_flag(SpriteFlag.INVISIBLE, False)
        sprites.destroy(sprite6, effects.star_field, 100)
        if 0 == statusbar.value:
            if False:
                pass
            else:
                kill_count += 1
                statusbar.set_flag(SpriteFlag.INVISIBLE, True)
                sprites.destroy(otherSprite5)
sprites.on_overlap(SpriteKind.echo, SpriteKind.enemy, on_on_overlap7)

def Animations():
    if Mimic_check == 1:
        if dot_on == 0:
            if Rock_mimic.vy < 0:
                Cursed_rock.set_image(assets.image("""
                    Rock_back
                    """))
                if 0 == Math.round(Rock_mimic.y / 10) % 2:
                    Rock_mimic.set_image(assets.image("""
                        Rockmimic_back
                        """))
                else:
                    Rock_mimic.set_image(assets.image("""
                        Rockmimic_back_alt
                        """))
            elif Rock_mimic.vy > 0:
                if Math.round(Rock_mimic.y / 10) % 2 == 0:
                    Rock_mimic.set_image(assets.image("""
                        Rockmimic_front
                        """))
                else:
                    Rock_mimic.set_image(assets.image("""
                        mimic_front
                        """))
            else:
                pass
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
wand2: Sprite = None
mySprite = 0
woltzol: Sprite = None
wall_hole: Sprite = None
bar_basic: Sprite = None
Henry_the_turmit: Sprite = None
Bar_left: Sprite = None
Bar_right: Sprite = None
Bar_down: Sprite = None
bar_up: Sprite = None
projectile: Sprite = None
has_voltzol_echo = 0
statusbar: StatusBarSprite = None
Echo_matte = 0
nearest_enemy: Sprite = None
shorted_distance = 0
Zol_echo2: Sprite = None
zol_echo_shimmer: Sprite = None
lev = 0
kill_count = 0
dot_on = 0
Cursed_rock: Sprite = None
Mimic_check = 0
Rock_mimic: Sprite = None
steinsjekk = 0
direction = 0
Rock: Sprite = None
Heart: Sprite = None
zelda: Sprite = None
zelda = sprites.create(assets.image("""
    Zelda_front
    """), SpriteKind.player)
Echo_matte2 = 0
nearest_enemy2 = 0
LoadLevel(3)
statusbar_rules_en()
Heart = sprites.create(assets.image("""
    empty
    """), SpriteKind.food)
A = sprites.create(assets.image("""
    empty
    """), SpriteKind.UI)
Rock = sprites.create(assets.image("""
    empty
    """), SpriteKind.Throwable)
Mimic_health = 3
scene.camera_follow_sprite(zelda)
info.set_life(5)
A.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)
A.set_position(150, 109)
Rock.set_flag(SpriteFlag.GHOST_THROUGH_WALLS, True)

def on_on_update():
    global Henry_the_turmit, kill_count, has_voltzol_echo, wand2, mySprite, woltzol
    if Mimic_health == 0:
        sprites.destroy(Rock_mimic, effects.halo, 500)
        sprites.destroy(Cursed_rock, effects.halo, 500)
    if lev == 3 and (tiles.tile_at_location_equals(tiles.location_of_sprite(zelda), myTiles.tile41) or tiles.tile_at_location_equals(tiles.location_of_sprite(Zol_echo2), myTiles.tile41)):
        pass
    A.set_image(assets.image("""
        empty
        """))
    if Mimic_check == 1:
        Cursed_rock.z = 5
        Cursed_rock.set_position(Rock_mimic.x - 1, Rock_mimic.top - 5)
    if info.life() == 0:
        zelda.start_effect(effects.fire)
    if 2 == kill_count and has_voltzol_echo == 1 and lev == 1:
        music.stop_all_sounds()
        music.play(music.create_song(assets.song("""
                You_did_it
                """)),
            music.PlaybackMode.IN_BACKGROUND)
        Henry_the_turmit = sprites.create(assets.image("""
                Henry_the_turmit
                """),
            SpriteKind.npc)
        kill_count = 0
        tiles.place_on_random_tile(Henry_the_turmit, myTiles.tile4)
        Henry_the_turmit.set_image(assets.image("""
            Henry_the_turmit
            """))
        animation.run_image_animation(Henry_the_turmit,
            assets.animation("""
                Henry_animation
                """),
            500,
            True)
        tiles.set_tile_at(tiles.get_tile_location(9, 1), myTiles.tile16)
        has_voltzol_echo = 5
    if lev == 1 and tiles.tile_is(tiles.location_in_direction(tiles.location_of_sprite(zelda), CollisionDirection.TOP),
        myTiles.tile16):
        A.set_image(assets.image("""
            Button
            """))
        dialog("Henry")
        if controller.A.is_pressed() and 5 == has_voltzol_echo:
            has_voltzol_echo += 1
            wand2 = sprites.create(assets.image("""
                Wand
                """), SpriteKind.wand)
            wand2.set_position(Henry_the_turmit.left - 6, Henry_the_turmit.y)
            game.show_long_text("Hello there. Thanks for taking care of Those pesky zols. My name is Henry the Turmit. Vendor of rare goods. As a thank you i will open the door over there",
                DialogLayout.BOTTOM)
            game.show_long_text("Hey is that a echo shimmer. If you have a wand you can use it to have a enemy help you fight. HUH! you don't have a wand. Convenient that i have one in my stock right now. Do you want it?",
                DialogLayout.BOTTOM)
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
    if lev == 2 and tiles.tile_is(tiles.location_of_sprite(zelda), myTiles.tile28) and mySprite == 0:
        effects.star_field.start_screen_effect(5000)
        dialog("Nayru")
        game.show_long_text("Zelda\\n \\n That wand was created by me to help a hero.\\n I see you've gotten yourself into trouble.\\n Well there's probably nothing else you can do but find the treasure and give it to him, Turmits can be dangerous when they're angry\\n \\n I nearly forgot i have to teach how to use the wand.\\n \\n When you make a new echo the old one Automaticlly get destroyed. If the enemy and your echo is equally strong both will get destroyed. your echo will often be weaker",
            DialogLayout.BOTTOM)
        mySprite = 1
        woltzol = sprites.create(assets.image("""
            zol
            """), SpriteKind.enemy)
        animation.run_image_animation(woltzol,
            assets.animation("""
                Wolt_zol_Animation
                """),
            650,
            True)
        tiles.place_on_tile(woltzol, tiles.get_tile_location(5, 2))
        woltzol.follow(zelda, 20)
    Animations()
game.on_update(on_on_update)

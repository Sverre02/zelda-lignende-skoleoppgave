@namespace
class SpriteKind:
    Zol = SpriteKind.create()
    Throwable = SpriteKind.create()
    
Rock: Sprite = None
Gustzol: Sprite = None
zelda = sprites.create(assets.image("""
    Zelda_front
"""), SpriteKind.player)
controller.move_sprite(zelda, 51, 51)
scene.camera_follow_sprite(zelda)
tiles.set_current_tilemap(tilemap("""
    level2
"""))
for value in tiles.get_tiles_by_type(assets.tile("""
    myTile
""")):
    Gustzol = sprites.create(assets.image("""
        Gust_zol
    """), SpriteKind.Zol)
    tiles.place_on_tile(Gustzol, value)
    animation.run_image_animation(Gustzol,
        assets.animation("""
            Gust_zol_Animation
        """),
        650,
        True)
    Gustzol.follow(zelda, 20)
for value2 in tiles.get_tiles_by_type(assets.tile("""
    myTile2
""")):
    Rock = sprites.create(assets.image("""
        Rock
    """), SpriteKind.Throwable)
    tiles.place_on_tile(Rock, value2)
    tiles.set_wall_at(value2, True)

def on_on_update():
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
game.on_update(on_on_update)

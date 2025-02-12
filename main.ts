namespace SpriteKind {
    export const Zol = SpriteKind.create()
    export const Throwable = SpriteKind.create()
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
                tiles.setTileAt(tiles.locationInDirection(tiles.locationOfSprite(zelda), value), assets.tile`myTile2`)
                tiles.setWallAt(tiles.locationInDirection(tiles.locationOfSprite(zelda), value), false)
                steinsjekk = 1
            }
        }
    }
})
let Gustzol: Sprite = null
let zelda: Sprite = null
let steinsjekk = 0
steinsjekk = 0
zelda = sprites.create(assets.image`Zelda_front`, SpriteKind.Player)
controller.moveSprite(zelda, 51, 51)
scene.cameraFollowSprite(zelda)
tiles.setCurrentTilemap(tilemap`level2`)
for (let value of tiles.getTilesByType(assets.tile`myTile`)) {
    Gustzol = sprites.create(assets.image`Gust_zol`, SpriteKind.Zol)
    tiles.placeOnTile(Gustzol, value)
    animation.runImageAnimation(
    Gustzol,
    assets.animation`Gust_zol_Animation`,
    650,
    true
    )
    Gustzol.follow(zelda, 20)
}
game.onUpdate(function () {
    if (steinsjekk == 1) {
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

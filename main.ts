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
    false
    )
}
game.onUpdate(function () {
    if (steinsjekk == 1) {
        if (zelda.vx < 0) {
            if (Math.round(zelda.x / 10) % 2 == 0) {
            	
            } else {
            	
            }
        } else if (zelda.vx > 0) {
            if (Math.round(zelda.x / 10) % 2 == 0) {
            	
            } else {
            	
            }
        } else if (zelda.vy > 0) {
            if (Math.round(zelda.y / 10) % 2 == 0) {
            	
            } else {
            	
            }
        } else if (zelda.vy < 0) {
            if (0 == Math.round(zelda.y / 10) % 2) {
            	
            } else {
            	
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

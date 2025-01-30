namespace SpriteKind {
    export const Zol = SpriteKind.create()
    export const Throwable = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Throwable, function (sprite, otherSprite) {
    if (controller.A.isPressed()) {
    	
    }
})
let Rock: Sprite = null
let Gustzol: Sprite = null
let zelda = sprites.create(assets.image`Zelda_front`, SpriteKind.Player)
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
for (let value2 of tiles.getTilesByType(assets.tile`myTile2`)) {
    Rock = sprites.create(assets.image`Rock`, SpriteKind.Throwable)
    tiles.placeOnTile(Rock, value2)
    tiles.setWallAt(value2, true)
}
game.onUpdate(function () {
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
})

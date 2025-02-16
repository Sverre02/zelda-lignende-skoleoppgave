// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile1 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile2 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile5 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile3 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile4 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile6 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile7 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile8 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile9 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile10 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile11 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile12 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile13 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile14 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile15 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "level3":
            case "level3":return tiles.createTilemap(hex`1000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`, img`
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
`, [myTiles.transparency16], TileScale.Sixteen);
            case "level2":
            case "level2":return tiles.createTilemap(hex`0f000f00090606060606060e0606060606060a0801010101010d0d0d0401010101050801010101010101010101010101050801010101010101010101010101050801010101010101010102010101050801010201010101010101010101050801010101010101010201010101050801010101010101010101010101050801010201030101010101010101050801010101010101010101010101050801010201010101010101010101050801010101010101010101010101050801010101010101010101010101050801010101010101010101010101050c070707070707070707070707070b`, img`
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
2 . . . . . . . . 2 . . . . 2 
2 . . . . . . . . . . . . . 2 
2 . . . . . . . . . . . . . 2 
2 . . . . . . . . . 2 . . . 2 
2 . . 2 . . . . . . . . . . 2 
2 . . . . . . . . 2 . . . . 2 
2 . . . . . . . . . . . . . 2 
2 . . 2 . . . . . . . . . . 2 
2 . . . . . . . . . . . . . 2 
2 . . 2 . . . . . . . . . . 2 
2 . . . . . . . . . . . . . 2 
2 . . . . . . . . . . . . . 2 
2 . . . . . . . . . . . . . 2 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
`, [myTiles.transparency16,myTiles.tile1,myTiles.tile3,myTiles.tile2,myTiles.tile4,myTiles.tile7,myTiles.tile6,myTiles.tile8,myTiles.tile9,myTiles.tile10,myTiles.tile11,myTiles.tile12,myTiles.tile13,myTiles.tile14,myTiles.tile15], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
            case "grass":
            case "tile1":return tile1;
            case "myTile":
            case "tile2":return tile2;
            case "myTile2":
            case "tile5":return tile5;
            case "myTile0":
            case "tile3":return tile3;
            case "myTile1":
            case "tile4":return tile4;
            case "wall_top":
            case "tile6":return tile6;
            case "wall_right":
            case "tile7":return tile7;
            case "wall_bottom":
            case "tile8":return tile8;
            case "wall_left":
            case "tile9":return tile9;
            case "top_left_corner":
            case "tile10":return tile10;
            case "top_right_corner":
            case "tile11":return tile11;
            case "bottom_right_corner":
            case "tile12":return tile12;
            case "bottom _left_corner":
            case "tile13":return tile13;
            case "myTile3":
            case "tile14":return tile14;
            case "wall_top0":
            case "tile15":return tile15;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.

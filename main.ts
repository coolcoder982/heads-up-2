sprites.on_fire_created(function (location) {
    scene.createParticleEffectAtLocation(location, effects.fire)
    sprites.set_flame_strength(location, 5)
})
sprites.on_fire_destroyed(function (location) {
    scene.clearParticleEffectsAtLocation(location)
    tiles.setTileAt(location, assets.tile`burnt tree`)
})
scene.onOverlapTile(SpriteKind.Water, assets.tile`tree fire`, function (sprite, location) {
    sprites.change_flame_strength_by(location, -1)
    sprite.destroy()
})
controller.A.onEvent(ControllerButtonEvent.Repeated, function () {
    sprites.spray(myPlane, forest_imgs.water)
})
let myPlane: Sprite = null
game.set_health_of_trees(7)
myPlane = sprites.create(img`
    . . . . . . . . . . . . . . f f f f f f . . . . 
    . . f 8 . . . . . . . . . f b b b b 9 f . . . . 
    . . f 8 8 . . . . . . f f b b b b f f . . . . . 
    . . f b 8 8 . . . f f 8 8 8 f f f f 8 . . . . . 
    . . f b b 8 8 8 8 8 8 8 b b b b b b f f f f . . 
    f 8 8 8 8 8 8 b b b b b b b b b b b b 1 b b f f 
    f f f f f b b b b b b b b b 9 9 d d d b b b b f 
    . . . . . f b b b b 8 8 b b b b b b b b b 8 f . 
    . . . . f b b b b 8 8 f b 8 8 8 8 8 8 8 f f . . 
    . . . b b b b b 8 8 f f f f f f f f f f . . . . 
    . . . b 8 8 8 8 9 f . f c . f c . . . . . . . . 
    . . . f f f f f f . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(myPlane)
scene.cameraFollowSprite(myPlane)
for (let index = 0; index < 10; index++) {
    sprites.create_spreading_fire(assets.tile`tree`, assets.tile`tree fire`)
}
hud.forest_hud(true)
hud.danger_hud(true)
hud.forest_hud_healthy(9)
hud.forest_hud_burned(2)
game.onUpdate(function () {
    sprites.random_spread()
})

/// <reference path="vector.js" />
var celestialObjectCount = 0;
class CelestialObject {
    pos;
    vel;
    mass;
    element;
    id;
    constructor(pos, vel, mass, color) {
        this.pos = pos;
        this.vel = vel;
        this.mass = mass;
        this.id = ++celestialObjectCount;
        this.element = $("<div></div>").attr("id", "body" + this.id).attr("class", "body").css({
            "borderRadius": "100%",
            "backgroundColor": color,
            "left": this.pos[0], // TODO: factor in width and height
            "top": this.pos[1]
        });
        $("#field").append(this.element);
    }
    getDistance(other) {
        return this.pos.getDistance(other.pos);
    }
    applyTranslation() {
        this.pos = this.pos.add(this.vel);
        $("#body" + this.id).css({
            "left": this.pos[0],
            "top": this.pos[1]
        });
    }
}

function createDefaultCelestialObjects() {
    return [
        new CelestialObject(
            new Vector (160.0, 160.0),
            new Vector(.0005, 0.0005),
            2,
            "red"
        ),
        new CelestialObject(
            new Vector (320.0, 320.0),
            new Vector(-.001, 0.001),
            2,
            "blue"
        ),
        new CelestialObject(
            new Vector (400.0, 220.0),
            new Vector(-.000, 0.0005),
            2,
            "green"
        ),
        new CelestialObject(
            new Vector (600.0, 220.0),
            new Vector(.000, -0.0005),
            2,
            "yellow"
        )
    ];
}

function clear() {
    $(".body").remove();
    celestialObjectCount = 0;
}

function createObject(pos, vel, mass, color) {
    vel = vel.multiply(1.0 / 10000.0, 1.0 / 10000.0)
    return new CelestialObject(
        pos,
        vel,
        mass,
        color
    )
}

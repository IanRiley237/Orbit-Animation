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
        this.element = $("<div></div>").attr("id", this.id).attr("class", "body").css({
            "backgroundColor": color
        });
        $("#field").append(this.element);
    }
    getDistance(other) {
        return this.pos.getDistance(other.pos);
    }
    applyTranslation() {
        this.pos = this.pos.add(this.vel);
        $("#" + this.id).css({
            "left": this.pos[0],
            "top": this.pos[1]
        });
    }
}

function createDefaultCelestialObjects() {
    return [
        // new CelestialObject(
        //     new Vector (160.0, 160.0),
        //     new Vector(.0005, 0.0005),
        //     2,
        //     "red"
        // ),
        // new CelestialObject(
        //     new Vector (320.0, 320.0),
        //     new Vector(-.001, 0.001),
        //     2,
        //     "blue"
        // ),
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

var celestialObjectCount = 0;
class CelestialObject {
    pos;
    vel;
    mass;
    element;
    constructor(pos, vel, mass, color) {
        this.pos = pos;
        this.vel = vel;
        this.mass = mass;
        this.element = document.createElement("div")
        this.element.id = ++celestialObjectCount;
        this.element.className = "body";
        this.element.style.backgroundColor = color;
        document.body.appendChild(this.element);
    }
    getDistance(other) {
        return this.pos.getDistance(other.pos);
    }
    applyTranslation() {
        this.pos = this.pos.add(this.vel);
        this.element.style.left = this.pos[0] + "px";
        this.element.style.top = this.pos[1] + "px";
    }
}

function createCelestialObjects() {
    return [
        // new CelestialObject(
        //     new Vector (160.0, 160.0),
        //     new Vector(.0005, 0.0005),
        //     2,
        //     document.getElementById("red")
        // ),
        // new CelestialObject(
        //     new Vector (320.0, 320.0),
        //     new Vector(-.001, 0.001),
        //     2,
        //     document.getElementById("blue")
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

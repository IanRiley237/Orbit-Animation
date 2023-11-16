class Vector extends Array {
    add(otherVector) {
        return this.map((e, i) => e + otherVector[i]);
    }
    sub(otherVector) {
        return this.map((e, i) => e - otherVector[i]);
    }
    multiply(multiplier) {
        return this.map((e, i) => e * multiplier);
    }
    magnitude() {
        return (this[0] ** 2 + this[1] ** 2) ** 0.5
    }
    normalize() {
        return this.map((e) => e / this.magnitude());
    }
    getDistance(otherVector) {
        return Math.abs(this.sub(otherVector).magnitude());
    }
}

class CelestialObject {
    pos;
    vel;
    mass;
    radius;
    color;
    constructor(pos, vel, mass, radius, color) {
        this.pos = pos;
        this.vel = vel;
        this.mass = mass;
        this.radius = radius;
        this.color = color;
    }
    getDistance(other) {
        return this.pos.getDistance(other.pos);
    }
    applyTranslation() {
        this.pos = this.pos.add(this.vel);
    }
    toArray() {
        return {xPos: this.pos[0], yPos: this.pos[1], xVel: this.vel[0], yVel: this.vel[1], mass: this.mass, radius: this.radius, color: this.color};
    }
}

var GFactorOffset = 6;
const G = 6.67430 * 10 ** (-11 + GFactorOffset);

var celestialObjects = [];
var currObj = 0;
var totalMassOverRadiusSquared = 0;
var totalVector = new Vector(0, 0);
var playing = 0;
var resolution = 500

function play() {
    if (playing) {
        for (let i = 0; i <= resolution; i++)
            celestialObjects.forEach(applyForcesToOthers);
        var returnObjects = ["apply"];
        celestialObjects.forEach(object => {
            returnObjects.push(object.toArray()) // Add index probably
        });
        self.postMessage(returnObjects);
    }
}

function applyForcesToOthers(ob, index) {
    currObj = index;
    totalMassOverRadiusSquared = 0;
    totalVector = new Vector(0, 0);
    celestialObjects.forEach(findValues);
    ob.vel =
        ob.vel.add(
            totalVector.multiply(totalMassOverRadiusSquared * G)
        );
    ob.applyTranslation();
}

function findValues(ob, index) {
    if (index == currObj || celestialObjects[currObj].getDistance(ob) == 0) {
        return;
    }
    totalMassOverRadiusSquared += ob.mass / celestialObjects[currObj].getDistance(ob) ** 2;
    totalVector =
        totalVector.add(
            ob.pos.sub(celestialObjects[currObj].pos).normalize()
        );
}


onmessage = function (e) {
    switch (e.data[0]) {
        case "object":
            e.data.slice(1).forEach(data => {
                addObject(data);
            });
            break;
        case "default":
            addObject([160, 160, 0.0005, 0.0005, 2, 1, "red"]);
            addObject([320, 320, -0.001, 0.001, 2, 1, "blue"]);
            addObject([400, 220, 0.000, 0.0005, 2, 1, "green"]);
            addObject([600, 220, -0.000, -0.0005, 2, 1, "yellow"]);
            break;
        case "play":
            playing = 1;
            play();
            break;
        case "continue":
            play();
            break;
        case "pause":
            playing = 0;
            break;
        case "resolution":
            resolution = e.data[1];
            break;
        default:
            break;
    }
};

function addObject(data) {
    let newObject = new CelestialObject(
        pos = new Vector(data[0], data[1]),
        vel = new Vector(data[2], data[3]),
        mass = data[4],
        radius = data[5],
        color = data[6],
    )
    celestialObjects.push(newObject);
    let returnObjects = ["apply"];
    celestialObjects.forEach(object => {
        returnObjects.push(object.toArray()) // Add index probably
    });
    self.postMessage(returnObjects);
}
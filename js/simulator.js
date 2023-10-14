/// <reference path="celestial_object.js" />
var GFactorOffset = 6;
const G = 6.67430 * 10**(-11 + GFactorOffset);

var celestialObjects = [];
var currObj = 0;
var totalMassOverRadiusSquared = 0;
var totalVector = new Vector(0, 0);

var isPaused = 1;
function play() {
    isPaused = 0;
    var id = null;
    clearInterval(id);
    id = setInterval(frame, 1);
    function frame() {
        if (isPaused == 1) {
            return;
        }
        for (var i = 0; i < 500; i++) {
            celestialObjects.forEach(applyForcesToOthers);
        }
    }
}

function pause () {
    isPaused = 1;
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
    totalMassOverRadiusSquared += ob.mass / celestialObjects[currObj].getDistance(ob)**2;
    totalVector = 
        totalVector.add(
            ob.pos.sub(celestialObjects[currObj].pos).normalize()
        );
}
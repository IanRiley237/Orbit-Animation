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
        let mag = this.magnitude();
        return this.map((e) => e / mag);
    }
    getDistance(otherVector) {
        return Math.abs(this.sub(otherVector).magnitude());
    }
}

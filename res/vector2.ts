import { VectorModulus } from "./types";

export default class Vector2 {
    constructor(public x: number, public y: number) { }

    toArray(): number[] {
        return [this.x, this.y];
    }

    clone(): Vector2 {
        return new Vector2(this.x, this.y);
    }

    magnitude(): number {
        return Math.hypot(this.x, this.y);
    }

    unit(): Vector2 {
        return Vector2.div(this, this.magnitude());
    }

    invert(): Vector2 {
        this.x = -this.x;
        this.y = -this.y;

        return this;
    }

    invertX(): Vector2 {
        this.x = -this.x;

        return this;
    }

    invertY(): Vector2 {
        this.y = -this.y;

        return this;
    }

    toString() {
        return "(" + this.x + ", " + this.y + ")";
    }

    static get zero(): Vector2 {
        return new Vector2(0, 0);
    }

    static distance(a: Vector2, b: Vector2): number {
        console.log("here");
        return Math.hypot(a.x - b.x, a.y - b.y);
    }

    static sum(a: Vector2, b: Vector2): Vector2 {
        return new Vector2(a.x + b.x, a.y + b.y);
    }

    static sub(a: Vector2, b: Vector2): Vector2 {
        return new Vector2(a.x - b.x, a.y - b.y);
    }

    static mult(a: Vector2 | number, b: Vector2 | number): Vector2 {
        if (typeof (a) == "number" && typeof (b) == "object")
            return new Vector2(a * b.x, a * b.y);

        if (typeof (a) == "object" && typeof (b) == "number")
            return new Vector2(a.x * b, a.y * b);

        if (typeof (a) == "object" && typeof (b) == "object")
            return new Vector2(a.x * b.x, a.y * b.y);

        throw "arguments 'a' and 'b' are either both numbers";
    }

    static div(a: Vector2 | number, b: Vector2 | number): Vector2 {
        if (typeof (a) == "number" && typeof (b) == "object")
            return new Vector2(a / b.x, a / b.y);

        if (typeof (a) == "object" && typeof (b) == "number")
            return new Vector2(a.x / b, a.y / b);

        if (typeof (a) == "object" && typeof (b) == "object")
            return new Vector2(a.x / b.x, a.y / b.y);

        throw "arguments 'a' and 'b' are either both numbers";
    }

    static equals(a: Vector2, b: Vector2): boolean {
        return a.x == b.x && a.y == b.y;
    }

    static getVectorDeterminant(a: Vector2, b: Vector2, c: Vector2): number {
        return (a.x * b.y + a.y * c.x + b.x * c.y) - (b.y * c.x + a.x * c.y + a.y * b.x);
    }

    static dotProduct(a: Vector2, b: Vector2): number {
        return a.x * b.x + a.y * b.y;
    }

    /**
     * Returns the angle between two vectors in radians
     * @param a Vector 1
     * @param b Vector 2
     */
    static angleBetween(a: Vector2, b: Vector2): number {
        return Math.acos(Vector2.dotProduct(a, b) / (a.magnitude() * b.magnitude()));
    }
}
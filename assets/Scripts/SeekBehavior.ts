import { math, Vec2 } from "cc";
import { ISteeringBehavior } from "./ISteeringBehavior";

export class SeekBehavior implements ISteeringBehavior {
    getDesiredVelocity(currentPostion: math.Vec2, targetPosition?: Readonly<math.Vec2>): Vec2 {
        let desiredDir = new Vec2
        Vec2.subtract(desiredDir, targetPosition, currentPostion)
        return desiredDir.normalize()

    }
}
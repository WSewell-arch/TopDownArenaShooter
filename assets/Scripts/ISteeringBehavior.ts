import { Vec2 } from "cc";

export interface ISteeringBehavior {
    getDesiredVelocity(currentPostion: Vec2, targetPosition?: Readonly<Vec2>,
        targetVelocty?: Readonly<Vec2>): Vec2
}
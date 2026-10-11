import { math, Vec2 } from "cc";
import { ISteeringBehavior } from "./ISteeringBehavior";
import { Enemy_Movement_System } from "./Enemy_Movement_System";

export class AllignmentBehavior implements ISteeringBehavior {
    
    private brain: Enemy_Movement_System
    private alignmentRadius: number
    
    constructor(enemyMovementSystem: Enemy_Movement_System, alignmentRadius: number) {
        this.brain = enemyMovementSystem
        this.alignmentRadius = alignmentRadius
    }
    
    
    getDesiredVelocity(currentPostion: math.Vec2, targetPosition?: Readonly<math.Vec2>): math.Vec2 {
        let neighbors = this.brain.getNeighborsData()
        let alignmentForce = new Vec2

        if (neighbors.length === 0) return alignmentForce

        let averageVelocity = new Vec2
        let neighborCount = 0

        for (let neighbor of neighbors) {
            let distance = Vec2.distance(currentPostion, neighbor.position)

            if (distance < this.alignmentRadius) {
                averageVelocity.add(neighbor.velocity)
                neighborCount++
            }
        }

        if (neighborCount === 0) return alignmentForce

        averageVelocity.multiplyScalar(1.0/ neighborCount)

        if (averageVelocity.lengthSqr() > 0) {
            averageVelocity.normalize()
            alignmentForce = averageVelocity
        }

        return alignmentForce
    }
    
}



import { math, Vec2 } from "cc";
import { ISteeringBehavior } from "./ISteeringBehavior";
import { Enemy_Movement_System } from "./Enemy_Movement_System";

export class CohesionBehavior implements ISteeringBehavior {
    
    private brain: Enemy_Movement_System
    private cohesionRadius: number

    constructor(enemyMovementSystem: Enemy_Movement_System, cohesionRadius: number) {
        this.brain = enemyMovementSystem
        this.cohesionRadius = cohesionRadius
    }
    
    getDesiredVelocity(currentPostion: math.Vec2, targetPosition?: Readonly<math.Vec2>): math.Vec2 {
        
        let neighbors = this.brain.getNeighborsData()
        let cohesionForce = new Vec2

        if (neighbors.length <= 0) return cohesionForce

        let centerOfMass = new Vec2
        let neighborCount = 0

        for(let neighbor of neighbors) {
            let distance = Vec2.distance(currentPostion, neighbor.position)

            if (distance < this.cohesionRadius) {
                centerOfMass.add(neighbor.position)
                neighborCount++
            }
        }

        if (neighborCount === 0) return cohesionForce

        centerOfMass.multiplyScalar(1.0/ neighborCount)
        Vec2.subtract(cohesionForce, centerOfMass, currentPostion)

        let distanceToCenter = cohesionForce.length()
        cohesionForce.normalize()

        let strength = Math.min(distanceToCenter/ this.cohesionRadius, - 1.0)
        cohesionForce.multiplyScalar(strength)

        return cohesionForce
    }
    
}



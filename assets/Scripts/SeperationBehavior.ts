import { math, Vec2 } from "cc";
import { ISteeringBehavior } from "./ISteeringBehavior";
import { Enemy_Movement_System } from "./Enemy_Movement_System";

export class SeperationBehavior implements ISteeringBehavior {
    
    private brain: Enemy_Movement_System
    private seperationRadius: number

    constructor( movementSystem: Enemy_Movement_System, seperationRadius: number) {
        this.brain = movementSystem
        this.seperationRadius = seperationRadius
    }
    
    getDesiredVelocity(currentPostion: math.Vec2, targetPosition?: Readonly<math.Vec2>): math.Vec2 {
        let neighbors = this.brain.getNeighbors()
        let seperationForce = new Vec2

        if (neighbors.length <= 0) return seperationForce
        
        let pushCount = 0

        for (let neighbor of neighbors ) {
            let distance = Vec2.distance(currentPostion, neighbor)

            if (distance < this.seperationRadius) {
                let pushVector = new Vec2

                if (distance === 0) {
                    pushVector.set(math.randomRange(-0.1, 0.1), math.randomRange(-0.1, 0.1))
                }
                else {
                    Vec2.subtract(pushVector, currentPostion, neighbor)
                    pushVector.normalize()
                    let strength = 1.0 - (distance /this.seperationRadius)
                    pushVector.multiplyScalar(strength)
                }

                seperationForce.add(pushVector)
                pushCount++
            }

            if (pushCount > 0) {
                seperationForce.multiplyScalar(1.0/ pushCount)
            }
            return seperationForce
            
        }
    }
    
}



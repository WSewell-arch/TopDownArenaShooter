import { math, Vec2 } from "cc";
import { ISteeringBehavior } from "./ISteeringBehavior";
import { MovementConfig } from "./EnemyConfig";
import { Enemy_Movement_System } from "./Enemy_Movement_System";
import { AvoidBehavior } from "./AvoidBehavior";

export class TacticalSteeringBehavior implements ISteeringBehavior {
    
    private movementConfig: MovementConfig
    private currentHitNormals: Vec2[] = []
    private brain: Enemy_Movement_System
    private avoidBehavior: AvoidBehavior

    constructor(movementConfig: MovementConfig, enemyMovementSystem: Enemy_Movement_System) {
        this.movementConfig = movementConfig
        this.brain = enemyMovementSystem
        this.avoidBehavior = new AvoidBehavior(enemyMovementSystem, movementConfig.whiskers)
    }
    
    getDesiredVelocity(currentPostion: math.Vec2, targetPosition?: Readonly<math.Vec2>): math.Vec2 {
        
        let totalTacitcalForce = new Vec2

        if (this.movementConfig.avoidWeight > 0) {
            let avoidForce = this.avoidBehavior.getDesiredVelocity(currentPostion)
            //console.log(`Tactical: ${avoidForce}`)
            avoidForce.multiplyScalar(this.movementConfig.avoidWeight)
            totalTacitcalForce.add(avoidForce)
        }

        if (this.movementConfig.flocking.seperationWeight > 0) {
            
        }

        if (this.movementConfig.flocking.alignmentWeight > 0) {
            
        }

        if (this.movementConfig.flocking.cohesionWeight > 0) {
            
        }

        if (totalTacitcalForce.lengthSqr() > 1.0) {
            totalTacitcalForce.normalize()
        }
        return totalTacitcalForce
    }
    
}



import { Vec2 } from "cc";
import { Enemy_Input_System } from "./Enemy_Input_System";
import { IState } from "./IState";
import { ChaseState } from "./ChaseState";

export class PatrolState implements IState {
    
    private stuckTimer: number = 0
    private stuckThresholdTime: number = 0.5

    enter(brain: Enemy_Input_System): void {
        this.stuckTimer = 0
    }
    execute(brain: Enemy_Input_System, dt: number): void {
        
        let myPos = new Vec2(brain.node.worldPosition.x, brain.node.worldPosition.y)

        if (brain.getDistanceToPlayer(myPos) < brain.spotPlayerDistance) {
            brain.changeState(brain.chaseState)
            return
        }

        if (brain.wander.hasArrived(myPos)) {
            brain.wander.pickNewWanderPoint()
            brain.changeState(brain.arriveState)
            return
        }

        if (brain.isMovingSlowly) {
            this.stuckTimer += dt

            if (this.stuckTimer >= this.stuckThresholdTime) {
                brain.changeState(brain.stuckState)
                return
            }
        } else {
            this.stuckTimer = Math.max(0, this.stuckTimer - (dt * 2))
        }

        let dir = brain.wander.getDesiredVelocity(myPos)
        brain.setMoveDirection(dir)
    }
    exit(brain: Enemy_Input_System): void {
        
    }
}



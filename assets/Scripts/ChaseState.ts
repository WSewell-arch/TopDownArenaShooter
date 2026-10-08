import { Vec2 } from "cc";
import { Enemy_Input_System } from "./Enemy_Input_System";
import { IState } from "./IState";

export class ChaseState implements IState {
    
    private stuckTimer: number = 0
    private stuckThresholdTime: number = 1

    enter(brain: Enemy_Input_System): void {
        this.stuckTimer = 0
    }
    execute(brain: Enemy_Input_System, dt: number): void {
        
        if (!brain.targetNode) return

        let myPos = new Vec2(brain.node.worldPosition.x, 
            brain.node.worldPosition.y)

        if (brain.getDistanceToPlayer(myPos) > brain.lostPlayerDistance) {
            brain.changeState(brain.lostPlayerState)
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

        let dir = brain.seek.getDesiredVelocity(myPos, brain.getPlayerPos())
        brain.setMoveDirection(dir)
    }
    exit(brain: Enemy_Input_System): void {
        
    }
}



import { Vec2 } from "cc";
import { Enemy_Input_System } from "./Enemy_Input_System";
import { IState } from "./IState";

export class ChaseState implements IState {
    enter(brain: Enemy_Input_System): void {
        
    }
    execute(brain: Enemy_Input_System, dt: number): void {
        
        if (!brain.targetNode) return

        let myPos = new Vec2(brain.node.worldPosition.x, 
            brain.node.worldPosition.y)

        if (brain.getDistanceToPlayer(myPos) > brain.lostPlayerDistance) {
            brain.changeState(brain.lostPlayerState)
            return
        }

        let dir = brain.seek.getDesiredVelocity(myPos, brain.getPlayerPos())
        brain.setMoveDirection(dir)
    }
    exit(brain: Enemy_Input_System): void {
        
    }
}



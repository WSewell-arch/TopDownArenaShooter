import { Vec2 } from "cc";
import { Enemy_Input_System } from "./Enemy_Input_System";
import { IState } from "./IState";

export class PatrolState implements IState {
    enter(brain: Enemy_Input_System): void {

    }
    execute(brain: Enemy_Input_System, dt: number): void {
        
        let myPos = new Vec2(brain.node.worldPosition.x, brain.node.worldPosition.y)
        if (brain.wander.hasArrived(myPos)) {
            brain.wander.pickNewWanderPoint()
            brain.changeState(brain.arriveState)
            return
        }

        let dir = brain.wander.getDesiredVelocity(myPos)
        brain.setMoveDirection(dir)
    }
    exit(brain: Enemy_Input_System): void {
        
    }
}



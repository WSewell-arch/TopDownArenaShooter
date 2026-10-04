import { _decorator, Component, find, Node, Vec2 } from 'cc';
import { Enemy_Input_System } from './Enemy_Input_System';
import { Enemy_Movement_System } from './Enemy_Movement_System';
import { HealthSystem } from './HealthSystem';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {
    
    private inputSystem: Enemy_Input_System | null = null
    private movementSystem: Enemy_Movement_System | null = null
    private healthSystem: HealthSystem | null = null
    private targetNode: Node | null = null

    protected onLoad(): void {
        this.inputSystem = this.getComponent(Enemy_Input_System)
        this.movementSystem = this.getComponent(Enemy_Movement_System)
        this.healthSystem = this.getComponent(HealthSystem)

        if (this.healthSystem) {
            this.healthSystem.initialize(20)
        }


    }
    
    start() {
        if (this.inputSystem) {
            //this.targetNode = find("Canvas/Player")
            let wanderPoints = this.node.getParent().getChildByName("WandereNodes").children.map(
                child => new Vec2(child.worldPosition.x, child.worldPosition.y)
            )
            this.inputSystem.initialize(wanderPoints)
        }    
    }

    update(deltaTime: number) {
        if (this.healthSystem) {
            if (this.healthSystem.isDead) {
                this.node.destroy()
            }
        }

        if (this.inputSystem && this.movementSystem) {
            
            let moveDir = this.inputSystem.getMoveDirection()

            this.movementSystem.updateMovement(moveDir)

            let targetAngle = this.inputSystem.getRoationAngle()
            this.movementSystem.updateRotation(targetAngle)
        }
    }
}



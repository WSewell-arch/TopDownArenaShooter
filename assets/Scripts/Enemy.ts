import { _decorator, Component, find, Node, Vec2 } from 'cc';
import { Enemy_Input_System } from './Enemy_Input_System';
import { Enemy_Movement_System } from './Enemy_Movement_System';
import { HealthSystem } from './HealthSystem';
import { IntentConfig } from './EnemyConfig';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {

    @property({ group: 'Intent Weights', slide: true, range: [0, 5, 0.1]})
    public seekWeight: number = 1.0

    @property({ group: 'Intent Weights', slide: true, range: [0, 5, 0.1]})
    public fleeWeight: number = 0.0
    
    private inputSystem: Enemy_Input_System | null = null
    private movementSystem: Enemy_Movement_System | null = null
    private healthSystem: HealthSystem | null = null
    private intentConfig: IntentConfig
    private targetNode: Node | null = null

    protected onLoad(): void {
        this.inputSystem = this.getComponent(Enemy_Input_System)
        this.movementSystem = this.getComponent(Enemy_Movement_System)
        this.healthSystem = this.getComponent(HealthSystem)

        if (this.healthSystem) {
            this.healthSystem.initialize(20)
        }

        this.intentConfig = {
            seekWeight: this.seekWeight,
            fleeWeight: this.fleeWeight,
        }
    }
    
    start() {
        if (this.inputSystem) {
            this.targetNode = find("Canvas/Player")
            let wanderPoints = this.node.getParent().getChildByName("WandereNodes").children.map(
                child => new Vec2(child.worldPosition.x, child.worldPosition.y)
            )
            this.inputSystem.initialize(this.targetNode, wanderPoints, this.intentConfig)
        }    
    }

    update(deltaTime: number) {
        if (this.healthSystem) {
            if (this.healthSystem.isDead) {
                this.node.destroy()
            }
        }

        if (this.inputSystem && this.movementSystem) {
            
            let isSlow = this.movementSystem.isMovingSlowly()
            this.inputSystem.isMovingSlowly = isSlow 
            
            this.inputSystem.processFSM(deltaTime)
            
            let moveDir = this.inputSystem.getMoveDirection()

            this.movementSystem.updateMovement(moveDir)

            let targetAngle = this.inputSystem.getRoationAngle()
            this.movementSystem.updateRotation(targetAngle)
        }

        if (this.inputSystem.stateDebugLabel) {
            this.inputSystem.stateDebugLabel.node.angle = -this.node.angle
        }
    }
}



import { _decorator, Component, find, JsonAsset, Node, Vec2 } from 'cc';
import { Enemy_Input_System } from './Enemy_Input_System';
import { Enemy_Movement_System } from './Enemy_Movement_System';
import { HealthSystem } from './HealthSystem';
import { EnemyConfig, IntentConfig, MovementConfig } from './EnemyConfig';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {

    public static activeEnemies: Enemy[] = [] 


    private inputSystem: Enemy_Input_System | null = null
    private movementSystem: Enemy_Movement_System | null = null
    private healthSystem: HealthSystem | null = null
    private intentConfig: IntentConfig
    private movementConfig: MovementConfig

    private targetNode: Node | null = null
    private configLoaded: boolean = false

    @property({ type:JsonAsset})
    public testConfigFile: JsonAsset | null = null
    //node: any;

    protected onLoad(): void {

        Enemy.activeEnemies.push(this)
    }

    protected start(): void {
        if (this.testConfigFile && this.testConfigFile.json) {
            let configData = this.testConfigFile.json as unknown as EnemyConfig
            console.log(`[Enemy] Reading Configuration form ${this.testConfigFile.name}`)
            this.init(configData)
        } else {
            console.log('[Enemy] Has no Config file attached')
        }
    }

    public init(enemyConfig: EnemyConfig){
        if (!this.inputSystem) {
            this.inputSystem = this.getComponent(Enemy_Input_System)
        }

        if (!this.movementSystem) {
            this.movementSystem = this.getComponent(Enemy_Movement_System)
        }

        if (!this.healthSystem) {
            this.healthSystem = this.getComponent(HealthSystem)
        }

        this.node.setScale(enemyConfig.scale.x, enemyConfig.scale.y)

        if (this.healthSystem) {
            this.healthSystem.initialize(20)
        }

        if (this.inputSystem) {
            this.targetNode = find("Canvas/Player")
            let wanderPoints = this.node.getParent().getChildByName("WandereNodes").children.map(
                child => new Vec2(child.worldPosition.x, child.worldPosition.y)
            )
            this.inputSystem.initialize(this.targetNode, wanderPoints, enemyConfig.Intent)
        }

        if (this.movementSystem) {
            this.movementSystem.init(enemyConfig.Intent.maxSpeed, enemyConfig.moving)
        }

        if (this.healthSystem) {
            this.healthSystem.initialize(enemyConfig.health)
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

    protected onDestroy(): void {
        let index = Enemy.activeEnemies.indexOf(this)
        if (index > -1) {
            Enemy.activeEnemies.splice(index, 1)
        }
    }
}



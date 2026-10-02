import { _decorator, Camera, Component, EventKeyboard, EventMouse, Node, Prefab } from 'cc';
import { Player_Input_System } from './Player_Input_System';
import { Player_Movement_System } from './Player_Movement_System';
import { Player_Weapon_System } from './Player_Weapon_System';
import { WeaponConfig } from './WeaponConfig';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    
    private inputSystem: Player_Input_System | null = null
    private movementSystem: Player_Movement_System | null = null
    private weaponSystem: Player_Weapon_System | null = null;
    public mainCamera: Camera | null = null;

    protected onLoad(): void {
        this.inputSystem = this.getComponent(Player_Input_System)
        this.movementSystem = this.getComponent(Player_Movement_System)
        this.weaponSystem = this.getComponent(Player_Weapon_System)
    }

    public initialize(camera: Camera): void {
        this.mainCamera = camera;
    }

    public initializeWeapon(config: WeaponConfig, bulletPrefab: Prefab, bulletContainer: Node){
        if (this.weaponSystem){
            this.weaponSystem.equipeWeapon(config, bulletPrefab, bulletContainer, this.node)
        }
    }

    start() {
        if (this.inputSystem) {
            this.inputSystem.initalize(this.mainCamera)
        }
    }

    protected update(deltaTime: number) {
        if (this.inputSystem && this.movementSystem ) {
           let moveDir = this.inputSystem.getMoveDirection();
           this.movementSystem.updateMovement(moveDir); 
           let targetAngle = this.inputSystem.getRoationAngle()
           this.movementSystem.updateRotation(targetAngle)
        }

        if (this.inputSystem && this.weaponSystem) {
            let isFiring = this.inputSystem.isShooting
            this.weaponSystem.processFiring(isFiring, this.node.angle)
            if (this.inputSystem.getSingleShotIntent()) {
                this.weaponSystem.triggerSingleShot(this.node.angle)
            }
        }
    }



}



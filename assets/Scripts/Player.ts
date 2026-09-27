import { _decorator, Camera, Component, EventKeyboard, EventMouse, Node, Prefab } from 'cc';
import { Player_Input_System } from './Player_Input_System';
import { Player_Movement_System } from './Player_Movement_System';
import { Player_Weapon_System } from './Player_Weapon_System';
import { WeaponConfig } from './WeaponConfig';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    
    private inputSystem: Player_Input_System | null = null;
    private movementSystem: Player_Movement_System | null = null;
    private weaponSystem: Player_Weapon_System | null = null;
    private mainCamera: Camera | null = null;

    public initialize(camera: Camera): void {
        this.mainCamera = camera;
    }

    public initializeWeapon(config: WeaponConfig, bulletPrefab: Prefab, bulletContainer: Node){
        if (this.weaponSystem){
            this.weaponSystem.equipeWeapon(config, bulletPrefab, bulletContainer, this.node)
        }
    }

    start() {

    }

    protected update(deltaTime: number) {
        if (this.inputSystem && this.movementSystem ) {
           let moveDir = this.inputSystem.getMoveDirection();
           this.movementSystem.updateMovement(moveDir); 
        }

        if (this.inputSystem && this.weaponSystem) {
            let isFiring = this.inputSystem.isShooting
            this.weaponSystem.processFiring(isFiring, this.node.angle)
        }
    }

    public proccessKeyDown(event: EventKeyboard): void {
        if (this.inputSystem) this.inputSystem.handleKeyDown(event);
    }
    public proccessKeyUp(event: EventKeyboard): void {
        if (this.inputSystem) this.inputSystem.handleKeyUp(event);

    }
    public proccessMouseDown(event: EventMouse): void {
        if (this.inputSystem) this.inputSystem.handleMouseDown(event);
        if (this.weaponSystem) this.weaponSystem.triggerSingleShot(this.node.angle)
    }
    public proccessMouseUp(event: EventMouse): void {
        if (this.inputSystem) this.inputSystem.handleMouseUp(event);
    }
    public proccessMouseMove(event: EventMouse): void {
        if (this.inputSystem && this.movementSystem && this.mainCamera){
            let targetAngle = this.inputSystem.handleMouseMove(event,
                this.mainCamera, this.node.getWorldPosition()
            )

            this.movementSystem.updateRotation(targetAngle)
        }
    }

}



import { _decorator, Component, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player_Weapon_System')
export class Player_Weapon_System extends Component {
    
    public initializeWeapon(bulletPrefab: Prefab, bulletContainer: Node): void {

    }

    public processFiring(isFiring: boolean, currentAngle: number, dt: number): void {

    }

    public triggerSingleShot(currentAngle: number): void {

    }

    
}



import { _decorator, Component, Node, Prefab } from 'cc';
import { Weapon } from './Weapon';
import { FireMode, WeaponConfig } from './WeaponConfig';
import { Weapon_Factory } from './Weapon_Factory';
const { ccclass, property } = _decorator;

@ccclass('Player_Weapon_System')
export class Player_Weapon_System extends Component {
    
    private currentWeaponNode: Node | null = null
    private currentWeapon: Weapon | null = null


    public equipeWeapon(config: WeaponConfig, bulletPrefab: Prefab, bulletContainer: Node, playerNode : Node): void {
        if (this.currentWeaponNode) this.currentWeaponNode.destroy()
        this.currentWeaponNode = Weapon_Factory.createWeapon(config, bulletPrefab, playerNode, bulletContainer, true)
        this.currentWeapon = this.currentWeaponNode.getComponent(Weapon)
    }

    public processFiring(isFiring: boolean, currentAngle: number): void {
        if (!this.currentWeapon || !isFiring) return

        if (this.currentWeapon.currentFireMode !== FireMode.SEMI_AUTO){
            this.currentWeapon.TriggerPulled(currentAngle)
        }
    }

    public triggerSingleShot(currentAngle: number): void {
        if (!this.currentWeapon) return

        if (this.currentWeapon.currentFireMode == FireMode.SEMI_AUTO) {
            this.currentWeapon.TriggerPulled(currentAngle)
        }
    }

    
}



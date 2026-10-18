import { _decorator, Component, EventKeyboard, Node, Prefab, EventMouse, input, Input } from 'cc';
const { ccclass, property } = _decorator;

import { Player } from './Player';
import { Camera } from 'cc';
import { DOUBLE_GUN, FORWARD_REAR_PISTOL, PISTOL, SPREAD_GUN } from './WeaponConfig';
import { EventBus, GameEvents } from './EventBus';


@ccclass('GameCTRL')
export class GameCTRL extends Component {
    
    @property({
        type: Player,
        tooltip: "Drop Player Node Here"
    })
    public player: Player | null = null;
    
    @property({
        type: Camera,
        tooltip: "Drop The Camera Node Here"
    })
    public camera: Camera | null = null;

    @property({
        type: Prefab,
        tooltip: "Drop the Bullet Node Here"
    })
    public defaultBulletPrefab: Prefab | null = null;

    @property({
        type: Node,
        tooltip: "Drop the Bullet Container Node Here"
    })
    public bulletContainer: Node | null = null;
    
    protected onLoad(): void {
        EventBus.on(GameEvents.WEAPON_SWAP, this.handleWeaponSwap, this)
    }
    
    start() {
        if (this.player && this.camera) {
            this.player.initialize(this.camera);
        }

        if (this.player && this.defaultBulletPrefab && this.bulletContainer) {
            this.player.initializeWeapon(PISTOL, this.defaultBulletPrefab, this.bulletContainer)
        }


        

    }

    protected onDestroy(): void {    
        EventBus.off(GameEvents.WEAPON_SWAP, this.handleWeaponSwap, this)
    }

    update(deltaTime: number) {
        
    }


    private handleWeaponSwap(weaponIndex: number) {
        switch(weaponIndex) {
            case 1:
                this.player.initializeWeapon(PISTOL, this.defaultBulletPrefab, this.bulletContainer)
                break
            case 2:
                this.player.initializeWeapon(DOUBLE_GUN, this.defaultBulletPrefab, this.bulletContainer)
                break
            case 3:
                this.player.initializeWeapon(FORWARD_REAR_PISTOL, this.defaultBulletPrefab, this.bulletContainer)
                break
            case 4:
                this.player.initializeWeapon(SPREAD_GUN, this.defaultBulletPrefab, this.bulletContainer)
                break
                
        }
    }
}



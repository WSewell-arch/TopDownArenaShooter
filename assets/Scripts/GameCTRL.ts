import { _decorator, Component, EventKeyboard, Node, Prefab, EventMouse } from 'cc';
const { ccclass, property } = _decorator;

import { Player } from './Player';
import { Camera } from 'cc';


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
    
    start() {

    }

    protected onDestroy(): void {
        
    }

    update(deltaTime: number) {
        
    }

    private OnkeyDown(event: EventKeyboard): void {};
    private OnkeyUp(event: EventKeyboard): void {}
    private onMouseMove(event: EventMouse): void {}
    private OnMouseDown(event: EventMouse): void {}
    private OnMouseUp(event: EventMouse): void {}
}



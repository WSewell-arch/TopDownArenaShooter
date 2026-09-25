import { _decorator, Component, EventKeyboard, Node, Prefab, EventMouse, input, Input } from 'cc';
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
        if (this.player && this.camera) {
            this.player.initialize(this.camera);
        }

        input.on(Input.EventType.KEY_DOWN, this.OnkeyDown, this);
        input.on(Input.EventType.KEY_UP, this.OnkeyUp, this);
        input.on(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
        input.on(Input.EventType.MOUSE_DOWN, this.OnMouseDown, this);
        input.on(Input.EventType.MOUSE_UP, this.OnMouseUp, this);
    }

    protected onDestroy(): void {
        input.off(Input.EventType.KEY_DOWN, this.OnkeyDown, this);
        input.off(Input.EventType.KEY_UP, this.OnkeyUp, this);
        input.off(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
        input.off(Input.EventType.MOUSE_DOWN, this.OnMouseDown, this);
        input.off(Input.EventType.MOUSE_UP, this.OnMouseUp, this);
    }

    update(deltaTime: number) {
        
    }

    private OnkeyDown(event: EventKeyboard): void {
        if (this.player) this.player.proccessKeyDown(event)    
    }
    private OnkeyUp(event: EventKeyboard): void {
        if (this.player) this.player.proccessKeyUp(event)    
    }
    private onMouseMove(event: EventMouse): void {
        if (this.player) this.player.proccessMouseMove(event)    
    }
    private OnMouseDown(event: EventMouse): void {
        if (this.player) this.player.proccessMouseDown(event)    
    }
    private OnMouseUp(event: EventMouse): void {
        if (this.player) this.player.proccessMouseUp(event)    
    }
}



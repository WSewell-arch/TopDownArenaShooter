import { _decorator, Camera, Component, EventKeyboard, EventMouse, Node } from 'cc';
import { Player_Input_System } from './Player_Input_System';
import { Player_Movement_System } from './Player_Movement_System';
import { Player_Weapon_System } from './Player_Weapon_System';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    
    private inputSystem: Player_Input_System | null = null;
    private eventSystem: Player_Movement_System | null = null;
    private weaponSystem: Player_Weapon_System | null = null;
    private mainCamera: Camera | null = null;

    public initialize(camera: Camera): void {

    }

    start() {

    }

    protected update(deltaTime: number) {
        
    }

    public proccessKeyDown(event: EventKeyboard): void {}
    public proccessKeyUp(event: EventKeyboard): void {}
    public proccessMouseDown(event: EventMouse): void {}
    public proccessMouseUp(event: EventMouse): void {}
    public proccessMouseMove(event: EventMouse): void {}

}



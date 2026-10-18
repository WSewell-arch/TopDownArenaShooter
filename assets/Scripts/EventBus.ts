import { EventTarget } from "cc"
const gloalEventTarget = new EventTarget()

export const GameEvents = {
    ENEMY_DIED: 'ENEMY_DIED',
    ENEMY_HIT: 'ENEMY_HIT',
    WAVE_SPAWNED: 'WAVE_SPAWNED',
    WAVE_FINISHED: 'WAVE_FINISHED',
    WAVE_COUNTDOWN: 'WAVE_COUNTDOWN',
    GAME_PAUSED: 'GAME_PAUSED',
    GAME_RESUMED: 'GAME_RESUMED' 
}

export class EventBus {
    public static on(eventName: string, callback: (...args: any[]) => void, target?:any) {
        gloalEventTarget.on(eventName, callback, target)
    }

    public static off(eventName: string, callback: (...args: any[]) => void, target?:any) {
        gloalEventTarget.off(eventName, callback, target)
    }

    public static emit(eventName: string, ...args: any[]) {
        gloalEventTarget.emit(eventName, ...args)
    }
}



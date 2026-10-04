import { Enemy_Input_System } from "./Enemy_Input_System";

export interface IState {
    enter(brain: Enemy_Input_System): void
    execute(brain: Enemy_Input_System, dt: number): void
    exit(brain: Enemy_Input_System): void
}
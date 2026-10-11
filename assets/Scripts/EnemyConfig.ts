import { Vec2 } from "cc"

export interface IntentConfig {
    seekWeight: number
    fleeWeight: number
    // pursuitWeight: number
}

export interface WhiskersConfig {
    startPos: Vec2,
    angle: number,
    length: number    
}

export interface FlockingWeights {
    seperationWeight: number
    seperationRadius: number
    alignmentWeight: number
    alignmentRadius: number
    cohesionWeight: number
    cohesionRadius: number
}

export interface MovementConfig {
    maxSpeed: number
    maxTurnForce: number
    avoidWeight: number
    whiskers: WhiskersConfig[]
    flocking: FlockingWeights
}

export interface EnemyConfig {
    Intent: IntentConfig
    moving: MovementConfig
}


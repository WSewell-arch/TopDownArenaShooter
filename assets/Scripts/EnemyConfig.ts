
export interface IntentConfig {
    seekWeight: number
    fleeWeight: number
    // pursuitWeight: number
}

export interface MovementConfig {
    maxSpeed: number
    maxTurnForce: number
}

export interface EnemyConfig {
    Intent: IntentConfig
    moving: MovementConfig
}


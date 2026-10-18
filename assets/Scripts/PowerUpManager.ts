import { _decorator, Component, Game, instantiate, math, Node, NodePool, Prefab, Vec2, Vec3 } from 'cc';
import { PowerUpConfig, PowerupType } from './PowerUpConfig';
import { EventBus, GameEvents } from './EventBus';
import { Enemy } from './Enemy';
const { ccclass, property } = _decorator;

interface PowerUpPayLoad {
    type: PowerupType
    extraInfo: number
}

@ccclass('PowerUpManager')
export class PowerUpManager extends Component {

    @property({type: [PowerUpConfig], group: 'Power up Pool'})
    public dropPool: PowerUpConfig[] = []

    @property({ type: Node, group: 'Dependencies'})
    public powerUpContainer: Node | null = null

    @property({ type: Prefab, group: 'Dependencies'})
    public basePowerUpPrefab: Prefab | null = null

    private dropsRemainingThisWave: number = 0
    private enemiesRemaingThisWave: number = 0

    protected onLoad(): void {
        EventBus.on(GameEvents.WAVE_SPAWNED, this.setUpWaveDrops, this)
        EventBus.on(GameEvents.ENEMY_DIED, this.handleEnemyDrop, this)
        EventBus.on(GameEvents.POWERUP_COLLECTED, this.applyPowerUp, this)
        EventBus.on(GameEvents.WAVE_COUNTDOWN, this.handleCountDown, this)
    }

    protected onDestroy(): void {
        EventBus.off(GameEvents.WAVE_SPAWNED, this.setUpWaveDrops, this)
        EventBus.off(GameEvents.ENEMY_DIED, this.handleEnemyDrop, this)
        EventBus.off(GameEvents.POWERUP_COLLECTED, this.applyPowerUp, this)
        EventBus.off(GameEvents.WAVE_COUNTDOWN, this.handleCountDown, this) 
    }

    private handleCountDown(countDownText: string) {
        if (countDownText === 'Go!' && this.powerUpContainer) {
            this.powerUpContainer.removeAllChildren()
        }
    }

    private setUpWaveDrops(activeEnemies: Enemy[]) {
        this.enemiesRemaingThisWave = activeEnemies.length
        this.dropsRemainingThisWave = activeEnemies.length > 25 ?
            math.randomRangeInt(2, 3) : math.randomRangeInt(1, 2)
    }

    private handleEnemyDrop(deadEnemy: Enemy) {
        this.enemiesRemaingThisWave--
        if (this.dropsRemainingThisWave <= 0) return
        let dropChance = this.dropsRemainingThisWave / (this.enemiesRemaingThisWave + 1)

        if (Math.random() <= dropChance) {
            this.spawnPowerUp(deadEnemy.node.worldPosition)
            this.dropsRemainingThisWave--
        }
    }

    private spawnPowerUp(spawnPosition: Vec3) {
        if (this.dropPool.length <= 0 || !this.powerUpContainer || !this.basePowerUpPrefab) return

        let totalWeight = this.dropPool.reduce((sum, config) => sum + config.weight, 0)
        let randomValue = Math.random() * totalWeight
        let currentWeight = 0
        let chosenPowerUpConfig: PowerUpConfig | null = null

        for(let currentConfig of this.dropPool) {
            currentWeight += currentConfig.weight
            if (randomValue <= currentWeight) {
                chosenPowerUpConfig = currentConfig
                break
            }
        }

        if (chosenPowerUpConfig) {
            let powerUpNode = instantiate(this.basePowerUpPrefab)
            powerUpNode.setParent(this.powerUpContainer)
            powerUpNode.setWorldPosition(spawnPosition)

            let powerUpComponent = powerUpNode.getComponent(PowerUp)
            if (powerUpComponent) {
                powerUpComponent.init(chosenPowerUpConfig.type,
                        chosenPowerUpConfig.extraInfo, chosenPowerUpConfig.spriteIcon)
            }
        }
    }

    private applyPowerUp(payLoad: PowerUpPayLoad) {
        switch (payLoad.type) {
            case PowerupType.HEALTH_HEAL: 
                EventBus.emit(GameEvents.HEAL_PLAYER, payLoad.extraInfo)
                break
            case PowerupType.WEAPON_SWITCH:
                EventBus.emit(GameEvents.WEAPON_SWAP, payLoad.extraInfo)
                break
            default:
                console.log(`[PowerUpManager] Unhandled PowerupType ${payLoad.type}`)

        }   
    }


}



import { ERaycast2DType, math, PhysicsSystem, PhysicsSystem2D, Vec2 } from "cc";
import { ISteeringBehavior } from "./ISteeringBehavior";
import { Enemy_Movement_System } from "./Enemy_Movement_System";
import { WhiskersConfig } from "./EnemyConfig";

export class AvoidBehavior implements ISteeringBehavior {
    
    private brain: Enemy_Movement_System
    private whiskers: WhiskersConfig[] | null = null
    private currentHitNormals: Vec2[] = []

    private readonly GROUP_OBSTACLES = 1 << 5
    
    constructor(enemyMovementSystem: Enemy_Movement_System, whiskers: WhiskersConfig[]) {
        this.brain = enemyMovementSystem
        this.whiskers = whiskers
    }
    
    
    getDesiredVelocity(currentPostion: math.Vec2, targetPosition?: Readonly<math.Vec2>): math.Vec2 {
        
        this.Updatewhiskers()
        let avoidForce = new Vec2
        if (this.currentHitNormals.length <= 0) return avoidForce
        for (let normal of this.currentHitNormals) {
            avoidForce.add(normal)
        }
        return avoidForce
    }

    public Updatewhiskers() {
        this.currentHitNormals = []
        if (this.brain.debugGraphics) this.brain.debugGraphics.clear()
        let myWorldPos = new Vec2(this.brain.node.worldPosition.x, this.brain.node.worldPosition.y)
        let myAngle = this.brain.node.angle

        for (let whisker of this.whiskers){
            let localStart = whisker.startPos
            let localEnd = this.getEndPoint(localStart, whisker.angle, whisker.length)

            let worldStart = myWorldPos.clone()
            let worldAngle = myAngle + whisker.angle
            let worldEnd = this.getEndPoint(localStart, worldAngle, whisker.length)

            let results = PhysicsSystem2D.instance.raycast(worldStart, worldEnd, ERaycast2DType.Closest, this.GROUP_OBSTACLES)
            if (results.length > 0) {
                let hit = results[0]

                let strength = 1.0 - hit.fraction

                let pushForce = hit.normal.clone().multiplyScalar(strength)

                this.currentHitNormals.push(pushForce)

                let localHit = new Vec2
                Vec2.lerp(localHit, localStart, localEnd, hit.fraction)

                this.drawDebugRay(localStart, localEnd, true)
            }
            else {
                this.drawDebugRay(localStart, localEnd, false)
            }
        }
    }

    private getEndPoint(startPos: Vec2, angle: number, length: number): Vec2 {
        let radianAngle = math.toRadian(angle)

        let endX = startPos.x + (length * Math.cos(radianAngle))
        let endY = startPos.y + (length * Math.sin(radianAngle))

        return new Vec2( endX, endY)
    }

    private drawDebugRay(start: Vec2, end: Vec2, hit: boolean) {
        if (!this.brain.debugGraphics) return 

        this.brain.debugGraphics.strokeColor = hit ? math.Color.RED : math.Color.GREEN
        this.brain.debugGraphics.lineWidth = 2
        this.brain.debugGraphics.moveTo(start.x, start.y)
        this.brain.debugGraphics.lineTo(end.x, end.y)
        this.brain.debugGraphics.stroke()
    }
    
}



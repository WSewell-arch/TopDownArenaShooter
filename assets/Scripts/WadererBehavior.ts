import { math, Vec2 } from "cc";
import { ISteeringBehavior } from "./ISteeringBehavior";
import { SeekBehavior } from "./SeekBehavior";
import { IntentSteeringBehavior } from "./IntentSteeringBehavior";
import { IntentConfig } from "./EnemyConfig";

export class WadererBehavior implements ISteeringBehavior {
    
    private wayPoints: Vec2[] = []
    private currentWayPointsIndex: number = 0
    private wayPointThreshold: number = 10

    //private seekBehavior: SeekBehavior = new SeekBehavior()
    private compositeIntent: IntentSteeringBehavior = new IntentSteeringBehavior()

    public init(points: Vec2[], intent: IntentConfig) {
        this.setWayPoints(points)
        this.setWeights(intent)
    }
    
    private setWeights(intent: IntentConfig) {
        this.compositeIntent.setWeights(intent)
    }

    private setWayPoints(points: Vec2[]) {
        this.wayPoints = points
        this.pickNewWanderPoint()
    }

    public pickNewWanderPoint(){
        if (this.wayPoints.length <= 0) return 0
        this.currentWayPointsIndex = math.randomRangeInt(0, this.wayPoints.length)
    }

    public hasArrived(currentPos: Vec2): boolean {
        if (this.wayPoints.length <= 0) return 

        let currentTarget = this.wayPoints[this.currentWayPointsIndex]
        return Vec2.distance(currentPos, currentTarget) <= this.wayPointThreshold
    }


    
    
    getDesiredVelocity(currentPostion: Vec2): Vec2 {
        if (this.wayPoints.length === 0) return Vec2.ZERO

        let currentTarget = this.wayPoints[this.currentWayPointsIndex]
        return this.compositeIntent.getDesiredVelocity(currentPostion, currentTarget)
    }
}



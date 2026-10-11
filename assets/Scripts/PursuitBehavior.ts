import { math, Vec2 } from "cc";
import { ISteeringBehavior } from "./ISteeringBehavior";
import { SeekBehavior } from "./SeekBehavior";

export class PursuitBehavior implements ISteeringBehavior {
    
    private seekBehavior: SeekBehavior = new SeekBehavior()
    private pursuerSpeed: number
    private maxPredictionTime: number
    
    constructor(pursuerSpeed: number, maxPredictionTime: number) {
        this.pursuerSpeed = pursuerSpeed
        this.maxPredictionTime = maxPredictionTime
    }
    
    
    getDesiredVelocity(currentPostion: math.Vec2, targetPosition?: Readonly<math.Vec2>, targetVelocty?: Readonly<math.Vec2>): math.Vec2 {
        
        if (!targetPosition) return Vec2.ZERO

        if (!targetVelocty || targetVelocty.lengthSqr() === 0) {
            return this.seekBehavior.getDesiredVelocity(currentPostion, targetPosition)
        }

        let distance = Vec2.distance(currentPostion, targetPosition)

        let predictionTime = distance / this.pursuerSpeed

        if (predictionTime > this.maxPredictionTime) {
            predictionTime = this.maxPredictionTime
        }

        let predictionPosition = new Vec2
        let futureTravel = targetVelocty.clone().multiplyScalar(predictionTime)
        Vec2.add(predictionPosition, targetPosition, futureTravel)

        return this.seekBehavior.getDesiredVelocity(currentPostion, predictionPosition)
    }
   
}



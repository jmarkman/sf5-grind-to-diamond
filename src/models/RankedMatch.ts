export default class RankedMatch {
    points: number;
    result: string;
    opponent: string;
    replayId: string;
    
    constructor(points: number, result: string, opponent: string, replayId: string) {
        this.points = points;
        this.result = result;
        this.opponent = opponent;
        this.replayId = replayId;
    }
}

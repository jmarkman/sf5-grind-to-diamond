export default class RankedMatch {
    number: number;
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

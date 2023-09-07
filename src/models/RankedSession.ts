import RankedMatch from "./RankedMatch";

export default class RankedSession {
    public date: string;
    public pointsStart: number;
    public pointsEnd: number;
    matches: RankedMatch[];



    constructor(date: string, pointsStart: number, pointsEnd: number, matches: RankedMatch[]) {
        this.date = date;
        this.pointsStart = pointsStart;
        this.pointsEnd = pointsEnd;
        this.matches = matches;
    }
}
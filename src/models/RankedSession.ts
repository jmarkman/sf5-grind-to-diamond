import { IRankedMatch } from "./RankedMatch";

export interface IRankedSession {
    date: string;
    pointsStart: number;
    pointsEnd: number;
    matches: IRankedMatch[];
}
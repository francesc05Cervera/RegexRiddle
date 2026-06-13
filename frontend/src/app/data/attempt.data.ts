export interface Attempt {
    id: string;
    challengeId: string;
    userId: string;
    proposedRegex: string;
    matchedPositiveCount: number;
    matchedNegativeCount: number;
    solved: boolean;
    createdAt: string;
}
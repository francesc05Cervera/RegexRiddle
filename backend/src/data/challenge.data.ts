export interface Challenge {
    id: string;
    authorId: string;
    secretRegex: string;
    positiveExample: string;
    negativeExample: string;
    positiveControls: string[];
    negativeControls: string[];
    createdAt: string;
}
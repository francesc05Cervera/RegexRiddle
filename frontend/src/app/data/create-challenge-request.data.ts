export interface CreateChallengeRequest {
  secretRegex: string;
  positiveExample: string;
  negativeExample: string;
  positiveControls: string[];
  negativeControls: string[];
}
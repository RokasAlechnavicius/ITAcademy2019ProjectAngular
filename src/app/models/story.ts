import { Job } from './job';

export interface Story {
    id: number;
    description: string;
    job: Job;
    images?: string[];
    hasImages?: boolean;
    imagesTaken: boolean;
}

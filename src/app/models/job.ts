import { User } from './user';

export interface Job {
    id: number;
    date: string;
    idea: string;
    organisation: string;
    region: string;
    category: string;
    email?: string;
    contactName: string;
    website?: string;
    phone: string;
    description: string;
    organizator?: User;
    team?: User[];
    hashtags?: string[];
}

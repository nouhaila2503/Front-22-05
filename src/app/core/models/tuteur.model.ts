// src/app/models/tuteur.model.ts

import { User } from './user.model';

export interface Tuteur extends User {
  bio: string;
  prixParHeure: number;
  anneesExperience: number;
  totalCours: number;
  ratingMoyen: number;
  specialites: string[];
  certifications: Certification[];
  education: Education[];
  languages: Language[];
  isVerified: boolean;
  isAvailable: boolean;
  timezone: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: Date;
  expiryDate?: Date;
  credentialUrl?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
}

export interface Language {
  code: string;
  name: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Native';
}
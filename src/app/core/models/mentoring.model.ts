

import { User } from './user.model';

import { Tuteur } from './tuteur.model';

import { Module } from './module.model';

export interface MentoringRequest {
  id: string;
  apprenantId: string;
  apprenant?: User;
  tuteurId: string;
  tuteur?: Tuteur;
  moduleId: string;
  module?: Module;
  title: string;
  description: string;
  goals: string[];
  urgency: 'low' | 'medium' | 'high';
  preferredSchedule: PreferredSchedule;
  sessionType: 'one-time' | 'recurring';
  estimatedSessions?: number;
  budget?: number;
  status: MentoringStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PreferredSchedule {
  preferredDays: string[]; // ['monday', 'wednesday', 'friday']
  preferredTimes: string[]; // ['morning', 'afternoon', 'evening']
  timezone: string;
  flexibility: 'strict' | 'flexible' | 'very-flexible';
}

export type MentoringStatus = 'pending' | 'accepted' | 'rejected' | 'in-progress' | 'completed' | 'paused';

// ================================
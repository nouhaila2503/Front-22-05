

import { Module } from './module.model';

import { Tuteur } from './tuteur.model';

import { Domaine } from './domaine.model';
export interface CourseOffer {
  id: string;
  tuteurId: string;
  tuteur?: Tuteur;
  moduleId: string;
  module?: Module;
  domaineId: string;
  domaine?: Domaine;
  niveau: 'Débutant' | 'Intermédiaire' | 'Avancé';
  title: string;
  description: string;
  prixParHeure: number;
  dateDisponibilite: Date;
  creneaux: TimeSlot[];
  maxStudents: number;
  currentStudents: number;
  requirements?: string[];
  materials?: string[];
  isActive: boolean;
  tags: string[];
  location: CourseLocation;
  createdAt: Date;
  updatedAt: Date;
}

export interface TimeSlot {
  id: string;
  startTime: string; // HH:mm format
  endTime: string;   // HH:mm format
  isBooked: boolean;
  isRecurring: boolean;
  recurringPattern?: RecurringPattern;
  maxCapacity: number;
  currentBookings: number;
}

export interface RecurringPattern {
  type: 'daily' | 'weekly' | 'monthly';
  interval: number; // every X days/weeks/months
  daysOfWeek?: number[]; // 0=Sunday, 1=Monday, etc.
  endDate?: Date;
  occurrences?: number;
}

export interface CourseLocation {
  type: 'online' | 'in-person' | 'hybrid';
  address?: string;
  city?: string;
  platform?: string; // Zoom, Teams, etc.
  meetingUrl?: string;
}
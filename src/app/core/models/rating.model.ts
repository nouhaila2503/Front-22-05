
import { User } from './user.model';

import { Tuteur } from './tuteur.model';

import { CourseOffer } from './course-offer.model';

export interface Rating {
  id: string;
  apprenantId: string;
  apprenant?: User;
  tuteurId: string;
  tuteur?: Tuteur;
  courseOfferId?: string;
  courseOffer?: CourseOffer;
  bookingId?: string;
  score: number; // 1-5
  comment: string;
  pros?: string[];
  cons?: string[];
  wouldRecommend: boolean;
  isVerified: boolean;
  helpfulVotes: number;
  reportCount: number;
  tuteurResponse?: TuteurResponse;
  createdAt: Date;
  updatedAt: Date;
}

export interface TuteurResponse {
  message: string;
  createdAt: Date;
}
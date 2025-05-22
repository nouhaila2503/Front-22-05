// src/app/models/booking.model.ts

import { User } from './user.model';
import { CourseOffer, TimeSlot } from './course-offer.model';

export interface BookingRequest {
  id: string;
  apprenantId: string;
  apprenant?: User;
  courseOfferId: string;
  courseOffer?: CourseOffer;
  tuteurId: string;
  scheduledDate: Date;
  timeSlot: TimeSlot;
  status: BookingStatus;
  message?: string;
  specialRequests?: string;
  estimatedDuration: number; // in minutes
  totalPrice: number;
  paymentStatus: PaymentStatus;
  cancellationReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type BookingStatus = 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled' | 'no-show';
export type PaymentStatus = 'pending' | 'paid' | 'refunded' | 'failed';
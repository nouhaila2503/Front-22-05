export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: any;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  expiresAt?: Date;
}

export type NotificationType = 
  | 'booking_request' 
  | 'booking_accepted' 
  | 'booking_rejected'
  | 'mentoring_request'
  | 'new_rating'
  | 'payment_received'
  | 'class_reminder'
  | 'system_update';

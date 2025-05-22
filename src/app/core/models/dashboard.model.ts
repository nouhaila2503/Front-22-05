
export interface DashboardStats {
  totalCourses: number;
  activeCourses: number;
  totalStudents: number;
  monthlyEarnings: number;
  averageRating: number;
  totalRatings: number;
  pendingBookings: number;
  pendingMentoring: number;
  completionRate: number;
  popularCourses: PopularCourse[];
  recentActivity: Activity[];
  upcomingClasses: UpcomingClass[];
}

export interface PopularCourse {
  courseOfferId: string;
  title: string;
  bookingCount: number;
  rating: number;
}

export interface Activity {
  id: string;
  type: 'booking' | 'rating' | 'message' | 'payment';
  description: string;
  timestamp: Date;
  metadata?: any;
}

export interface UpcomingClass {
  id: string;
  courseTitle: string;
  studentName: string;
  scheduledTime: Date;
  duration: number;
  type: 'course' | 'mentoring';
  status: 'confirmed' | 'pending';
}
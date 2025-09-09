import { Achievement } from "@shared/schema";
import { Calendar, Star } from "lucide-react";

interface AchievementBadgeProps {
  achievement: Achievement;
}

export default function AchievementBadge({ achievement }: AchievementBadgeProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="achievement-badge rounded-lg p-6 text-center transition-all duration-300 hover:scale-105" data-testid={`achievement-${achievement.id}`}>
      <div className="text-4xl mb-4">{achievement.icon}</div>
      <h3 className="font-medieval text-lg font-bold text-primary mb-2">
        {achievement.title}
      </h3>
      <p className="text-sm text-primary/80 mb-3">
        {achievement.description}
      </p>
      <div className="text-xs text-primary/60 font-medieval">
        <Calendar className="inline h-3 w-3 mr-1" />
        <span>Completed: {formatDate(achievement.completedAt)}</span>
      </div>
      <div className="text-xs text-primary/60 font-medieval mt-1">
        <Star className="inline h-3 w-3 mr-1" />
        <span>{achievement.xpEarned} XP Earned</span>
      </div>
    </div>
  );
}

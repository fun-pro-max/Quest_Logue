import { Achievement } from "@shared/schema";
import { Calendar, Star, XCircle } from "lucide-react";

interface AchievementBadgeProps {
  achievement: Achievement;
  onDelete: (id: string) => void;
}

export default function AchievementBadge({ achievement, onDelete }: AchievementBadgeProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="achievement-badge rounded-lg p-6 text-center transition-all duration-300 hover:scale-105 relative" data-testid={`achievement-${achievement.id}`}>
      <button 
        className="absolute top-2 right-2 text-accent hover:text-accent/80 text-lg transition-colors"
        onClick={() => onDelete(achievement.id)}
        title="Delete achievement"
        data-testid={`button-delete-achievement-${achievement.id}`}
      >
        <XCircle className="h-5 w-5" />
      </button>
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

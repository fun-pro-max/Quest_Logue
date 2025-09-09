import { Task } from "@shared/schema";
import { CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  variant: 'boss' | 'quest' | 'training';
}

export default function TaskCard({ task, onComplete, onDelete, variant }: TaskCardProps) {
  const getCategoryInfo = () => {
    switch (variant) {
      case 'boss':
        return {
          className: 'boss-fight-card',
          badge: 'Epic Challenge',
          badgeClass: 'bg-accent/20 text-accent',
        };
      case 'quest':
        return {
          className: 'quest-card',
          badge: 'Noble Mission',
          badgeClass: 'bg-secondary/20 text-secondary',
        };
      case 'training':
        return {
          className: 'training-card',
          badge: 'Skill Development',
          badgeClass: 'bg-success/20 text-success',
        };
      default:
        return {
          className: '',
          badge: '',
          badgeClass: '',
        };
    }
  };

  const categoryInfo = getCategoryInfo();
  const titleColor = variant === 'boss' ? 'text-accent' : variant === 'quest' ? 'text-secondary' : 'text-success';

  return (
    <div className={cn(
      "parchment-card rounded-lg p-4 task-card transition-all duration-300",
      categoryInfo.className
    )} data-testid={`task-card-${task.id}`}>
      <div className="flex justify-between items-start mb-3">
        <h4 className={cn("font-medieval text-lg font-semibold", titleColor)}>
          {task.title}
        </h4>
        <div className="flex space-x-2">
          <button 
            className="text-success hover:text-success/80 text-xl transition-colors"
            onClick={() => onComplete(task.id)}
            title="Complete task"
            data-testid={`button-complete-${task.id}`}
          >
            <CheckCircle className="h-6 w-6" />
          </button>
          <button 
            className="text-accent hover:text-accent/80 text-xl transition-colors"
            onClick={() => onDelete(task.id)}
            title="Delete task"
            data-testid={`button-delete-${task.id}`}
          >
            <XCircle className="h-6 w-6" />
          </button>
        </div>
      </div>
      <p className="text-sm text-primary/80 mb-3">
        {task.description}
      </p>
      <div className="flex items-center justify-between">
        <span className={cn("text-xs px-2 py-1 rounded font-medieval", categoryInfo.badgeClass)}>
          {categoryInfo.badge}
        </span>
        <span className="text-xs text-muted-foreground">
          Reward: {task.xpReward} XP
        </span>
      </div>
    </div>
  );
}

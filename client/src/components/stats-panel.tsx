import { Task, Achievement } from "@shared/schema";
import { Sword, Map, Dumbbell, Star } from "lucide-react";

interface StatsPanelProps {
  tasks: Task[];
  achievements: Achievement[];
}

export default function StatsPanel({ tasks, achievements }: StatsPanelProps) {
  const bossFights = tasks.filter(task => task.category === 'boss').length;
  const quests = tasks.filter(task => task.category === 'quest').length;
  const training = tasks.filter(task => task.category === 'training').length;
  const totalXP = achievements.reduce((sum, achievement) => sum + achievement.xpEarned, 0);

  return (
    <div className="grid md:grid-cols-4 gap-6 mb-12 fade-in" style={{ animationDelay: '1s' }} data-testid="stats-panel">
      <div className="parchment-card rounded-lg p-6 text-center">
        <div className="text-3xl text-accent mb-3">
          <Sword className="h-8 w-8 mx-auto" />
        </div>
        <h3 className="font-medieval text-xl font-bold text-primary mb-2" data-testid="stat-boss-fights">
          {bossFights}
        </h3>
        <p className="text-sm text-muted-foreground font-medieval">Boss Fights</p>
      </div>
      
      <div className="parchment-card rounded-lg p-6 text-center">
        <div className="text-3xl text-secondary mb-3">
          <Map className="h-8 w-8 mx-auto" />
        </div>
        <h3 className="font-medieval text-xl font-bold text-primary mb-2" data-testid="stat-quests">
          {quests}
        </h3>
        <p className="text-sm text-muted-foreground font-medieval">Active Quests</p>
      </div>
      
      <div className="parchment-card rounded-lg p-6 text-center">
        <div className="text-3xl text-success mb-3">
          <Dumbbell className="h-8 w-8 mx-auto" />
        </div>
        <h3 className="font-medieval text-xl font-bold text-primary mb-2" data-testid="stat-training">
          {training}
        </h3>
        <p className="text-sm text-muted-foreground font-medieval">Training Sessions</p>
      </div>
      
      <div className="parchment-card rounded-lg p-6 text-center">
        <div className="text-3xl text-secondary mb-3">
          <Star className="h-8 w-8 mx-auto" />
        </div>
        <h3 className="font-medieval text-xl font-bold text-primary mb-2" data-testid="stat-total-xp">
          {totalXP.toLocaleString()}
        </h3>
        <p className="text-sm text-muted-foreground font-medieval">Total XP</p>
      </div>
    </div>
  );
}

import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Task, Achievement } from "@shared/schema";
import TaskForm from "@/components/task-form";
import TaskCard from "@/components/task-card";
import AchievementBadge from "@/components/achievement-badge";
import StatsPanel from "@/components/stats-panel";
import { Sword, Map, Dumbbell, Trophy, Crown } from "lucide-react";

export default function Home() {
  const { data: tasks = [], isLoading: tasksLoading } = useQuery<Task[]>({
    queryKey: ["/api/tasks"],
  });

  const { data: achievements = [], isLoading: achievementsLoading } = useQuery<Achievement[]>({
    queryKey: ["/api/achievements"],
  });

  const completeMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/tasks/${id}/complete`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to complete task');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      queryClient.invalidateQueries({ queryKey: ["/api/achievements"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete task');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
    },
  });

  const deleteAchievementMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/achievements/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete achievement');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/achievements"] });
    },
  });

  const bossFights = tasks.filter(task => task.category === 'boss');
  const quests = tasks.filter(task => task.category === 'quest');
  const training = tasks.filter(task => task.category === 'training');

  const handleComplete = (id: string) => {
    completeMutation.mutate(id);
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleDeleteAchievement = (id: string) => {
    deleteAchievementMutation.mutate(id);
  };

  if (tasksLoading || achievementsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-secondary font-medieval text-xl">Loading your quest log...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="relative py-8 mb-8">
        <div className="absolute inset-0 opacity-10"></div>
        <div className="container mx-auto px-6 relative">
          <div className="text-center">
            <h1 className="font-medieval text-6xl md:text-7xl font-bold text-secondary glow-text mb-4">
              <Sword className="inline mr-4 h-16 w-16" />
              Quest Master
              <Sword className="inline ml-4 h-16 w-16" />
            </h1>
            <p className="font-medieval text-xl text-muted-foreground">
              "Forge your destiny through valorous deeds and noble quests"
            </p>
            <div className="mt-6 flex justify-center">
              <div className="scroll-header h-1 w-64"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 max-w-7xl">
        {/* Task Creation */}
        <TaskForm />

        {/* Task Categories */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Boss Fights Section */}
          <div className="fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="bg-accent/10 rounded-lg border-2 border-accent/30 p-6">
              <h3 className="font-medieval text-2xl font-bold text-accent text-center mb-6">
                <Sword className="inline text-3xl mr-3 h-8 w-8" />
                Boss Fights
              </h3>
              
              <div className="space-y-4" data-testid="boss-fights-list">
                {bossFights.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onComplete={handleComplete}
                    onDelete={handleDelete}
                    variant="boss"
                  />
                ))}
                {bossFights.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground font-medieval">
                    <Sword className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    No boss fights await...
                  </div>
                )}
              </div>

              <div className="text-center mt-6">
                <div className="h-px bg-accent/30 mb-4"></div>
                <p className="text-sm text-muted-foreground font-medieval">
                  <span className="mr-2">🛡️</span>
                  Epic battles await the brave
                </p>
              </div>
            </div>
          </div>

          {/* Quests Section */}
          <div className="fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="bg-secondary/10 rounded-lg border-2 border-secondary/30 p-6">
              <h3 className="font-medieval text-2xl font-bold text-secondary text-center mb-6">
                <Map className="inline text-3xl mr-3 h-8 w-8" />
                Quests
              </h3>
              
              <div className="space-y-4" data-testid="quests-list">
                {quests.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onComplete={handleComplete}
                    onDelete={handleDelete}
                    variant="quest"
                  />
                ))}
                {quests.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground font-medieval">
                    <Map className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    No quests available...
                  </div>
                )}
              </div>

              <div className="text-center mt-6">
                <div className="h-px bg-secondary/30 mb-4"></div>
                <p className="text-sm text-muted-foreground font-medieval">
                  <span className="mr-2">🧭</span>
                  Adventures for the noble-hearted
                </p>
              </div>
            </div>
          </div>

          {/* Training Section */}
          <div className="fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="bg-success/10 rounded-lg border-2 border-success/30 p-6">
              <h3 className="font-medieval text-2xl font-bold text-success text-center mb-6">
                <Dumbbell className="inline text-3xl mr-3 h-8 w-8" />
                Training
              </h3>
              
              <div className="space-y-4" data-testid="training-list">
                {training.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onComplete={handleComplete}
                    onDelete={handleDelete}
                    variant="training"
                  />
                ))}
                {training.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground font-medieval">
                    <Dumbbell className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    No training sessions planned...
                  </div>
                )}
              </div>

              <div className="text-center mt-6">
                <div className="h-px bg-success/30 mb-4"></div>
                <p className="text-sm text-muted-foreground font-medieval">
                  <span className="mr-2">🎓</span>
                  Forge your skills through practice
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Gallery */}
        <div className="parchment-card rounded-lg p-8 mb-12 fade-in" style={{ animationDelay: '0.8s' }}>
          <h2 className="font-medieval text-3xl font-bold text-secondary text-center mb-8">
            <Trophy className="inline mr-3 h-8 w-8" />
            Hall of Victories
            <Crown className="inline ml-3 h-8 w-8" />
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="achievements-gallery">
            {achievements.map((achievement) => (
              <AchievementBadge 
                key={achievement.id} 
                achievement={achievement} 
                onDelete={handleDeleteAchievement}
              />
            ))}
            
            {achievements.length === 0 && (
              <div className="col-span-full border-2 border-dashed border-secondary/30 rounded-lg p-6 text-center">
                <Trophy className="h-12 w-12 mx-auto mb-3 text-secondary/50" />
                <p className="text-secondary/70 font-medieval">Complete Boss Fights to earn eternal glory!</p>
              </div>
            )}
          </div>
          
          <div className="text-center mt-8">
            <div className="scroll-header h-1 w-48 mx-auto"></div>
            <p className="text-muted-foreground font-medieval mt-4">
              "These victories shall be remembered for all eternity"
            </p>
          </div>
        </div>

        {/* Stats Panel */}
        <StatsPanel tasks={tasks} achievements={achievements} />
      </div>

      {/* Footer */}
      <footer className="bg-muted/30 border-t-2 border-secondary/30 py-8 mt-16">
        <div className="container mx-auto px-6 text-center">
          <div className="scroll-header h-1 w-32 mx-auto mb-6"></div>
          <p className="font-medieval text-muted-foreground mb-2">
            "May your quests be legendary and your victories eternal"
          </p>
          <p className="text-sm text-muted-foreground/80">
            Quest Master RPG Task Manager © 2024
          </p>
        </div>
      </footer>
    </div>
  );
}

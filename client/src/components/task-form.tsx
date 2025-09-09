import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Feather, Flag, BookOpen, PlusCircle } from "lucide-react";

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const { toast } = useToast();

  const createMutation = useMutation({
    mutationFn: async (taskData: { title: string; description: string; category: string; xpReward: number }) => {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
      if (!response.ok) throw new Error('Failed to create task');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      setTitle("");
      setDescription("");
      setCategory("");
      toast({
        title: "Quest Created!",
        description: "Your new adventure awaits in the quest log.",
      });
    },
    onError: () => {
      toast({
        title: "Failed to Create Quest",
        description: "The scribes were unable to record your quest. Try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !category) return;

    const xpReward = category === 'boss' ? 500 : category === 'quest' ? 200 : 100;
    
    createMutation.mutate({
      title: title.trim(),
      description: description.trim(),
      category,
      xpReward,
    });
  };

  return (
    <div className="parchment-card rounded-lg p-8 mb-12 fade-in">
      <h2 className="font-medieval text-3xl font-bold text-primary mb-6 text-center">
        <BookOpen className="inline mr-3 h-8 w-8" />
        Chronicle New Adventures
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6" data-testid="task-creation-form">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="font-medieval text-lg font-semibold text-primary block mb-3">
              <Feather className="inline mr-2 h-5 w-5" />
              Quest Title
            </label>
            <Input 
              type="text" 
              placeholder="Enter your noble quest..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-primary bg-white text-primary placeholder-muted-foreground focus:border-secondary focus:ring-2 focus:ring-secondary"
              data-testid="input-task-title"
            />
          </div>
          
          <div>
            <label className="font-medieval text-lg font-semibold text-primary block mb-3">
              <Flag className="inline mr-2 h-5 w-5" />
              Adventure Type
            </label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full px-4 py-3 rounded-lg border-2 border-primary bg-white text-primary focus:border-secondary focus:ring-2 focus:ring-secondary" data-testid="select-task-category">
                <SelectValue placeholder="Choose your path..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="boss">⚔️ Boss Fight - Epic Challenge</SelectItem>
                <SelectItem value="quest">🗺️ Quest - Noble Mission</SelectItem>
                <SelectItem value="training">🛡️ Training - Skill Development</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <label className="font-medieval text-lg font-semibold text-primary block mb-3">
            <BookOpen className="inline mr-2 h-5 w-5" />
            Quest Description
          </label>
          <Textarea 
            rows={3}
            placeholder="Describe the trials and rewards that await..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 border-primary bg-white text-primary placeholder-muted-foreground focus:border-secondary focus:ring-2 focus:ring-secondary resize-none"
            data-testid="textarea-task-description"
          />
        </div>
        
        <div className="text-center">
          <Button 
            type="submit" 
            disabled={createMutation.isPending || !title.trim() || !description.trim() || !category}
            className="btn-medieval px-8 py-4 rounded-lg font-medieval text-lg font-semibold hover:scale-105 transition-all duration-300"
            data-testid="button-create-task"
          >
            <PlusCircle className="inline mr-2 h-5 w-5" />
            {createMutation.isPending ? "Creating..." : "Embark on Adventure"}
          </Button>
        </div>
      </form>
    </div>
  );
}

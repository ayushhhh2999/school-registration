import { useState } from "react";
import { Button } from "@/components/ui/button";
import { List, Plus } from "lucide-react";
import { SchoolsDirectory } from "@/components/SchoolsDirectory";
import { AddSchoolForm } from "@/components/AddSchoolForm";

const Index = () => {
  const [view, setView] = useState<"list" | "add">("list");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSchoolAdded = () => {
    setRefreshTrigger(prev => prev + 1);
    setView("list");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="text-center py-12 px-4">
        <h1 className="text-5xl font-bold text-foreground mb-4">
          School Registration
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Welcome to the education management system. Register your school with ease
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Button
            variant={view === "list" ? "default" : "outline"}
            onClick={() => setView("list")}
            className="gap-2"
          >
            <List className="w-4 h-4" />
            View Schools
          </Button>
          <Button
            variant={view === "add" ? "default" : "outline"}
            onClick={() => setView("add")}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Add School
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-12">
        {view === "list" ? (
          <SchoolsDirectory 
            onAddSchool={() => setView("add")} 
            refreshTrigger={refreshTrigger}
          />
        ) : (
          <AddSchoolForm onSchoolAdded={handleSchoolAdded} />
        )}
      </main>
    </div>
  );
};

export default Index;

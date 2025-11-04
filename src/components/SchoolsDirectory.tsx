import { useEffect, useState } from "react";
import { SchoolCard } from "./SchoolCard";
import { Button } from "@/components/ui/button";
import { Building2, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface School {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  email_id: string;
  image_url: string | null;
}

interface SchoolsDirectoryProps {
  onAddSchool: () => void;
  refreshTrigger?: number;
}

export const SchoolsDirectory = ({ onAddSchool, refreshTrigger }: SchoolsDirectoryProps) => {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSchools = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('schools')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSchools(data || []);
    } catch (error: any) {
      toast.error("Failed to load schools");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, [refreshTrigger]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
            <Building2 className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Schools Directory</h2>
            <p className="text-sm text-muted-foreground">
              {schools.length} {schools.length === 1 ? 'school' : 'schools'} registered
            </p>
          </div>
        </div>
        <Button onClick={onAddSchool} className="gap-2">
          <Plus className="w-4 h-4" />
          Add New School
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      ) : schools.length === 0 ? (
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No schools registered yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schools.map((school) => (
            <SchoolCard
              key={school.id}
              name={school.name}
              address={school.address}
              city={school.city}
              state={school.state}
              imageUrl={school.image_url || undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
};

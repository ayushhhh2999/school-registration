import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AddSchoolFormProps {
  onSchoolAdded: () => void;
}

export const AddSchoolForm = ({ onSchoolAdded }: AddSchoolFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    city: "",
    state: "",
    address: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.contact || !formData.city || !formData.state || !formData.address) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      let imageUrl = null;

      // Upload image if provided
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError, data } = await supabase.storage
          .from('school-images')
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('school-images')
          .getPublicUrl(fileName);

        imageUrl = publicUrl;
      }

      // Insert school data
      const { error } = await supabase
        .from('schools')
        .insert([
          {
            name: formData.name,
            email_id: formData.email,
            contact: formData.contact,
            city: formData.city,
            state: formData.state,
            address: formData.address,
            image_url: imageUrl,
          },
        ]);

      if (error) throw error;

      toast.success("School added successfully!");
      setFormData({
        name: "",
        email: "",
        contact: "",
        city: "",
        state: "",
        address: "",
      });
      setImageFile(null);
      onSchoolAdded();
    } catch (error: any) {
      toast.error(error.message || "Failed to add school");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-card rounded-lg p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Building2 className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Add New School</h2>
          <p className="text-sm text-muted-foreground">Fill in the details to register a new school</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">
              School Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Enter school name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter contact email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact" className="text-foreground">Contact Number</Label>
            <Input
              id="contact"
              placeholder="Enter contact number"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city" className="text-foreground">City</Label>
            <Input
              id="city"
              placeholder="Enter city"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="state" className="text-foreground">State</Label>
            <Input
              id="state"
              placeholder="Enter state"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-foreground">Address</Label>
            <Input
              id="address"
              placeholder="Enter full address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="image" className="text-foreground">
            School Image <span className="text-destructive">*</span>
          </Label>
          <div className="flex items-center gap-2">
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="flex-1"
            />
          </div>
          {imageFile && (
            <p className="text-sm text-muted-foreground">Selected: {imageFile.name}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          <Upload className="w-4 h-4 mr-2" />
          {loading ? "Uploading..." : "Upload School Info"}
        </Button>
      </form>
    </div>
  );
};

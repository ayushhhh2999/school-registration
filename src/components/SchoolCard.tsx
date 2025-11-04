import { Card, CardContent } from "@/components/ui/card";
import { Building2, MapPin } from "lucide-react";

interface SchoolCardProps {
  name: string;
  address: string;
  city: string;
  state: string;
  imageUrl?: string;
}

export const SchoolCard = ({ name, address, city, state, imageUrl }: SchoolCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-video bg-muted flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <Building2 className="w-12 h-12 text-muted-foreground" />
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-foreground">{name}</h3>
        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <div>
            <p className="leading-relaxed">Address: {address}</p>
            <p className="leading-relaxed">City: {city}</p>
            <p className="leading-relaxed">State: {state}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

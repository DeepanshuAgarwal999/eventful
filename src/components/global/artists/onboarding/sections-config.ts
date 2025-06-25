import { User, FileText, MapPin, Upload } from "lucide-react";

export const onboardingSections = [
  {
    title: "Basic Information",
    icon: User,
    fields: ["name", "bio"],
  },
  {
    title: "Categories & Languages",
    icon: FileText,
    fields: ["genres", "languages"],
  },
  {
    title: "Pricing & Location",
    icon: MapPin,
    fields: ["feeRange", "location"],
  },
  {
    title: "Profile Image",
    icon: Upload,
    fields: ["image"],
  },
];

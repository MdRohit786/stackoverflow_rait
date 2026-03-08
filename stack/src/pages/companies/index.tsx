import { Building } from "lucide-react";
import Mainlayout from "@/layout/Mainlayout";

export default function CompaniesPage() {
  return (
    <Mainlayout>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Building className="text-blue-500" /> Companies
        </h1>
        <p className="text-gray-500 mb-6">Explore companies hiring developers.</p>
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <Building className="w-16 h-16 mb-4" />
          <p className="text-lg">No companies listed yet</p>
        </div>
      </div>
    </Mainlayout>
  );
}

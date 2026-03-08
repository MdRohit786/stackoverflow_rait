import { FileText } from "lucide-react";
import Mainlayout from "@/layout/Mainlayout";

export default function ArticlesPage() {
  return (
    <Mainlayout>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <FileText className="text-blue-500" /> Articles
        </h1>
        <p className="text-gray-500 mb-6">Read and share articles with the community.</p>
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <FileText className="w-16 h-16 mb-4" />
          <p className="text-lg">No articles yet</p>
        </div>
      </div>
    </Mainlayout>
  );
}

import axiosInstance from "@/lib/axiosinstance";
import { useEffect, useState } from "react";
import { Tag } from "lucide-react";
import Mainlayout from "@/layout/Mainlayout";
import { useRouter } from "next/router";

export default function TagsPage() {
  const [tags, setTags] = useState<{name: string, count: number}[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    axiosInstance.get("/question/getallquestion").then((res) => {
      const allTags = res.data.data.flatMap((q: any) => q.questiontags || []);
      // Count occurrences of each tag
      const tagCount: Record<string, number> = {};
      allTags.forEach((tag: string) => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
      const uniqueTags = Object.entries(tagCount).map(([name, count]) => ({ name, count }));
      uniqueTags.sort((a, b) => b.count - a.count);
      setTags(uniqueTags);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleTagClick = (tag: string) => {
    router.push(`/questions?q=${encodeURIComponent(tag)}`);
  };

  return (
    <Mainlayout>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Tags</h1>
        <p className="text-gray-500 mb-6">
          A tag is a keyword or label that categorizes your question. Click a tag to see all related questions.
        </p>
        {loading ? <p>Loading...</p> : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {tags.map(({ name, count }) => (
              <div
                key={name}
                onClick={() => handleTagClick(name)}
                className="border rounded p-3 hover:bg-gray-50 cursor-pointer hover:border-blue-300 transition"
              >
                <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm font-medium">
                  <Tag className="w-3 h-3" />{name}
                </span>
                <p className="text-xs text-gray-500 mt-2">{count} question{count !== 1 ? "s" : ""}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Mainlayout>
  );
}

import axiosInstance from "@/lib/axiosinstance";
import { useEffect, useState } from "react";
import Link from "next/link";
import Mainlayout from "@/layout/Mainlayout";
import { useRouter } from "next/router";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    axiosInstance.get("/question/getallquestion").then((res) => {
      setQuestions(res.data.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  // Read search query from URL
  useEffect(() => {
    if (router.query.q) {
      setSearch(router.query.q as string);
    }
  }, [router.query.q]);

  const filtered = questions.filter((q) =>
    q.questiontitle?.toLowerCase().includes(search.toLowerCase()) ||
    q.questionbody?.toLowerCase().includes(search.toLowerCase()) ||
    q.questiontags?.some((tag: string) => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Mainlayout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">All Questions</h1>
          <Link href="/ask" className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600">
            Ask Question
          </Link>
        </div>
        <input
          className="w-full border rounded-lg px-4 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Search questions by title, body or tag..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <p className="text-gray-500 text-sm mb-4">{filtered.length} questions found</p>
        {loading ? <p>Loading...</p> : filtered.length === 0 ? (
          <p className="text-gray-400 text-center py-10">No questions found for "{search}"</p>
        ) : (
          <div className="space-y-4">
            {filtered.map((q: any) => (
              <div key={q._id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex gap-4">
                  <div className="text-center text-sm text-gray-500 min-w-[60px]">
                    <div className="font-medium">{q.upvote?.length || 0}</div>
                    <div>votes</div>
                    <div className={`font-medium mt-1 ${q.answer?.length > 0 ? "text-green-600" : ""}`}>
                      {q.answer?.length || 0}
                    </div>
                    <div>answers</div>
                  </div>
                  <div className="flex-1">
                    <Link href={`/questions/${q._id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                      {q.questiontitle}
                    </Link>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">{q.questionbody}</p>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {q.questiontags?.map((tag: string) => (
                        <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Mainlayout>
  );
}

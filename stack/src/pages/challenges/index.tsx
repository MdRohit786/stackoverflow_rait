import { Trophy } from "lucide-react";
import Mainlayout from "@/layout/Mainlayout";

const challenges = [
  { title: "First Answer", desc: "Post your first answer", points: 50 },
  { title: "Question Master", desc: "Ask 5 questions", points: 100 },
  { title: "Helpful Member", desc: "Get 10 upvotes", points: 200 },
  { title: "Tag Explorer", desc: "Use 5 different tags", points: 75 },
];

export default function ChallengesPage() {
  return (
    <Mainlayout>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Trophy className="text-orange-500" /> Challenges
          <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded ml-2">NEW</span>
        </h1>
        <p className="text-gray-500 mb-6">Complete challenges to earn points and badges.</p>
        <div className="grid gap-4">
          {challenges.map((c) => (
            <div key={c.title} className="border rounded-lg p-4 flex items-center justify-between hover:bg-gray-50">
              <div>
                <h3 className="font-semibold">{c.title}</h3>
                <p className="text-gray-500 text-sm">{c.desc}</p>
              </div>
              <div className="text-right">
                <span className="text-orange-500 font-bold">+{c.points} pts</span>
                <div className="text-xs text-gray-400 mt-1">Not completed</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Mainlayout>
  );
}

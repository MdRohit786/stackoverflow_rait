import { useRouter } from "next/router";
import QuestionDetail from "@/components/QuestionDetail";
import Mainlayout from "@/layout/Mainlayout";

export default function QuestionPage() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return <div className="p-6">Loading...</div>;
  
  return (
    <Mainlayout>
      <QuestionDetail questionId={id} />
    </Mainlayout>
  );
}

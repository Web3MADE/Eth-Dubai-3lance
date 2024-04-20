import JobSummaryForm from "@/app/frontend/job-board/JobSummaryForm";

export default async function Page({ params }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:3000/api/job/${params.id}`);
  const { job } = await res.json();
  console.log("job ", job);
  return (
    <JobSummaryForm
      title={job.title}
      price={job.price}
      description={job.description}
      skills={job.skills}
    />
  );
}

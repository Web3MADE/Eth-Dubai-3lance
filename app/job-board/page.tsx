import JobBoard from "../frontend/job-board/JobBoard";

export default async function Page() {
  const res = await fetch("http://localhost:3000/api/jobs");
  const { jobs } = await res.json();
  console.log("jobs ", jobs);

  return <JobBoard jobs={jobs} />;
}

import { useState } from "react";

export interface IAttestJobData {
  schemaUID: string;
  freelancerId: string;
  schema: string; // needed for dynamic schema encoder
  jobHash: string;
  isComplete: boolean;
  price: number;
}

export function useAttestJob() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const attestJob = async (attestJobData: IAttestJobData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/attest", {
        method: "POST",
        body: JSON.stringify({ attestJobData }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  };

  return { attestJob, loading, error };
}

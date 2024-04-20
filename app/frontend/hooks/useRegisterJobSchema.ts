import { useState } from "react";

export interface IJobSchemaData {
  ownerAddress: string;
  projectID?: {};
  title?: {};
  difficulty?: {};
  deadline?: {};
  price?: {};
  offer?: {};
  skills?: {}[];
  status?: {};
}

export function useRegisterJobSchema() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const registerJobSchema = async (jobSchemaData: IJobSchemaData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/job", {
        method: "POST",
        body: JSON.stringify({ jobSchemaData }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  };

  return { registerJobSchema, loading, error };
}

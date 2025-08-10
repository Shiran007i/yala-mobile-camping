import { useState, useEffect } from "react";

export const useLocations = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // No supabase, so just set empty or mock data
  useEffect(() => {
    setLocations([]); // or setLocations(MOCK_DATA)
    setLoading(false);
  }, []);

  return { locations, loading, error, refetch: () => {} };
};

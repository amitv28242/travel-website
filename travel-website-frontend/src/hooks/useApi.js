import { useCallback, useEffect, useState } from "react";
import api from "../services/api";

export function useApi(url, params) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const serialized = JSON.stringify(params || {});

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(url, { params });
      setData(res.data.data);
    } catch (e) {
      setError(e.response?.data?.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [url, serialized]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
}
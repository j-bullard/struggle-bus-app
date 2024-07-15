export const fetchFleet = async () => {
  let result, error;

  try {
    const response = await fetch("/api/fleet");
    if (!response.ok) {
      throw new Error("Failed to fetch fleet");
    }

    result = await response.json();
  } catch (err) {
    error = err instanceof Error ? err.message : "An error occurred";
  }

  return { result, error };
};

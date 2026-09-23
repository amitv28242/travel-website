export const formatCurrency = (n) =>
  `₹${Number(n || 0).toLocaleString("en-IN")}`;

export const formatDate = (d) => {
  if (!d) return "";
  const dt = typeof d === "string" ? new Date(d) : d;
  return dt.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatDateTime = (d) => {
  if (!d) return "";
  return new Date(d).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const statusColor = (status) => {
  switch (status) {
    case "CONFIRMED":
    case "ACTIVE":
    case "APPROVED":
      return "bg-green-100 text-green-700";
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";
    case "CANCELLED":
    case "DISABLED":
    case "HIDDEN":
      return "bg-red-100 text-red-700";
    case "COMPLETED":
      return "bg-slate-100 text-slate-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export const initials = (name) =>
  (name || "")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
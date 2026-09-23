import { initials, formatDate } from "../utils/format";

export default function ReviewCard({ review: r }) {
  return (
    <div className="card p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-semibold">
          {initials(r.userName)}
        </div>
        <div>
          <p className="font-medium">{r.userName}</p>
          <p className="text-xs text-gray-500">{formatDate(r.createdAt)}</p>
        </div>
      </div>
      <div className="text-amber-500 mb-2">
        {"★".repeat(r.rating)}
        <span className="text-gray-300">{"★".repeat(5 - r.rating)}</span>
      </div>
      <p className="text-sm text-gray-700 leading-relaxed">{r.comment}</p>
    </div>
  );
}
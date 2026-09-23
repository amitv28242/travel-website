import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/format";

export default function DestinationCard({ destination: d }) {
  return (
    <Link to={`/destinations/${d.id}`} className="card group overflow-hidden rounded-2xl">
      <div className="aspect-video overflow-hidden">
        <img
          src={d.imageUrl}
          alt={d.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold">{d.name}, {d.country}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{d.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-primary font-semibold">
            From {formatCurrency(d.estimatedCost)}
          </p>
          <span className="text-xs text-gray-500">{d.bestTimeToVisit}</span>
        </div>
      </div>
    </Link>
  );
}
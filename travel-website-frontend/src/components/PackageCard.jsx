import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/format";
import BookNowButton from "./BookNowButton";

export default function PackageCard({ pkg }) {
  return (
    <div className="card rounded-2xl overflow-hidden flex flex-col group">
      <div className="aspect-video overflow-hidden">
        <img
          src={pkg.imageUrl}
          alt={pkg.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-2 mb-1">
          <h3 className="font-semibold text-lg leading-tight">{pkg.name}</h3>
          <span className="badge shrink-0">
            ⭐ {pkg.rating ? pkg.rating.toFixed(1) : "New"}
          </span>
        </div>
        <p className="text-sm text-gray-500">
          📍 {pkg.destinationName}
          {pkg.destinationCountry ? `, ${pkg.destinationCountry}` : ""}
        </p>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2 flex-1">
          {pkg.description}
        </p>
        <div className="flex items-center justify-between mt-4 pt-3 border-t gap-2">
          <div>
            <p className="text-xs text-gray-500">{pkg.duration} days</p>
            <p className="text-primary font-bold">{formatCurrency(pkg.price)}</p>
          </div>
          <div className="flex gap-2">
            <Link to={`/packages/${pkg.id}`} className="btn-outline text-sm">
              View
            </Link>
            <BookNowButton pkg={pkg} className="btn-primary text-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
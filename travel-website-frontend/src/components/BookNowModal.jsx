import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";
import { formatCurrency } from "../utils/format";

export default function BookNowModal({ pkg, onClose }) {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, control, watch, formState: { errors } } = useForm({
    defaultValues: {
      travelDate: "",
      numberOfTravellers: 1,
      travellers: [{}],
    },
  });
  const { fields, replace } = useFieldArray({ control, name: "travellers" });
  const numTravellers = watch("numberOfTravellers");

  useEffect(() => {
    const count = Math.min(Math.max(Number(numTravellers) || 1, 1), pkg.maxTravellers || 10);
    replace(Array.from({ length: count }).map(() => ({})));
  }, [numTravellers, pkg, replace]);

  const today = new Date().toISOString().split("T")[0];
  const total = Number(pkg.price) * Number(numTravellers || 1);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const payload = {
        packageId: pkg.id,
        travelDate: data.travelDate,
        numberOfTravellers: Number(data.numberOfTravellers),
        travellers: data.travellers,
      };
      const res = await api.post("/bookings", payload);
      toast.success("Booking confirmed!");
      onClose();
      navigate(`/booking-confirmation/${res.data.data.id}`);
    } catch (e) {
      toast.error(e.response?.data?.message || "Booking failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl w-full max-w-2xl my-6 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b">
          <div>
            <h2 className="text-lg font-bold">Book: {pkg.name}</h2>
            <p className="text-sm text-gray-500">
              📍 {pkg.destinationName} · {pkg.duration} days ·{" "}
              {formatCurrency(pkg.price)} / person
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-1 rounded hover:bg-gray-100"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5 max-h-[70vh] overflow-y-auto">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">Travel Date</label>
              <input
                type="date"
                min={today}
                className="input"
                {...register("travelDate", { required: "Required" })}
              />
              {errors.travelDate && <p className="error">{errors.travelDate.message}</p>}
            </div>
            <div>
              <label className="label">Travellers (max {pkg.maxTravellers})</label>
              <input
                type="number"
                min={1}
                max={pkg.maxTravellers}
                className="input"
                {...register("numberOfTravellers", {
                  required: true,
                  min: 1,
                  max: pkg.maxTravellers,
                  valueAsNumber: true,
                })}
              />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-gray-700">Traveller Details</h3>
            {fields.map((f, i) => (
              <div key={f.id} className="bg-gray-50 p-3 rounded-lg space-y-2">
                <p className="text-xs font-medium text-gray-600">Traveller {i + 1}</p>
                <div className="grid md:grid-cols-2 gap-2">
                  <input
                    placeholder="Full name"
                    className="input"
                    {...register(`travellers.${i}.fullName`, { required: "Required" })}
                  />
                  <input
                    type="number"
                    placeholder="Age"
                    min={0}
                    max={120}
                    className="input"
                    {...register(`travellers.${i}.age`, {
                      required: "Required",
                      valueAsNumber: true,
                    })}
                  />
                  <select
                    className="input"
                    {...register(`travellers.${i}.gender`, { required: "Required" })}
                  >
                    <option value="">Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                  <input
                    placeholder="Phone"
                    className="input"
                    {...register(`travellers.${i}.phone`, { required: "Required" })}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="input"
                    {...register(`travellers.${i}.email`, { required: "Required" })}
                  />
                  <input
                    placeholder="ID / Passport (optional)"
                    className="input"
                    {...register(`travellers.${i}.idNumber`)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-5 border-t bg-gray-50 rounded-b-2xl flex-wrap gap-3">
          <div>
            <p className="text-xs text-gray-500">Total Amount</p>
            <p className="text-2xl font-bold text-primary">{formatCurrency(total)}</p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={onClose} className="btn-outline">
              Cancel
            </button>
            <button type="submit" disabled={submitting} className="btn-primary">
              {submitting ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
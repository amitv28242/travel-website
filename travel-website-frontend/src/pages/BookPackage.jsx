import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import { formatCurrency } from "../utils/format";

export default function BookPackage() {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { register, handleSubmit, control, watch, formState: { errors } } = useForm({
    defaultValues: { numberOfTravellers: 1, travellers: [{}] },
  });
  const { fields, replace } = useFieldArray({ control, name: "travellers" });
  const numTravellers = watch("numberOfTravellers");

  useEffect(() => {
    api.get(`/packages/${id}`)
      .then((r) => setPkg(r.data.data))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    const count = Math.min(Math.max(Number(numTravellers) || 1, 1), pkg?.maxTravellers || 10);
    replace(Array.from({ length: count }).map(() => ({})));
  }, [numTravellers, pkg]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        packageId: Number(id),
        travelDate: data.travelDate,
        numberOfTravellers: Number(data.numberOfTravellers),
        travellers: data.travellers,
      };
      const res = await api.post("/bookings", payload);
      toast.success("Booking confirmed!");
      navigate(`/booking-confirmation/${res.data.data.id}`);
    } catch (e) {
      toast.error(e.response?.data?.message || "Booking failed");
    }
  };

  if (loading || !pkg) return <LoadingSpinner />;

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="container-page py-10 max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">Book: {pkg.name}</h1>
      <p className="text-gray-600 mb-6">
        {formatCurrency(pkg.price)} per person · {pkg.duration} days
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="card p-5 grid md:grid-cols-2 gap-4">
          <div>
            <label className="label">Travel Date</label>
            <input type="date" min={today} className="input"
              {...register("travelDate", { required: "Required" })} />
            {errors.travelDate && <p className="error">{errors.travelDate.message}</p>}
          </div>
          <div>
            <label className="label">Number of Travellers (max {pkg.maxTravellers})</label>
            <input type="number" min={1} max={pkg.maxTravellers} className="input"
              {...register("numberOfTravellers", { required: true, min: 1, max: pkg.maxTravellers, valueAsNumber: true })} />
          </div>
        </div>

        {fields.map((f, i) => (
          <div key={f.id} className="card p-5 space-y-3">
            <h3 className="font-semibold">Traveller {i + 1}</h3>
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <input placeholder="Full Name" className="input"
                  {...register(`travellers.${i}.fullName`, { required: "Required" })} />
                {errors.travellers?.[i]?.fullName && <p className="error">{errors.travellers[i].fullName.message}</p>}
              </div>
              <div>
                <input placeholder="Age" type="number" min={0} max={120} className="input"
                  {...register(`travellers.${i}.age`, { required: "Required", valueAsNumber: true })} />
                {errors.travellers?.[i]?.age && <p className="error">{errors.travellers[i].age.message}</p>}
              </div>
              <div>
                <select className="input" {...register(`travellers.${i}.gender`, { required: "Required" })}>
                  <option value="">Gender</option>
                  <option>Male</option><option>Female</option><option>Other</option>
                </select>
              </div>
              <div>
                <input placeholder="Phone" className="input"
                  {...register(`travellers.${i}.phone`, { required: "Required" })} />
              </div>
              <div>
                <input placeholder="Email" type="email" className="input"
                  {...register(`travellers.${i}.email`, { required: "Required" })} />
              </div>
              <div>
                <input placeholder="ID / Passport (optional)" className="input"
                  {...register(`travellers.${i}.idNumber`)} />
              </div>
            </div>
          </div>
        ))}

        <div className="card p-5 flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-sm text-gray-600">Total</p>
            <p className="text-2xl font-bold text-primary">
              {formatCurrency(Number(pkg.price) * Number(numTravellers || 1))}
            </p>
          </div>
          <button type="submit" className="btn-primary">Confirm Booking</button>
        </div>
      </form>
    </div>
  );
}
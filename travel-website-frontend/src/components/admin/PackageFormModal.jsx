import { useForm, useFieldArray } from "react-hook-form";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";

export default function PackageFormModal({ pkg, onClose, onSaved }) {
  const isEdit = !!pkg;
  const [destinations, setDestinations] = useState([]);
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: pkg
      ? { ...pkg, destinationId: pkg.destinationId, itineraries: pkg.itineraries || [] }
      : {
          destinationId: "", name: "", description: "", price: 0, duration: 1,
          maxTravellers: 10, imageUrl: "", inclusions: "", exclusions: "",
          termsAndConditions: "",
          itineraries: [{ dayNumber: 1, title: "", description: "" }],
        },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "itineraries" });

  useEffect(() => {
    api.get("/destinations?size=100").then((r) => setDestinations(r.data.data.content || []));
  }, []);

  const onSubmit = async (form) => {
    setSaving(true);
    try {
      const payload = {
        ...form,
        destinationId: Number(form.destinationId),
        price: Number(form.price),
        duration: Number(form.duration),
        maxTravellers: Number(form.maxTravellers),
        itineraries: (form.itineraries || []).map((i) => ({
          dayNumber: Number(i.dayNumber),
          title: i.title,
          description: i.description,
        })),
      };
      if (isEdit) await api.put(`/packages/${pkg.id}`, payload);
      else await api.post("/packages", payload);
      toast.success(isEdit ? "Updated" : "Created");
      onSaved();
    } catch (e) {
      toast.error(e.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center p-4 overflow-y-auto" onClick={onClose}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-3xl p-6 space-y-4 my-8"
      >
        <h2 className="text-xl font-bold">{isEdit ? "Edit" : "New"} Package</h2>

        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="label">Destination</label>
            <select className="input" {...register("destinationId", { required: "Required" })}>
              <option value="">Select destination</option>
              {destinations.map((d) => (
                <option key={d.id} value={d.id}>{d.name}, {d.country}</option>
              ))}
            </select>
            {errors.destinationId && <p className="error">{errors.destinationId.message}</p>}
          </div>
          <div>
            <label className="label">Package Name</label>
            <input className="input" {...register("name", { required: "Required" })} />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>
        </div>

        <div>
          <label className="label">Description</label>
          <textarea rows={3} className="input" {...register("description", { required: "Required" })} />
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          <div>
            <label className="label">Price (₹)</label>
            <input type="number" className="input"
              {...register("price", { required: "Required", valueAsNumber: true, min: 1 })} />
          </div>
          <div>
            <label className="label">Duration (days)</label>
            <input type="number" className="input"
              {...register("duration", { required: "Required", valueAsNumber: true, min: 1 })} />
          </div>
          <div>
            <label className="label">Max Travellers</label>
            <input type="number" className="input"
              {...register("maxTravellers", { required: "Required", valueAsNumber: true, min: 1 })} />
          </div>
        </div>

        <div>
          <label className="label">Image URL</label>
          <input className="input" {...register("imageUrl", { required: "Required" })} />
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="label">Inclusions</label>
            <textarea rows={2} className="input" {...register("inclusions")} />
          </div>
          <div>
            <label className="label">Exclusions</label>
            <textarea rows={2} className="input" {...register("exclusions")} />
          </div>
        </div>

        <div>
          <label className="label">Terms & Conditions</label>
          <textarea rows={2} className="input" {...register("termsAndConditions")} />
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Day-wise Itinerary</h3>
            <button
              type="button"
              onClick={() => append({ dayNumber: fields.length + 1, title: "", description: "" })}
              className="text-sm text-primary font-medium"
            >
              + Add Day
            </button>
          </div>
          <div className="space-y-3">
            {fields.map((f, i) => (
              <div key={f.id} className="grid md:grid-cols-12 gap-2 bg-gray-50 p-3 rounded-lg">
                <input type="number" min={1} className="input md:col-span-2"
                  {...register(`itineraries.${i}.dayNumber`, { required: true, valueAsNumber: true })} />
                <input placeholder="Title" className="input md:col-span-4"
                  {...register(`itineraries.${i}.title`, { required: true })} />
                <input placeholder="Description" className="input md:col-span-5"
                  {...register(`itineraries.${i}.description`, { required: true })} />
                <button type="button" onClick={() => remove(i)}
                  className="md:col-span-1 text-red-500 hover:text-red-700">✕</button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="btn-outline">Cancel</button>
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
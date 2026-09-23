import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";

export default function DestinationFormModal({ destination, onClose, onSaved }) {
  const isEdit = !!destination;
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: destination || {
      name: "", country: "", description: "", estimatedCost: 0,
      bestTimeToVisit: "", imageUrl: "", popularActivities: "",
    },
  });
  const [saving, setSaving] = useState(false);

  const onSubmit = async (form) => {
    setSaving(true);
    try {
      const payload = { ...form, estimatedCost: Number(form.estimatedCost) };
      if (isEdit) await api.put(`/destinations/${destination.id}`, payload);
      else await api.post("/destinations", payload);
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
        className="bg-white rounded-2xl w-full max-w-2xl p-6 space-y-4 my-8"
      >
        <h2 className="text-xl font-bold">{isEdit ? "Edit" : "New"} Destination</h2>

        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="label">Name</label>
            <input className="input" {...register("name", { required: "Required" })} />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>
          <div>
            <label className="label">Country</label>
            <input className="input" {...register("country", { required: "Required" })} />
            {errors.country && <p className="error">{errors.country.message}</p>}
          </div>
        </div>

        <div>
          <label className="label">Description</label>
          <textarea rows={3} className="input" {...register("description", { required: "Required" })} />
          {errors.description && <p className="error">{errors.description.message}</p>}
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="label">Estimated Cost (₹)</label>
            <input type="number" className="input"
              {...register("estimatedCost", { required: "Required", valueAsNumber: true, min: 1 })} />
          </div>
          <div>
            <label className="label">Best Time to Visit</label>
            <input className="input" {...register("bestTimeToVisit", { required: "Required" })} />
          </div>
        </div>

        <div>
          <label className="label">Image URL</label>
          <input className="input" {...register("imageUrl", { required: "Required" })} />
          {errors.imageUrl && <p className="error">{errors.imageUrl.message}</p>}
        </div>

        <div>
          <label className="label">Popular Activities (comma-separated)</label>
          <input className="input" {...register("popularActivities")} />
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
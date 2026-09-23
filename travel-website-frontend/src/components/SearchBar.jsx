import { useState } from "react";

export default function SearchBar({
  placeholder = "Search...",
  onSearch,
  initial = "",
}) {
  const [value, setValue] = useState(initial);

  const submit = (e) => {
    e.preventDefault();
    onSearch?.(value.trim());
  };

  return (
    <form
      onSubmit={submit}
      className="flex w-full rounded-xl overflow-hidden border bg-white shadow-sm"
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-4 py-3 outline-none text-gray-800"
      />
      <button
        type="submit"
        className="bg-primary hover:bg-primary-dark text-white px-5 font-medium transition"
      >
        Search
      </button>
    </form>
  );
}
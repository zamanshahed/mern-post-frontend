import React from "react";
import { categories } from "../../lib/categories";

const CategoryDropdown = ({ value, onChange, required = false }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor="category" className="">
        Select Category
      </label>
      <select
        id="category"
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 w-full bg-[#E3E3E3] rounded-xl px-4 py-2 h-14  text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">-- Choose a Category --</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryDropdown;

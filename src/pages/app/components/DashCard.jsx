import { FiFileText } from "react-icons/fi";

const DashCard = ({ label = "", value = "", icon }) => {
  return (
    <div className="w-full">
      <div className="bg-white shadow-sm rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 bg-gray-50 border-b border-gray-100">
          {icon}
          <h3 className="text-sm font-semibold text-gray-800">{label}</h3>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          <p className="text-3xl font-semibold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default DashCard;

import { FiEdit2, FiExternalLink, FiTrash2 } from "react-icons/fi";
import SectionTitle from "../../components/SectionTitle";
import { formatDate } from "../../utils/formatDate";
import { Link } from "react-router-dom";

const RecentPosts = ({ posts = [], sectionTitle = "", showSeeAll = false }) => {
  return (
    <div className="max-w-full">
      <div className="bg-white shadow-sm rounded-lg border border-gray-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <SectionTitle title={sectionTitle} />
          {showSeeAll && (
            <Link
              to="/app/manage-posts"
              className="text-sm text-blue-500 underline hover:text-gray-600"
            >
              See All Posts &raquo;
            </Link>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  S/N
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Published
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {posts.length > 0
                ? posts.map((row, idx) => (
                    <tr key={row._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {idx + 1}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {row.title}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {row.category}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {row.createdAt ? formatDate(row.postDate) : "-"}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {row.author?.name}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={`/app/manage-posts/${row._id}`}
                          aria-label="edit"
                          className="inline-flex cursor-pointer items-center justify-center w-8 h-8 rounded-md border border-emerald-100 hover:bg-emerald-50 mr-2"
                        >
                          <FiEdit2 className="w-4 h-4 text-emerald-500" />
                        </Link>
                        <button
                          aria-label="delete"
                          className="inline-flex cursor-pointer items-center justify-center w-8 h-8 rounded-md border border-rose-100 hover:bg-rose-50"
                        >
                          <FiTrash2 className="w-4 h-4 text-rose-500" />
                        </button>

                        <button
                          aria-label="view"
                          className="inline-flex cursor-pointer items-center justify-center w-8 h-8 rounded-md border border-blue-100 hover:bg-blue-50"
                        >
                          <FiExternalLink className="w-4 h-4 text-blue-500" />
                        </button>
                      </td>
                    </tr>
                  ))
                : "No data found"}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-3 text-xs text-gray-400">&nbsp;</div>
      </div>
    </div>
  );
};

export default RecentPosts;

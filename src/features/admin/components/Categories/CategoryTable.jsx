const CategoryTable = ({ categories, onEdit, onDelete }) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 text-left">Category Name</th>
          <th className="p-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr key={category.categoryId} className="border-b">
            <td className="p-2">{category.categoryName}</td>
            <td className="p-2">
              <button
                onClick={() => onEdit(category)}
                className="text-blue-500 mr-4"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(category.categoryId)}
                className="text-red-500"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CategoryTable;
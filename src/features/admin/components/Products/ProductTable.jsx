const ProductTable = ({ products, onEdit, onDelete, onUploadImage }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="w-full table-fixed">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-24 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Image
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Name
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Price
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Discount
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Special Price
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Stock
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {products.length === 0 ? (
            <tr>
              <td colSpan="7" className="py-8 text-center">
                <div className="text-gray-500">No products found</div>
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr
                key={product.productId}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="p-2">
                  <img
                    src={product.image}
                    alt={product.productName}
                    className="h-12 w-12 object-cover rounded-md border border-gray-200"
                  />
                </td>
                <td
                  className="px-4 py-3 text-sm font-medium text-gray-700 truncate"
                  title={product.productName}
                >
                  {product.productName}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  ${product.price}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {product.discount}%
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  ${product.specialPrice}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {product.quantity}
                </td>
                <td className="px-4 py-3 space-x-2">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="p-1.5 text-indigo-600 hover:text-indigo-900 transition-colors"
                      title="Edit"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </button>

                    <button
                      onClick={() => onUploadImage(product.productId)}
                      className="p-1.5 text-blue-600 hover:text-blue-900 transition-colors"
                      title="Upload Image"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </button>

                    <button
                      onClick={() => onDelete(product.productId)}
                      className="p-1.5 text-red-600 hover:text-red-900 transition-colors"
                      title="Delete"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;

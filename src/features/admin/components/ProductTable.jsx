const ProductTable = ({ products, onEdit, onDelete, onUploadImage }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">Image</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Price</th>
            <th className="px-4 py-2 border">Discount</th>
            <th className="px-4 py-2 border">Special Price</th>
            <th className="px-4 py-2 border">Quantity</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center p-4">
                No products found.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.productId} className="border-t">
                <td className="px-4 py-2 border">
                  <img
                    src={product.image}
                    alt={product.productName}
                    className="h-12 w-12 object-cover"
                  />
                </td>
                <td className="px-4 py-2 border">{product.productName}</td>
                <td className="px-4 py-2 border">${product.price}</td>
                <td className="px-4 py-2 border">{product.discount}%</td>
                <td className="px-4 py-2 border">${product.specialPrice}</td>
                <td className="px-4 py-2 border">{product.quantity}</td>
                <td className="px-4 py-2 border space-x-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onUploadImage(product.productId)} // Open upload image modal
                    className="text-yellow-600 hover:underline"
                  >
                    Upload Image
                  </button>

                  <button
                    onClick={() => onDelete(product.productId)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
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

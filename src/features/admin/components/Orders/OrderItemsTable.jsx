import { productMapping } from './data/mockOrderData';

export default function OrderItemsTable({ items }) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Item ID</th>
          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Product</th>
          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Quantity</th>
          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Price</th>
          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Discount</th>
          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Total</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.order_item_id} className="hover:bg-gray-100">
            <td className="px-3 py-2 text-sm text-gray-500">#{item.order_item_id}</td>
            <td className="px-3 py-2 text-sm text-gray-900">{productMapping[item.product_id] || `Product #${item.product_id}`}</td>
            <td className="px-3 py-2 text-sm text-gray-500">{item.quantity}</td>
            <td className="px-3 py-2 text-sm text-gray-500">${item.ordered_product_price.toFixed(2)}</td>
            <td className="px-3 py-2 text-sm text-gray-500">${item.discount.toFixed(2)}</td>
            <td className="px-3 py-2 text-sm font-medium text-gray-900">
              ${((item.ordered_product_price * item.quantity) - item.discount).toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

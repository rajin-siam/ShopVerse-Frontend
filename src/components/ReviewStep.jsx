export const ReviewStep = ({ address, payment, onBack, onConfirm }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Review Order</h2>

      <div className="mb-6">
        <h3 className="font-bold mb-2">Shipping Address</h3>
        <p>{address.street}</p>
        <p>
          {address.city}, {address.state}
        </p>
        <p>
          {address.country} - {address.pincode}
        </p>
      </div>

      <div className="mb-6">
        <h3 className="font-bold mb-2">Payment Method</h3>
        <p>Card ending with {payment.cardNumber?.slice(-4)}</p>
      </div>

      <div className="flex gap-4">
        <button onClick={onBack}>Back</button>
        <button onClick={onConfirm}>Place Order</button>
      </div>
    </div>
  );
};

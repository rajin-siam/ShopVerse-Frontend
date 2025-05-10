import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckoutStepper } from "../components/CheckoutStepper";
import { AddressStep } from "../components/AddressStep";
import { PaymentStep } from "../components/PaymentStep";
import { ReviewStep } from "../components/ReviewStep";
import { toast } from "react-hot-toast";
import { useCart } from "../../../common/contexts/CartContext";
const STEPS = ["Address", "Payment", "Review"];

export const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [addressData, setAddressData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const {setCart} = useCart();
  const navigate = useNavigate();
  
  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8081/api/order/users/payments/${paymentData.pgName}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            addressId: addressData.addressId,
            pgPaymentId: paymentData.pgPaymentId,
            pgStatus: paymentData.pgStatus,
            pgResponseMessage: paymentData.pgResponseMessage
          }),
          credentials: 'include',
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Order submission failed");
      }
      
      const orderData = await response.json();
      toast.success("Order placed successfully!");
      setCart({ products: [], totalPrice: 0 });
      navigate(`/confirmation/${orderData.orderId}`);
    } catch (error) {
      console.error("Order error:", error);
      toast.error(error.message || "Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <CheckoutStepper steps={STEPS} currentStep={currentStep} />

      {currentStep === 1 && (
        <AddressStep
          onNext={(address) => {
            setAddressData(address);
            setCurrentStep(2);
          }}
        />
      )}

      {currentStep === 2 && (
        <PaymentStep
          onBack={() => setCurrentStep(1)}
          onNext={(payment) => {
            setPaymentData(payment);
            setCurrentStep(3);
          }}
        />
      )}

      {currentStep === 3 && (
        <ReviewStep
          address={addressData}
          payment={paymentData}
          onBack={() => setCurrentStep(2)}
          onConfirm={handlePlaceOrder}
          loading={loading}
        />
      )}
    </div>
  );
};
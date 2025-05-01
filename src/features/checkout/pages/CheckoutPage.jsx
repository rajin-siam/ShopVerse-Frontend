import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckoutStepper } from "../components/CheckoutStepper";
import { AddressStep } from "../components/AddressStep";
import { PaymentStep } from "../components/PaymentStep";
import { ReviewStep } from "../components/ReviewStep";

const STEPS = ["Address", "Payment", "Review"];

export const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [addressData, setAddressData] = useState(null); // Store full address data
  const [paymentData, setPaymentData] = useState(null);
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/order/users/payments/${paymentData.pgName}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            addressId: addressData.addressId,
            ...paymentData,
          }),
          credentials: 'include',
        }
      );

      if (!response.ok) throw new Error("Order submission failed");
      const orderData = await response.json();
      navigate(`/confirmation/${orderData.orderId}`);
    } catch (error) {
      console.error("Order error:", error);
      // Add error state handling here
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
        />
      )}
    </div>
  );
};
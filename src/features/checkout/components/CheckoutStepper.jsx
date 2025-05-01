export const CheckoutStepper = ({ steps, currentStep }) => {
    return (
      <div className="flex justify-between mb-8">
        {steps.map((step, index) => (
          <div 
            key={step} 
            className={`text-center ${index + 1 <= currentStep ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <div className={`w-8 h-8 mx-auto rounded-full ${
              index + 1 <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}>
              {index + 1}
            </div>
            {step}
          </div>
        ))}
      </div>
    );
  };
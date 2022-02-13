import React, { useState } from "react";
import DescribeYourBusiness from "./DescribeYourBusiness";
import DescribeYourProducts from "./DescribeYourProducts";
import SetYourTimeSlots from "./SetYourTimeSlots";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [business, setBusiness] = useState({
    owner: "",
    name: "",
    phone: "",
    address: "",
    description: "",
    picture: "",
    listings: [],
    tags: [],
    timeSlots: [],
  });

  return (
    <div className="background">
      {step === 1 && (
        <DescribeYourBusiness setBusiness={setBusiness} setStep={setStep} />
      )}
      {step === 2 && (
        <DescribeYourProducts setBusiness={setBusiness} setStep={setStep} />
      )}
      {step === 3 && <SetYourTimeSlots business={business} />}
    </div>
  );
};

export default Onboarding;

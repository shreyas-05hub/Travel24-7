import React from "react";
import AiHero from "../components/layout/ui/aiRecom/aiHero";
import AIDashboard from "../components/layout/ui/aiRecom/AIDashboard";
import AiResults from "../components/layout/ui/aiRecom/AiResults";
import Resuggestions from "../components/layout/ui/aiRecom/Resuggestions";

const Recommendations = () => {
  return (
    <div>
      <AiHero />
      <AIDashboard />
      <AiResults />
      <Resuggestions />
    </div>
  );
};

export default Recommendations;

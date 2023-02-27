import { AllBsoAgent } from "./AllBsoAgent";

function AllBsoAgentList({ allBsoAgent }) {
    return allBsoAgent.map((card) => <AllBsoAgent key={card.id} {...card} />);
}

export { AllBsoAgentList };

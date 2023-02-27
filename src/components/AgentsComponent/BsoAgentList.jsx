import { BsoAgent } from "./BsoAgent";

function BsoAgentList({ bsoList }) {
    return bsoList.map((card) => <BsoAgent key={card.id} {...card} />);
}

export { BsoAgentList };

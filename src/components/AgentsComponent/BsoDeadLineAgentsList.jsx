import { BsoDeadLineAgent } from "./BsoDeadLineAgent";

function BsoDeadLineAgentsList({ bsoDeadLineAgent }) {
    return bsoDeadLineAgent.map((card) => (
        <BsoDeadLineAgent key={card.id} {...card} />
    ));
}

export { BsoDeadLineAgentsList };

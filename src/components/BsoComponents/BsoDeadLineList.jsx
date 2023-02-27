import { BsoDeadLineOne } from "./BsoDeadLineOne";

function BsoDeadLineList({ bsoDeadLine }) {
    return bsoDeadLine.map((card) => (
        <BsoDeadLineOne key={card.id} {...card} />
    ));
}

export { BsoDeadLineList };

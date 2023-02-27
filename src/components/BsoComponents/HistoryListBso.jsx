import { HistoryBso } from "./HistoryBso";

function HistoryListBso({ historyBsoList }) {
    return historyBsoList.map((card) => <HistoryBso key={card.id} {...card} />);
}

export { HistoryListBso };

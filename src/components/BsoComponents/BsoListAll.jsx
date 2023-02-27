import { BsoList } from "./BsoList";

function BsoListAll({ bsoList, setHistoryBsoList }) {
    return bsoList.map((card) => (
        <BsoList
            key={card.id}
            {...card}
            setHistoryBsoList={setHistoryBsoList}
        />
    ));
}

export { BsoListAll };

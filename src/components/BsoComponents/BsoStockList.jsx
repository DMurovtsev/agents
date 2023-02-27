import { BsoOneLine } from "./BsoOneLine";

function BsoStockList({ bsoCatalog }) {
    return bsoCatalog.map((card) => <BsoOneLine key={card.id} {...card} />);
}

export { BsoStockList };

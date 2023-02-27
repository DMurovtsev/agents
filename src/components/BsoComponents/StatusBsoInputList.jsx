import { StatusBsoInput } from "./StatusBsoInput";

function StatusBsoInputList({ statusBso }) {
    return statusBso.map((card) => <StatusBsoInput key={card.id} {...card} />);
}

export { StatusBsoInputList };

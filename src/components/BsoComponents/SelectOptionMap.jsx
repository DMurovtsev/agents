import { SelectOptions } from "./SelectOptions";

function SelectOptionMap({ props }) {
    return props.map((card) => <SelectOptions key={card.id} {...card} />);
}

export { SelectOptionMap };

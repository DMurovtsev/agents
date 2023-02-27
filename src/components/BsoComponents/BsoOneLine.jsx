import { useState } from "react";

function BsoOneLine(props) {
    const [checked, setChecked] = useState(false);

    function handleChange() {
        setChecked(!checked);
    }

    const { id, type, series, number, company, channel, date_add } = props;

    return (
        <tr data-id={id}>
            <td className="inputCheckBox">
                <input
                    className="inputCheckBoxS"
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
                />
            </td>
            <td>{type.name}</td>
            <td>{series}</td>
            <td>{number}</td>
            <td>{company.name}</td>
            <td>{channel.name}</td>
            <td>{date_add}</td>
        </tr>
    );
}

export { BsoOneLine };

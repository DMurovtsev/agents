import { getHistoryBso } from "../../api";

function BsoList(props) {
    const {
        id,
        agent,
        type,
        series,
        number,
        company,
        channel,
        date_add,
        setHistoryBsoList,
    } = props;

    return (
        <tr
            onClick={() => {
                getHistoryBso(id).then((data) => {
                    setHistoryBsoList(data.results);
                });
            }}
            data-id={id}
        >
            <td>{agent.name}</td>
            <td>{type.name}</td>
            <td>{series}</td>
            <td>{number}</td>
            <td>{company.name}</td>
            <td>{channel.name}</td>
            <td>{date_add}</td>
            <td>{}</td>
            <td>{}</td>
        </tr>
    );
}

export { BsoList };

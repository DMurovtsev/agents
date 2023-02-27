import { Link } from "react-router-dom";

function BsoDeadLineOne(props) {
    const { agent, all_count, date_7, date_2, overdue } = props;

    return (
        <tr>
            <td id={agent.id}>
                <Link className="linkBso" to={`/AgentCard/${agent.id}`}>
                    {agent.name}
                </Link>
            </td>
            <td>{all_count}</td>
            <td>{date_7}</td>
            <td>{date_2}</td>
            <td>{overdue}</td>
        </tr>
    );
}

export { BsoDeadLineOne };

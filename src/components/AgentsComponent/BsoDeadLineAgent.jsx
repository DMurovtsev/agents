function BsoDeadLineAgent(props) {
    const { all_count, date_7, date_2, overdue } = props;

    return (
        <tr>
            <td>{all_count}</td>
            <td>{date_7}</td>
            <td>{date_2}</td>
            <td>{overdue}</td>
        </tr>
    );
}

export { BsoDeadLineAgent };

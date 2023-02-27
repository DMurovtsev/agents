function AllBsoAgent(props) {
    const { type, company, channel, agent } = props;
    return (
        <tr>
            <td>{type.name}</td>
            <td>{company.name}</td>
            <td>{channel.name}</td>
            <td>{agent}</td>
        </tr>
    );
}

export { AllBsoAgent };

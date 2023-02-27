function StatusBsoInput(props) {
    const { id, name } = props;

    return <option value={id}>{name}</option>;
}

export { StatusBsoInput };

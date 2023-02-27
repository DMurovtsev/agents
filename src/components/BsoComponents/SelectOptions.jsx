function SelectOptions(props) {
    const { id, name } = props;

    return <option value={id}>{name}</option>;
}

export { SelectOptions };

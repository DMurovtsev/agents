import { Link } from "react-router-dom";

function SmallCard(props) {
    const { id, logo, name, date_at, email, phone } = props;

    return (
        <div className="card">
            <div className="card-image">
                <div className="logotip">
                    <img className="logo" src={logo} alt="" />
                </div>
            </div>
            <div className="card-content">
                <p className="card-name">{name}</p>
                <p className="card-phone">
                    <div className="infa">Телефон:</div>
                    {phone}
                </p>
                <p className="card-email">
                    <div className="infa">Почта:</div>
                    {email}
                </p>
                <p className="date_at">
                    <div className="infa">Зарегестрирован:</div>
                    {date_at}
                </p>
            </div>
            <p className="card-action">
                <Link to={`/AgentCard/${id}`} className="card-link">
                    Подробнее
                </Link>
            </p>
        </div>
    );
}

export { SmallCard };

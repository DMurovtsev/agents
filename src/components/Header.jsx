import { Link } from "react-router-dom";

function Header() {
    return (
        <nav>
            <img src="smallLogo.png" alt="InsFamily" />
            <ul>
                <li className="large material-icons">
                    account_box
                    <Link className="link" to={"/Agent"}>
                        Агенты
                    </Link>
                </li>
                <li className="large material-icons">
                    assignment
                    <Link className="link" to={"/Bso"}>
                        Работа с БСО
                    </Link>
                </li>
                <li className="large material-icons">
                    attach_money
                    <Link className="link" to={"/Sail"}>
                        Продажи
                    </Link>
                </li>
                <li className="large material-icons">
                    business_center
                    <Link className="link" to={"/FinPolitic"}>
                        Фин.политика
                    </Link>
                </li>
                <li className="large material-icons">
                    {" "}
                    assessment
                    <Link className="link" to={"/Statistic"}>
                        Статистика
                    </Link>
                </li>
                <li className="large material-icons">
                    account_balance
                    <Link className="link" to={"/InsCompany"}>
                        Страховые компании
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export { Header };

import { SmallCard } from "./SmallCard";
import { useNavigate } from "react-router-dom";
import { addAgent } from "../../api";

/*Добавления нового пользователя на AgentCard*/
function SmallCardList({ catalog }) {
    const navigate = useNavigate();
    function newAgent() {
        addAgent().then((data) => {
            navigate(`/AgentCard/${data.id}`);
        });
    }

    return (
        <div className="list">
            {catalog.map((card) => (
                <SmallCard key={card.id} {...card} />
            ))}

            <button onClick={newAgent} id="addAgent" className="addAgent">
                Добавить
                <br />
                Агента
            </button>
        </div>
    );
}

export { SmallCardList };

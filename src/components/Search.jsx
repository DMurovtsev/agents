import { useNavigate } from "react-router-dom";

function Search() {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className="formApp">
            <form className="search_form App">
                <input
                    type="text"
                    placeholder="  Поиск..."
                    className="search_input"
                    onChange={(event) => console.log(event.target.value)}
                />
            </form>
            <div className="goBack">
                <button className="btn" onClick={goBack}>
                    Назад
                </button>
            </div>
        </div>
    );
}

export { Search };

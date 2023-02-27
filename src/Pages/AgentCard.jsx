import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ReactModal from "react-modal";
import { BsoDeadLineAgentsList } from "../components/AgentsComponent/BsoDeadLineAgentsList";
import { AllBsoAgentList } from "../components/AgentsComponent/AllBsoAgentList";
import {
    deleteAgent,
    getAgent,
    addAgentLogo,
    getAgentAllBsoDeadLine,
    getBsoDeadLine,
    getBsoList,
} from "../api";
import { useNavigate } from "react-router-dom";
import { BsoAgentList } from "../components/AgentsComponent/BsoAgentList";

function AgentCard() {
    const [agent, setAgent] = useState({});
    const { id } = useParams();
    useEffect(() => {
        getAgentAllBsoDeadLine().then((data) => {
            setAllBsoAgent(data.filter((element) => element.agent.id == id));
        });
        getBsoDeadLine().then((data) => {
            setBsoDeadLineAgent(
                data.filter((element) => element.agent.id == id)
            );
        });

        getBsoList().then((data) => {
            setBsoList(
                data.results.filter((element) => element.agent.id == id)
            );
        });

        getAgent(id).then((data) => {
            setAgent(data);
            setAgentName(data.name);
            setAgentPhone(data.phone);
            setAgentEmail(data.email);
            setAgentLocation(data.location);
            setAgentStorageTime(data.storage_time);
            setAgentType(data.type);
            setAgentLogo(data.logo);
            setAgentFinancial(data.financial);
            changeButton();
            setAgentFinancialName(data.financial.name);
        });
    }, []);

    const [agentName, setAgentName] = useState();
    const [agentPhone, setAgentPhone] = useState();
    const [agentEmail, setAgentEmail] = useState();
    const [agentLocation, setAgentLocation] = useState();
    const [agentStorageTime, setAgentStorageTime] = useState();
    const [agentType, setAgentType] = useState();
    const [agentFinancialName, setAgentFinancialName] = useState();
    const [agentFinancial, setAgentFinancial] = useState();
    const [agentLogo, setAgentLogo] = useState();
    const [showModal, setShowModal] = useState(false);
    const [bsoDeadLineAgent, setBsoDeadLineAgent] = useState([]);
    const [allBsoAgent, setAllBsoAgent] = useState([]);
    const [bsoList, setBsoList] = useState([]);

    /* Функция смены загрузки логотипа на удаление логотипа*/
    function changeButton() {
        const loadLogo = document.getElementById("imgLogo");
        const atribute = loadLogo.getAttribute("src");
        if (atribute.includes("defaultLogo")) {
            document
                .getElementById("loadInput")
                .classList.remove("loadAgentLogoHidden");
        } else {
            document
                .getElementById("deleteLogo")
                .classList.remove("deleteAgentLogoHidden");
        }
    }

    /*Удаление агента и переход на страницу всех агентов*/
    const navigate = useNavigate();
    function deleteAgentCard() {
        deleteAgent(id);
        navigate("/Agent");
    }

    function handleChange() {
        setAgentName(document.getElementById("agentInputName").value);
        setAgentPhone(document.getElementById("agentInputPhone").value);
        setAgentEmail(document.getElementById("agentInputEmail").value);
        setAgentLocation(document.getElementById("agentInputLocation").value);
        setAgentType(document.getElementById("agentType").value);
        setAgentStorageTime(
            document.getElementById("agentInputStorageTime").value
        );
    }

    /*Добавление кнопок загрузки лого и отмены*/
    function createTwoButton() {
        document
            .getElementById("createTwoButtonYesHidden")
            .classList.remove("createTwoButtonYesHidden");
        document
            .getElementById("createTwoButtonNoHidden")
            .classList.remove("createTwoButtonNoHidden");
    }

    /*Добавление инпута загрузки логотипа*/
    function closeFileInput() {
        document

            .getElementById("createTwoButtonYesHidden")
            .classList.add("createTwoButtonYesHidden");
        document
            .getElementById("createTwoButtonNoHidden")
            .classList.add("createTwoButtonNoHidden");
    }
    /*Смена(удаление) логотипа на дефолтное*/
    function changeLogo() {
        const changeLogo = (document.getElementById("imgLogo").src =
            "http://151.248.122.207/static/agents/img/defaultLogo.jpg");
        document
            .getElementById("deleteLogo")
            .classList.add("deleteAgentLogoHidden");
        changeButton();
    }

    /*Загрузка нового логотипа*/
    function loadFile() {
        let inputFile = document.getElementById("loadInput").files[0];
        addAgentLogo(id, inputFile);
    }

    return (
        <div className="agentCard">
            <img id="imgLogo" className="AgentLogo" src={agentLogo} alt="" />
            <input
                onInput={createTwoButton}
                type="file"
                id="loadInput"
                className="loadAgentLogo loadAgentLogoHidden"
            ></input>
            <button
                onClick={changeLogo}
                id="deleteLogo"
                className="deleteAgentLogo deleteAgentLogoHidden"
            >
                Удалить логотип
            </button>
            <button
                onClick={loadFile}
                id="createTwoButtonYesHidden"
                className="createTwoButtonYesHidden"
            >
                Загрузить
            </button>
            <button
                onClick={closeFileInput}
                id="createTwoButtonNoHidden"
                className="createTwoButtonNoHidden"
            >
                Отмена
            </button>

            <input
                id="agentInputName"
                onChange={handleChange}
                type="text"
                value={agentName}
            />
            <div className="card-content">
                <p>
                    <input
                        id="agentInputPhone"
                        onChange={handleChange}
                        type="text"
                        value={agentPhone}
                    />
                </p>

                <p className="card-phone">
                    <div className="infa">Телефон:</div>
                </p>
                <p>
                    <input
                        id="agentInputEmail"
                        onChange={handleChange}
                        type="text"
                        value={agentEmail}
                    />
                </p>
                <p className="card-email">
                    <div className="infa">Почта:</div>
                    <p className="agentDataAt">{agent.date_at}</p>
                </p>

                <p className="date_at">
                    <div className="infa">Зарегестрирован:</div>
                </p>
                <p>
                    <div className="financialLink" id="agentFinancialName">
                        <Link
                            className="financialLink"
                            to={`/SingleFinPolitic/${id}`}
                        >
                            {agentFinancialName}
                        </Link>
                    </div>
                </p>
                <p className="date_at">
                    <div className="infa">Фин.Политика:</div>
                </p>
                <p>
                    <input
                        id="agentInputLocation"
                        onChange={handleChange}
                        type="text"
                        value={agentLocation}
                    />
                </p>
                <p className="date_at">
                    <div className="infa">Местоположение:</div>
                </p>
                <p>
                    <input
                        id="agentInputStorageTime"
                        onChange={handleChange}
                        type="text"
                        value={agentStorageTime}
                    />
                </p>
                <p className="date_at">
                    <div className="infa">Срок хранения:</div>
                </p>
                <p className="date_att">
                    <select
                        value={agentType}
                        id="agentType"
                        className="agentSelectType"
                        onChange={handleChange}
                    >
                        <option value="C">Физ.Лицо</option>
                        <option value="B">Юр.Лицо</option>
                    </select>

                    <div className="infa">Тип агента:</div>
                </p>

                <p className="date_at">
                    <div className="infa">Комментарии:</div>
                    <textarea id="agentComments" cols="60" rows="10"></textarea>
                </p>
                <button
                    className="deleteAgentButton"
                    onClick={() => {
                        setShowModal(true);
                    }}
                >
                    Удалить агента
                </button>
                <button onClick={setAgent} className="saveChangesAgent">
                    Сохранить
                </button>

                <ReactModal
                    isOpen={showModal}
                    onRequestClose={() => setShowModal(false)}
                >
                    Вы уверены?
                    <button onClick={deleteAgentCard}>Да</button>
                    <button onClick={() => setShowModal(false)}>Нет</button>
                </ReactModal>
            </div>
            <div className="agentCircleDiagram"> Груглая Диаграмма</div>
            <div className="agentBSO">
                <table>
                    <thead>
                        <tr>
                            <th>
                                Общее <br /> колличество <br /> БСО
                            </th>
                            <th>
                                Закончится
                                <br />
                                через: <br /> 7 дней
                            </th>
                            <th>
                                Закончится
                                <br />
                                через: <br /> 2 дня
                            </th>
                            <th>Просрочен</th>
                        </tr>
                    </thead>
                    <tbody>
                        <BsoDeadLineAgentsList
                            bsoDeadLineAgent={bsoDeadLineAgent}
                        />
                    </tbody>
                </table>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Тип</th>
                                <th>Серия</th>
                                <th>Номер</th>
                                <th>Компания</th>
                                <th>Канал продаж</th>
                                <th>Дата получения</th>
                                <th>Актуальный статус</th>
                                <th>Дата</th>
                            </tr>
                        </thead>
                    </table>
                    <div>
                        <table>
                            <tbody>
                                <BsoAgentList bsoList={bsoList} />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="agentSails">Продажи</div>
            <div className="agentMoney">Деньги</div>
            <div className="agentFinPolotic">Фин.Политика</div>
        </div>
    );
}

export { AgentCard };

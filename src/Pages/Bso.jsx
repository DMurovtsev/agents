import { useState, useEffect } from "react";
import {
    getAllBsoStock,
    getChannelStock,
    getCompanyStock,
    getTypeStock,
    getAllAgents,
    getBsoDeadLine,
    getBsoToAgent,
    getStatusBso,
    addBsoStatus,
    changeBsoStatus,
    getHistoryBso,
    getBsoList,
} from "../api";

import { BsoStockList } from "../components/BsoComponents/BsoStockList";
import { SelectOptionMap } from "../components/BsoComponents/SelectOptionMap";
import { BsoDeadLineList } from "../components/BsoComponents/BsoDeadLineList";
import { BsoListAll } from "../components/BsoComponents/BsoListAll";
import { HistoryListBso } from "../components/BsoComponents/HistoryListBso";
import { StatusBsoInputList } from "../components/BsoComponents/StatusBsoInputList";

function Bso() {
    const [bsoCatalog, setBsoCatalog] = useState([]);
    const [bsoCatalogType, setBsoCatalogType] = useState([]);
    const [bsoCatalogChannel, setBsoCatalogChannel] = useState([]);
    const [bsoCatalogCompany, setBsoCatalogCompany] = useState([]);
    const [bsoCatalogAgents, setBsoCatalogAgents] = useState([]);
    const [currentPage, setCurrentPage] = useState("");
    const [link, setLink] = useState();
    const [bsoDeadLine, setBsoDeadLine] = useState([]);
    const [bsoList, setBsoList] = useState([]);
    const [historyBsoList, setHistoryBsoList] = useState([]);
    const [statusBso, setStatusBso] = useState([]);

    const scrollHandler = (e) => {
        if (
            e.target.scrollHeight -
                (e.target.scrollTop + e.target.offsetHeight) <
                100 &&
            currentPage
        ) {
            getAllBsoStock(`?${currentPage}`).then((data) => {
                setBsoCatalog([...bsoCatalog, ...data.results]);
                if (data.next) {
                    setCurrentPage(data.next.split("?")[1]);
                } else {
                    setCurrentPage(null);
                }
            });
        }
    };

    useEffect(() => {
        {
            getAllBsoStock().then((data) => {
                setBsoCatalog(data.results);
                if (data.next) {
                    setCurrentPage(data.next.split("?")[1]);
                } else {
                    setCurrentPage(null);
                }
            });
            getChannelStock().then((data) => {
                setBsoCatalogChannel(data.results);
            });
            getCompanyStock().then((data) => {
                setBsoCatalogCompany(data.results);
            });
            getTypeStock().then((data) => {
                setBsoCatalogType(data.results);
            });
            getAllAgents().then((data) => {
                setBsoCatalogAgents(data);
            });
            getBsoDeadLine().then((data) => {
                setBsoDeadLine(data);
            });
            getBsoList().then((data) => {
                setBsoList(data.results);
            });
            getStatusBso().then((data) => {
                setStatusBso(data.results);
            });
        }
    }, []);

    function changeBsoSelect() {
        let youLink = "?";

        if (document.getElementById("selectOne").value != "0") {
            youLink =
                youLink + `type=${document.getElementById("selectOne").value}&`;
        }
        if (document.getElementById("selectTwo").value != "0") {
            youLink =
                youLink +
                `channel=${document.getElementById("selectTwo").value}&`;
        }

        if (document.getElementById("selectThree").value != "0") {
            youLink =
                youLink +
                `company=${document.getElementById("selectThree").value}&`;
        }
        setLink(youLink);

        getAllBsoStock(youLink).then((data) => {
            setBsoCatalog(data.results);
            if (data.next) {
                setCurrentPage(data.next.split("?")[1]);
            } else {
                setCurrentPage(null);
            }
        });
    }

    function checkInput() {
        let list_is = [];
        let checkArray = document.querySelectorAll("tr>td>input");
        checkArray.forEach((item) => {
            if (item.checked === true) {
                list_is.push(item.parentNode.parentNode.dataset.id);
            }
        });
        const counts = {
            type: document.getElementById("selectOne").value,
            channel: document.getElementById("selectTwo").value,
            company: document.getElementById("selectThree").value,
            series: document.getElementById("inputSeries").value,
            number: document.getElementById("inputNumber").value,
            count: document.getElementById("inputCount").value,
        };

        let bodyArray = {
            agent: document.getElementById("selectAgents").value,
            counts: counts,
            list: { list_is: list_is },
        };

        if (!counts.series || !counts.count || !counts.number) {
            delete bodyArray.counts;
        }
        if (list_is.length === 0) {
            delete bodyArray.list;
        }

        getBsoToAgent(bodyArray).then(() => {
            getAllBsoStock().then((data) => {
                if (data.next) {
                    setCurrentPage(data.next.split("?")[1]);
                } else {
                    setCurrentPage(null);
                }
            });
            getBsoDeadLine().then((data) => {
                setBsoDeadLine(data);
            });
        });
    }

    /*Добавление нового статуса БСО*/

    function addNewStatus() {
        let newValueStatus = document.getElementById("historyBsoInput").value;
        addBsoStatus(newValueStatus).then(() => {
            getStatusBso().then((data) => {
                setStatusBso(data.results);
            });
        });
    }

    /*Изменение статуса БСО*/

    function changeStatusBso() {
        let idSelectBso = document.getElementById("selectFour").value;
        let idBso = historyBsoList[0].bso.id;

        changeBsoStatus({
            bso: idBso,
            status: idSelectBso,
        }).then(() => {
            getBsoList().then((data) => {
                setBsoList(data.results);
            });
            getHistoryBso(idBso).then((data) => {
                setHistoryBsoList(data.results);
            });
        });
    }

    /*Загрузка БСО нап склад*/

    function loadBsoToStock() {
        const counts = {
            type: document.getElementById("selectOne").value,
            channel: document.getElementById("selectTwo").value,
            company: document.getElementById("selectThree").value,
            series: document.getElementById("inputSeries").value,
            number: document.getElementById("inputNumber").value,
            count: document.getElementById("inputCount").value,
        };

        /*Валидация загрузки БСО на склад*/

        if (counts.type === "0") {
            document
                .getElementById("selectOne")
                .classList.add("loadBsoSelectError");
        } else {
            document
                .getElementById("selectOne")
                .classList.remove("loadBsoSelectError");
        }

        if (counts.channel === "0") {
            document
                .getElementById("selectTwo")
                .classList.add("loadBsoSelectError");
        } else {
            document
                .getElementById("selectTwo")
                .classList.remove("loadBsoSelectError");
        }
        if (counts.company === "0") {
            document
                .getElementById("selectThree")
                .classList.add("loadBsoSelectError");
        } else {
            document
                .getElementById("selectThree")
                .classList.remove("loadBsoSelectError");
        }
        if (counts.series === "") {
            document
                .getElementById("inputSeries")
                .classList.add("loadBsoSelectError");
        } else {
            document
                .getElementById("inputSeries")
                .classList.remove("loadBsoSelectError");
        }
        if (counts.number === "") {
            document
                .getElementById("inputNumber")
                .classList.add("loadBsoSelectError");
        } else {
            document
                .getElementById("inputNumber")
                .classList.remove("loadBsoSelectError");
        }
        if (counts.count === "") {
            document
                .getElementById("inputCount")
                .classList.add("loadBsoSelectError");
        } else {
            document
                .getElementById("inputCount")
                .classList.remove("loadBsoSelectError");
        }

        let loadBsoArray = {
            new: counts,
        };

        getBsoToAgent(loadBsoArray).then(() => {
            getAllBsoStock().then((data) => {
                setBsoCatalog(data.results);
                document.getElementById("selectOne").value = "0";
                document.getElementById("selectTwo").value = "0";
                document.getElementById("selectThree").value = "0";
                document.getElementById("inputSeries").value = "";
                document.getElementById("inputNumber").value = "";
                document.getElementById("inputCount").value = "";

                if (data.next) {
                    setCurrentPage(data.next.split("?")[1]);
                } else {
                    setCurrentPage(null);
                }
            });
        });
    }

    return (
        <>
            <div className="scroll-table stockTable">
                <table>
                    <thead className="theadBso">
                        <tr>
                            <th>Список Агентов</th>
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
                </table>
                <div className="scroll-table-body ">
                    <table>
                        <tbody>
                            <BsoDeadLineList bsoDeadLine={bsoDeadLine} />
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="headerBso">
                <select
                    onChange={changeBsoSelect}
                    id="selectOne"
                    className="selectBso"
                >
                    <option value="0">Тип</option>
                    <SelectOptionMap props={bsoCatalogType} />
                </select>
                <select
                    onChange={changeBsoSelect}
                    id="selectTwo"
                    className="selectBso"
                >
                    <option value="0">Канал продаж</option>
                    <SelectOptionMap props={bsoCatalogChannel} />
                </select>
                <select
                    onChange={changeBsoSelect}
                    id="selectThree"
                    className="selectBso"
                >
                    <option value="0">Компания</option>
                    <SelectOptionMap props={bsoCatalogCompany} />
                </select>
                <input
                    id="inputSeries"
                    type="text"
                    placeholder="Серия"
                    className="inputBso"
                ></input>
                <input
                    id="inputNumber"
                    type="text"
                    placeholder="Номер с"
                    className="inputBso"
                ></input>
                <input
                    id="inputCount"
                    type="text"
                    placeholder="Колличество"
                    className="inputBso"
                ></input>
                <select id="selectAgents" className="selectBso">
                    <option value="0">Агент</option>
                    <SelectOptionMap props={bsoCatalogAgents} />
                </select>
                <button onClick={checkInput} className="buttonBso">
                    Выдать
                </button>
                <button onClick={loadBsoToStock} className="buttonBso">
                    Загрузить БСО
                </button>
            </div>
            <div className="scroll-table">
                <table>
                    <thead className="theadBso">
                        <tr>
                            <th className="theadBsoCheckBox">
                                <span className="theadBsoCheckBoxS">
                                    &#9745;
                                </span>
                            </th>
                            <th>Тип</th>
                            <th>Серия</th>
                            <th>Номер</th>
                            <th>Компания</th>
                            <th>Канал продаж</th>
                            <th>Дата получения</th>
                        </tr>
                    </thead>
                </table>
                <div className="scroll-table-body" onScroll={scrollHandler}>
                    <table>
                        <tbody>
                            <BsoStockList bsoCatalog={bsoCatalog} />
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="scroll-table-second">
                <table>
                    <thead className="theadBso">
                        <tr>
                            <th>Агент</th>
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
                <div className="scroll-table-body" onScroll={scrollHandler}>
                    <table>
                        <tbody>
                            <BsoListAll
                                bsoList={bsoList}
                                setHistoryBsoList={setHistoryBsoList}
                            />
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="scroll-table-third">
                <table>
                    <thead className="theadBso">
                        <tr>
                            <th>Статус</th>
                            <th>Дата</th>
                        </tr>
                    </thead>
                </table>
                <div className="scroll-table-body" onScroll={scrollHandler}>
                    <table>
                        <tbody>
                            <HistoryListBso historyBsoList={historyBsoList} />
                        </tbody>
                    </table>
                </div>
                <div>
                    <select name="" id="selectFour" className="selectBso">
                        <option value="0">Статус</option>
                        <StatusBsoInputList statusBso={statusBso} />
                    </select>
                    <button
                        onClick={changeStatusBso}
                        className="historyBsoButton"
                        id="historyBsoButton"
                    >
                        Изменить
                    </button>
                </div>
                <input
                    className="historyBsoInput"
                    type="text"
                    id="historyBsoInput"
                />
                <button
                    onClick={addNewStatus}
                    className="historyBsoButton"
                    id="historyBsoButton"
                >
                    Добавить
                </button>
            </div>
        </>
    );
}

export { Bso };

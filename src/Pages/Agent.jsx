import { useState, useEffect } from "react";
import { SmallCardList } from "../components/AgentsComponent/SmallCardList";
import { getAllAgents } from "../api";

function Agent() {
    const [catalog, setCatalog] = useState([]);
    const [newCatalog, setNewCatalog] = useState([]);

    useEffect(() => {
        getAllAgents().then((data) => {
            setCatalog(data);
            setNewCatalog(data);
            console.log(data);
        });
    }, []);

    /*Добавление input фильтра агентов*/
    function createInput() {
        let hiddenInput = document.getElementById("hiddenInput");
        hiddenInput.classList.remove("hiddenInput");
    }
    function createButton() {
        let hiddenButton = document.getElementById("hiddenButton");
        hiddenButton.classList.remove("hiddenButton");
    }
    function returnList() {
        let hiddenButton = document.getElementById("hiddenButton");
        hiddenButton.classList.add("hiddenButton");
        let hiddenInput = document.getElementById("hiddenInput");
        hiddenInput.classList.add("hiddenInput");
        setNewCatalog(catalog);
    }

    function filterAgent() {
        if (document.getElementById("hiddenInput").value === "") {
            setNewCatalog(catalog);
            return;
        }

        const filterCatalog = catalog
            .filter((items) => items.location)
            .filter((items) =>
                items.location.includes(
                    document.getElementById("hiddenInput").value
                )
            );
        setNewCatalog(filterCatalog);
    }

    return (
        <>
            <SmallCardList catalog={newCatalog} />;
            <div id="newDiv">
                <select
                    className="filterSelect"
                    id="filterSelect"
                    onChange={createInput}
                >
                    <option>Фильтр</option>
                    <option value="1">Регион</option>
                    <option value="2">ХЗ</option>
                    <option value="3">БУ</option>
                </select>
                <input
                    onInput={filterAgent}
                    onChange={createButton}
                    autoComplete="off"
                    type="text"
                    id="hiddenInput"
                    className="hiddenInput newInput"
                    placeholder="   Поиск агента по региону"
                />
                <button
                    onClick={returnList}
                    autoComplete="off"
                    type="text"
                    id="hiddenButton"
                    className="hiddenButton newButton"
                >
                    X
                </button>
            </div>
        </>
    );
}

export { Agent };

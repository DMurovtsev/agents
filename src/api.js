const getAllAgents = async () => {
    const response = await fetch("http://151.248.122.207/agents/all/");
    return await response.json();
};
const getBsoDeadLine = async () => {
    const response = await fetch("http://151.248.122.207/agents/abs/");
    return await response.json();
};
const getAgentAllBsoDeadLine = async (id) => {
    const response = await fetch(
        `http://151.248.122.207/agents/bso_all/?agent=${id}`
    );
    return await response.json();
};

const getAllBsoStock = async (link = "") => {
    const response = await fetch(`http://151.248.122.207/agents/bso/${link}`);
    return await response.json();
};
const getBsoToAgent = async (item) => {
    const response = await fetch("http://151.248.122.207/agents/bso/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
    });
    return await response.json();
};
const addBsoStatus = async (newName) => {
    const response = await fetch("http://151.248.122.207/agents/sbv/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: newName,
        }),
    });
    return await response.json();
};
const changeBsoStatus = async (item) => {
    const response = await fetch("http://151.248.122.207/agents/hbv/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
    });
    return await response.json();
};
const getBsoList = async () => {
    const response = await fetch("http://151.248.122.207/agents/bso_all/");
    return await response.json();
};

const getTypeStock = async (link = "") => {
    const response = await fetch(`http://151.248.122.207/agents/type/${link}`);
    return await response.json();
};
const getChannelStock = async (link = "") => {
    const response = await fetch(
        `http://151.248.122.207/agents/channel/${link}`
    );
    return await response.json();
};
const getCompanyStock = async (link = "") => {
    const response = await fetch(
        `http://151.248.122.207/agents/company/${link}`
    );
    return await response.json();
};

const getAgent = async (id) => {
    const response = await fetch(`http://151.248.122.207/agents/all/${id}/`);
    return await response.json();
};
const getHistoryBso = async (id) => {
    const response = await fetch(
        `http://151.248.122.207/agents/hbv/?bso=${id}`
    );
    return await response.json();
};
const getStatusBso = async () => {
    const response = await fetch("http://151.248.122.207/agents/sbv/");
    return await response.json();
};
const deleteAgent = async (id) => {
    const response = await fetch(`http://151.248.122.207/agents/all/${id}/`, {
        method: "DELETE",
    });
    return await response.json();
};
const addAgent = async () => {
    const response = await fetch(`http://151.248.122.207/agents/all/`, {
        method: "POST",
    });
    return await response.json();
};

const addAgentLogo = async (id, file) => {
    let formData = new FormData();
    formData.append("logo", file);
    const response = await fetch(`http://151.248.122.207/agents/all/${id}/`, {
        method: "PATCH",

        body: formData,
    });
    return await response.json();
};

export {
    getAllBsoStock,
    getAllAgents,
    getAgent,
    addAgent,
    deleteAgent,
    addAgentLogo,
    getCompanyStock,
    getChannelStock,
    getTypeStock,
    getBsoDeadLine,
    getBsoToAgent,
    getBsoList,
    getHistoryBso,
    getStatusBso,
    addBsoStatus,
    changeBsoStatus,
    getAgentAllBsoDeadLine,
};

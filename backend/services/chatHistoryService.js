const conversations = new Map();

/*
Structure

sessionId

↓

[
    { role:"user", content:"Hello" },
    { role:"assistant", content:"Hi" }
]
*/

function getHistory(sessionId = "default") {

    if (!conversations.has(sessionId)) {

        conversations.set(sessionId, []);

    }

    return conversations.get(sessionId);

}

function addUserMessage(sessionId = "default", message) {

    const history = getHistory(sessionId);

    history.push({

        role: "user",

        content: message

    });

}

function addAssistantMessage(sessionId = "default", message) {

    const history = getHistory(sessionId);

    history.push({

        role: "assistant",

        content: message

    });

}

function clearHistory(sessionId = "default") {

    conversations.set(sessionId, []);

}

module.exports = {

    getHistory,

    addUserMessage,

    addAssistantMessage,

    clearHistory

};
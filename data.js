let saving = false;
export function isSaving(value) {
    if (value === false || value === true)
        saving = value;
    return saving;
}

export function saveScore(scorUser1, scorUser2, gameid) {
    isSaving(true);
    return fetch("/xzero/api/query.php", {
        method: "POST",
        body: JSON.stringify({
            "query": `set-game-scor`,
            scorUser1,
            scorUser2,
            gameid
        })
    }).then(res=>isSaving(false));
}

export function saveMove(cell, value, gameid) {
    isSaving(true);
    return fetch("/xzero/api/query.php", {
        method: "POST",
        body: JSON.stringify({
            "query": `set-active-game`,
            gameid
        })
    })
}



export function saveScore(scorUser1, scorUser2, gameid) {
    return fetch("/xzero/api/query.php", {
        method: "POST",
        body: JSON.stringify({
            "query": `set-game-scor`,
            scorUser1,
            scorUser2,
            gameid
        })
    }).then(res=>isSaving(false));
}

export function saveReset(gameid) {
    isSaving(true);
    return fetch("/xzero/api/query.php", {
        method: "POST",
        body: JSON.stringify({
            "query": `reset-game`,
            gameid
        })
    }).then(res=>isSaving(false));
}

export function gamesByUser(userid) {
    return fetch(`/xzero/api/query.php?query=games-by-user&id=${userid}`);
}

export function getPlayers() {
    return fetch(`/xzero/api/query.php?query=users-all`);
}

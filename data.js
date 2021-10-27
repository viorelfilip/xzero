export function saveScore(scorUser1, scorUser2, gameid) {
    return fetch("/xzero/api/query.php", {
        method: "POST",
        body: JSON.stringify({
            "query": `set-game-scor`,
            scorUser1, 
            scorUser2,
            gameid
        })
    })
}
export function saveMove(cell, value, gameid) {
    return fetch("/xzero/api/query.php", {
        method: "POST",
        body: JSON.stringify({
            "query": `set-game-${cell}`,
            value,
            gameid
        })
    })
}

export function saveReset(gameid) {
    return fetch("/xzero/api/query.php", {
        method: "POST",
        body: JSON.stringify({
            "query": `reset-game`,
            gameid
        })
    })
}

export function gamesByUser(userid) {
    return fetch(`/xzero/api/query.php?query=games-by-user&id=${userid}`);
}

export function getPlayers() {
    return fetch(`/xzero/api/query.php?query=users-all`);
}

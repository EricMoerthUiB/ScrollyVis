export var sketchfab = [];
export var sketchfabSize = 0;

function flyFromToSketch(p, posFrom, posTo, lookAtFrom, lookAtTo, api) {
    // let d = distance(from[0], from[1], to[0], to[1]);
    let delay = p < 0.2 ? 0 : p > 0.8 ? 1 : (p - 0.2) / (0.8 - 0.2);
    let pos = [posFrom[0] + (posTo[0] - posFrom[0]) * delay, posFrom[1] + (posTo[1] - posFrom[1]) * delay, posFrom[2] + (posTo[2] - posFrom[2]) * delay];
    let viewAt = [lookAtFrom[0] + (lookAtTo[0] - lookAtFrom[0]) * delay, lookAtFrom[1] + (lookAtTo[1] - lookAtFrom[1]) * delay, lookAtFrom[2] + (lookAtTo[2] - lookAtFrom[2]) * delay];
    api.setCameraLookAt(pos, viewAt, 0);
}


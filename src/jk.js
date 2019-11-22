// modelling jk-trigger work

// input: object, where there are variables
// q as current state (0 or 1),
// j, k, r, s as inputs (0 or 1),
// c -- clock pulse (-1 is down, 0 is none, 1 is up),
// inv_r, inv_s, inv_c -- boolean, optional -- if r, s, c should be inverted
// returns new state (q) of trigger
function jk(obj) {
    if (obj.inv_r) obj.r = !obj.r;
    if (obj.inv_s) obj.s = !obj.s;
    if (obj.inv_c) obj.c = -obj.c;
    if (obj.s & !obj.r) {
        return 1;
    }
    if (obj.r & !obj.s) {
        return 0;
    }
    if (obj.r & obj.s) {
        return 1;
    }
    if (obj.c < 1) {
        return obj.q;
    }
    if (!obj.j & !obj.k) {
        return obj.q;
    }
    if (obj.j & obj.k) {
        return obj.q? 0 : 1; // "not" but in integer
    }
    if (obj.j) {
        return 1;
    }
    return 0;
}

// processes signal with jk-trigger
// c array should be N+1 size, 0/1-array, states (pulses computed automatically), 
// j, k, r, s should be N-size,
// inv_obj sould be something like {"r": true, "s": true, "c": false}
// it is not necessary to list inputs not to invert,
// but not forbidden,
// q is initial state
// returns 0/1 array of stares
function jk_array(j, k, r, s, c, q, inv_obj) {
    ans = [];
    for (i = 0; i < j.length; i++) {
        obj = {
            "r": r[i],
            "s": s[i],
            "j": j[i],
            "k": k[i],
            "c": c[i+1] - c[i],
            "inv_r": !!inv_obj.r,
            "inv_s": !!inv_obj.s,
            "inv_c": !!inv_obj.c,
            "q": q
        }
        q = jk(obj);
        ans.push(q);
    }
    return q;
}

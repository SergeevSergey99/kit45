// draws rectangular signal
// ctx is 2d context,
// x, y, w, h -- coords and size,
// signal -- array of 0s and 1s
export function draw_rect_signal(ctx, x, y, w, h, signal) {
    var delta_x = w / signal.length;
    var level = [y + h, y];
    var level_last = 0;
    ctx.beginPath();
    ctx.moveTo(x, level[0]);
    for (var i = 0; i < signal.length; i++) {
        var lvl = parseInt(signal[i]);
        ctx.lineTo(x, level[level_last]);
        ctx.lineTo(x, level[lvl]);
        x += delta_x;
        level_last = lvl;
    }
    ctx.lineTo(x, level[level_last])
    ctx.stroke();
}

// draws JK-trigger
// ctx is 2d context,
// x, y, w, h -- coords and size,
// padding -- length of lines left and right
// inv -- 3-elements boolean array:
//  [s, c, r],
//  each elements tells wether this input should be inverted
//  TODO fix lines inside circle
export function draw_JK(ctx, x, y, w, h, padding, inv, order="SCJKR") {
    ctx.beginPath();
    ctx.rect(x, y,        w,    h);
    ctx.rect(x, y + h/5,  w/2,  3*h/5);
    ctx.moveTo(x + w/2, y);
    ctx.lineTo(x + w/2, y+h);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    let orderstr = " " + order.split("").join(" ") + " ";
    let s_pos = orderstr.indexOf("S");
    let r_pos = orderstr.indexOf("R");
    let c_pos = orderstr.indexOf("C");
    for (var i = 1; i < 10; i+=2) {
        ctx.moveTo(x-padding,   y+i*h/10);
        ctx.lineTo(x,           y+i*h/10);
        ctx.fillText(orderstr[i], x+padding, y+i*h/10)
    }
    if (inv[1]) { // drawing clock signal direction, up or down
        ctx.moveTo(x - padding / 2, y + c_pos*h/10 - padding/2);
        ctx.lineTo(x + padding / 2, y + c_pos*h/10 + padding/2);
    }
    else {
        ctx.moveTo(x - padding / 2, y + c_pos*h/10 + padding/2);
        ctx.lineTo(x + padding / 2, y + c_pos*h/10 - padding/2);
    }
    if (inv[0]) {
        ctx.moveTo(x + padding/2, y + s_pos*h/10);
        ctx.arc(x, y + s_pos*h/10, padding/2, 0, 7);
    }
    if (inv[2]) {
        ctx.moveTo(x + padding/2, y + r_pos*h/10);
        ctx.arc(x, y + r_pos*h/10, padding/2, 0, 7);
    }
    ctx.stroke();
}


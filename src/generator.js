class JK_Trigger {

    constructor() {
        this.signal_c = "";
        this.signal_j = "";
        this.signal_k = "";
        this.signal_r = "";
        this.signal_s = "";
        this.inv_C = true;
        this.inv_R = true;
        this.inv_S = true;
        this.order = "RCJKS";
        this.q = true;/*
        this.pass_in = "R";
        this.pass_val = 0;*/
    }

    generate(variant) {
        this.signal_c = Rand_of_var(variant + 0 ** 2, 20);
        this.signal_j = Rand_of_var(variant + 1 ** 2);
        this.signal_k = Rand_of_var(variant + 2 ** 2);
        //this.signal_r = Rand_of_var(variant + 3 ** 2);
        //this.signal_s = Rand_of_var(variant + 4 ** 2);

        let pos = ["C", "J", "K"];
        this.order = "" + (("1" === Rand_of_var(variant + 11 ** 2, 1)) ? "R" : "S");
        let tmp = Number(Rand_of_var3(variant + 12 ** 2, 1));
        this.order += pos[tmp];
        pos.splice(tmp, 1);
        tmp = Number(Rand_of_var(variant + 13 ** 2, 1));
        this.order += pos[tmp];
        pos.splice(tmp, 1);
        this.order += pos[0];
        this.order += (("0" === Rand_of_var(variant + 11 ** 2, 1)) ? "R" : "S");

        this.inv_C = "1" === Rand_of_var(variant + 5 ** 2, 1);
        this.inv_R = "1" === Rand_of_var(variant + 6 ** 2, 1);
        this.inv_S = "1" === Rand_of_var(variant + 7 ** 2, 1);
        this.q = "1" === Rand_of_var(variant + 8 ** 2, 1);
        let pass_in = ("1" === Rand_of_var(variant + 9 ** 2, 1)) ? "R" : "S";
        //this.pass_val = Rand_of_var(variant + 10 ** 2, 1);

        this.signal_r = "";
        this.signal_s = "";
        if(pass_in === "R") {
            for (let i = 0; i < 19; i++)
            {
                this.signal_r += ((this.inv_R) ? "1" : "0");
                this.signal_s += "1";
            }
            let rand = Math.floor(Math.abs(Math.sin(variant)) * 10000)%5+3;
            this.signal_s =  this.signal_s.slice(0, rand) + "0000" + this.signal_s.slice(rand);
            this.signal_s =  this.signal_s.slice(0, 19);
        }
        else {
            for (let i = 0; i < 19; i++)
            {
                this.signal_s += ((this.inv_S) ? "1" : "0");
                this.signal_r += "1";
            }
            let rand = Math.floor(Math.abs(Math.sin(variant)) * 10000)%10+3;
            this.signal_r =  this.signal_r.slice(0, rand) + "0000" + this.signal_r.slice(rand);
            this.signal_r =  this.signal_r.slice(0, 19);
        }
    }


}

/**
 * @return {string}
 */
function Rand_of_var(variant, symbols = 19) {
    let a = 0;
    let signal = "";
    for (let i = 0; i < symbols; i++) {
        a += variant + i;
        a = Math.abs(Math.sin(a)) * 10000;
        signal += Math.floor(a) % 2 + "";
    }
    return signal;
}

/**
 * @return {string}
 */
function Rand_of_var3(variant, symbols = 19) {
    let a = 0;
    let signal = "";
    for (let i = 0; i < symbols; i++) {
        a += variant + i;
        a = Math.abs(Math.sin(a)) * 10000;
        signal += Math.floor(a) % 3 + "";
    }
    return signal;
}
// Math.floor(Math.abs(Math.sin(variant)) * 10000);
/*function sfc32(_a) {
    a +=_a;
    a = Math.abs(Math.sin(a)) * 10000;
    return Math.floor(a);
}*/
/*
function JCreg() {
    return;
}*/

export var JK_now = new JK_Trigger();

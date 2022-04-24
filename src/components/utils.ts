import {COLUMNS, ROWS} from '../consts';

export function randomIntFromInterval(min: number, max: number) { // min and max included
    return Math.floor(Math.random() * (max - min) + min);
}

export function getRandomRow() {
    return randomIntFromInterval(0, ROWS);
}

export function getRandomColumn() {
    return randomIntFromInterval(0, COLUMNS);
}

export function bothArraysEqual(prevColors: string[], allColors: string[]) {
    //https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
    return prevColors.every(item => allColors.includes(item)) && allColors.every(item => prevColors.includes(item));
}


export function rgbToHex(r: number, g: number, b: number) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
        const r = parseInt(result[1], 16);
        const g = parseInt(result[2], 16);
        const b = parseInt(result[3], 16);
        return r + ',' + g + ',' + b;//return 23,14,45 -> reformat if needed
    }
    return null;
}


// https://github.com/PimpTrizkit/PJs/wiki/12.-Shade,-Blend-and-Convert-a-Web-Color-(pSBC.js)
export const pSBC = (p: any, c0: any, c1: any, l: any): string => {
    // eslint-disable-next-line prefer-const
    let r, g, b, P, f, t, h, m = Math.round, a:any = typeof (c1) == 'string';
    if (typeof (p) != 'number' || p < -1 || p > 1 || typeof (c0) != 'string' || (c0[0] != 'r' && c0[0] != '#') || (c1 && !a)) return '';
    h = c0.length > 9, h = a ? c1.length > 9 ? true : c1 == 'c' ? !h : false : h, f = pSBC.pSBCr(c0), P = p < 0, t = c1 && c1 != 'c' ? pSBC.pSBCr(c1) : P ? {
        r: 0,
        g: 0,
        b: 0,
        a: -1
    } : {r: 255, g: 255, b: 255, a: -1}, p = P ? p * -1 : p, P = 1 - p;
    if (!f || !t) return '';
    if (l) r = m(P * f.r + p * t.r), g = m(P * f.g + p * t.g), b = m(P * f.b + p * t.b);
    else r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5), g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5), b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5);
    a = f.a, t = t.a, f = a >= 0 || t >= 0, a = f ? a < 0 ? t : t < 0 ? a : a * P + t * p : 0;
    if (h) return 'rgb' + (f ? 'a(' : '(') + r + ',' + g + ',' + b + (f ? ',' + m(a * 1000) / 1000 : '') + ')';
    else return '#' + (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0)).toString(16).slice(1, f ? undefined : -2);
};

pSBC.pSBCr = (d: any) => {
    const i = parseInt;
    let n = d.length;
    const x: any = {};
    if (n > 9) {
        const [r, g, b, a] = (d = d.split(','));
        n = d.length;
        if (n < 3 || n > 4) return null;
        x.r = i(r[3] == 'a' ? r.slice(5) : r.slice(4)), x.g = i(g), x.b = i(b), x.a = a ? parseFloat(a) : -1;
    } else {
        if (n == 8 || n == 6 || n < 4) return null;
        if (n < 6) d = '#' + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (n > 4 ? d[4] + d[4] : '');
        d = i(d.slice(1), 16);
        if (n == 9 || n == 5) x.r = d >> 24 & 255, x.g = d >> 16 & 255, x.b = d >> 8 & 255, x.a = Math.round((d & 255) / 0.255) / 1000;
        else x.r = d >> 16, x.g = d >> 8 & 255, x.b = d & 255, x.a = -1;
    }
    return x;
};
// input: h in [0,360] and s,v in [0,1] - output: r,g,b in [0,1]
function hsl2rgbArray(h, s, l) {
   s /= 100; l /= 100; const rgb = v => Math.trunc(v * 255);
   let a = s * Math.min(l, 1 - l);
   let f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
   return [rgb(f(0)), rgb(f(8)), rgb(f(4))];
}

function rgb2hex(r, g, b) {
   function componentToHex(c) {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
   }

   return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export function hsl2rgb(h, s, l) {
   return 'rgb(' + hsl2rgbArray(h, s, l).join(', ') + ')';
}

export function hsl2hex(h, s, l) {
   return rgb2hex(...hsl2rgbArray(h, s, l));
}
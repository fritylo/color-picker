import range from '~scripts/range.js';
import copyToClipboard from "~scripts/copy-to-clipboard";
import { hsl2rgb, hsl2hex } from "~scripts/colors";

import Color from "~components/Color/index.vue";
import ColorCircle from "~components/ColorCircle/index.vue";


const H_MIN = 0;
const S_MIN = 20;
const L_MIN = 20;

const H_MAX = 360;
const S_MAX = 100;
const L_MAX = 80;

const H_N = 12;
const S_N = 5;
const L_N = 5;

const H_STEP = ((H_MAX - H_MIN) / (H_N));
const S_STEP = ((S_MAX - S_MIN) / (S_N-1));
const L_STEP = ((L_MAX - L_MIN) / (L_N-1));

console.log('H_STEP:', H_STEP);
console.log('S_STEP:', S_STEP);
console.log('L_STEP:', L_STEP);

const colors = 
   range(H_MIN, H_MAX+1-H_STEP, H_STEP).map(h => ({
      h, s: 100, l: 50, 
      key: `color-hue-${h}-${100}-${50}`,
      selected: false,
      
      children: range(L_MIN, L_MAX+1, L_STEP).map(l => (
         range(S_MIN, S_MAX+1, S_STEP).map(s => ({ 
            h, s, l, 
            key: `color-${h}-${s}-${l}`,
         }))
      ))
   }));
   
   
const G_MIN = 0;
const G_MAX = 100;
const G_N   = 10;
const G_STEP = ((G_MAX - G_MIN) / (G_N-1));

const greyscale = 
   range(G_MIN, G_MAX+1, G_STEP).map(l => (((l = Math.round(l)) || true) && {
      h: 0, s: 0, l, 
      key: `color-${0}-${0}-${l}`,
   }));
   
console.log('G_STEP:', G_STEP);


export default {
   components: { Color, ColorCircle },
   name: "Grid",
   data: () => ({
      colors, greyscale,
      colorTypeForce: 0,
      bodyColorRef: null,
   }),
   computed: {
      selectedColors() {
         return colors.filter(hue => hue.selected);
      },
      bodyMode() {
         if (this.bodyColorRef !== null) {
            return {
               color: this.bodyColorRef.colorString,
               antiColor: this.$refs[this.bodyColorRef.l > 50 ? 'blackColor' : 'whiteColor'][0].colorString,
               type: this.bodyColorRef.l > 50 ? 'light' : 'dark',
            };
         }
         else
            return {
               color: '#fff',
               antiColor: '#000',
               type: 'light',
            };
      },
      colorFormat: {
         get() {
            this.colorTypeForce;
            return localStorage.getItem('c-picker--format') || 'hsl';
         },
         set(value) {
            this.colorTypeForce++;
            localStorage.setItem('c-picker--format', value);
         }
      }
   },

   methods: {
      onMouseLeft(eD) {
         let targetColor = eD.color;
         if (this.colorFormat === 'rgb')
            targetColor = hsl2rgb(eD.h, eD.s, eD.l);
         else if (this.colorFormat === 'hex')
            targetColor = hsl2hex(eD.h, eD.s, eD.l);

         copyToClipboard(targetColor);
         
         eD.state.isTipCopiedVisible = true;
         setTimeout(() => {
            eD.state.isTipCopiedVisible = false;
         }, 1000);
      },
      onMouseRight(eD) {
         this.bodyColorRef = eD.state;
      }
   },
   
   mounted() {
      this.bodyColorRef = this.$refs.whiteColor[0];
   }
};

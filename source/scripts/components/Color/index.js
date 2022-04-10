export default {
   name: 'Color',
   data: () => ({
      isTipCopiedVisible: false,
   }),
   props: {
      h: Number,
      s: Number,
      l: Number,
      scope: String,
      format: String,
      
      noMargin: {
         type: Boolean,
         default: false,
      },
      showTips: {
         type: Boolean,
         default: true,
      },
      via: {
         type: String,
         default: 'background',
      },
      bodyStyle: {
         type: Object,
         default: () => ({}),
      },
   },
   computed: {
      colorString() {
         return `hsl(${this.h}deg, ${this.s}%, ${this.l}%)`;
      },
      style() {
         return Object.assign({
            backgroundColor: this.via === 'background' ? this.colorString : null,
            borderColor: this.via === 'border' ? this.colorString : null,
            margin: this.noMargin ? '0' : null,
         }, this.bodyStyle);
      },
   },
   methods: {
      eventData() {
         return {
            h: this.h,
            s: this.s,
            l: this.l,
            color: this.colorString,
            state: this,
         };
      },
   }
}

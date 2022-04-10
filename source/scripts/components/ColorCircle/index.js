import range from '~scripts/range.js';

import Color from '~components/Color/index.vue';

export default {
   name: 'ColorCircle',
   components: { Color },
   data: () => ({
      colorFormat: 'hsl',
   }),
   props: {
      colors: Array,
      bodyMode: Object,
      format: String,
   },
   methods: {
      onColorClick(color) {
         color.selected = !color.selected;
      },
   },
   watch: {
      colorFormat(value) {
         this.$emit('changeColorFormat', value);
      }
   },
   created() {
      this.colorFormat = this.format;
   }
}

<template>

   <div class="croot position-relative">
      <div class="inner-span position-absolute top-50 start-50 translate-middle" :style="{ backgroundColor: bodyMode.color }"></div>
      <div class="outer-span position-absolute top-50 start-50 translate-middle" :style="{ borderColor: bodyMode.color }"></div>
      <div class="outer-shadow position-absolute top-50 start-50 translate-middle" :style="{ borderColor: bodyMode.color }"></div>
      <div class="format-select position-absolute top-50 start-50 translate-middle">
         <select
            aria-label="Color format" 
            :style="{color: bodyMode.antiColor}" 
            :class="{light: bodyMode.type === 'dark'}"
            v-model="colorFormat"
         >
            <option value="hsl">HSL</option>
            <option value="rgb">RGB</option>
            <option value="hex">HEX</option>
         </select>
      </div>

      <div class="color-circle">
         <Color
            :h="color.h"
            :s="color.s"
            :l="color.l"
            scope="color-circle"
            
            :noMargin="true"
            :showTips="false"
            via="border"
            :class="['color_no-shadow color_no-brad', { selected: color.selected }]"
            :bodyStyle="{
               borderLeftWidth: '3em',
               borderLeftStyle: 'solid',
               borderTop: '0.5em solid transparent',
               borderBottom: '0.5em solid transparent',
            }"
            
            @mouseLeft="onColorClick(color)"

            :key="color.key"
            v-for="color in colors"
         />
      </div>
   </div>
</template>

<script src="./index.js"></script>
<style src="./index.sass" scoped lang="sass"></style>

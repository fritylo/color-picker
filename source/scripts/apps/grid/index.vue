<template>
   <div :style="{ backgroundColor: bodyMode.color }">
      <div class="container root">
         <ColorCircle :colors="colors" :format="colorFormat" :bodyMode="bodyMode" @changeColorFormat="colorFormat = $event" />
         <h1 class="d-flex flex-column align-items-center justify-content-center" :style="{ color: bodyMode.antiColor }">
            Color Picker
            <span class="fs-6 fst-italic">(by frity co.)</span>
         </h1>
         <div class="greyscale row justify-content-center">
            <Color
               :h="color.h"
               :s="color.s"
               :l="color.l"
               :format="colorFormat"

               :key="color.key"
               v-for="(color, gI) in greyscale"
               :ref="gI === greyscale.length - 1 ? 'whiteColor' : (gI === 0 ? 'blackColor' : null)"

               @mouseLeft="onMouseLeft"
               @mouseRight="onMouseRight"
            />
         </div>
         <div class="row justify-content-center">
            <div
               class="hue-block" 
               v-for="(hue, hI) in selectedColors" :key="`hue${hI}`"
            >
               <div
                  class="row justify-content-center"
                  v-for="(lightness, lI) in hue.children" :key="`lightness${lI}`"
               >
                  <Color
                     :h="color.h"
                     :s="color.s"
                     :l="color.l"
                     :format="colorFormat"

                     :key="color.key"
                     v-for="color in lightness"

                     @mouseLeft="onMouseLeft"
                     @mouseRight="onMouseRight"
                  />
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<style src="./index.sass" scoped lang="sass"></style>
<script src="./index.js"></script>
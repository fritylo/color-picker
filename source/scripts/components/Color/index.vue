<template>
   <div class="color">
      <tippy
         :to="scope + '::' + colorString" 

         trigger="manual" 
         :visible="isTipCopiedVisible" 
         multiple
         
         style="display: none"
      >
         Скопировано в буфер обмена
         <div class="color-tip__color ms-1">
            <div class="color-tip__rect" :style="style"></div> {{format}}
         </div>
      </tippy>

      <tippy :to="scope + '::' + colorString" style="display: none" trigger="mouseenter" placement="bottom" multiple :delay="[500, 20]" v-if="showTips">
         <span class="badge bg-secondary">ЛКМ</span> - Скопировать, <span class="badge bg-secondary">ПКМ</span> - Сделать фоновым
      </tippy>

      <div
         class="color__body" :style="style"

         v-on:click.left.exact="$emit('mouseLeft', eventData())" 
         v-on:click.right.exact.prevent="$emit('mouseRight', eventData())"
         
         :name="scope + '::' + colorString"
      ></div>
   </div>
</template>

<script src="./index.js"></script>
<style src="./index.sass" scoped lang="sass"></style>

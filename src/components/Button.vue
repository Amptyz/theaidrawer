<script setup lang="ts">

</script>

<template>
  <button
    class="button"
  >
    Button
  </button>
</template>

<style scoped lang="stylus">
//body {
//  font-size: 16px;
//  font-family: 'Helvetica', 'Arial', sans-serif;
//  text-align: center;
//  background-color: #f8faff;
//  padding: 100px;
//}
//h2{
//  padding-bottom:2em
//}
.button {
  display: inline-block;
  padding: 1em 2em;
  background-color: #ff0081;
  /* background-color: transparent; */
  color: #fff;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  position: relative;
  box-shadow: 0 2px 25px rgba(233, 30, 99, 0.5);
  outline: 0;
  transition: transform ease-in 0.1s, background-color ease-in 0.1s,  box-shadow ease-in 0.25s;
}

.button::before{
  position: absolute;
  content: '';
  left: -2em;
  right: -2em;
  top: -2em;
  bottom: -2em;
  pointer-events: none;
  transition: ease-in-out .5s;
  background-repeat: no-repeat;
  background-image: radial-gradient(circle, #ff0081 20%, transparent 20%),
      radial-gradient(circle, #ff0081 20%, transparent 20%),
      radial-gradient(circle, #ff0081 20%, transparent 20%),
      radial-gradient(circle, #ff0081 20%, transparent 20%),
      radial-gradient(circle, #ff0081 20%, transparent 20%),
      radial-gradient(circle, #ff0081 20%, transparent 20%),
      radial-gradient(circle, #ff0081 20%, transparent 20%),
      radial-gradient(circle, #ff0081 20%, transparent 20%),
      radial-gradient(circle, #ff0081 20%, transparent 20%),
      radial-gradient(circle, #ff0081 20%, transparent 20%),
      radial-gradient(circle, #ff0081 20%, transparent 20%),
      radial-gradient(circle, #ff0081 20%, transparent 20%),
      radial-gradient(circle, #ff0081 20%, transparent 20%),
      radial-gradient(circle, #ff0081 20%, transparent 20%),
      radial-gradient(circle, #ff0081 20%, transparent 20%),
      radial-gradient(circle, #ff0081 20%, transparent 20%);
  background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%, 10% 10%, 18% 18%,
      15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%, 20% 20%;
  background-position: 18% 40%, 20% 31%, 30% 30%, 40% 30%, 50% 30%, 57% 30%, 65% 30%, 80% 32%, 15% 60%,
      83% 60%, 18% 70%, 25% 70%, 41% 70%, 50% 70%, 64% 70%, 80% 71%;
  animation: bubbles ease-in-out .75s forwards;
}

.button:active {
  transform: scale(0.95);
  background-color: #f3037c;
  box-shadow: 0 2px 25px rgba(233, 30, 99, 0.5);
}
.button:active::before {
  animation: none;
  background-size: 0;
}

</style>
<template>
  <div class="error-page">
    <div>
      <h1 data-h1="404">404</h1>
      <p data-p="NOT FOUND">NOT FOUND</p>
    </div>
  </div>
  <!--  <div id="particles-js"></div>-->
</template>

<script setup lang="ts">
  const route = useRoute()
  console.log('404页面DOCS', route.fullPath)
</script>

<style lang="sass" scoped>

  .error-page
    display: flex
    align-items: center
    justify-content: center
    text-align: center
    height: 90%
    font-family: Arial,"Helvetica Neue",Helvetica,sans-serif

    h1
      font-size: 30vh
      font-weight: bold
      position: relative
      margin: -8vh 0 0
      padding: 0

      &:after
        content: attr(data-h1)
        position: absolute
        top: 0
        left: 0
        right: 0
        color: transparent
        /* webkit only for graceful degradation to IE */
        background: -webkit-repeating-linear-gradient(-45deg, #71b7e6, #69a6ce, #b98acc, #ee8176, #b98acc, #69a6ce, #9b59b6)
        -webkit-background-clip: text
        -webkit-text-fill-color: transparent
        background-size: 400%
        animation: animateTextBackground 10s ease-in-out infinite

      + p
        color: #d6d6d6
        font-size: 8vh
        font-weight: bold
        line-height: 10vh
        max-width: 600px
        position: relative

        &:after
          content: attr(data-p)
          position: absolute
          top: 0
          left: 0
          right: 0
          color: transparent
          -webkit-background-clip: text

  #particles-js
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0

  @keyframes animateTextBackground
    0%
      background-position: 0 0

    25%
      background-position: 100% 0

    50%
      background-position: 100% 100%

    75%
      background-position: 0 100%

    100%
      background-position: 0 0

  @media (max-width: 767px)

    .error-page h1
      font-size: 32vw

      + p
        font-size: 8vw
        line-height: 10vw
        max-width: 70vw

  a.back
    position: fixed
    right: 40px
    bottom: 40px
    background: -webkit-repeating-linear-gradient(-45deg, #71b7e6, #69a6ce, #b98acc, #ee8176)
    border-radius: 5px
    box-shadow: 0 2px 10px rgba(0,0,0,0.2)
    color: #fff
    font-size: 16px
    font-weight: bold
    line-height: 24px
    padding: 15px 30px
    text-decoration: none
    transition: 0.25s all ease-in-out
    &:hover
      box-shadow: 0 4px 20px rgba(0,0,0,0.4)
</style>

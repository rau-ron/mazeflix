<template>
  <div>
    <header>
      <h1>Error!</h1>
    </header>
    <section class="sub-header">
      <h3>{{ error.message }}</h3>
    </section>
  </div>
</template>

<script>
export default {
  props: ['error'],
}
</script>

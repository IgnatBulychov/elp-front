<template>
  <reviews/>
</template>

<script>
import reviews from '~/components/dashboard/reviews/reviews.vue'

export default {
  layout: 'dashboard',
  middleware: 'authenticated',
  components: {
    reviews
  }
}
</script>

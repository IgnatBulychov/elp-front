<template>
  <newReview/>
</template>

<script>
import newReview from '~/components/dashboard/reviews/new.vue'

export default {
  layout: 'dashboard',
  middleware: 'authenticated',
  components: {
    newReview
  } 
}
</script>

<template>
  <updateReview/>
</template>

<script>
import updateReview from '~/components/dashboard/reviews/update.vue'

export default {
  layout: 'dashboard',
  middleware: 'authenticated',
  components: {
    updateReview
  }
}
</script>

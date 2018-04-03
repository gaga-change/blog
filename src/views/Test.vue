<template>
  <div> {{a}} </div>
</template>
<script>
import axios from 'axios'
export default {
  name: "test",
  data() {
    return {
      a: this.$store.state.a
    }
  },
  asyncData ({ store, route: { params: { id }}}) {
    return store.dispatch('DEFAULT_A').then(() => {
      console.log('--')
    })
  },
  created() {
    // axios.get('/api/a').then(res => {
    //   let data = res.data
    //   this.a = data.a
    // })
    // this.a = 2
    // this.$store.dispatch('DEFAULT_A')
    // this.$store.dispatch('DEFAULT_A').then(t => {
    //   console.log(t)
    // })
  },
  beforeMount () {
    // this.$store.dispatch('DEFAULT_A').then(t => {
    //   console.log(t)
    // })
  }
}
</script>


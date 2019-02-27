<template>
  <section>
    <p>{{ database.length }} items in catalogue.</p>
    <b-tabs position="is-centered">
      <div class="block">
        <b-radio 
          v-for="(ind, i) in indices"
          v-model="index"
          :native-value="ind"
          :key="i"
          type="is-secondary"
        >{{ ind }}</b-radio>
      </div>
      <b-field grouped>
        <b-input placeholder="Search Catalog" expanded></b-input>
        <p class="control">
          <button class="button is-secondary">Search</button>
        </p>
      </b-field>
    </b-tabs>
  </section>
</template>

<script>
export default {
  data () {
    return {
      index: this.indices.length > 0 ? this.indices[0] : null
    }
  },
  props: {
    database: Array,
    fields: Array,
    indices: Array
  }
}
</script>

<style>

</style>

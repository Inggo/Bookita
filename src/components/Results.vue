<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Search Results</p>
    </header>
    <section class="modal-card-body">
      <p class="content">{{ resultCountString }}</p>
      <div class="box" v-for="result in results" :key="result.id">
        <table class="table is-narrow is-hoverable is-fullwidth is-size-6 result-table">
          <tbody>
            <tr v-for="(field, index) in columns" :key="index" v-show="result[field]">
              <th>{{ field }}</th>
              <td>{{ result[field] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">Close</button>
    </footer>
  </div>
</template>

<script>
const MAX_RESULTS = 100;

export default {
  data () {
    return {
      columns: process.env.DB_FIELDS.split(',')
    }
  },
  computed: {
    resultCountString () {
      var count = this.totalResults + " " + (this.totalResults == 1 ? "result" : "results") + " found.";
      if (this.totalResults > MAX_RESULTS) {
        count = " Showing first " + MAX_RESULTS + " of " + count;
      }
      return count;
    }
  },
  props: {
    results: Array,
    totalResults: Number
  }
}
</script>

<style>

</style>

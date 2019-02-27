<template>
  <section>
    <b-field grouped>
      <b-input :placeholder="placeholder" expanded v-model="query"></b-input>
      <p class="control">
        <button class="button is-secondary"
          @click="performSearch"
        >Search</button>
      </p>
    </b-field>
    <div class="block">
      <b-radio 
        v-for="(ind, i) in indices"
        v-model="index"
        :native-value="i"
        :key="i"
        type="is-secondary"
      >{{ ind }}</b-radio>
    </div>
    <p v-if="message">{{ message }}</p>
    <p v-else>{{ database.length }} items in catalogue.</p>
    <b-loading :active.sync="loading"></b-loading>
    <b-modal :active.sync="showingResults" has-modal-card>
      <bkt-results
        :results="parsedResults"
        :total-results="results ? results.length : 0"
      ></bkt-results>
    </b-modal>
  </section>
</template>

<script>
import lunr from 'lunr';

const MAX_RESULTS = 100;

export default {
  data () {
    return {
      showingResults: false,
      loading: true,
      index: 0,
      lunrIndices: [],
      results: [],
      query: "",
      message: ""
    }
  },
  props: {
    database: Array,
    fields: Array,
    indices: Array
  },
  computed: {
    parsedResults () {
      var parsed = [];

      for (var i = 0; i < MAX_RESULTS && i < this.results.length; i++) {
        var result = this.database[this.results[i].ref - 1];
        parsed.push(result);
      }

      return parsed;
    },
    placeholder () {
      return "SEARCH BY " + this.indices[this.index];
    }
  },
  methods: {
    performSearch () {
      this.loading = true;
      this.results = this.lunrIndices[this.index].search(this.query);
      this.loading = false;
      this.showingResults = true;
    }
  },
  mounted () {
    var docs = this.database;

    this.message = "Indexing catalogue... Please wait.";

    for (var i = 0; i < this.indices.length; i++) {
      var ind = this.indices[i];
      var idx = lunr(function () {
        this.ref('ID');
        this.field(ind);

        docs.forEach((doc) => {
          this.add(doc);
        }, this);
      });

      this.lunrIndices.push(idx);
    }

    this.message = "";
    this.loading = false;
  }
}
</script>

<style>

</style>

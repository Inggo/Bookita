<template>
  <section>
    <p>{{ database.length }} items in catalogue.</p>
    <b-tabs position="is-centered">
      <div class="block">
        <b-radio 
          v-for="(ind, i) in indices"
          v-model="index"
          :native-value="i"
          :key="i"
          type="is-secondary"
        >{{ ind }}</b-radio>
      </div>
      <b-field grouped>
        <b-input :placeholder="placeholder" expanded></b-input>
        <p class="control">
          <button class="button is-secondary">Search</button>
        </p>
      </b-field>
    </b-tabs>
  </section>
</template>

<script>
import lunr from 'lunr';

export default {
  data () {
    return {
      index: 0,
      lunrIndices: []
    }
  },
  props: {
    database: Array,
    fields: Array,
    indices: Array
  },
  computed: {
    placeholder () {
      return "SEARCH BY " + this.indices[this.index];
    }
  },
  mounted () {
    var docs = this.database;

    for (var i = 0; i < this.indices.length; i++) {
      var ind = this.indices[i];
      this.lunrIndices.push(lunr => {
        this.ref('id');
        this.field(ind);

        docs.forEach((doc) => {
          this.add(doc);
        }, this)
      });
    }
  }
}
</script>

<style>

</style>

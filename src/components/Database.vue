<template>
  <div class="container has-text-centered">
    <transition appear name="fade">
      <div v-if="loading">
        <p>Now loading... please wait...</p>
        <p>{{ loadMessage }}</p>
      </div>
      <div v-else>
        <p v-if="!database">Database Not Found. Please set-up with appropriate database.</p>
        <code v-if="debug && error">{{ error }}</code>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
      loadMessage: "",
      loading: true,
      database: null,
      error: null,
      debug: process.env.NODE_ENV !== "production"
    }
  },
  mounted () {
    // Check if local DB exists
    this.loadMessage = "Checking local database...";

    // Compare MD5 hash
    var db = localStorage.getItem('db');
    var db_hash = localStorage.getItem('db_hash');

    axios.get('CHECKSUM')
      .then((response) => {
        if (db_hash == response.data) {
          // Load local DB
          this.database = JSON.parse(db);
          this.loading = false;
        } else {
          db_hash = response.data;
          axios.get(process.env.DB)
            .then((response) => {
              // Load remote DB
              this.database = response.data;

              localStorage.setItem('db', JSON.stringify(this.database));
              localStorage.setItem('db_hash', db_hash);

              this.loading = false;
            }, (error) => {
              this.loadMessage = "Unable to load remote database... Please contact an administrator.";
              this.loading = false;
            });
        }
      }, (err) => {
        this.loadMessage = "Remote checksum not found, please contact an administrator.";   
      });
  }
}
</script>

<style>

</style>

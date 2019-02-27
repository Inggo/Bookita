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

    // Load local DB

    // Check if DB file exists
    this.loadMessage = "Loading remote database...";

    axios.get(process.env.DB)
      .then((response) => {
        // Load remote DB
        this.loading = false;
        this.database = response;

        // Calculate MD5

        // Compare with remote hash

        // If remote hash does not exist, write it
      }, (error) => {
        this.loadMessage = "Unable to load remote database... Please contact an administrator.";
        this.loading = false;
      });
  }
}
</script>

<style>

</style>

<template>
  <div>
    <button class="help-button button is-info" type="button" @click="showHelp">
      <span class="icon"><i class="mdi mdi-help"></i></span>
    </button>
    <b-modal :active.sync="active" has-modal-card>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Help</p>
        </header>
        <section class="modal-card-body">
          <bkt-box icon="mdi-help-circle-outline" icon-class="has-text-secondary">
            <p class="has-icon has-text-primary">
              <span class="icon has-text-primary"><span class="mdi mdi-numeric-1-circle-outline"></span></span>
              Select one of the seven options to search for under the search box.<br>
              E.g. <code class="has-background-white">Title</code>
            </p>
            <p class="has-icon has-text-primary">
              <span class="icon has-text-primary"><span class="mdi mdi-numeric-2-circle-outline"></span></span>
              Fill in the search box with your query terms.<br>
              E.g <code class="has-background-white">accounting</code>
            </p>
            <p class="has-icon has-text-primary">
              <span class="icon has-text-primary"><span class="mdi mdi-numeric-3-circle-outline"></span></span>
              Click on the <span class="has-background-secondary has-text-white">&nbsp;Search&nbsp;</span> button.
            </p>
            <p class="has-icon has-text-primary">
              <span class="icon has-text-primary"><span class="mdi mdi-numeric-4-circle-outline"></span></span>
              Browse the search results in the pop-up modal.
            </p>
            <p class="has-icon has-text-primary">
              <span class="icon has-text-primary"><span class="mdi mdi-numeric-5-circle-outline"></span></span>
              Once done, click the <span class="has-background-grey has-text-black">&nbsp;Close&nbsp;</span> button at the bottom left.
            </p>
            <hr>
            <p class="has-icon has-text-danger">
              <span class="icon has-text-danger"><span class="mdi mdi-alert-circle-outline"></span></span>
              The results will only show the first 100 best matches.
            </p>
            <p class="has-icon has-text-info">
              <span class="icon has-text-info"><span class="mdi mdi-information-outline"></span></span>
              Input additional search query terms to narrow down results.<br>
              E.g. <code class="has-background-white">financial accounting</code>
            </p>
            <hr>
            <p class="has-icon has-text-danger">
              <span class="icon has-text-danger"><span class="mdi mdi-alert-circle-outline"></span></span>
              The query terms will only match whole word matches.
            </p>
            <p class="has-icon has-text-info">
              <span class="icon has-text-info"><span class="mdi mdi-information-outline"></span></span>
              You may use the asterisk (<code>*</code>) as a wildcard character to search non-whole word matches.<br>
              E.g. <code class="has-background-white">fil*</code> will match both
              <code class="has-background-white">"Filipino"</code> and
              <code class="has-background-white">"Filipiniana"</code>
            </p>
          </bkt-box>
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="hideHelp">Close</button>
        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: false
    }
  },
  methods: {
    showHelp () {
      this.active = true
    },
    hideHelp () {
      this.active = false
    }
  }
}
</script>

<style lang="scss" scoped>
.has-icon {
  padding-left: 2rem;
  position: relative;

  .icon {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>

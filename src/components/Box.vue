<template>
  <div class="box has-background-light">
    <div class="media">
      <div class="media-left is-size-2">
        <div style="min-width: 51px; text-align: center">
            <span class="icon" :class="iconClass">
              <i class="mdi" :class="icon"></i>
            </span>
        </div>
      </div>
      <div class="media-content" :class="contentClass">
        <slot>
          <p class="has-text-info">
            The query terms will only match whole word matches.<br>
            You may use the asterisk (<code>*</code>) as a wildcard character to search non-whole word matches.<br>
            E.g. <code class="has-background-white">fil*</code> will match both
            <code class="has-background-white">"Filipino"</code> and
            <code class="has-background-white">"Filipiniana"</code>
          </p>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contentClass: {
      type: String,
      default: "is-size-6"
    },
    iconClass: {
      type: String,
      default: "has-text-info"
    },
    icon: {
      type: String,
      default: "mdi-information-outline"
    }
  }
}
</script>

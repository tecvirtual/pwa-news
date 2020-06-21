<template>
  <q-item class="dark">

    <q-item-side>
      <q-item-tile avatar>
        <img :src="singleNew.image" />
      </q-item-tile>
    </q-item-side>

    <q-item-main :label="title" />

    <q-item-side right>
      <q-item-tile icon="forward" color="white" @click.native="$emit('onForward')" />
    </q-item-side>
  </q-item>
</template>

<script>
export default {
  name: 'NewItemComponent',
  props: {
    singleNew: {
      required: true,
      type: Object
    }
  },
  computed: {
    title () {
      return `${this.singleNew.title.substr(0, 30)}...`
    }
  }
}
</script>

<template>
  <q-card inline class="q-ma-sm">
    <q-card-media>
      <img :src="singleNew.image" />
    </q-card-media>
    <q-card-title>
      {{ singleNew.title }}
      <span slot="subtitle">{{ singleNew.date }} {{ singleNew.time }}</span>
    </q-card-title>
    <q-card-main>
      {{ singleNew.description }}
    </q-card-main>
  </q-card>
</template>

<script>
export default {
  name: 'NewDetailComponent',
  props: {
    singleNew: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <div>
    <div>
      <img
        class="rounded-t-lg"
        :src="imageSrc"
        :alt="book.title"
        :style="{ width: 'auto', height: '440px' }"
      />
    </div>
    <div class="p-5">
      <RouterLink :to="{ name: 'BookDetails', params: { id: book.id } }">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ book.title }}
        </h5>
      </RouterLink>
      <span>{{ book.description }}</span
      ><br />
      <span>{{ book.price }}¥</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    book: Object,
    id: String,
  },
  computed: {
    imageSrc() {
      return `src/assets/HP${this.id}.jpg`;
    },
  },
};
</script>

<template>
  <section class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="form-group mt-3">
          <input
            v-model="query"
            type="text"
            class="form-control"
            placeholder="Search..."
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <ul class="card-columns list-unstyled">
          <li
            v-for="restaurant in filteredList"
            :key="restaurant.id"
            class="card"
          >
            <img :src="restaurant.image.url" class="card-img-top" />
            <div class="card-body">
              <h5 class="card-title">{{ restaurant.name }}</h5>
              <p class="card-text">
                {{ restaurant.description || 'No description provided' }}.
              </p>
              <router-link
                :to="{ name: 'restaurants-id', params: { id: restaurant.id } }"
                tag="a"
                class="btn btn-primary"
              >
                See dishes
              </router-link>
            </div>
          </li>
          <p v-if="!filteredList.length">No results :(</p>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)
export default {
  data() {
    return {
      query: ''
    }
  },
  computed: {
    filteredList() {
      return this.restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(this.query.toLowerCase())
      })
    },
    restaurants() {
      return this.$store.getters['restaurants/list']
    }
  },
  async fetch({ store }) {
    store.commit('restaurants/emptyList')
    const response = await strapi.request('post', '/graphql', {
      data: {
        query: `query {
            restaurants {
              id
              name
              description
              image {
                url
              }
            }
          }
          `
      }
    })
    response.data.restaurants.forEach(restaurant => {
      restaurant.image.url = `${apiUrl}${restaurant.image.url}`
      store.commit('restaurants/add', {
        id: restaurant.id,
        ...restaurant
      })
    })
  }
}
</script>

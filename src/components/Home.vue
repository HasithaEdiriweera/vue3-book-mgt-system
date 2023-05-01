<template>
  <HeaderPage />

  <h1>Hello {{ name }} !!! Welocome to Book Management System</h1>

  <div class="block text-center" m="t-4">
    <el-carousel trigger="click" height="150px">
      <el-carousel-item v-for="item in books" :key="item.id">
        <h3 class="small justify-center" text="2xl">
          {{ item.title }}: {{ item.description }}
        </h3>
      </el-carousel-item>
    </el-carousel>
  </div>

  <div class="common-layout">
    <el-container>
      <el-aside width="20px"></el-aside>
      <el-main>
        <div>
          <div>
            <el-col :span="1">
              <el-button v-if="admin" type="primary" @click="addBook"
                >Add New Book</el-button
              >
            </el-col>
            <div style="margin: 20px"></div>
            <el-table :data="bookData()" border style="width: 100%">
              <!-- <el-table-column label="Id" prop="id" /> -->
              <el-table-column type="index" width="50" />
              <el-table-column label="Title" prop="title" />
              <el-table-column label="ISBN" prop="isbn" />
              <el-table-column label="Description" prop="description" />
              <el-table-column label="Publish date" prop="publish_date" />
              <el-table-column label="Publisher" prop="publisher" />
              <el-table-column label="Price" prop="price" />
              <el-table-column align="right" width="350" >
                <template #header>
                  <el-input
                    v-model="search"
                    size="small"
                    placeholder="Type to search"
                  />
                </template>
                <template #default="scope">
                  <el-button
                    type="info"
                    size="small"
                    plain
                    @click="onDetailClicked(scope.row)"
                    >Details
                  </el-button>
                  <el-button
                    v-if="admin"
                    type="warning"
                    size="small"
                    @click="onAddAuthorClicked(scope.row)"
                    >Add Author
                  </el-button>
                  <el-button
                    v-if="admin"
                    size="small"
                    type="success"
                    @click="onEditClicked(scope.row)"
                    >Edit</el-button
                  >
                  <el-button
                    v-if="admin"
                    size="small"
                    type="danger"
                    @click="deleteBook(scope.row)"
                    >Delete</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>

  <el-footer> <img :src="imgSrc" /></el-footer>
</template>

<script>
import HeaderPage from "./Header.vue";
import axios from "axios";

export default {
  name: "HomePage",
  data() {
    return {
      name: "",
      token: null,
      books: [],
      admin: false,
      search: "",
    };
  },
  components: {
    HeaderPage,
  },
  computed: {
    imgSrc() {
      return require("../assets/footer5.jpg");
    },
    logoSrc() {
      return require("../assets/book_logo.png");
    },
  },
  methods: {
    async deleteBook(row) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
      let result = await axios.delete(
        "http://localhost:8000/api/books/" + row.id
      );
      if (result.status == 200) {
        this.loadData();
      }
    },
    addBook() {
      this.$router.push({ name: "AddBook" });
    },
    onDetailClicked(row) {
      this.$router.push({ path: "/bookdetails/" + row.id });
    },
    onAddAuthorClicked(row) {
      this.$router.push({ path: "/BookAddAuthors/" + row.id });
    },
    onEditClicked(row) {
      this.$router.push({ path: "/update/" + row.id });
    },
    bookData() {
      return this.books.filter(
        (data) =>
          !this.search ||
          data.title.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    async loadData() {
      let user = localStorage.getItem("user-info");
      if (user) {
        this.admin = true;
        this.name = JSON.parse(user).user.name;
        this.token = JSON.parse(user).token;
      }
      // if (!user) {
      //   this.$router.push({ name: "Home" });
      // }
      let result = await axios.get("http://localhost:8000/api/books");
      this.books = result.data;
    },
  },
  async mounted() {
    this.loadData();
  },
};
</script>

<style>
td {
  width: 160px;
  height: 40px;
}

.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.footer {
  bottom: 0;
  position: fixed;
  height: auto;
}
</style>

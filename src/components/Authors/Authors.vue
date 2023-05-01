<template>
  <HeaderPage />
  <h1>Hello..!! {{ name }}, Welcome to Author page</h1>

  <div class="common-layout">
    <el-container>
      <el-aside width="20px"></el-aside>
      <el-main>
        <div>
          <div>
            <el-col :span="1">
              <el-button v-if="admin" type="primary" @click="addAuthor"
                >Add new Author</el-button
              >
            </el-col>
            <div style="margin: 20px"></div>
            <el-table :data="authorData()" border style="width: 100%">
              <el-table-column type="index" width="50" />
              <el-table-column label="Name" prop="name" />
              <el-table-column label="Email" prop="email" />
              <el-table-column label="Phone Number" prop="phone_number" />
              <el-table-column align="right">
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
                    @click="onAddBookClicked(scope.row)"
                    >Add Books
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
                    @click="deleteAuthor(scope.row)"
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
</template>

<script>
import HeaderPage from "../Header.vue";
import axios from "axios";
export default {
  name: "AuthorsDetails",
  components: {
    HeaderPage,
  },
  data() {
    return {
      authors: [],
      search: "",
      admin: false,
      name: "",
    };
  },
  methods: {
    async loadData() {
      let user = localStorage.getItem("user-info");
      if (user) {
        this.admin = true;
        this.name = JSON.parse(user).user.name;
        this.token = JSON.parse(user).token;
      }
      let result = await axios.get("http://localhost:8000/api/author");
      this.authors = result.data;
    },
    async deleteAuthor(row) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
      let result = await axios.delete(
        "http://localhost:8000/api/author/" + row.id
      );
      if (result.status == 200) {
        this.loadData();
      }
    },
    addAuthor() {
      this.$router.push({ name: "AddAuthor" });
    },
    onDetailClicked(row) {
      this.$router.push({ path: "/AuthorDetails/" + row.id });
    },
    onAddBookClicked(row) {
      this.$router.push({ path: "/AuthorAddBooks/" + row.id });
    },
    onEditClicked(row) {
      this.$router.push({ path: "/updateAuthor/" + row.id });
    },
    authorData() {
      return this.authors.filter(
        (data) =>
          !this.search ||
          data.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  async mounted() {
    this.loadData();
  },
};
</script>

import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import SignUp from "./components/SignUp.vue";
import Login from "./components/Login.vue";
import AddBook from "./components/Books/AddBook.vue";
import Update from "./components/Books/UpdateBook.vue";
import BookDetails from "./components/Books/BookDetails.vue";
import Authors from "./components/Authors/Authors.vue";
import Dashboard from "./components/Dashboard.vue";
import AddAuthor from "./components/Authors/AddAuthor.vue";
import UpdateAuthor from "./components/Authors/UpdateAuthor.vue";
import AuthorDetails from "./components/Authors/AuthorDetails.vue";
import AuthorBooks from "./components/Authors/AddAuthorBooks.vue";
import BookAuthors from "./components/Books/AddBookAuthor.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/add",
    name: "AddBook",
    component: AddBook,
  },
  {
    path: "/update/:id",
    name: "Update",
    component: Update,
  },
  {
    path: "/bookdetails/:id",
    name: "BookDetails",
    component: BookDetails,
  },
  {
    path: "/BookAddAuthors/:id",
    name: "BookAddAuthors",
    component: BookAuthors,
  },
  {
    path: "/authors",
    name: "Authors",
    component: Authors,
  },
  {
    path: "/addAuthor",
    name: "AddAuthor",
    component: AddAuthor,
  },
  {
    path: "/updateAuthor/:id",
    name: "UpdateAuthor",
    component: UpdateAuthor,
  },
  {
    path: "/authorDetails/:id",
    name: "AuthorDetails",
    component: AuthorDetails,
  },
  {
    path: "/AuthorAddBooks/:id",
    name: "AuthorAddBooks",
    component: AuthorBooks,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

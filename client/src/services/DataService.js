import { AuthData } from "../models/AuthData";

export class DataService {
  static async getCategories() {
      const data = JSON.parse(localStorage.getItem("userData"));
      const categories = await fetch(`http://localhost:3001/api/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + data.token,
      },
    });
    return categories;
  }

  static async getTasks() {
    const data = JSON.parse(localStorage.getItem("userData"));
    const tasks = await fetch(`http://localhost:3001/api/tasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + data.token,
      },
    });
    return tasks;
  }

  static async authUser(email, password) {
    const authData = new AuthData(email, password);
    const response = await fetch(`http://localhost:3001/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
    });
    return response;
  }

  static async addNewCategory(text) {
    const categoryText = {categoryText: text};
    const data = JSON.parse(localStorage.getItem("userData"));
    const response = await fetch(`http://localhost:3001/api/add/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + data.token,
      },
      body: JSON.stringify(categoryText),
    });
    return response;
  }

  static async editCategory(id, text) {
    const categoryInfo = {categoryText: text};
    const data = JSON.parse(localStorage.getItem("userData"));
    const response = await fetch(`http://localhost:3001/api/edit/category/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + data.token,
      },
      body: JSON.stringify(categoryInfo),
    });
    return response;
  }

  static async deleteCategory(id) {
    const data = JSON.parse(localStorage.getItem("userData"));
    const response = await fetch(`http://localhost:3001/api/delete/category/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + data.token,
      },
    });
    return response;
  }

  static async addSubCategory(parent_id, text) {
    const subCategory = {text};
    const data = JSON.parse(localStorage.getItem("userData"));
    const response = await fetch(`http://localhost:3001/api/add/subcategory/${parent_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + data.token,
      },
      body: JSON.stringify(subCategory),
    });
    return response;
  }

  static async addTask(category_id, header) {
    const task = {category_id, header};
    const data = JSON.parse(localStorage.getItem("userData"));
    const response = await fetch(`http://localhost:3001/api/add/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + data.token,
      },
      body: JSON.stringify(task),
    });
    return response;
  }

  static async editTask(task_id, category_id, header, description, isDone) {
    const task = {
      header: header,
      description: description,
      isDone: isDone,
    };
    const data = JSON.parse(localStorage.getItem("userData"));
    const response = await fetch(`http://localhost:3001/api/edit/task/${category_id}/${task_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + data.token,
      },
      body: JSON.stringify(task),
    });
    return response;
  }

  static async markTask(value, task_id) {
    const task = {
      isDone: value,
    };
    const data = JSON.parse(localStorage.getItem("userData"));
    const response = await fetch(`http://localhost:3001/api/edit/mark_task_done/${task_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + data.token,
      },
      body: JSON.stringify(task),
    });
    return response;
  }
}

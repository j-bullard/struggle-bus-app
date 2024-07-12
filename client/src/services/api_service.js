const apiUrl = "http://localhost:3001";

let apiService = {
  async getCars() {
    const res = await fetch(`${apiUrl}`);
    const json = await res.json();
    return json;
  },
};

export default apiService;

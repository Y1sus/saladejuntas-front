export const config = {
  httpConfig: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  },
};

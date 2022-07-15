export function getLocal(key) {
  let data = localStorage.getItem(key);

  try {
    data = JSON.parse(data);
  } catch (error) {
    console.log(error);
  }

  return data;
}

export function setLocal(key, data) {
  localStorage.setItem(
    key,
    typeof data === "object" ? JSON.stringify(data) : data
  );
}

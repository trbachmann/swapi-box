export const fetchSWData = async (url) => {
  const response = await fetch(url);
  if (response.ok) {
    return response.json()
  } else {
    throw Error(`Error fetching, code: ${response.status}`);
  }
}

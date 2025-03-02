export const apiFetch = async (url, method, data = null) => {
  //initialize values //loading just incase we want to use it later on
  let loading = true,
    error = false,
    result = null;

  //set up url //add process.env later
  let backendURL = url;

  //set up header
  let apiConfig = {
    method: method.toUpperCase(),
    credentials: "include",
  };

  //add body when method isnt get method
  if (method.toUpperCase() != "GET" && data) {
    apiConfig.headers = { "Content-Type": "application/json" };
    apiConfig.body = JSON.stringify(data);
  }

  //fetch reqeust
  try {
    const response = await fetch(backendURL, apiConfig);

    // if repsonse is bad
    if (!response.ok) {
      error = true;
    }

    // result is good to parse
    result = await response.json();
  } catch (err) {
    error = true;
    result = err.message || "An error occured";
  } finally {
    loading = false; // finally set loading to false
  }

  // return result, error, and loading
  return { result, error, loading };
};

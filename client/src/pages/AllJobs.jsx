import { toast } from "react-toastify";
import { JobsContainer, SearchContainer } from "../components";
import customFetch from "../../../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";

const AllJobsContext = createContext();

export const loader = async ({ request }) => {
  // console.log(request.userId); // Step 1: Verify Data Fetching

  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries()
    ]);
    // console.log("Params:", params); // Step 2: Check received parameters
    
    const { data } = await customFetch.get("/jobs", {
      params,
    });
    // console.log("Data from API:", data); // Step 3: Check data received from API
    
    return {
      data,
      searchValues: { ...params },
    };
    
  } catch (error) {
    // console.error("Error fetching data:", error);
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllJobs = () => {
  const { data, searchValues } = useLoaderData();
  // console.log("Loader data:", data, "Search values:", searchValues); // Step 4: Check loader data
  
  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export default AllJobs;

export const useAllJobsContext = () => useContext(AllJobsContext);

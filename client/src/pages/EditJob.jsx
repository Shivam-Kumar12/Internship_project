import { FormRow, FormSelect,SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData, useParams } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/Constants.js";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../../../utils/customFetch.js";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/jobs/${params.id}`);
    return data;
  } catch (error) {
    // return redirect("/");
    toast.error(error?.response?.data?.msg);
    return redirect("/dashboard/all-jobs");
  }
};
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.patch(`/jobs/${params.id}`, data);
    toast.success("Job edited successfully");
    return redirect("/dashboard/all-jobs");
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
};
const EditJob = () => {
  
  // const params = useParams();
  const { job } = useLoaderData();
  // console.log(job);
  console.log("joblocation:",job.jobLocation);

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h3 className="form-title">EditJob</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            defaultValue={job.position}
            labelText="Position"
          />
          <FormRow
            type="text"
            name="company"
            defaultValue={job.company}
            labelText="Company"
          />
          <FormRow
            type="text"
            name="jobLocation" 
            defaultValue={job.jobLocation}
            labelText="job Location"
          />

          <FormSelect
            labelText="job status"
            name="jobStatus"
            defaultValue={job.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormSelect
            name="jobType"
            labelText="job type"
            defaultValue={job.jobType}
            list={Object.values(JOB_TYPE)}
          />
        <SubmitBtn formBtn/>
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditJob;

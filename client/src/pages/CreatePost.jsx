import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";

const CreatePost = () => {
  const navigate = useNavigate(); // This is used to navigate to a different page

  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  }); // This is the state for the form

  const [generatingImg, setGeneratingImg] = useState(false); // Img-generation is a time-consuming process, so we need to show a loader to the user
  const [loading, setLoading] = useState(false); // This is for the post request

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value }); // This is a generic function to handle all the form fields

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  }; // This function is used to generate a random prompt

  const generateImage = async () => { // This function is used to generate an image
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(
          // "https://dalle-arbb.onrender.com/api/v1/dalle",
          "https://dall-e-c4vz.onrender.com/api/v1/dalle",
          // "http://localhost:8080/api/v1/dalle",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: form.prompt,
            }),
          }
        ); // This is the API endpoint for generating an image

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` }); // Set the photo in the form state
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false); // Stop the loader
      }
    } else {
      alert("Please provide proper prompt!");
    }
  }; // This function is used to generate an image

  const handleSubmit = async (e) => { // This function is used to create a post
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch(
          // "https://dalle-arbb.onrender.com/api/v1/post",
          "https://dall-e-c4vz.onrender.com/api/v1/post",
          // "http://localhost:8080/api/v1/post",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...form }),
          }
        ); // This is the API endpoint for creating a post

        await response.json(); // Get the response
        alert("Success");
        navigate("/"); // Navigate to the home page
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false); // Stop the loader
      }
    } else {
      alert("Please generate an image with proper details");
    }
  }; // This function is used to create a post

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
          Generate an imaginative image through DALL-E AI and share it with the
          community
        </p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Crepuscular"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A comic book cover of a superhero wearing headphones.."
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            ** After creating your desired image, you can share it with others
            **
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? "Sharing..." : "Share with your friends!"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;

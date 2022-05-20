import axios from "axios";
import { cloudinaryLink } from "./constants";

const uploadImage = async (imageSelected) => {
  const formData = new FormData();
  formData.append("file", imageSelected.file);
  formData.append("upload_preset", "erwyc7ba");
  const { data } = await axios.post(cloudinaryLink, formData);
  console.log(data);
};

export { uploadImage };

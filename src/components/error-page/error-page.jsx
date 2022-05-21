import { changeTitle } from "../../utils";
import "./error-page.css";

const ErrorPage = () => {
  changeTitle("Page not Found");
  return (
    <div className="error_page_wrapper">
      <div className="error_image_wrapper">
        <img src="./images/404error.svg" alt="" />
      </div>
    </div>
  );
};

export { ErrorPage };

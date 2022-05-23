import { changeTitle } from "../../utils";
import { titleConstants } from "../../utils/constants";
import "./error-page.css";

const ErrorPage = () => {
  changeTitle(titleConstants.errorPage);
  return (
    <div className="error_page_wrapper">
      <div className="error_image_wrapper">
        <img src="./images/404error.svg" alt="" />
      </div>
    </div>
  );
};

export { ErrorPage };

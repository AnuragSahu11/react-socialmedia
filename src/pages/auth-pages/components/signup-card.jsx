import { toast } from "react-toastify";
import { Input, Checkbox, Button } from "antd";
import { signUp } from "../../../firebase/firebase-auth";
import { UserOutlined, EyeOutlined, MailOutlined } from "@ant-design/icons";
import { initialSignUpInput, toastConstants } from "../../../utils/constants";
import { useState } from "react";
import { signupFormValidation } from "../../../utils";

const SignUpCard = () => {
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [signUpInput, setSignUpInput] = useState(initialSignUpInput);
  const { firstName, lastName, email, password, acceptTC } = signUpInput;
  const [viewPassword, setViewPassword] = useState(false);

  const signUpClick = async () => {
    setSignUpLoading(true);
    if (signupFormValidation(signUpInput)) {
      try {
        await signUp(firstName, lastName, email, password);
        toast.success(toastConstants.signupSuccess);
        toast.success(toastConstants.loginAfterSignup);
      } catch (err) {
        toast.error(toastConstants.signupFailed);
        toast.error(err);
      }
    } else {
      toast.warn("Enter correct details");
    }
    setSignUpLoading(false);
  };

  return (
    <div>
      <p className="login_label">First Name</p>
      <Input
        className="login_input"
        placeholder="First Name"
        onChange={(e) =>
          setSignUpInput({ ...signUpInput, firstName: e.target.value })
        }
        prefix={<UserOutlined />}
      />
      <p className="login_label">Last Name</p>
      <Input
        className="login_input"
        placeholder="Last Name"
        onChange={(e) =>
          setSignUpInput({ ...signUpInput, lastName: e.target.value })
        }
        prefix={<UserOutlined />}
      />
      <p className="login_label">Email</p>
      <Input
        className="login_input"
        placeholder="Email Id"
        onChange={(e) =>
          setSignUpInput({ ...signUpInput, email: e.target.value })
        }
        prefix={<MailOutlined />}
      />
      <p className="login_label">Password</p>
      <Input
        type={viewPassword ? "text" : "password"}
        className="login_input"
        placeholder="Password"
        prefix={<EyeOutlined onClick={() => setViewPassword(!viewPassword)} />}
        onChange={(e) =>
          setSignUpInput({ ...signUpInput, password: e.target.value })
        }
      />
      <Checkbox
        className="remember_me"
        onChange={() => {
          setSignUpInput({ ...signUpInput, acceptTC: !signUpInput.acceptTC });
        }}
        checked={acceptTC}
      >
        Accept Terms & Conditions
      </Checkbox>
      <Button
        onClick={signUpClick}
        className="login_button"
        block={true}
        type="primary"
        loading={signUpLoading}
      >
        Sign Up
      </Button>
    </div>
  );
};

export { SignUpCard };

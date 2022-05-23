import { toast } from "react-toastify";
import { signUp } from "../../../firebase/firebase-auth";
import { UserOutlined, KeyOutlined, MailOutlined } from "@ant-design/icons";
import { toastConstants } from "../../../utils/constants";

const SignUpCard = () => {
  const [signUpLoading, setSignUpLoading] = useState(false);
  const { firstName, lastName, email, password } = signUpInput;

  const signUpClick = async () => {
    setSignUpLoading(true);
    try {
      await signUp(firstName, lastName, email, password);
      toast.success(toastConstants.signupSuccess);
      toast.success(toastConstants.loginAfterSignup);
    } catch (err) {
      toast.error(toastConstants.signupFailed);
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
        className="login_input"
        placeholder="Password"
        onChange={(e) =>
          setSignUpInput({ ...signUpInput, password: e.target.value })
        }
        prefix={<KeyOutlined />}
      />
      <Checkbox className="remember_me" onChange={() => {}}>
        Remember me
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

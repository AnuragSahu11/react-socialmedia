import { Button } from "antd";

const FollowButton = ({
  isFollowing,
  buttonLoading,
  clickFollow,
  clickUnfollow,
}) => {
  return isFollowing ? (
    <Button
      loading={buttonLoading}
      onClick={() => clickUnfollow()}
      type="primary"
    >
      Unfollow
    </Button>
  ) : (
    <Button
      loading={buttonLoading}
      onClick={() => clickFollow()}
      type="primary"
    >
      Follow
    </Button>
  );
};

export { FollowButton };

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTitle, objectToArr, statusConstants } from "../../utils";
import { Button, Divider, List, Tooltip, Typography, Skeleton } from "antd";
import "./draft-page.css";
import {
  setDraftData,
  showNewPostModal,
} from "../../redux/slice/operation-slice";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { deleteFromDraft, getUserData } from "../../firebase/firestore-methods";

const DraftPage = () => {
  const { Title } = Typography;
  const { token } = useSelector((store) => store.token);
  const { userData, status } = useSelector((store) => store.userData);
  const dispatch = useDispatch();

  const [draftArr, setDraftArr] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (status === statusConstants.fulfilled) {
      setDraftArr(
        objectToArr(userData.drafts, "postID").map(
          ({ postID, caption, content, img, tags }) => {
            return {
              postID: postID,
              caption: caption,
              content: content,
              img: img || null,
              tags: tags || [],
            };
          }
        )
      );
    }
  }, [status]);

  const clickPostDraft = (item) => {
    dispatch(setDraftData(item));
    dispatch(showNewPostModal());
  };

  const clickDelete = async (draftData) => {
    setDeleteLoading(true);
    await deleteFromDraft(token, draftData.postID);
    setDeleteLoading(false);
    dispatch(getUserData(token));
  };

  changeTitle("Drafts");

  return (
    <div className="draft_page">
      <div className="draft_header">
        <Title level={2}>Draft Posts</Title>
      </div>
      {status === statusConstants.fulfilled ? (
        <List
          itemLayout="vertical"
          size="large"
          dataSource={draftArr}
          renderItem={(item) => (
            <>
              <List.Item
                className="draft_page_list"
                key={item.caption}
                actions={[
                  <Tooltip title="Post Draft">
                    <Button
                      onClick={() => clickPostDraft(item)}
                      type="primary"
                      icon={<PlusOutlined />}
                    />
                  </Tooltip>,
                  <Tooltip title="Delete Draft">
                    <Button
                      onClick={() => clickDelete(item)}
                      type="primary"
                      icon={<DeleteOutlined />}
                      loading={deleteLoading}
                    />
                  </Tooltip>,
                  <Divider />,
                ]}
                extra={
                  item.img && (
                    <div className="draft_image">
                      <img height="100%" alt="draft image" src={item.img} />
                    </div>
                  )
                }
              >
                <List.Item.Meta title={item.caption} />
                {item.content}
              </List.Item>
              <Divider />
            </>
          )}
        />
      ) : (
        <>
          <Skeleton active />
          <Skeleton active />
        </>
      )}
    </div>
  );
};

export { DraftPage };

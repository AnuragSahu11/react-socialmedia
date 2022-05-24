const DraftPostModal = ({ postData }) => {
  return (
    <>
      <Modal
        title="Create New Post"
        visible={newPostModal}
        onCancel={onCancel}
        footer={[
          <Button
            key="link"
            type="primary"
            loading={confirmLoading}
            onClick={draftClick}
            icon={<ContainerOutlined />}
            ghost
          >
            Move to Drafts
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={confirmLoading}
            onClick={handleOk}
            icon={<PlusOutlined />}
          >
            Add Post
          </Button>,
        ]}
      >
        <p className="edit_profile_text">Caption</p>
        <Input
          placeholder="Post caption"
          onChange={(e) =>
            setInputField({ ...inputField, caption: e.target.value })
          }
        />
        <p className="edit_profile_text">Add Image to the Post</p>
        <Upload
          action={cloudinaryLink}
          data={{ upload_preset: "erwyc7ba" }}
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          maxCount={1}
        >
          {"Add Image to the Post"}
        </Upload>
        <p className="edit_profile_text">Post Content</p>
        <TextArea
          onChange={(e) =>
            setInputField({ ...inputField, content: e.target.value })
          }
          placeholder="Post content"
          autoSize={{ minRows: 3, maxRows: 5 }}
          value={inputField.content}
        />
        {showEmojiPicker && (
          <Picker
            className="emoji_picker"
            onEmojiClick={onEmojiClick}
            disableSearchBar={true}
            pickerStyle={{ width: "100%" }}
          />
        )}
        <div className="emoji_picker_icon_wrapper">
          <Tooltip title="Add Emoji">
            <SmileOutlined
              className="emoji_picker_icon"
              onClick={toggleEmojiPicker}
            />
          </Tooltip>
        </div>
      </Modal>
    </>
  );
};

export { DraftPostModal };

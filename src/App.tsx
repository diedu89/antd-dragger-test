import React from "react";
import "antd/dist/antd.css";
import { Upload } from "antd";
const { Dragger } = Upload;

function App({ onUploadComplete }: { onUploadComplete: () => void }) {
  return (
    <Dragger
      data-testid="upload-dragger"
      maxCount={1}
      action="greeting"
      onChange={({ file }) => {
        if (file.status === "done") onUploadComplete();
      }}
      showUploadList={false}
    >
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
    </Dragger>
  );
}

export default App;

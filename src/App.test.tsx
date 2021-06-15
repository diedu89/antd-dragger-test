import { render, waitFor } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { DraggerProps } from "antd/lib/upload";

const elementRenderer = ({ onUploadComplete = () => {} }) => (
  <div className="antd-local">
    <App onUploadComplete={onUploadComplete} />
  </div>
);

jest.mock("antd", () => {
  const antd = jest.requireActual("antd");
  const { Upload } = antd;
  const { Dragger } = Upload;

  const MockedDragger = (props: DraggerProps) => {
    console.log('rendering mock');
    return (
      <Dragger
        {...props}
        customRequest={({ onSuccess }) => {
          setTimeout(() => {
            onSuccess("ok");
          }, 0);
        }}
      />
    );
  };

  return { ...antd, Upload: { ...Upload, Dragger: MockedDragger } };
});

it("completes the image upload", async () => {
  const onUploadComplete = jest.fn();
  const flushPromises = () => new Promise(setImmediate);

  const { getByTestId } = render(elementRenderer({ onUploadComplete }));

  const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });

  const uploadDragger = await waitFor(() => getByTestId("upload-dragger"));
  await act(async () => {
    userEvent.upload(uploadDragger, file);
  });
  await flushPromises();
  expect(onUploadComplete).toHaveBeenCalled();
});

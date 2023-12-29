import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { SimpleUploadAdapter } from "@ckeditor/ckeditor5-upload";

// const editorConfiguration = {
// toolbar: [
//   "bold",
//   "italic",
//   "bulletedList",
//   "numberedList",
//   "blockQuote",
//   "link",
// ],
// };

export default function MyCKEditor({ value, setValue }: any) {
  const API_URl = "https://lubrytics.com:8443/nadh-mediafile/file";

  function uploadAdapter(loader: any) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file: any) => {
            body.append("upload", file);
            fetch(API_URl, {
              method: "post",
              body: body,
            })
              .then((res) => res.json())
              .then((res) => {
                console.log(API_URl + "/" + res.id);
                resolve({ default: API_URl + "/" + res.id });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      },
    };
  }

  function uploadPlugin(editor: any) {
    editor.plugins.get("FileRepository").createUploadAdapter = (
      loader: any
    ) => {
      return uploadAdapter(loader);
    };
  }

  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      onChange={(_event, editor) => {
        setValue(editor.getData());
      }}
      onReady={(editor) => {
        editor.focus();
      }}
      config={{
        extraPlugins: [uploadPlugin],
        placeholder: "Add content",
      }}

      // config={editorConfiguration}
      // onBlur={(event, editor) => {
      //   console.log("Blur.", editor.getData());
      // }}
      // onFocus={(event, editor) => {
      //   console.log("Focus.", editor);
      // }}
    />
  );
}

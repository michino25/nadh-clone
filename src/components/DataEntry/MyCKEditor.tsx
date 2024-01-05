import { CKEditor } from "@ckeditor/ckeditor5-react";

// NOTE: Use the editor from source (not a build)!
import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";

import { Essentials } from "@ckeditor/ckeditor5-essentials";
import { Bold, Italic, Underline } from "@ckeditor/ckeditor5-basic-styles";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import { BlockQuote } from "@ckeditor/ckeditor5-block-quote";
import { Heading } from "@ckeditor/ckeditor5-heading";
import {
  ImageResize,
  ImageStyle,
  ImageToolbar,
  Image,
  ImageResizeEditing,
  ImageResizeHandles,
  AutoImage,
  ImageUpload,
} from "@ckeditor/ckeditor5-image";
import { AutoLink, Link, LinkImage } from "@ckeditor/ckeditor5-link";
import { List } from "@ckeditor/ckeditor5-list";
import { Indent, IndentBlock } from "@ckeditor/ckeditor5-indent";
import { FileRepository } from "@ckeditor/ckeditor5-upload";

const API_URl = "https://lubrytics.com:8443/nadh-mediafile/file";

const editorConfiguration = {
  plugins: [
    Essentials,
    Bold,
    Italic,
    Underline,
    Paragraph,
    BlockQuote,
    Heading,
    Image,
    ImageResizeEditing,
    ImageResizeHandles,
    ImageResize,
    AutoImage,
    ImageToolbar,
    ImageStyle,
    ImageUpload,
    LinkImage,
    Link,
    AutoLink,
    List,
    Indent,
    IndentBlock,
    FileRepository,
  ],
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "underline",
    "|",
    "blockQuote",
    "link",
    "insertImage",
    "|",
    "bulletedList",
    "numberedList",
    "outdent",
    "indent",
  ],
  image: {
    resizeOptions: [
      {
        name: "resizeImage:original",
        value: null,
        icon: "original",
      },
      {
        name: "resizeImage:50",
        value: "50",
        icon: "medium",
      },
      {
        name: "resizeImage:75",
        value: "75",
        icon: "large",
      },
    ],
    toolbar: [
      "resizeImage:50",
      "resizeImage:75",
      "resizeImage:original",
      "|",
      "imageStyle:alignLeft",
      "imageStyle:alignRight",
      "|",
      "imageStyle:alignBlockLeft",
      "imageStyle:alignCenter",
      "imageStyle:alignBlockRight",
      "|",
      "imageTextAlternative",
      "|",
      "linkImage",
    ],
    insert: {
      integrations: ["upload", "assetManager", "url"],
    },
  },
};

export default function MyCKEditor({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) {
  function uploadAdapter(loader: { file: Promise<string | Blob> }) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file: string | Blob) => {
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
    editor.plugins.get("FileRepository").createUploadAdapter = (loader: {
      file: Promise<string | Blob>;
    }) => {
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
        ...editorConfiguration,
        extraPlugins: [uploadPlugin],
        placeholder: "Add content",
      }}
    />
  );
}

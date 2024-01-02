import Tag from "components/DataEntry/Tag";

export default function DisplayTag({ data, updateFn }: any) {
  console.log(data);

  const setTags = (value: string[], option: string) => {
    const remain = data.filter((item: any) => item.platform !== option);
    const newData = [
      ...remain,
      ...value.map((item) => ({
        platform: option,
        url: item,
      })),
    ];
    updateFn(newData);
  };

  return (
    <>
      <h5 className="font-bold mb-3">DISPLAY ON</h5>
      <div className="flex gap-2 mb-3">
        <span>Website: </span>
        <Tag
          tags={data
            .filter(
              (item: { platform: string; url: string }) =>
                item.platform === "website"
            )
            .map((item: { platform: string; url: string }) => item.url)}
          setTags={(value: string[]) => setTags(value, "website")}
        />
      </div>
      <div className="flex gap-2 mb-3">
        <span>Linked In: </span>
        <Tag
          tags={data
            .filter(
              (item: { platform: string; url: string }) =>
                item.platform === "linked"
            )
            .map((item: { platform: string; url: string }) => item.url)}
          setTags={(value: string[]) => setTags(value, "linked")}
        />
      </div>
      <div className="flex gap-2 mb-3">
        <span>Facebook: </span>
        <Tag
          tags={data
            .filter(
              (item: { platform: string; url: string }) =>
                item.platform === "facebook"
            )
            .map((item: { platform: string; url: string }) => item.url)}
          setTags={(value: string[]) => setTags(value, "facebook")}
        />
      </div>
      <div className="flex gap-2 mb-3">
        <span>Others: </span>
        <Tag
          tags={data
            .filter(
              (item: { platform: string; url: string }) =>
                item.platform === "other"
            )
            .map((item: { platform: string; url: string }) => item.url)}
          setTags={(value: string[]) => setTags(value, "other")}
        />
      </div>
    </>
  );
}

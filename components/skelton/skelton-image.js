import { Skeleton } from "antd";

function SkeltonImage() {
  return (
    <div className="skeleton-image">
      <Skeleton.Image active />
      <Skeleton.Input active/>
    </div>
  );
}

export default SkeltonImage;

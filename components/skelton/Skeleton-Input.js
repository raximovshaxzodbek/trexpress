import { Skeleton } from "antd";
function SkeletonInput() {
  return (
    <div
      className="skeleton-input"
      /* onMouseOver={() => setModalopen(true)}
      onMouseLeave={() => setModalopen(false)} */
    >
      <Skeleton.Input active />
    </div>
  );
}

export default SkeletonInput;

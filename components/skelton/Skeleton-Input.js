
import { Skeleton } from "antd"
function SkeletonInput({setOpen}) {
  return (
    <div className="skeleton-input" onMouseOver={()=> setOpen(true)} onMouseLeave = {()=> setOpen(false)}>
        
          <Skeleton.Input active />
    </div>
  )
}

export default SkeletonInput
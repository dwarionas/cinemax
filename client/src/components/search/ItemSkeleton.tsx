import React from "react"
import ContentLoader from "react-content-loader"

const ItemSkeleton = () => (
  <ContentLoader 
    speed={2}
    width={200}
    height={365}
    viewBox="0 0 200 350"
    backgroundColor="#2c2b2b"
    foregroundColor="#545454"
    // {...props}
  >
    <rect x="0" y="8" rx="0" ry="0" width="200" height="300" /> 
    <rect x="0" y="313" rx="0" ry="0" width="200" height="20" />
  </ContentLoader>
)

export default ItemSkeleton;
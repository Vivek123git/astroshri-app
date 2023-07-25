import React from "react";
import { Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import { Avatar } from "@material-ui/core";

export const FilterSkeletonshop = ({ listsToRender }) => {
  return (
    <>
      {Array(listsToRender)
        .fill(1)
        .map((card, index) => (
          <div style={{ margin: "5px" }} key={index}>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        ))}
    </>
  );
};

export const ListSkeletonshop = ({ listsToRender }) => {
  return (
    <>
      {Array(listsToRender)
        .fill(1)
        .map((card, index) => (
          <div style={{ width: "40%", margin: "5px" }} key={index}>
            <Skeleton variant="rectangular" width="100%">
              <div style={{ paddingTop: "87%" }} />
            </Skeleton>
            <Box sx={{ display: "block", marginTop: "2px" }}>
              <Skeleton variant="rectangular" width="100%" height={22} />
            </Box>
            <Skeleton />
          </div>
        ))}
    </>
  );
};

export const ListSkeleton2 = ({ listsToRender }) => {
  return (
    <>
      {Array(listsToRender)
        .fill(1)
        .map((card, index) => (
          <div style={{ width: "100%" }} key={index}>
            <Skeleton
              style={{ width: "100%", marginLeft: "2px", height: "300px" }}
            />
          </div>
        ))}
    </>
  );
};

export const FilterSkeleton = ({ listsToRender }) => {
  return (
    <>
      {Array(listsToRender)
        .fill(1)
        .map((card, index) => (
          <div style={{ margin: "5px" }} key={index}>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        ))}
    </>
  );
};

const ListSkeleton = ({ listsToRender }) => {
  return (
    <>
      {Array(listsToRender)
        .fill(1)
        .map((card, index) => (
          <div style={{ width: "40%", margin: "5px" }} key={index}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Skeleton variant="circular">
                <Avatar />
              </Skeleton>
              <Skeleton style={{ width: "100%", marginLeft: "2px" }} />
            </Box>
            <Skeleton />
            <Skeleton />
            <Skeleton variant="rectangular" width="100%">
              <div style={{ paddingTop: "37%" }} />
            </Skeleton>
          </div>
        ))}
    </>
  );
};

export default ListSkeleton;

import React from "react";
import Paper from "@mui/material/Paper";

export function CommentsList(props) {
  return (
    <div
      style={{
        display: "grid",
        gap: "10px",
        maxHeight: "350px",
        overflow: "auto",
      }}
    >
      {props.data.map((comment) => {
        return (
          <Paper variant="outlined" style={{ padding: "10px" }}>
            <div>{comment.body}</div>
          </Paper>
        );
      })}
    </div>
  );
}

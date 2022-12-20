import Modal from "@mui/material/Modal";
import { createComment, getComments } from "../services/comments";
import { useQueryClient, useMutation, useQuery } from "react-query";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { CommentsList } from "./CommentsList";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export function Comments({ showModal, setShowModal, id }) {
  const { data, isLoading } = useQuery("comments", getComments(id));
  const queryClient = useQueryClient();
  const comments = useMutation(createComment(id), {
    onSuccess: () => {
      return queryClient.invalidateQueries("comments");
    },
  });

  const [commentText, setCommentText] = useState("");

  return (
    <Modal
      open={showModal}
      onClose={() => {
        setShowModal(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ minWidth: 275, maxWidth: "50vw", height: "fit-content" }}>
        <CardContent>
          <h2>Комментарии</h2>
          {isLoading ? (
            <div>Загрузка комментариев...</div>
          ) : (
            <CommentsList data={data} />
          )}
          <br />
          <div style={{ display: "flex", gap: "15px" }}>
            <TextField
              style={{ width: "100%" }}
              label="Комментарий"
              variant="standard"
              onChange={(e) => setCommentText(e.target.value)}
            />
            <Button
              size="small"
              onClick={() => {
                comments.mutate(commentText);
              }}
            >
              Создать
            </Button>
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            onClick={() => {
              setShowModal(false);
            }}
          >
            Закрыть модалку
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
}

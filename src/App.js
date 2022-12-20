import { useMutation, useQuery, useQueryClient } from "react-query";
import { createPost, getPosts } from "./services/posts";
import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Comments } from "./components/Comments";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import {Reg} from ".registration"

import "./App.css";

function App() {
  const { data, isLoading } = useQuery("posts", getPosts);
  const { register, handleSubmit } = useForm();
  const queryClient = useQueryClient();
  const posts = useMutation(createPost, {
    onSuccess: () => {
      return queryClient.invalidateQueries("posts");
    },
  });

  const onHandleSubmitForm = (data) => {
    posts.mutate(data);
  };

  return (
    <div className="container">
      <h1>Список постов</h1>

      <div>
        <form
          style={{ display: "flex", gap: "15px", marginBottom: "20px" }}
          onSubmit={(e) => {
            const func = handleSubmit(onHandleSubmitForm);
            func(e);
          }}
        >
          <TextField
            style={{ width: "100%" }}
            label="Заголовок"
            variant="standard"
            {...register("title", { required: true })}
          />
          <TextField
            style={{ width: "100%" }}
            label="Автор"
            variant="standard"
            {...register("author", { required: true })}
          />
          <Button size="small" type="submit">
            Создать
          </Button>
        </form>
      </div>

      {isLoading ? <div>Загрузка...</div> : <Posts data={data} />}
    </div>
  );
}

function Posts(props) {
  const { data } = props;
  const [showModal, setShowModal] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(0);

  return (
    <React.Fragment>
      {showModal ? (
        <Comments
          showModal={showModal}
          setShowModal={setShowModal}
          id={currentPostId}
        />
      ) : null}
      {data.map((post) => {
        return (
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <h3>{post.title}</h3>
              <h5>{post.author}</h5>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => {
                  setCurrentPostId(post.id);
                  setShowModal(true);
                }}
              >
                Показать комментарии
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </React.Fragment>
  );
}

export default App;

export function AllRoutes(){
  return(
    <Routes>
      <Route path="/" element={<App/>}/>
      <Route path="/reg" element={<Reg/>}/>
    </Routes>
  )
}
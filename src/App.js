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
import { Route, Routes } from 'react-router-dom';

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

function Reg() {
  const { register, handleSubmit, formState } = useForm();

  const onSubmit = (data) => {
    console.log("Нет ошибок", data);
    setUrl(`https://avatars.dicebear.com/api/${data.gender}/${data.key}.svg?background=%230000ff&mood%5B%5D=${data.mood}`);
  };

  const onHandleSubmit = (e) => {
    const func = handleSubmit(onSubmit);
    func(e);
  };

  const [url, setUrl] = useState(
    "https://avatars.dicebear.com/api/female/zxc.svg?background=%230000ff&mood%5B%5D=happy"
  );

 return (
    <div class="autolayout" className="App">
       <header style={{ width: "350px", display: "grid", gap: "10px" }}>
        <form onSubmit={onHandleSubmit}>
        <input placeholder="Имя" {...register("first_name")} />
        <input placeholder="Фамилия" {...register("second_name")} />
          <select name="gender" {...register("gender")}>
            <option value="male">male</option>
            <option value="female" selected>female</option>
          </select>
          <input
            placeholder="Номер телефона"
            {...register("phone_number", {
              pattern: /^\+79\d{9}$/,
            })}
          />
          <input placeholder="Email адрес" {...register("email")} />
          <input placeholder="Пароль" {...register("password")} />
          <button type="submit">Зарегистрироваться</button>
          <h1 href="/list">Авторизация</h1>
          {formState.errors.phone_number !== undefined && (
            <div>Ошибка в номере телефона</div>
          )}
        </form>
      </header>
    </div>
  );
 }


export default Reg;

export function AllRoutes(){
  return(
    <Routes>
      <Route path="/" element={<Reg/>}/>
      <Route path="/list" element={<App/>}/>
    </Routes>
  )
}
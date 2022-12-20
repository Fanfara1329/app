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
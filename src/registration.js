
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
    <div className="App">
      <img src={url} width="250" />
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
          {formState.errors.phone_number !== undefined && (
            <div>Ошибка в номере телефона</div>
          )}
        </form>
      </header>
    </div>
  );
 }

export default Reg;


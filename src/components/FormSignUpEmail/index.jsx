import "./styles.css";

export default function FormSignUp({ form, setForm, errors }) {
  function onChange(e) {
    const value = e.nativeEvent.data;
    if (e.target.name === "name" && value !== " " && Number(value)) return;
    if (e.target.name === "email" && value === " ") return;
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <>
      <h1 className="form__title">Adicione seus dados</h1>
      <form>
        <div className="container__input">
          <label>Nome *</label>
          <input
            style={{ borderColor: errors.name ? "red" : "#d0d5dd" }}
            type="text"
            name="name"
            placeholder="Digite seu nome"
            onChange={onChange}
            value={Object.values(form)[0]}
          />
          {errors.name && <span className="errorInput">{errors.name}</span>}
        </div>
        <div className="container__input">
          <label>Digite seu e-mail *</label>
          <input
            style={{ borderColor: errors.email ? "red" : "#d0d5dd" }}
            type="text"
            name="email"
            placeholder="Digite seu e-mail"
            onChange={onChange}
            value={Object.values(form)[1]}
          />
          {errors.email && <span className="errorInput">{errors.email}</span>}
        </div>
      </form>
    </>
  );
}

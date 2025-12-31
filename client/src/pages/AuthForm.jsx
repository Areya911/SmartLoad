export default function AuthForm({ title, onSubmit, showName }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const data = {
      name: showName ? form.name.value : undefined,
      email: form.email.value,
      password: form.password.value
    };

    onSubmit(data);
  };

  return (
    <div className="card">
      <h2>{title}</h2>

      <form onSubmit={handleSubmit}>
        {showName && (
          <input
            name="name"
            placeholder="Name"
            required
          />
        )}

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        />

        <button type="submit">{title}</button>
      </form>
    </div>
  );
}

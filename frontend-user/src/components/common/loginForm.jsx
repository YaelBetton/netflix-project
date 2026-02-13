import { useState } from 'react';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulaire soumis:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        name="email" 
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input 
        name="password" 
        type="password" 
        value={formData.password}
        onChange={handleChange}
        placeholder="Mot de passe"
      />
      <button type="submit">Valider</button>
    </form>
  );
}

export default LoginForm;
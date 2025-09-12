import { useState } from "react";

export default function LoginForm() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    });
    const data = await res.json();
    setMessage(data.message || (res.ok ? "Login successful!" : "Error"));
  }

  return (
    <form onSubmit={handleLogin}>
      <input value={identifier} onChange={e => setIdentifier(e.target.value)} placeholder="Email or Username" required />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" required />
      <button type="submit">Login</button>
      <div>{message}</div>
    </form>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const nav = useNavigate();
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("member");
  const [country, setCountry] = useState("India");
  const [err, setErr] = useState("");

  const submit = async () => {
    setErr("");
    try {
      const res = await api.post("/auth/signup", { name, email, password, role, country });
      login(res.data.user, res.data.token);
      nav("/restaurants");
    } catch (e) {
      setErr(e?.response?.data?.message || e.message);
    }
  };

  return (
    <div style={{display:"grid",placeItems:"center",height:"100vh"}}>
      <div style={{width:360,display:"grid",gap:12,padding:24,border:"1px solid #ddd",borderRadius:12,background:"#fff"}}>
        <h2 style={{textAlign:"center",marginBottom:12}}>Signup</h2>

        <input placeholder="name" value={name} onChange={(e)=>setName(e.target.value)} />
        <input placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input placeholder="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />

        <select value={role} onChange={(e)=>setRole(e.target.value)}>
          <option value="admin">admin</option>
          <option value="manager">manager</option>
          <option value="member">member</option>
        </select>

        <select value={country} onChange={(e)=>setCountry(e.target.value)}>
          <option value="India">India</option>
          <option value="America">America</option>
        </select>

        <button onClick={submit}>Create Account</button>
        {err && <div style={{color:"crimson"}}>{err}</div>}

        <div style={{fontSize:12,textAlign:"center"}}>
          Already have an account? <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
}
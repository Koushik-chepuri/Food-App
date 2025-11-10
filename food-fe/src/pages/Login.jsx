import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const nav = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const submit = async () => {
    setErr("");
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.user, res.data.token);
      nav("/restaurants");
    } catch (e) {
      setErr(e?.response?.data?.message || e.message);
    }
  };

  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
      <div style={{display:"grid",gap:12,maxWidth:360,width:"100%",padding:24,border:"1px solid #ddd",borderRadius:12,background:"#fff"}}>
        <h2 style={{textAlign:"center",marginBottom:8}}>Login</h2>
        <input placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input placeholder="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button onClick={submit}>Login</button>
        {err && <div style={{color:"crimson",fontSize:13}}>{err}</div>}
      </div>
    </div>
  );
}
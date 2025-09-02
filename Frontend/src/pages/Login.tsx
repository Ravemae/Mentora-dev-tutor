import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            alert(error.message);
        } else {
            navigate("/chat");
        }
    };

    return (
        <div className="flex h-screen items-center justify-center">
            <form onSubmit={handleLogin} className="w-96 space-y-4 bgwhite p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-center"></h2>
                <input 
                type="email" 
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
                />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
                />
                <button type="submit" className="auth-button">Login</button>
                <p className="mt-4 text-center">
                    <Link to="/signup" className="auth-link">Don't have an account? Sign Up</Link>
                </p>
            </form>
        </div>
    );
}
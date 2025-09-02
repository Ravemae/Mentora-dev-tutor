import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";


export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
            alert(error.message);
        } else {
            alert("Check your email for confirmation link!");
            navigate("/login");
        }
    };

    return(
        <div className="flex h-screen flex items-center justify-center justify-center bg-background">
            <form onSubmit={handleSignup} className="auth-form">
                <h2 className="auth-title">Create Your Account</h2>
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
                <button type="submit" className="auth-button">Sign Up</button>
                <p className="mt-4 text-center">
                    <Link to="/login" className="auth-link">Already have an account? Log in"</Link>
                </p>
            </form>
        </div>
    );
}
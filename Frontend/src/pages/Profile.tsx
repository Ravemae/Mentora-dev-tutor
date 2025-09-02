import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Profile() {
    const [user, setUser] = useState<any>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            setUser(data.user);
            if (data.user?.user_metadata?.avatar_url) {
                setAvatarUrl(data.user.user_metadata.avatar_url);
            }
        });
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/login");
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = e.target.files?.[0];
            if (!file || !user) return;

            const fileExt = file.name.split('.').pop();
            const filePath = 'avatars/${user.id}.${fileExt}';

            // Upload the file to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file, { upsert: true });

                if (uploadError) throw uploadError;

            // Get the public URL of the uploaded file
            const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
            const publicUrl = data.publicUrl;

            // Save avatar URL in user metadata
            const { error: updateError } = await supabase.auth.updateUser({
                data: { avatar_url: publicUrl },
            });

            if (updateError) throw updateError;

            setAvatarUrl(publicUrl);
            alert("Profile picture updated!");
        } catch (err: any) {
            alert(err.message);
        }
    };

    if (!user) return <div className="flex items-center justify-center h-screen">Loading...</div>;

    return (
        <div className="flex h-screen items-center justify-center bg-background">
            <div className="auth-form text-center">
                <h2 className="auth-title">Profile</h2>

                {/* Avatar */}
                <div className="flex flex-col items-center mb-6">
                    {avatarUrl ? (
                        <img src={avatarUrl} alt="Avatar" className="w-24 h-24 rounded-full border-2 border-primary shadow-lg mb-3" />
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center text-2xl mb-3">
                        👤
                        </div>
                    )}
                    <input type="file" accept="image/*" onChange={handleFileChange} className="text-sm text-muted-foreground" />
                </div>
                
                <p className="mb-4">Email: <span className="font-semibold">{user.email}</span></p>
                <button onClick={handleLogout} className="auth-button">Log Out</button>
            </div>
        </div>
    );

}
import { useEffect, useState } from "react";
import { Button, Eyebrow } from "../components/ui";
import { supabase, type Profile } from "../lib/supabase";

export function AdminDashboard({ onBack }: { onBack: () => void }) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const { data, error: queryError } = await supabase.from("profiles").select("id, email, display_name, role, created_at, updated_at").order("created_at", { ascending: false });
      if (queryError) setError("Không thể tải danh sách người dùng.");
      else setProfiles((data ?? []) as Profile[]);
    }
    void load();
  }, []);

  async function toggleRole(profile: Profile) {
    const role = profile.role === "admin" ? "user" : "admin";
    const { error: updateError } = await supabase.from("profiles").update({ role, updated_at: new Date().toISOString() }).eq("id", profile.id);
    if (updateError) setError("Không thể cập nhật quyền người dùng.");
    else setProfiles((current) => current.map((item) => item.id === profile.id ? { ...item, role } : item));
  }

  return <div className="h-full overflow-y-auto bg-offwhite px-6 py-7 no-scrollbar">
    <header className="flex items-start justify-between gap-4"><div><Eyebrow>Admin console</Eyebrow><h1 className="mt-2 font-display text-4xl text-ink">Người dùng</h1><p className="mt-2 text-sm text-muted">Theo dõi và kiểm soát tài khoản trong Atelier.</p></div><Button variant="outline" size="sm" onClick={onBack}>Quay lại</Button></header>
    <div className="mt-8 grid grid-cols-2 gap-3"><div className="rounded-3xl border border-line bg-paper p-5"><span className="text-xs uppercase tracking-widest text-muted">Tổng user</span><strong className="mt-2 block font-display text-4xl text-ink">{profiles.length}</strong></div><div className="rounded-3xl border border-line bg-paper p-5"><span className="text-xs uppercase tracking-widest text-muted">Admin</span><strong className="mt-2 block font-display text-4xl text-ink">{profiles.filter((p) => p.role === "admin").length}</strong></div></div>
    {error && <p className="mt-5 rounded-2xl bg-cream px-4 py-3 text-sm text-ink-soft">{error}</p>}
    <div className="mt-6 flex flex-col gap-3">{profiles.map((profile) => <article key={profile.id} className="flex items-center justify-between gap-4 rounded-3xl border border-line bg-paper p-4"><div className="min-w-0"><p className="truncate text-sm font-semibold text-ink">{profile.display_name || "Chưa đặt tên"}</p><p className="truncate text-xs text-muted">{profile.email}</p><p className="mt-1 text-[11px] uppercase tracking-wider text-faint">{new Date(profile.created_at).toLocaleDateString("vi-VN")}</p></div><Button size="sm" variant={profile.role === "admin" ? "primary" : "outline"} onClick={() => void toggleRole(profile)}>{profile.role === "admin" ? "Admin" : "User"}</Button></article>)}</div>
  </div>;
}

import { FormEvent, useState } from "react";
import { supabase } from "../lib/supabase";
import { Button, Eyebrow } from "../components/ui";

export function AuthScreen() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const result = mode === "signin"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: displayName },
            emailRedirectTo: import.meta.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? `${window.location.origin}/auth/callback`,
          },
        });
    setBusy(false);
    if (result.error) {
      const text = result.error.message.toLowerCase();
      setMessage(text.includes("confirm") ? "Hãy kiểm tra email để xác nhận tài khoản." : "Email hoặc mật khẩu chưa hợp lệ.");
      return;
    }
    if (mode === "signup" && !result.data.session) setMessage("Tài khoản đã tạo. Hãy xác nhận email trước khi đăng nhập.");
  }

  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-offwhite px-6 py-10">
      <section className="w-full max-w-md rounded-[2rem] border border-line bg-paper p-8 shadow-[0_30px_90px_-40px_rgba(23,20,14,0.5)] sm:p-10">
        <div className="mb-8 flex items-center justify-between">
          <div><Eyebrow>Atelier</Eyebrow><h1 className="mt-2 font-display text-4xl text-ink">Your style, refined.</h1></div>
          <span className="flex size-12 items-center justify-center rounded-full bg-ink font-display text-xl text-offwhite">A</span>
        </div>
        <div className="mb-7 flex rounded-full bg-cream p-1" role="tablist" aria-label="Authentication mode">
          <button className={`flex-1 rounded-full py-2 text-sm font-semibold ${mode === "signin" ? "bg-paper text-ink shadow-sm" : "text-muted"}`} onClick={() => setMode("signin")}>Đăng nhập</button>
          <button className={`flex-1 rounded-full py-2 text-sm font-semibold ${mode === "signup" ? "bg-paper text-ink shadow-sm" : "text-muted"}`} onClick={() => setMode("signup")}>Đăng ký</button>
        </div>
        <form onSubmit={submit} className="flex flex-col gap-4">
          {mode === "signup" && <label className="flex flex-col gap-2 text-sm font-semibold text-ink">Tên hiển thị<input className="h-12 rounded-2xl border border-line bg-offwhite px-4 font-normal outline-none focus:border-ink" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Tên của bạn" required /></label>}
          <label className="flex flex-col gap-2 text-sm font-semibold text-ink">Email<input type="email" className="h-12 rounded-2xl border border-line bg-offwhite px-4 font-normal outline-none focus:border-ink" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required /></label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-ink">Mật khẩu<input type="password" minLength={6} className="h-12 rounded-2xl border border-line bg-offwhite px-4 font-normal outline-none focus:border-ink" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Tối thiểu 6 ký tự" required /></label>
          {message && <p className="rounded-2xl bg-cream px-4 py-3 text-sm leading-relaxed text-ink-soft" role="status">{message}</p>}
          <Button type="submit" full disabled={busy}>{busy ? "Đang xử lý..." : mode === "signin" ? "Vào Atelier" : "Tạo tài khoản"}</Button>
        </form>
        <p className="mt-6 text-center text-xs leading-relaxed text-muted">Dữ liệu tài khoản được bảo vệ bằng Supabase Auth và chính sách riêng tư theo từng người dùng.</p>
      </section>
    </main>
  );
}

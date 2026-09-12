import { useEffect, useState } from "react";
import { Navigation, Tab } from "./components/Navigation";
import { AuthScreen } from "./screens/AuthScreen";
import { AdminDashboard } from "./screens/AdminDashboard";
import { getProfile, supabase, type Profile as AccountProfile } from "./lib/supabase";
import { Home } from "./screens/Home";
import { Discover } from "./screens/Discover";
import { Wardrobe } from "./screens/Wardrobe";
import { Stylist } from "./screens/Stylist";
import { Profile } from "./screens/Profile";
import { OutfitDetail } from "./screens/OutfitDetail";
import { outfits } from "./data/style";

export default function App() {
  const [tab, setTab] = useState<Tab>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [profile, setProfile] = useState<AccountProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);

  const selected = outfits.find((o) => o.id === selectedId) ?? null;

  useEffect(() => {
    let active = true;
    async function loadSession() {
      const { data } = await supabase.auth.getSession();
      if (active && data.session?.user) setProfile(await getProfile(data.session.user));
      if (active) setLoading(false);
    }
    void loadSession();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) { setProfile(null); setLoading(false); return; }
      void getProfile(session.user).then((nextProfile) => { if (active) setProfile(nextProfile); });
    });
    return () => { active = false; listener.subscription.unsubscribe(); };
  }, []);

  function go(t: Tab) {
    setSelectedId(null);
    setTab(t);
  }

  function openOutfit(id: string) {
    setSelectedId(id);
  }

  if (loading) return <div className="flex min-h-[100dvh] items-center justify-center bg-offwhite text-sm text-muted">Đang tải Atelier...</div>;
  if (!profile) return <AuthScreen />;
  if (showAdmin && profile.role === "admin") return <div className="flex min-h-[100dvh] items-center justify-center sm:p-6"><div className="relative flex h-[100dvh] w-full max-w-[460px] flex-col overflow-hidden bg-offwhite sm:h-[880px] sm:max-h-[calc(100dvh-3rem)] sm:rounded-[2.2rem] sm:shadow-[0_40px_120px_-40px_rgba(23,20,14,0.5)]"><AdminDashboard onBack={() => setShowAdmin(false)} /></div></div>;

  return (
    <div className="flex min-h-[100dvh] items-center justify-center sm:p-6">
      <div className="relative flex h-[100dvh] w-full max-w-[460px] flex-col overflow-hidden bg-offwhite sm:h-[880px] sm:max-h-[calc(100dvh-3rem)] sm:rounded-[2.2rem] sm:shadow-[0_40px_120px_-40px_rgba(23,20,14,0.5)] sm:ring-1 sm:ring-ink/5">
        <main className="relative min-h-0 flex-1 overflow-hidden">
          <div key={tab} className="h-full animate-fade">
            {tab === "home" && <Home onOpenOutfit={openOutfit} onOpenStylist={() => go("stylist")} />}
            {tab === "discover" && <Discover onOpenOutfit={openOutfit} />}
            {tab === "wardrobe" && <Wardrobe />}
            {tab === "stylist" && <Stylist />}
            {tab === "profile" && <Profile profile={profile} onOpenAdmin={() => setShowAdmin(true)} />}
          </div>
        </main>

        <Navigation active={tab} onChange={go} />

        {selected && <OutfitDetail outfit={selected} onClose={() => setSelectedId(null)} />}
      </div>
    </div>
  );
}

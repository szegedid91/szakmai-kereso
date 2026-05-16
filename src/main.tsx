import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import "./styles.css";

// Initialize safe area insets (no-op on web, applies on native iOS/Android)
import { SafeArea } from "@capacitor-community/safe-area";
SafeArea.enable({
  config: {
    customColorsForSystemBars: true,
    statusBarColor: "#00000000",
    statusBarContent: "dark",
    navigationBarColor: "#00000000",
    navigationBarContent: "dark",
  },
}).catch(() => {
  // Safe to ignore on web
});

import Layout from "./components/Layout";
import SearchPage from "./pages/Search";
import SavedPage from "./pages/Saved";
import ProfilePage from "./pages/Profile";
import ProfessionalDetail from "./pages/ProfessionalDetail";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/kereses" replace />} />
            <Route path="/kereses" element={<SearchPage />} />
            <Route path="/mentett" element={<SavedPage />} />
            <Route path="/profil" element={<ProfilePage />} />
            <Route path="/szakember/:id" element={<ProfessionalDetail />} />
          </Route>
        </Routes>
      </HashRouter>
      <Toaster richColors position="top-center" />
    </QueryClientProvider>
  </StrictMode>
);

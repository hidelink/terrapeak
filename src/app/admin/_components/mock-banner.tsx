type MockBannerProps = {
  show: boolean;
  message?: string;
};

export function MockBanner({
  show,
  message = "Mostrando datos de ejemplo (no se pudo conectar a Supabase).",
}: MockBannerProps) {
  if (!show) return null;
  return (
    <div className="w-full bg-red-600 px-4 py-2 text-center text-sm font-semibold text-white">
      {message}
    </div>
  );
}


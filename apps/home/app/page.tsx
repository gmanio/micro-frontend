export default function HomePage() {
  return (
    <main style={{ padding: "2rem", maxWidth: 640 }}>
      <h1>Home</h1>
      <p>
        Multi-Zones router. Use hard links (<code>&lt;a&gt;</code>) to other
        zones.
      </p>
      <p style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <a href="/passport">Passport</a>
        <a href="/storybook/">Storybook</a>
      </p>
    </main>
  );
}


import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [verdict, setVerdict] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch("https://chorusx-fastapi-backend-poli76.hf.space/verdict", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    setVerdict(data);
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1><b>CHORUS-X™ Verdict Viewer</b></h1>
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>
      {verdict && (
        <div style={{ marginTop: "20px" }}>
          <h2>Verdict: {verdict.verdict}</h2>
          <pre>{JSON.stringify(verdict, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

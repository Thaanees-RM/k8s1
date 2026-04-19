import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch("http://backend-service/api")
      .then(res => res.json())
      .then(data => setData(data.message));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Frontend 🚀</h1>
      <h2>{data}</h2>
    </div>
  );
}

export default App;

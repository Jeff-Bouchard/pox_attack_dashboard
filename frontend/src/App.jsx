import { useState } from 'react';

export default function App() {
  const [log, setLog] = useState([]);
  const [attackType, setAttackType] = useState("replay");

  const runAttack = async () => {
    const res = await fetch(`http://localhost:8100/api/run/${attackType}`);
    const result = await res.json();
    setLog((prev) => [...prev, ...result.log]);
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h1 className="text-xl font-bold">PoX Attack Simulator</h1>
        <select
          value={attackType}
          onChange={(e) => setAttackType(e.target.value)}
          className="mt-2 border p-2"
        >
          <option value="replay">Replay Attack</option>
          <option value="sybil">Sybil Blast</option>
          <option value="memory">Fake Memory</option>
          <option value="forged">Signature Forgery</option>
        </select>
        <button
          onClick={runAttack}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Run Attack
        </button>
      </div>
      <div className="bg-black text-green-400 p-4 font-mono h-96 overflow-y-scroll">
        {log.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </div>
    </div>
  );
}

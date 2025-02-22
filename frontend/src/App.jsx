import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleSubmit = async () => {
    try {
      // Parse JSON safely
      const payload = JSON.parse(input);

      if (!payload.data || !Array.isArray(payload.data)) {
        alert("Invalid JSON input: 'data' must be an array.");
        return;
      }

      const res = await fetch("https://bajaj-b6nz.onrender.com/bfhl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        alert("Backend Error");
        return;
      }

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      alert("Invalid JSON input. Check format.");
    }
  };

  const handleFilterChange = (e) => {
    setSelectedFilters(Array.from(e.target.selectedOptions, (opt) => opt.value));
  };

  const renderFilteredResponse = () => {
    if (!response) return null;

    let filteredResponse = {};
    if (selectedFilters.includes("numbers")) filteredResponse.numbers = response.numbers;
    if (selectedFilters.includes("alphabets")) filteredResponse.alphabets = response.alphabets;
    if (selectedFilters.includes("highest_alphabet")) filteredResponse.highest_alphabet = response.highest_alphabet;

    return (
      <div className="mt-4">
        {filteredResponse.numbers && <p>Numbers: {filteredResponse.numbers.join(", ")}</p>}
        {filteredResponse.alphabets && <p>Alphabets: {filteredResponse.alphabets.join(", ")}</p>}
        {filteredResponse.highest_alphabet && <p>Highest Alphabet: {filteredResponse.highest_alphabet.join(", ")}</p>}
      </div>
    );
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-5 border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center">ABCD123</h1>
      <textarea
        className="w-full p-2 border mt-4"
        placeholder='Enter JSON: {"data": ["A","C","z","1","2"]}'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="w-full mt-3 bg-blue-500 text-white p-2 rounded" onClick={handleSubmit}>
        Submit
      </button>

      {response && (
        <div className="mt-4">
          <select className="w-full border p-2" multiple onChange={handleFilterChange}>
            <option value="numbers">Numbers</option>
            <option value="alphabets">Alphabets</option>
            <option value="highest_alphabet">Highest Alphabet</option>
          </select>
          {renderFilteredResponse()}
        </div>
      )}
    </div>
  );
}

export default App;

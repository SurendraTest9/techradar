import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import Radar from "./components/Radar/Radar";

export default function App() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const url =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTG8cJEAxUCT0I-aoB1nizRD1I6ILRiULbNDmtHkUBDk4gqoIv0PoVOb0CbnAbWEWLj3m_zu9YWLUc-/pub?output=csv";

    fetch(url)
      .then((res) => res.text())
      .then((csvText) => {
        const parsed = Papa.parse(csvText, { header: true });
        console.log("Parsed CSV rows:", parsed.data);

        const quadrantMap = {
          tools: "Tools",
          techniques: "Techniques",
          platforms: "Platforms",
          "languages & frameworks": "Languages & Frameworks",
        };

        const ringMap = {
          adopt: "adopt",
          trial: "trial",
          assess: "assess",
          hold: "hold",
        };

        const data = parsed.data
          .filter(
            (row) =>
              (row.name || row.Label) &&
              (row.ring || row.Ring) &&
              (row.quadrant || row.Quadrant)
          )
          .map((row) => ({
            name: (row.name || row.Label || "").trim(),
            ring:
              ringMap[(row.ring || row.Ring || "").toLowerCase().trim()] ||
              "assess",
            quadrant:
              quadrantMap[
                (row.quadrant || row.Quadrant || "").toLowerCase().trim()
              ] || (row.quadrant || row.Quadrant || "").trim(),
            isNew: (row.isNew || "").toLowerCase() === "true",
            description: row.description || row.Description || "",
          }));

        console.log("Radar entries:", data);
        setEntries(data);
      });
  }, []);

  return (
    <div>
      <h1>Tech Radar</h1>
      <Radar
        rings={["adopt", "trial", "assess", "hold"]}
        quadrants={[
          "Tools",
          "Techniques",
          "Platforms",
          "Languages & Frameworks",
        ]}
        data={entries}
        width={1200}
        fontSize={12}
      />
    </div>
  );
}

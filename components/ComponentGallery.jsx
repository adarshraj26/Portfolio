"use client";
import { useState } from "react";

// Example component for the playground
function ExampleButton({ label, color }) {
  return (
    <button className={`px-4 py-2 rounded font-bold text-white bg-${color}-500 hover:bg-${color}-600 transition`}>{label}</button>
  );
}

const COMPONENTS = [
  {
    name: "ExampleButton",
    component: ExampleButton,
    props: {
      label: "Click Me!",
      color: "cyan"
    },
    propTypes: {
      label: { type: "string", default: "Click Me!" },
      color: { type: "string", default: "cyan" }
    }
  },
  // Add more components here
];

export default function ComponentGallery() {
  const [selected, setSelected] = useState(0);
  const [props, setProps] = useState(COMPONENTS[0].props);

  const Comp = COMPONENTS[selected].component;
  const propTypes = COMPONENTS[selected].propTypes;

  function handlePropChange(key, value) {
    setProps((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6 mt-8 border border-cyan-200 dark:border-slate-700">
      <h2 className="font-bold text-lg mb-4 text-cyan-500">Component Gallery</h2>
      <div className="mb-4 flex gap-2">
        {COMPONENTS.map((c, i) => (
          <button key={c.name} onClick={() => { setSelected(i); setProps(COMPONENTS[i].props); }} className={`px-3 py-1 rounded ${i === selected ? "bg-cyan-500 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"}`}>
            {c.name}
          </button>
        ))}
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2 text-slate-700 dark:text-slate-200">Props</h3>
        {Object.entries(propTypes).map(([key, meta]) => (
          <div key={key} className="mb-2">
            <label className="block text-xs font-bold mb-1 text-slate-500">{key}</label>
            <input
              type="text"
              value={props[key]}
              onChange={e => handlePropChange(key, e.target.value)}
              className="w-full rounded px-2 py-1 border dark:bg-slate-800"
            />
          </div>
        ))}
      </div>
      <div className="mb-2">
        <h3 className="font-semibold mb-2 text-slate-700 dark:text-slate-200">Preview</h3>
        <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center min-h-[60px]">
          <Comp {...props} />
        </div>
      </div>
    </div>
  );
}

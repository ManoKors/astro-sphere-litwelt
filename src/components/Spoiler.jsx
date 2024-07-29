// Spoiler.jsx
import { createSignal } from "solid-js";

const Spoiler = (props) => {
  const [revealed, setRevealed] = createSignal(false);

  return (
    <div>
      <button
        onClick={() => setRevealed(!revealed())}
        style={{
          background: revealed() ? "#ffcccc" : "#ccccff",
          color: "white",
          border: "none",
          padding: "0.5em 1em",
          cursor: "pointer",
          marginBottom: "0.5em"
        }}
      >
        {revealed() ? "Hide Spoiler" : "Show Spoiler"}
      </button>
      {revealed() && <div style={{ padding: "1em", backgroundColor: "#f2f2f2", borderRadius: "8px" }}>{props.children}</div>}
    </div>
  );
};

export default Spoiler;

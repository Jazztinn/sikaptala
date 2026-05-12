import "@/styles/dampi-fab.css";

const dampiIcon = "/dampi.svg";

export default function DampiFab({ onClick, onOpenChat }) {
  const handleOpen = () => {
    if (typeof onOpenChat === "function") {
      onOpenChat("text");
      return;
    }

    onClick?.();
  };

  return (
    <div className="bottom-nav">
      <div className="nav-fab-wrap">
        <button className="nav-fab" onClick={handleOpen}>
          <img
            src={dampiIcon}
            alt="Dampi"
            className="dampi-icon"
            style={{ width: "32px", height: "32px" }}
          />
        </button>
      </div>
    </div>
  );
}

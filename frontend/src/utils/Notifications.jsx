import { toast } from "react-hot-toast";
import { Check, CircleX } from "lucide-react";

export const Notifications = ({ type, message, configMessage }) => {
  if (!message) return;

  const options = {
    duration: 2000,
    position: "bottom-right",
    removeDelay: 1000,
  };

  const icons = {
    success: (
      <Check
        size={14}
        style={{ color: "#00FF00", display: "flex", alignItems: "center" }}
      />
    ),

    error: (
      <CircleX
        size={14}
        style={{ color: "#FF0000", display: "flex", alignItems: "center" }}
      />
    ),
  };

  if (toast[type]) {
    toast[type](message, {
      ...options,
      icon: icons[type],
    });

    const timeOut = setTimeout(() => configMessage(""), 2000);
    return () => clearTimeout(timeOut);
  }
};

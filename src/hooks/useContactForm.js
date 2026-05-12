import { useState } from "react";

const EMPTY = { name: "", email: "", title: "", message: "" };

function validate(f) {
  const e = {};
  if (!f.name.trim()) e.name = "Name is required";
  if (!f.email.trim()) e.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
    e.email = "Enter a valid email address";
  if (!f.title.trim()) e.title = "Job title is required";
  if (!f.message.trim()) e.message = "Message is required";
  else if (f.message.trim().length < 10)
    e.message = "Message is too short (min 10 characters)";
  return e;
}

export function useContactForm() {
  const [fields, setFields] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const errs = validate({ ...fields, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: errs[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const errs = validate(fields);
    setErrors((prev) => ({ ...prev, [name]: errs[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({
      name: true,
      email: true,
      title: true,
      message: true,
    });

    const errs = validate(fields);
    setErrors(errs);

    if (Object.keys(errs).length > 0) return;

    setStatus("sending");

    try {
      const res = await fetch("/.netlify/functions/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fields),
      });

      if (!res.ok) throw new Error("Failed to send email");

      setStatus("success");
      setFields(EMPTY);
      setTouched({});
      setErrors({});
    } catch (err) {
      console.error("Resend error:", err);
      setStatus("error");
    }
  };

  const reset = () => setStatus("idle");

  return {
    fields,
    errors,
    touched,
    status,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  };
}

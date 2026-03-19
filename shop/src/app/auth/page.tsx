"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, getUsers, saveUsers, setCurrentUser } from "@/lib/storage";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(() => (getCurrentUser() ? "You are already logged in." : ""));

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const users = getUsers();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password.trim()) {
      setMessage("Email and password are required.");
      return;
    }

    if (mode === "register") {
      if (!name.trim()) {
        setMessage("Name is required for registration.");
        return;
      }

      if (users.some((user) => user.email.toLowerCase() === normalizedEmail)) {
        setMessage("An account with this email already exists.");
        return;
      }

      const newUser = {
        id: `U-${Date.now()}`,
        name: name.trim(),
        email: normalizedEmail,
        password,
      };

      saveUsers([...users, newUser]);
      setCurrentUser(newUser);
      setMessage("Registration successful. You are now logged in.");
      router.push("/");
      return;
    }

    const matched = users.find(
      (user) => user.email.toLowerCase() === normalizedEmail && user.password === password,
    );

    if (!matched) {
      setMessage("Invalid email or password.");
      return;
    }

    setCurrentUser(matched);
    setMessage("Login successful.");
    router.push("/");
  };

  return (
    <main className="mx-auto flex w-full max-w-xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            {mode === "login" ? "Login" : "Register"}
          </h1>
          <button
            type="button"
            onClick={() => {
              setMode(mode === "login" ? "register" : "login");
              setMessage("");
            }}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Switch to {mode === "login" ? "Register" : "Login"}
          </button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {mode === "register" ? (
            <label className="block text-sm font-medium text-slate-700">
              Full Name
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-indigo-200 focus:ring"
                placeholder="Jane Doe"
              />
            </label>
          ) : null}

          <label className="block text-sm font-medium text-slate-700">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-indigo-200 focus:ring"
              placeholder="you@example.com"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-indigo-200 focus:ring"
              placeholder="******"
            />
          </label>

          {message ? <p className="rounded-lg bg-slate-100 p-3 text-sm text-slate-700">{message}</p> : null}

          <button
            type="submit"
            className="w-full rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white transition hover:bg-slate-700"
          >
            {mode === "login" ? "Login" : "Create Account"}
          </button>
        </form>
      </section>
    </main>
  );
}

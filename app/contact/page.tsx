"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-canvas pt-[140px] pb-24 px-6">
        <div className="max-w-[560px] mx-auto">
          <p className="caption font-sans text-gray-400 uppercase tracking-[0.08em] mb-6">
            Contact
          </p>
          <h1 className="display-md font-sans font-bold text-ink">
            Get in touch.
          </h1>
          <p className="body-md font-sans text-gray-600 mt-4 max-w-[440px]">
            We review all submissions and respond within one business day.
          </p>

          {submitted ? (
            <div className="mt-14 border-t border-gray-200 pt-10">
              <p className="body-lg font-sans text-ink font-medium">Message received.</p>
              <p className="body-md font-sans text-gray-600 mt-2">
                We&apos;ll be in touch within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-14 space-y-8">
              <div>
                <label
                  htmlFor="name"
                  className="caption font-sans text-gray-400 uppercase tracking-[0.08em] block mb-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full border-b border-gray-200 bg-transparent py-3 body-md font-sans text-ink placeholder:text-gray-400 focus:outline-none focus:border-ink transition-colors duration-200"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="caption font-sans text-gray-400 uppercase tracking-[0.08em] block mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full border-b border-gray-200 bg-transparent py-3 body-md font-sans text-ink placeholder:text-gray-400 focus:outline-none focus:border-ink transition-colors duration-200"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="caption font-sans text-gray-400 uppercase tracking-[0.08em] block mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full border-b border-gray-200 bg-transparent py-3 body-md font-sans text-ink placeholder:text-gray-400 focus:outline-none focus:border-ink transition-colors duration-200 resize-none"
                  placeholder="Tell us about your inquiry…"
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  id="deal"
                  name="deal"
                  type="checkbox"
                  className="mt-1 w-4 h-4 accent-ink flex-shrink-0"
                />
                <label htmlFor="deal" className="body-sm font-sans text-gray-600 cursor-pointer">
                  I have a deal or property to submit for consideration
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-ink text-canvas font-sans font-medium tracking-[0.02em] h-12 px-8 body-sm hover:bg-ink-muted transition-colors duration-150"
                >
                  Send message
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </>
  );
}

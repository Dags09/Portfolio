import { useState } from "react";
import type { FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import TitleHeader from "../Components/TitleHeader";
import { CONTACT_EMAIL, WEB3FORMS_ACCESS_KEY } from "../utils/constants";

interface FormState {
    name: string;
    email: string;
    message: string;
}

const initialState: FormState = { name: "", email: "", message: "" };

export default function ContactSection() {
    const [form, setForm] = useState<FormState>(initialState);
    const [errors, setErrors] = useState<Partial<FormState>>({});
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
        "idle",
    );

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const validate = (): boolean => {
        const nextErrors: Partial<FormState> = {};

        if (!form.name.trim()) {
            nextErrors.name = "Please enter your name.";
        }

        if (!form.email.trim()) {
            nextErrors.email = "Please enter your email.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            nextErrors.email = "Please enter a valid email.";
        }

        if (!form.message.trim()) {
            nextErrors.message = "Please write a message.";
        }

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validate()) return;

        setStatus("sending");

        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    access_key: WEB3FORMS_ACCESS_KEY,
                    subject: `Portfolio message from ${form.name}`,
                    from_name: form.name,
                    email: form.email,
                    message: form.message,
                    to: CONTACT_EMAIL,
                }),
            });

            const data = await res.json();

            if (data.success) {
                setStatus("sent");
                setForm(initialState);
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    return (
        <section id="contact" className="flex-center section-padding">
            <div className="w-full h-full md:px-10 px-5">
                <TitleHeader
                    title="Contact"
                    sub="Let's Build Something Together"
                />

                <div className="max-w-5xl mx-auto mt-12 ">
                    <div className="card-border rounded-xl p-8 grid grid-cols-1  gap-6 items-stretch xl:grid-cols-[2fr_3fr]">
                        <div>
                            <form
                                onSubmit={handleSubmit}
                                noValidate
                                className=" flex flex-col gap-6"
                            >
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Your name"
                                        autoComplete="name"
                                    />
                                    {errors.name && (
                                        <p className="text-red-400 text-sm mt-2">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                    />
                                    {errors.email && (
                                        <p className="text-red-400 text-sm mt-2">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="Tell me about your project..."
                                    />
                                    {errors.message && (
                                        <p className="text-red-400 text-sm mt-2">
                                            {errors.message}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === "sending"}
                                    className="cta-wrapper w-full disabled:opacity-60"
                                >
                                    <div className="cta-button group w-full">
                                        <div className="bg-circle" />
                                        <p className="text">
                                            {status === "sending"
                                                ? "Sending..."
                                                : "Send Message"}
                                        </p>
                                        <div className="arrow-wrapper">
                                            <FontAwesomeIcon
                                                icon={faPaperPlane}
                                                className="text-black"
                                            />
                                        </div>
                                    </div>
                                </button>

                                {status === "sent" && (
                                    <p className="text-white-50 text-sm text-center">
                                        Thanks for reaching out — I'll get back
                                        to you soon!
                                    </p>
                                )}
                                {status === "error" && (
                                    <p className="text-red-400 text-sm text-center">
                                        Something went wrong sending your
                                        message. Please try again, or email me
                                        directly at {CONTACT_EMAIL}.
                                    </p>
                                )}
                            </form>
                        </div>
                        <div className="hidden xl:block rounded-xl overflow-hidden">
                            <img
                                src="/images/office.jpg"
                                alt="Get in touch"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

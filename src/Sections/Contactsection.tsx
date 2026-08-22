import { useState } from "react";
import type { FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import TitleHeader from "../Components/TitleHeader";
import { CONTACT_EMAIL } from "../utils/constants";

interface FormState {
    name: string;
    email: string;
    message: string;
}

const initialState: FormState = { name: "", email: "", message: "" };

export default function ContactSection() {
    const [form, setForm] = useState<FormState>(initialState);
    const [errors, setErrors] = useState<Partial<FormState>>({});
    const [status, setStatus] = useState<"idle" | "sent">("idle");

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

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validate()) return;

        const subject = encodeURIComponent(
            `Portfolio message from ${form.name}`,
        );
        const body = encodeURIComponent(
            `${form.message}\n\n— ${form.name} (${form.email})`,
        );

        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

        setStatus("sent");
        setForm(initialState);
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
                                    className="cta-wrapper w-full"
                                >
                                    <div className="cta-button group w-full">
                                        <div className="bg-circle" />
                                        <p className="text">Send Message</p>
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
                                        Your email app should be opening now —
                                        thanks for reaching out!
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

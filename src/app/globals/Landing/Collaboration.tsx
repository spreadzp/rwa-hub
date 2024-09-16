"use client";

import { sendDiscordMessage } from "@/hooks/discord";
import { useSDK } from "@metamask/sdk-react";
import { useState } from "react";
const Collaboration: React.FC = () => {
    const [isSending, setIsSending] = useState(false);
    const [message, setMessage] = useState("");
    const [subject, setSubject] = useState("");
    const { sdk, connected, connecting, account } = useSDK();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            if (message && subject) {
                setIsSending(true);
                e.preventDefault();
                const response = await sendDiscordMessage(`Topic ${subject.toLowerCase()}\n Message: ${message}\n address: ${connected ? account : ""}`);
                setSubject("");
                setMessage("");
                console.log("🚀 ~ handleSubmit ~ response:", response);
            } else {
                alert("Please fill all the fields");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="collaboration ">
            <div className="collaboration-left text-yellow-200">
                <h2>Contact Us</h2>
                <div> <p>
                    We`re here to help! Whether you have a question, a proposal, or just want to say hello, feel free to reach out. Fill out the form below, and we`ll get back to you as soon as possible.
                </p></div>

            </div>
            <div className="collaboration-right text-black">
                <form onSubmit={handleSubmit} className="collaboration-form">
                    <input
                        type="text"
                        placeholder="Subject (Question/Proposal)"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Your Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    ></textarea>
                    <button type="submit" disabled={isSending}>Send</button>
                </form>
            </div>
        </div>
    );
};

export default Collaboration;
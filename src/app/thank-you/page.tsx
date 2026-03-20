import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You | Prime Solution Restoration",
    robots: {
        index: false,
            follow: false,
              },
              };

              export default function ThankYouPage() {
                return (
                    <div className="min-h-screen flex items-center justify-center bg-background text-foreground pt-32 pb-20">
                          <div className="text-center max-w-xl mx-auto px-6">
                                  <div className="mb-8">
                                            <svg
                                                        className="mx-auto h-20 w-20 text-primary"
                                                                    fill="none"
                                                                                stroke="currentColor"
                                                                                            viewBox="0 0 24 24"
                                                                                                      >
                                                                                                                  <path
                                                                                                                                strokeLinecap="round"
                                                                                                                                              strokeLinejoin="round"
                                                                                                                                                            strokeWidth={2}
                                                                                                                                                                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                                                                                                                                      />
                                                                                                                                                                                                </svg>
                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-6">
                                                                                                                                                                                                                          Thank You
                                                                                                                                                                                                                                  </h1>
                                                                                                                                                                                                                                          <p className="text-xl font-bold text-secondary mb-4">
                                                                                                                                                                                                                                                    Your request has been submitted successfully.
                                                                                                                                                                                                                                                            </p>
                                                                                                                                                                                                                                                                    <p className="text-secondary mb-10">
                                                                                                                                                                                                                                                                              A member of our team will contact you shortly.
                                                                                                                                                                                                                                                                                      </p>
                                                                                                                                                                                                                                                                                              <Link
                                                                                                                                                                                                                                                                                                        href="/"
                                                                                                                                                                                                                                                                                                                  className="inline-flex items-center gap-2 bg-foreground text-background px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:opacity-90 transition-opacity"
                                                                                                                                                                                                                                                                                                                          >
                                                                                                                                                                                                                                                                                                                                    Back to Homepage
                                                                                                                                                                                                                                                                                                                                            </Link>
                                                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                                                                                                                                        }

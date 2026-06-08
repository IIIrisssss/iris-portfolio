import { about } from "@/lib/data";

export default function AboutPage() {
  return (
    <>
      <main className="relative z-10 min-h-[100dvh] bg-[var(--color-primary)] px-[var(--padding)] py-[max(calc(var(--padding)*6),env(safe-area-inset-top))]">
        <div className="mx-auto flex w-full max-w-[var(--max-width)] flex-col gap-8 text-center">
          <h1 className="font-display text-[clamp(3rem,10vw,4.125rem)] leading-[0.82] text-[var(--color-on-primary)]">
            {about.title}
          </h1>

          <div className="flex flex-col gap-6">
            {about.bio.map((paragraph) => (
              <p
                key={paragraph}
                className="text-[1rem] font-medium leading-[1.3] text-[var(--color-on-primary)]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

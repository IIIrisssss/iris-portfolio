"use client";

import Image from "next/image";
import { useState } from "react";

import { aboutAssets, getAboutPageData, type AboutExperience } from "@/lib/aboutPage";
import { useLanguage } from "@/components/LanguageProvider";

import "./AboutPage.css";

function ExperienceAccordion({
  experience,
  skillsAriaLabel,
}: {
  experience: AboutExperience[];
  skillsAriaLabel: string;
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="about-experience__list">
      {experience.map((item) => {
        const isOpen = openId === item.id;

        return (
          <article
            key={item.id}
            className={`about-experience__item${isOpen ? " is-open" : ""}`}
          >
            <button
              type="button"
              className="about-experience__trigger"
              aria-expanded={isOpen}
              onClick={() => setOpenId(isOpen ? null : item.id)}
            >
              <span className="about-experience__meta">
                <span className="about-experience__company">{item.company}</span>
                <span className="about-experience__role">{item.role}</span>
                <span className="about-experience__period">{item.period}</span>

                <span className="about-experience__skills" aria-label={skillsAriaLabel}>
                  {item.skills.map((skill) => (
                    <span key={skill} className="about-experience__skill">
                      {skill}
                    </span>
                  ))}
                </span>
              </span>

              <span className="about-experience__toggle" aria-hidden="true">
                <span className="about-experience__toggle-icon" />
              </span>
            </button>

            <div className="about-experience__panel" aria-hidden={!isOpen}>
              <div className="about-experience__panel-inner">
                <div className="about-experience__panel-content">
                  {item.projects.map((project) => (
                    <div key={project.title} className="about-experience__project">
                      <h3 className="about-experience__project-title">
                        {project.title}
                      </h3>
                      <ul className="about-experience__highlights">
                        {project.highlights.map((highlight) => (
                          <li key={highlight} className="about-experience__highlight">
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function AboutPageContent() {
  const { locale } = useLanguage();
  const { copy, profile, education, experience } = getAboutPageData(locale);
  const [photoError, setPhotoError] = useState(false);

  return (
    <div className="about-page">
      <div className="about-page__inner">
        <section className="about-page__section about-hero" aria-label={copy.heroAriaLabel}>
          <div className="about-hero__grid">
            <div className="about-hero__photo-wrap">
              {!photoError ? (
                <Image
                  src={aboutAssets.photo}
                  alt={profile.photoAlt}
                  fill
                  priority
                  sizes="(max-width: 767px) 46vw, 11.5rem"
                  className="about-hero__photo"
                  onError={() => setPhotoError(true)}
                />
              ) : (
                <div className="about-hero__photo-fallback" aria-hidden="true">
                  LY
                </div>
              )}
            </div>

            <div className="about-hero__copy">
              <p className="about-page__eyebrow eyebrow">{copy.heroEyebrow}</p>
              <h1 className="about-hero__name">{profile.name}</h1>
              <p className="about-hero__role">{profile.role}</p>
              <p className="about-hero__summary">{profile.summary}</p>
            </div>
          </div>
        </section>

        <section
          className="about-page__section"
          aria-labelledby="about-experience-title"
        >
          <p className="about-page__eyebrow eyebrow">{copy.experienceEyebrow}</p>
          <h2 id="about-experience-title" className="about-page__section-title">
            {copy.experienceTitle}
          </h2>
          <ExperienceAccordion
            experience={experience}
            skillsAriaLabel={copy.skillsAriaLabel}
          />
        </section>

        <section
          className="about-page__section"
          aria-labelledby="about-education-title"
        >
          <p className="about-page__eyebrow eyebrow">{copy.educationEyebrow}</p>
          <h2 id="about-education-title" className="about-page__section-title">
            {copy.educationTitle}
          </h2>
          <div className="about-education__grid">
            {education.map((item) => (
              <article key={item.school} className="about-education__card">
                <h3 className="about-education__school">{item.school}</h3>
                <p className="about-education__degree">{item.degree}</p>
                <p className="about-education__period">{item.period}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <a
        href={aboutAssets.resumeHref}
        className="about-fab"
        download={aboutAssets.resumeDownloadName}
        aria-label={copy.downloadAriaLabel}
      >
        <span className="about-fab__icon" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none">
            <path
              d="M8 2v8M8 10l3-3M8 10 5 7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 12v1.5A1.5 1.5 0 0 0 4.5 15h7A1.5 1.5 0 0 0 13 13.5V12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
        {copy.downloadLabel}
      </a>
    </div>
  );
}

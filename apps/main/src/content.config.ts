import { defineCollection, z } from "astro:content";

const extraPublicationAuthor = z.object({
  name: z.string(),
  url: z.string().url().optional(),
  isFirstAuthor: z.boolean().optional(),
  isCorrespondingAuthor: z.boolean().optional(),
});

const extraPublication = z.object({
  title: z.string(),
  venue: z.string().optional(),
  publishedOn: z.string().optional(),
  authors: z.array(extraPublicationAuthor).min(1),
  paperUrl: z.string().url().optional(),
  codeUrl: z.string().url().optional(),
  bibtex: z.string().optional(),
});

const memberPeriod = z.object({
  start: z.string(),
  end: z.string().optional(),
});

const memberDestination = z.object({
  status: z.string(),
  organization: z.string().optional(),
  role: z.string().optional(),
  location: z.string().optional(),
  url: z.string().url().optional(),
  updatedOn: z.string(),
  note: z.string().optional(),
});

const memberCommonFields = {
  name: z.string(),
  role: z.string(),
  summary: z.string(),
  periodAtLab: memberPeriod,
  avatarGender: z.enum(["masculine", "feminine", "neutral"]).optional(),
  extraPublications: z.array(extraPublication).optional(),
  publicationView: z.enum(["all", "selected"]).optional(),
  publicationLimit: z.number().int().positive().optional(),
  order: z.number().optional(),
  avatar: z.string().optional(),
  email: z.string().optional(),
  website: z.string().url().optional(),
  updatedOn: z.string().optional(),
};

const directions = defineCollection({
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number().optional(),
    updatedOn: z.string().optional(),
  }),
});

const teamMembers = defineCollection({
  schema: z.discriminatedUnion("memberType", [
    z.object({
      memberType: z.literal("employee"),
      ...memberCommonFields,
      employeeStatus: z.enum(["current", "past"]),
      currentDestination: memberDestination.optional(),
    }),
    z.object({
      memberType: z.literal("student"),
      ...memberCommonFields,
      studentStatus: z.enum(["current", "graduated"]),
      studentLevel: z.enum(["undergraduate", "master", "phd"]),
      graduationYear: z.number().optional(),
    }),
    z.object({
      memberType: z.literal("intern"),
      ...memberCommonFields,
      internStatus: z.enum(["current", "completed"]),
      sourceInstitution: z.string(),
      // Degree status DURING the internship period (not the current/latest status).
      internshipDegreeStatus: z.enum([
        "undergraduate_studying",
        "undergraduate_graduated",
        "master_studying",
        "master_graduated",
        "phd_studying",
        "phd_graduated",
        "other",
      ]),
      currentDestination: memberDestination.optional(),
    }),
  ]),
});

export const collections = {
  directions,
  "team-members": teamMembers,
};

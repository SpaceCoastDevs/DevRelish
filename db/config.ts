import { column, defineDb, defineTable } from "astro:db";

// ── App Tables ────────────────────────────────────────────────────────────────

const Groups = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text({ unique: true }),
    slug: column.text({ unique: true }),
    customSlug: column.text({ optional: true, unique: true }), // organizer-chosen short URL e.g. "sf-user-group"
    // Location is optional — groups may be distributed/event-based
    city: column.text({ optional: true }),
    region: column.text({ optional: true }), // state/province
    country: column.text({ optional: true }),
    // Identity & discovery
    tagline: column.text({ optional: true }), // short one-liner for cards
    tags: column.text({ optional: true }), // comma-separated
    category: column.text({ optional: true }), // slug from src/lib/categories.ts
    website: column.text({ optional: true }),
    blueskyHandle: column.text({ optional: true }),
    linkedinUrl: column.text({ optional: true }),
    // Core
    description: column.text(),
    contactEmail: column.text(),
    status: column.text({ default: "pending" }), // pending | approved | rejected | closed
    managerId: column.text({ optional: true }), // soft ref to User.id
    createdAt: column.date({ default: new Date() }),
  },
});

const Meetups = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    groupId: column.text(), // soft ref to Groups.id
    title: column.text(),
    description: column.text(),
    date: column.date(),
    time: column.text(), // "HH:MM" 24-hour
    venue: column.text(), // venue name or address
    address: column.text({ optional: true }),
    // Location context for event-based gatherings
    city: column.text({ optional: true }),
    country: column.text({ optional: true }),
    eventContext: column.text({ optional: true }), // e.g. "KubeCon EU 2026"
    tags: column.text({ optional: true }), // comma-separated
    capacity: column.number(),
    status: column.text({ default: "active" }), // active | canceled
    createdAt: column.date({ default: new Date() }),
  },
});

const RSVPs = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    meetupId: column.text(), // soft ref to Meetups.id
    name: column.text(),
    email: column.text(),
    jobTitle: column.text(),
    company: column.text(),
    cancelToken: column.text({ optional: true, unique: true }), // for self-serve RSVP cancellation
    createdAt: column.date({ default: new Date() }),
  },
});

const GroupInvites = defineTable({
  columns: {
    id: column.text({ primaryKey: true }), // the invite token used in the URL
    groupId: column.text(), // soft ref to Groups.id
    createdAt: column.date(),
    expiresAt: column.date(),
  },
});

const ContactMessages = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    groupId: column.text(), // soft ref to Groups.id
    name: column.text(),
    email: column.text(),
    message: column.text(),
    read: column.boolean({ default: false }),
    createdAt: column.date({ default: new Date() }),
  },
});

const GatheringSpeakers = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    gatheringId: column.text(), // soft ref to Meetups.id
    speakerName: column.text(),
    speakerJobTitle: column.text({ optional: true }),
    speakerCompany: column.text({ optional: true }),
    speakerImageUrl: column.text({ optional: true }), // Cloudinary URL
    speakerBio: column.text({ optional: true }),
    sortOrder: column.number({ default: 0 }),
    createdAt: column.date({ default: new Date() }),
  },
});

const GatheringSessions = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    gatheringId: column.text(), // soft ref to Meetups.id
    title: column.text(),
    abstract: column.text({ optional: true }),
    startTime: column.text({ optional: true }), // "HH:MM" 24-hour
    sortOrder: column.number({ default: 0 }),
    createdAt: column.date({ default: new Date() }),
  },
});

const GatheringSessionSpeakers = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    sessionId: column.text(), // soft ref to GatheringSessions.id
    speakerId: column.text(), // soft ref to GatheringSpeakers.id
    sortOrder: column.number({ default: 0 }),
  },
});

const Followers = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    groupId: column.text(), // soft ref to Groups.id
    email: column.text(),
    name: column.text({ optional: true }),
    confirmed: column.boolean({ default: false }),
    token: column.text({ unique: true }), // for confirm + unsubscribe links
    createdAt: column.date({ default: new Date() }),
  },
});

// ── Host Auth User Profile Table ──────────────────────────────────────────────

const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
    email: column.text({ unique: true }),
    emailVerified: column.boolean({ default: false }),
    image: column.text({ optional: true }),
    createdAt: column.date(),
    updatedAt: column.date(),
    // Optional authorization metadata supplied/synced by host auth.
    role: column.text({ optional: true }),
    banned: column.boolean({ optional: true }),
    banReason: column.text({ optional: true }),
    banExpires: column.date({ optional: true }),
    // Link a manager to their group.
    groupId: column.text({ optional: true }),
  },
});

export default defineDb({
  tables: { Groups, Meetups, RSVPs, GatheringSpeakers, GatheringSessions, GatheringSessionSpeakers, GroupInvites, ContactMessages, Followers, User },
});

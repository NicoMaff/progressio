# Progressio

Progressio helps a teacher plan and follow the progression of teaching work across a school year.

## Language

**Activity**:
A reusable piece of teaching work that can be placed inside a session. An activity is pedagogical content, not a dated calendar item.
_Avoid_: Lesson, event

**Chapter Activity Order**:
The user-defined relative pedagogical position of a reusable activity among the activities of the same chapter. It expresses that some activities should normally happen before others when preparing sessions, but it does not constrain activity order inside a specific template, planned, or actual session.
_Avoid_: Session activity order, alphabetical order

**Theme**:
A broad teaching content grouping for a level, used to organize chapters in dense progression views.
_Avoid_: Period, category

**Level Theme Order**:
The user-defined relative pedagogical position of a theme among the themes of the same level. It guides teaching-content organization without constraining the order of sessions in a template, planned, or actual progression.
_Avoid_: Session order, alphabetical order

**Chapter**:
A teaching content unit inside a level, optionally grouped under a theme, and used as the main pedagogical anchor for sessions and activities.
_Avoid_: Session, lesson

**Theme Chapter Order**:
The user-defined relative pedagogical position of a chapter among the chapters of the same theme. It guides teaching-content organization without constraining the order of sessions in a template, planned, or actual progression.
_Avoid_: Session order, alphabetical order

**Local Actual Activity**:
An activity recorded only inside an actual session, without becoming reusable teaching content. It supports improvised or incidental work that happened in class but does not need to be added to the activity catalog. It can optionally have an activity type for display and tracking.
_Avoid_: Reusable activity, orphan activity

**Local Planned Activity**:
An activity planned only inside a planned session, without becoming reusable teaching content. It supports punctual planned work that should not be added to the activity catalog. It can optionally have an activity type for display and tracking.
_Avoid_: Reusable activity, orphan activity

**Local Template Activity**:
An activity defined only inside a template session, without becoming reusable teaching content. It supports reusable progression structure without forcing every small template item into the activity catalog. It can optionally have an activity type for display and tracking.
_Avoid_: Reusable activity, orphan activity

**Local Activity Promotion**:
The edit action that turns a local template, planned, or actual activity into reusable teaching content. Promotion replaces the local fields with a reference to the reusable activity and does not store a dedicated promotion history in the initial model.
_Avoid_: Activity import, promotion log

**Session Activity Source**:
The source of an activity row inside a template, planned, or actual session. A row either references reusable teaching content or stores local activity fields, including an optional local activity type, but it should not do both in the initial model. SQL migrations should enforce this with a CHECK constraint portable to SQLite and PostgreSQL.
_Avoid_: Local override

**Local Activity Chapter Scope**:
Local activities do not carry their own chapter in the initial model. The session main chapter remains the pedagogical anchor for local work.
_Avoid_: Local chapter override

**Activity Type**:
A configurable category that describes the pedagogical nature of an activity, such as course, exercise, practical work, assessment, correction, homework, or remediation.
_Avoid_: Session type

**Estimated Activity Duration**:
The expected time needed to run an activity.
_Avoid_: Session duration

**Contextual Activity Duration**:
The planned or actual duration of an activity inside a specific template, planned, or actual session. It can differ from the reusable activity's estimated duration.
_Avoid_: Estimated activity duration

**Planned Session Duration**:
The intended duration of a planned session.
_Avoid_: Activity duration, actual session duration

**Actual Session Duration**:
The duration of a session that actually happened.
_Avoid_: Planned session duration

**Planned Session**:
A teaching slot placed at a specific point in the progression for a class. A planned session can contain several ordered activities and may identify a main chapter.
_Avoid_: Activity, calendar event

**Session Title**:
An optional label for a template, planned, or actual session. It is useful when a session is not centered on a chapter or needs a clearer display name.
_Avoid_: Chapter name

**Main Chapter**:
The optional chapter used as the primary pedagogical and visual anchor of a session. A session can have no main chapter when it is not centered on a chapter or is still to be defined.
_Avoid_: Dominant theme

**Level**:
A pedagogical grouping that shares a common teaching frame and teaching content, such as `Première générale` or `Terminale STI2D`.
_Avoid_: Class

**Class**:
A concrete group of students for a school year, attached to a level. A class has its own planned and actual progression.
_Avoid_: Level, group

**Class Progress Summary**:
A computed overview of a class's planned and actual progression during the school year.
_Avoid_: Level progress, stored progress

**Class Pacing**:
A computed overview of the confirmed outcomes of a class's planned sessions due as of a given date. Future planned work is excluded, and the overview preserves outcome categories instead of forcing them into a single percentage.
_Avoid_: Annual completion, total-year progress

**Progression Follow-Up**:
A separate count of past planned sessions that lack a confirmed outcome or require an outcome review. It indicates incomplete tracking, not pedagogical delay.
_Avoid_: Progress delay, completion rate

**Level Progress Summary**:
A visual grouping of the progress summaries of the classes attached to a level. It may include computed aggregate indicators and provides access to each class's progression detail, but it is not an independent progression.
_Avoid_: Level progression, shared class progression

**School Year**:
The dated yearly scope of a Progressio work file. A work file contains exactly one school year, and that school year contains the subject, classes, teaching content, planned progression, and actual progression for that year.
_Avoid_: Academic year, archive

**Work File**:
The local SQLite file that contains the data for one school year and one subject. It is the canonical file the teacher opens and works on directly; creating a work file requires at least its school year and subject. XML or CSV files are import/export formats, not the daily source of truth.
_Avoid_: Server database, account workspace

**Open Work File**:
The action of making a selected work file the active file Progressio works on directly. If direct opening proves impractical in the local web application, importing a copy can be reconsidered as a fallback behavior.
_Avoid_: Upload, import copy

**No Work File Open**:
The application state where Progressio is running but no work file is active. In this state, the teacher can access file-level actions such as opening or creating a work file, but not school-year planning data.
_Avoid_: Empty school year, logged out

**Work File Backup**:
A dated copy of a work file created to protect the teacher's data before risky operations or when the teacher explicitly requests a manual backup. Backups are separate files, not an internal version history.
_Avoid_: Continuous history, sync version

**Subject**:
The school discipline covered by a Progressio work file for a school year, such as mathematics or physics.
_Avoid_: Department, course

**Planned Progression**:
The intended sequence of planned sessions for a class over a school year.
_Avoid_: Timeline, calendar

**Template Progression**:
The reusable progression frame for a level before it is adapted to a specific class. A template progression is made of ordered template sessions.
_Avoid_: Planned progression, actual progression

**Template Session**:
A reusable session frame inside a template progression. A template session can contain ordered activities and can identify a main chapter.
_Avoid_: Planned session, activity

**Template Origin**:
The optional link from a planned session back to the template session it was created from. Generated planned sessions copy useful template fields, then remain independently editable; later template changes do not silently update generated planned sessions.
_Avoid_: Template dependency

**Recurring Slot Origin**:
The optional link from a planned session back to the recurring slot it was generated from. It records the scheduling origin but does not constrain the planned session after generation.
_Avoid_: Slot constraint

**Archived Teaching Content**:
Teaching content that is hidden from normal planning without being removed from existing progressions. Archiving preserves its pedagogical order so restoration can return it to its prior position; archived teaching content remains archived while it is still used, and permanent deletion is only available for archived content with no remaining references.
_Avoid_: Deleted content

**Reference Indicator**:
A direct visual cue showing that teaching content is still used somewhere in a template progression, planned progression, or actual progression. It should indicate where the archived content is used so the teacher can understand why deletion is blocked.
_Avoid_: Detail view, usage report

**Short Code**:
A stable, compact label used to identify levels, classes, themes, and chapters in dense progression views.
_Avoid_: Title, name

**Actual Progression**:
The sequence of teaching work that actually happened for a class over a school year.
_Avoid_: Planned progression, timeline

**Actual Session**:
Teaching work that actually happened for a class. An actual session may correspond to a planned session, partially correspond to one, or exist without having been planned. Unplanned actual sessions support improvised catch-up work, discussions, and classroom adjustments.
_Avoid_: Planned session, activity

**Non-Course Actual Session**:
An actual session dedicated to work that is not attached to a chapter or activity, such as a class discussion, administrative exchange, or other pedagogical handling.
_Avoid_: Empty session, missing content

**Planned To Actual Session Link**:
The link used to compare planned work with actual work. A planned session can be linked to zero, one, or several actual sessions, allowing partial realization, catch-up work, and shifted work to be tracked without rewriting the original plan. Actual activity rows that follow or replace planned activity rows must point to planned activity rows from the same planned session.
_Avoid_: One-to-one session match

**Planned Origin Prefill**:
The prefill behavior used when creating an actual session from a planned session. Useful planned fields, including the planned note, are copied into the actual session, and all planned activity rows are immediately copied into actual activity rows. The actual session then remains independently editable. The copied planned note is an editable writing base for what actually happened.
_Avoid_: Dynamic planned dependency

**Completed Actual Session**:
An actual session explicitly marked as complete after the teacher has handled what really happened. The completion timestamp records when the actual session moved from draft to completed. Only completed actual sessions count toward tracking indicators, chapter completion, and planned-vs-actual comparison. A completed actual session may have no chapter, activity, or note when the teacher intentionally records that nothing pedagogical needs to be detailed.
_Avoid_: Fully planned session

**Draft Actual Session Reminder**:
A UI reminder shown when an actual session date is in the past but the actual session is still in draft.
_Avoid_: Session treatment, hidden status

**Past Planned Session Prompt**:
A UI prompt shown when a planned session date is in the past and no actual session has been linked yet. Progressio should not automatically create actual session rows for past planned sessions.
_Avoid_: Automatic actual session

**Session Deletion**:
Physical deletion of sessions is controlled. A planned session can be physically deleted only when no actual session and no planning conflict history references it. Deleting an actual session requires user confirmation and triggers outcome review on the linked planned session when one exists.
_Avoid_: Silent deletion

**Session Outcome**:
The user-confirmed tracking result of a planned session when compared with actual progression. Common outcomes include realized, shifted, partial, cancelled, and to catch up. Progressio may suggest an outcome from linked actual sessions, but the final outcome remains a user decision. Suggested outcomes are derived at read time and not stored. A cancelled planned session does not create an actual session when no teaching work happened.
_Avoid_: Status

**Outcome Review Indicator**:
A UI reminder showing that the actual sessions linked to a planned session suggest the user should confirm or update the session outcome. It is triggered when a linked actual session is created, updated, deleted, marked complete, or when its actual activity rows change.
_Avoid_: Automatic outcome, hidden status

**Actual Session Activity**:
An activity row recorded inside an actual session. Its presence is enough to say the activity was part of what actually happened; the initial model does not store a separate result per activity row. If a copied planned activity did not happen, its actual activity row is removed. An actual session activity can either follow a planned activity, replace a planned activity, or be added without planned origin, but it cannot do more than one of these at the same time.
_Avoid_: Activity status, activity completion, session outcome

**Added Actual Activity**:
An actual session activity that happened without following or replacing a planned activity. It has no planned activity link.
_Avoid_: Replacement activity

**Replacement Activity**:
An actual activity recorded in place of a planned activity. When planned work is replaced, the copied actual row for the planned activity is removed and only the replacement actual row remains, linked to the planned activity it replaced.
_Avoid_: Added activity

**Chapter Completion**:
The completion state of a chapter for a class, derived from the actual sessions attached to that chapter.
_Avoid_: Planned chapter status

**Markdown Note**:
A free-form note written in Markdown and stored directly on the relevant object. The initial model keeps notes simple with one note field per supported object instead of a dedicated notes table.
_Avoid_: Resource, attachment

**Progression View**:
A class-level view that compares planned progression and actual progression across one continuous school-year roadmap organized primarily by calendar week. It opens focused on the current calendar week when that week intersects the school year, while school weeks remain secondary pedagogical references and user-defined periods remain structural markers.
_Avoid_: Calendar, timeline

**Progression Chronology**:
A planned-session-centered reading of a class's progression. Actual sessions linked to a planned session appear with it, while unplanned actual sessions appear as separate entries.
_Avoid_: Separate planned and actual timelines

**Session Order**:
The position of a planned or actual session within a class progression. Session order can include manual ordering choices. When a session is added, moved, rescheduled, completed, or deleted, the UI should offer to recalculate following session orders instead of silently changing them. Recalculation only affects following sessions for the same class and the same progression kind; planned and actual progressions are not recalculated together. Recalculation proposals are transient UI decisions, and only the resulting order values are persisted.
_Avoid_: Sequence, rank

**School Week**:
A computed numbered week used as a pedagogical reference inside the school year, calculated from the first teaching day and a session date.
_Avoid_: Calendar week

**Period**:
A global dated subdivision of the school year, declared and edited by the user according to establishment decisions. Period names and dates are user-defined, such as trimester, semester, or any custom period label. Periods are not linked to classes, themes, chapters, activities, or sessions.
_Avoid_: Quarter, term

**Period Indicator**:
The period indication shown in the UI, derived from dates and user-declared school-year periods when needed. It is not stored as a constraint on content or sessions.
_Avoid_: Session period, calculated period

**Calendar Week**:
The computed civil calendar week for a dated session.
_Avoid_: School week

**Recurring Slot**:
A regular teaching time attached to a class, such as every Monday from 10:00 to 11:00. If a recurring slot has already generated planned sessions, later schedule changes close the old slot and create a new one instead of overwriting the original schedule.
_Avoid_: Session, event

**Slot Duration**:
The default duration of a recurring slot, used to calculate the expected end time of sessions created from that slot.
_Avoid_: Activity duration, actual session duration

**Computed End Time**:
The end time derived from a start time and duration. End time is not stored in the initial model and should be exposed as a computed model property.
_Avoid_: Stored end time

**Teaching Hour Duration**:
The number of minutes represented by one teaching hour in a Progressio work file.
_Avoid_: Clock hour, slot duration

**Global Interruption**:
A manually entered calendar interruption interval that applies to every class in the school year, such as school holidays or a public holiday. If only some classes are affected, the interruption is class-scoped instead of global.
_Avoid_: Class interruption, absence

**Class Interruption**:
A manually entered calendar interruption interval that applies to one class only, such as a trip, cancelled lesson, or class-specific event.
_Avoid_: Global interruption, absence

**Interruption Type**:
A configurable category that explains why an interruption exists, such as holiday, teacher absence, trip, exam, meeting, or other.
_Avoid_: Session outcome

**Configurable Type Deletion**:
Configurable types, such as activity types, slot types, and interruption types, cannot be permanently deleted while they are used. The UI may offer replacement with another type before deletion.
_Avoid_: Silent type removal

**Planning Conflict**:
A situation where an existing planned session overlaps an interruption and needs an explicit resolution. Resolved conflicts remain stored with their resolution date and optional note as planning history.
_Avoid_: Automatic rescheduling

**Cascade Rescheduling**:
A proposed rescheduling operation that moves one planned session to the next suitable slot and shifts the following planned sessions accordingly. The proposal remains editable before confirmation.
_Avoid_: Isolated move, automatic rescheduling

**Slot Type**:
A descriptive category for a recurring slot, such as standard, practical work, long assessment, or half-group. Slot type guides planning and display but does not block scheduling.
_Avoid_: Slot constraint, interruption

**Theme Color**:
The main visual color used to identify a theme in progression views.
_Avoid_: Activity color

**Unassigned Activity**:
A reusable activity that is not attached to a chapter. This is an allowed teaching-content state, not an error.
_Avoid_: Orphan activity, uncategorized lesson

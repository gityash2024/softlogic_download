# SoftLogic Live Session Flow

## Purpose

This document defines the production live-session flow for SoftLogic Whiteboard: how a teacher starts a session, how students join, how realtime board/audio/video works, how content and recordings are stored, and how all data remains organization-wise.

The flow now includes the final production roles:

- Super Admin.
- Partner Admin.
- Organization Admin.
- Teacher.
- Student.
- Parent.

Current implementation note:

- Backend has `LiveSession`, `LiveSessionParticipant`, `LiveSessionInvite`, `LiveSessionMessage`, `LiveSessionMediaAsset`, `LiveSessionRecording`, and `LiveSessionEvent`.
- Backend exposes live-session APIs under `/api/v1/live-sessions`.
- Backend socket events support live session join/leave, chat, board activity, call token, screen share, hand raise, controls, quizzes, and recording started/stopped.
- Flutter has teacher dashboard live-session controls, student dashboard, join-code screen, live-session provider, socket service, LiveKit call service, whiteboard live-session overlay, and Parent dashboard surface.
- Production parent access requires first-class parent role or parent-student linkage support in backend.
- Object storage support exists through S3-compatible environment variables, but production recording/material storage must be fully configured before launch.
- Final production policy requires organization-owned class files, materials, recordings, exports, and whiteboard content to save in the organization's connected Google Drive. SoftLogic cloud storage is limited to app-specific/system files and platform operations.

## Actors

### Super Admin

Super Admin can:

- Support all organizations.
- Audit sessions across all organizations.
- Fix organization/subscription/user issues.
- Configure production storage, RTC, payment, license, and branding settings.
- Configure organization-wise student login activation and session-only QR policy.
- Access all partner and customer scopes for support and compliance.

### Partner Admin

Partner Admin can:

- Support live-session access issues for assigned customer organizations only.
- View assigned customer organizations and license usage.
- Help Organization Admins manage teachers, students, and parents.
- View assigned organization materials/recordings only if partner policy allows admin visibility.
- Never access unrelated partner/customer session data.

### Organization Admin

Organization Admin can:

- Create Teachers, Students, and Parents inside own organization.
- View organization users/subscription.
- Support session access issues.
- See organization-level sessions, materials, and recordings according to admin permissions.
- Request more teacher, student, or parent licenses.
- Connect and maintain the organization's Google Drive account before storing organization content.

### Teacher

Teacher can:

- Create session.
- Start/end session.
- Generate join code.
- Invite students by email.
- Connect audio/video.
- Share screen.
- Use board.
- Chat.
- Manage controls.
- Launch quiz.
- Resolve raised hands.
- Upload media.
- Upload recording.

Teacher consumes an active teacher license.

### Student

Student can:

- Join by session code, QR code, or invite code.
- Login with persistent student account only when student login activation is enabled for the organization.
- Join with session-only QR/join-code identity when student logins are disabled and school policy allows temporary class participation.
- View board.
- Join audio/video if allowed.
- Chat if allowed.
- Raise hand.
- Answer quiz.
- View shared materials/recordings after class.

Student consumes an active student license.

### Parent

Parent can:

- Login after being invited/provisioned.
- View linked student schedule and classroom summaries.
- View attendance/progress summaries if available.
- View teacher messages.
- View shared recordings/materials only if organization policy enables parent access.

Parent does not run live teaching controls by default.

Parent cannot:

- Start live session.
- Host audio/video class.
- Edit live whiteboard.
- Submit quiz answers for student.
- Chat as student unless a future parent-observer chat mode is implemented.
- Access unlinked student data.
- Access another organization's sessions/materials/recordings.

Parent consumes an active parent license.

## Data Ownership

Every live session must be organization-scoped.

Current data chain:

1. `Canvas` belongs to user and optionally organization.
2. `LiveSession` references `canvasId`.
3. `LiveSession.organizationId` is copied from the canvas organization.
4. `LiveSessionParticipant` references the session and user.
5. `LiveSessionInvite` references the session, invited email, invited user, and sender.
6. `LiveSessionMessage`, `LiveSessionMediaAsset`, `LiveSessionRecording`, and `LiveSessionEvent` reference the session.
7. Classroom summary returns only accessible sessions/materials.

Production rule:

- A user from Organization A must never access a session, recording, or material from Organization B.
- Partner Admin access is limited to assigned customer organizations.
- Parent access is limited to linked student records inside the same organization.
- Storage keys should include organization/session identifiers for operational traceability.
- Public URLs should not expose private organization data without signed URL or protected endpoint.
- Organization-owned whiteboards, live-session files, recordings, exports, and teaching materials must be stored in the organization's connected Google Drive.
- SoftLogic cloud storage must not be the primary storage location for organization files.
- SoftLogic cloud storage may be used only for app-specific/system files, metadata, temporary processing, authentication/session data, logs, thumbnails/cache where needed, and platform operation files.
- If Google Drive is not connected or credentials are invalid, organization file save, recording upload, and material upload should be blocked or placed into a setup-required state.

## License Checks For Live Sessions

Before creating or starting a live session:

- Teacher must be active.
- Teacher must belong to active organization.
- Organization subscription must be active.
- Teacher license pool must allow this active Teacher.
- Plan must include live-session feature.
- Storage/recording limits must be checked if recording is enabled.

Student join checks:

- Student must be active.
- Student must belong to same organization or have valid invite policy.
- Student license pool must allow this active Student.
- Join code/invite must be valid.
- Session must be active or joinable.
- If student logins are enabled for the organization, student must authenticate before joining.
- If student logins are disabled, session-only QR/join-code access may create a temporary participant identity without persistent Student Dashboard access.
- Session-only participants must still pass organization, license, session, policy, and expiry checks.

Parent post-session checks:

- Parent must be active.
- Parent must belong to same organization.
- Parent license pool must allow this active Parent.
- Parent must be linked to the student whose data/material is being viewed.
- Organization policy must allow parent access to that material/recording.

## End-To-End Session Flow

### 1. Teacher prepares class

Teacher can start from:

- Teacher Dashboard -> Create Session.
- Whiteboard -> Start Live.
- Existing canvas -> Start Session.

Backend preconditions:

- Teacher is logged in.
- Teacher role is `TEACHER` or admin-like host role.
- Teacher belongs to active organization.
- Organization has active subscription.
- Teacher license is valid.
- Canvas belongs to teacher or accessible organization.

### 2. Teacher creates live session

Teacher enters:

- Session title.
- Optional scheduled time.
- Student permissions.
- Chat setting.
- Audio/video setting.
- Recording setting.
- Materials policy.

Backend creates:

- `LiveSession`.
- Initial `LiveSessionEvent`.
- Host participant if required.
- Organization id copied from canvas/teacher organization.

### 3. Teacher starts session

Teacher clicks Start.

Backend:

- Validates active subscription.
- Validates teacher license.
- Changes session status to active.
- Emits session started event.
- Generates/returns live state.

Flutter:

- Opens whiteboard with `liveSessionId`.
- Connects socket.
- Initializes live-session provider.
- Shows live-session overlay.

### 4. Teacher generates join code

Teacher clicks Generate/Refresh Code.

Backend:

- Creates join code.
- Creates QR code or QR payload linked to the same session policy.
- Stores expiry.
- Links code to `LiveSession`.
- Invalidates old code if refreshing.
- Signs QR payload with short-lived session reference, organization id, expiry, and nonce.
- Does not put user credentials, access token, refresh token, or long-lived secret in the QR code.

Teacher sees:

- Code.
- QR code.
- Expiry.
- Copy/share controls.

QR code behavior:

- Teacher can display QR code on the whiteboard screen or share it through approved class communication.
- Student scans QR code with the SoftLogic app or supported scanner flow.
- App sends the signed QR payload to the backend verify endpoint.
- Backend validates signature, expiry, session status, organization, invite policy, student-login policy, license policy, and replay/nonce rules.
- Backend returns a session preview or a clear failure reason.
- Login-enabled organizations require student authentication before final join.
- Login-disabled organizations may use session-only QR access with temporary participant identity and no persistent Student Dashboard.

### 5. Teacher invites students by email

Teacher enters student email.

Backend:

- Validates teacher can access session.
- Validates session organization.
- Finds existing student or creates invited student according to policy.
- Checks student license availability for new/reactivated student.
- Creates `LiveSessionInvite`.
- Sends live-session invite email.

Student invite email includes:

- Student name/email if known.
- Teacher name.
- Organization name.
- Session title.
- Join code.
- App/download link.
- Login instruction: use email OTP or invited Google account.
- Support contact.

### 6. Student logs in or uses session-only QR access

Student login behavior depends on organization policy.

For organizations with student logins enabled, student must login before joining:

1. Student opens app.
2. Student enters invited email.
3. Backend checks user exists, is active, and has valid organization.
4. Backend sends OTP.
5. Student enters OTP.
6. App routes to Student Dashboard or Join Session screen.

For organizations with student logins disabled:

1. Student scans QR code or enters join code shared by teacher.
2. Backend validates signed QR/code, session status, organization, license, invite/join policy, and expiry.
3. Backend creates a temporary session participant identity.
4. App opens the live-session view for that class only.
5. Student has no persistent dashboard, saved login session, or post-class account access from this flow.

### 7. Student verifies code

1. Student opens Join Session.
2. Student enters code or scans QR code.
3. App calls verify join-code API.
4. Backend verifies code/QR payload, session status, organization, invite/email policy, student-login policy, expiry, and license.
5. App shows session preview.

Failure behavior:

- Expired code returns clear invalid/expired message.
- Wrong-email invite is blocked for student role.
- Wrong organization is blocked.
- Expired license blocks new session join if policy requires.
- Login-disabled organization routes student to session-only participant flow instead of persistent login.

### 8. Student joins session

1. Student clicks Join.
2. Backend creates/updates `LiveSessionParticipant`.
3. App connects socket.
4. App opens whiteboard with `liveSessionId`.
5. App requests call token if audio/video is used.
6. Teacher sees student presence update.

### 9. Realtime board sync

Teacher board activity is authoritative unless student edit permission is enabled.

Flow:

1. Teacher draws/writes/imports content.
2. Flutter emits board activity event.
3. Backend/socket broadcasts to participants.
4. Student clients apply event.
5. Backend stores important events if configured.

Rules:

- Student board editing is disabled unless `studentPermissions.boardEdit` is true.
- Parent does not receive live board editing controls by default.
- Reconnect should reload latest session/board state.

### 10. Audio/video through LiveKit

Call token flow:

1. Teacher or Student requests call token.
2. Backend verifies session access.
3. Backend creates LiveKit token with correct room and identity.
4. Flutter connects LiveKit.
5. Audio/video permissions are applied.

Rules:

- Teacher can publish audio/video by default.
- Student publish permissions follow session controls.
- Parent does not receive call token by default unless future observer mode is approved.
- LiveKit production credentials and TURN support must be configured before launch.

### 11. Chat

Chat flow:

1. User sends message.
2. Backend validates session access and chat permission.
3. Message is stored as `LiveSessionMessage`.
4. Socket broadcasts message.
5. Clients display chat.

Rules:

- Teacher/admin can moderate according to controls.
- Student chat follows session permission.
- Parent does not chat in live class by default.

### 12. Hand raise

1. Student raises hand with optional reason.
2. Backend stores hand raise event.
3. Teacher sees raised hand.
4. Teacher allows or dismisses.
5. Resolution event is stored and broadcast.

Parent does not raise hand by default.

### 13. Quiz

Teacher flow:

1. Teacher enters question.
2. Teacher enters answer options.
3. Teacher launches quiz.
4. Backend stores quiz event.
5. Students receive quiz.

Student flow:

1. Student selects/enters answer.
2. Backend validates participant.
3. Backend stores quiz answer event.
4. Teacher sees results.

Parent flow:

- Parent may later view linked student's quiz/progress summary if organization policy enables it.
- Parent does not submit quiz answers.

### 14. Controls

Teacher controls can include:

- Student mic permission.
- Student camera permission.
- Student chat permission.
- Student board edit permission.
- Screen share state.
- Quiz state.
- Recording state.

Backend stores control update events and broadcasts them to participants.

Parent is excluded from live participant controls unless future observer mode is implemented.

### 15. Media upload

Teachers/admins can upload session media.

Production upload rules:

- Validate active subscription.
- Validate storage limit.
- Validate organization Google Drive connection and credential status.
- Store organization-owned object in the organization's connected Google Drive under organization/session path.
- Save metadata in `LiveSessionMediaAsset`.
- Return protected/signed URL.
- Use SoftLogic cloud storage only for app-specific/system files, metadata, temporary processing, logs, cache, or platform operations.

Student upload is disabled in current backend unless future policy enables it.

Parent upload is not allowed.

### 16. Recording

Recording flow:

1. Teacher starts recording.
2. Backend stores recording started event.
3. Egress/recording service captures session if configured.
4. Teacher stops recording.
5. Backend stores recording stopped event.
6. Recording processor uploads organization-owned recording file to the organization's connected Google Drive.
7. `LiveSessionRecording` moves from processing to ready or failed.
8. Ready recording appears in classroom materials for allowed users.

Production requirements:

- LiveKit Egress or equivalent recording processor.
- Organization Google Drive connection for production recording files.
- SoftLogic cloud storage only for app-specific/system files and temporary processing.
- Recording status update callback/job.
- Retention policy by subscription plan.
- Protected playback endpoint or signed URL.

### 17. Teacher ends session

When teacher ends session:

1. Backend validates teacher/host access.
2. Session status changes to ended.
3. Participant `leftAt` is updated where possible.
4. End event is broadcast.
5. Socket disconnect/cleanup runs.
6. Flutter returns teacher to dashboard/board.
7. Classroom summary is refreshed.

### 18. Post-session student access

Student dashboard/classroom summary may show:

- Joined/invited sessions.
- Boards from accessible sessions.
- Media uploaded to sessions.
- Ready recordings.
- Quiz activity.
- Notifications.

Rules:

- Only `READY` recordings should be shown for playback.
- Failed/processing recordings should show proper status to teacher/admin.
- Expired/canceled license may restrict new activity but should follow data retention policy for old materials.

### 19. Post-session parent access

Parent dashboard may show:

- Linked student schedule.
- Linked student attendance/progress summary.
- Teacher messages.
- Organization notifications.
- Shared materials/recordings only if parent access is enabled.

Rules:

- Parent sees only linked student data.
- Parent cannot browse all sessions in the organization.
- Parent cannot open recordings/materials for unlinked students.
- Parent access is blocked when parent user is disabled, unlinked, or outside organization.
- Parent access to historical data follows retention and organization policy.

## API Map

Live-session REST APIs:

- `GET /api/v1/live-sessions`
- `POST /api/v1/live-sessions`
- `GET /api/v1/live-sessions/:id`
- `POST /api/v1/live-sessions/:id/start`
- `POST /api/v1/live-sessions/:id/end`
- `POST /api/v1/live-sessions/:id/invites`
- `POST /api/v1/live-sessions/:id/join-code`
- `GET /api/v1/live-sessions/:id/join-code`
- `POST /api/v1/live-sessions/join-code/verify`
- `POST /api/v1/live-sessions/join-code/join`
- `GET /api/v1/live-sessions/:id/messages`
- `POST /api/v1/live-sessions/:id/messages`
- `GET /api/v1/live-sessions/:id/events`
- `POST /api/v1/live-sessions/:id/hands`
- `POST /api/v1/live-sessions/:id/hands/:eventId/resolve`
- `POST /api/v1/live-sessions/:id/controls`
- `POST /api/v1/live-sessions/:id/quizzes`
- `POST /api/v1/live-sessions/:id/quizzes/:quizEventId/answers`
- `GET /api/v1/live-sessions/:id/media`
- `POST /api/v1/live-sessions/:id/media`
- `GET /api/v1/live-sessions/:id/recordings`
- `POST /api/v1/live-sessions/:id/recordings`
- `POST /api/v1/live-sessions/:id/share-url`
- `POST /api/v1/live-sessions/:id/call-token`

Socket events:

- `live-session:join`
- `live-session:joined`
- `live-session:leave`
- `presence:update`
- `chat:send`
- `chat:message`
- `chat:typing`
- `board:event`
- `board:activity`
- `call:token`
- `screen-share:state`
- `hand:raise`
- `hand:raised`
- `hand:resolve`
- `hand:resolved`
- `controls:update`
- `quiz:launch`
- `quiz:launched`
- `quiz:answer`
- `recording:started`
- `recording:stopped`
- `socket-error`

Parent production additions:

- Parent-student linkage endpoint/model.
- Parent classroom summary endpoint or filtered classroom summary mode.
- Parent material access check.
- Parent notification/message feed.

## Organization-Wise Access Rules

### Super Admin access

Super Admin sees:

- All organizations.
- All partner scopes.
- All customer sessions/materials/recordings for support and audit.

### Partner Admin access

Partner Admin sees:

- Sessions/materials/recordings only for assigned customer organizations if policy allows.
- License and support metadata for assigned customers.

Partner Admin cannot:

- Open unrelated customer sessions.
- Access another partner scope.

### Organization Admin access

Organization Admin sees:

- Sessions inside own organization.
- Teachers, Students, and Parents inside own organization.
- Organization materials/recordings according to permissions.

### Teacher session access

Teacher sees:

- Sessions they created.
- Sessions they host.
- Own and organization-shared teaching materials.

### Student session access

Student sees:

- Sessions where they are a participant.
- Sessions where they have an invite.
- Sessions with invite matching their email.
- Materials/recordings shared with them or their class/session.

### Parent session/material access

Parent sees:

- Linked student schedule and summaries.
- Teacher messages and notifications for linked student.
- Ready recordings/materials only when parent access is enabled.

Parent cannot:

- Join as student.
- Access unlinked student session data.
- Access teacher controls.
- Access another organization's sessions/materials/recordings.

### Recording/material access

Access is inherited from `LiveSession` plus role-specific policy.

Rules:

- If user cannot access live session, user cannot access its recording/media.
- Parent access requires linked student plus parent material policy.
- Public URLs should not expose private organization data without signed URL or proper access policy.
- Production should prefer signed URLs or protected download endpoints.
- Recording/material files should be fetched from the organization's connected Google Drive through protected access flow.
- SoftLogic cloud storage should serve only app-specific/system files, temporary processing output, metadata, logs, cache, or other platform operation files.

## Failure And Recovery Cases

### Join code expired

Behavior:

- Verify/join returns invalid or expired code.
- Student asks teacher for new code.
- Teacher refreshes join code or sends new invite.

### Wrong organization

Behavior:

- Backend blocks access.
- User sees clear "not authorized for this session" message.
- Admin checks organization assignment.

### Parent not linked

Behavior:

- Parent dashboard shows no linked student data or login is restricted by policy.
- Organization Admin links parent to correct student.
- Parent refreshes dashboard.

### Parent opens unauthorized recording

Behavior:

- Backend denies access.
- Parent sees "This material is not available for your account."
- Organization Admin verifies linked student and parent material policy.

### License expired

Behavior:

- Teacher cannot start new session.
- New media/recording uploads are blocked.
- Student/Parent old material access follows retention policy.
- Organization Admin, Partner Admin, and Super Admin see renewal-required state.

### Recording processing fails

Behavior:

- Recording stays failed/processing.
- Teacher/admin sees failed state.
- Retry or support workflow starts.
- Students/Parents see only ready recordings.

## Production Gaps To Complete

Required before full launch:

- First-class Parent role or parent account model.
- Parent-student linkage model.
- Organization-wise student login activation and session-only QR policy.
- Parent-filtered classroom summary and material access checks.
- Role-specific license count enforcement for Teacher, Student, and Parent.
- Partner Admin scoped live-session/material visibility.
- Google Drive connection, credential validation, and organization content storage routing.
- LiveKit production credentials.
- TURN credentials for school networks.
- Recording processor/LiveKit Egress for full session recording.
- Recording status update path from processing to ready/failed.
- Classroom material playback UI for recordings/files.
- Data retention policy by subscription plan.
- Email notifications for recording ready and session summary if required.
- Admin reporting for attendance, quiz results, and recording usage.

## Production Acceptance Checklist

- Teacher can create and start live session inside own organization.
- Live session inherits organization from canvas.
- Teacher can generate and refresh join code.
- Teacher can display QR code with signed short-lived session reference and no embedded credentials.
- Teacher can invite student by email.
- New student receives welcome email and live-session invite email.
- Student can login and join by code.
- Student in login-disabled organization can join through session-only QR/join code without persistent dashboard access.
- Wrong-email invite code is blocked.
- Socket presence works.
- Chat stores and broadcasts messages.
- Board activity stores and broadcasts events.
- Hand raise and resolve work.
- Controls update and persist through events.
- Quiz launch and answers store as events.
- LiveKit audio/video connects with production credentials.
- Screen share works.
- Recording start/stop events are stored.
- Recording file is uploaded to the organization's connected Google Drive.
- Ready recording appears in student materials.
- Parent can view linked student summaries and allowed ready materials only.
- Parent cannot access unlinked student data.
- Partner Admin cannot access unassigned organization sessions/materials.
- End session updates status and participant `leftAt`.
- Organization A cannot access Organization B session/media/recording.
- Expired license blocks new sessions/uploads.

# SoftLogic User Journey Flow

## Purpose

This document defines the production journey for all final SoftLogic roles:

- Super Admin: SoftLogic internal owner/operator, current backend `SUPER_ADMIN`.
- Partner Admin: reseller/partner operator, current backend `PARTNER_ADMIN`.
- Organization Admin: customer school/institute admin, current backend `CUSTOMER_ADMIN`.
- Teacher: teaching user, current backend `TEACHER`.
- Student: learning user, current backend `STUDENT`.
- Parent: guardian/observer user, production role gap if backend must authenticate parents as `PARENT`.

The production policy is admin-provisioned access only. No user should be able to self-signup from the login screen.

## Shared Rules For All Users

### Account creation

Users are created by:

- Super Admin.
- Partner Admin within assigned partner scope.
- Organization Admin within own organization.
- Controlled checkout/onboarding flow.
- Controlled import flow in future.

No public signup is allowed.

Production login rule:

- Email OTP requires an existing active user.
- Google sign-in requires an existing invited/provisioned email.
- Role comes from the database user record, not from Google.
- Parent login is allowed only after a parent account exists and is linked to at least one student according to organization policy.

### Login flow

1. User opens SoftLogic app.
2. User enters email or chooses Google login.
3. Backend validates user exists and is `ACTIVE`.
4. Backend validates organization and subscription state.
5. OTP email is sent or Google identity is verified.
6. Backend returns access token, refresh token, and safe user context.
7. Flutter session bridge maps backend role to app role.
8. Router sends user to the correct dashboard.

### Organization boundary

Every non-Super Admin user must belong to an organization or partner-scoped organization.

Rules:

- Super Admin can see all organizations.
- Partner Admin can see only assigned reseller/partner scope.
- Organization Admin can see only own organization.
- Teacher sees own and organization-shared teaching content.
- Student sees joined/invited sessions and shared materials.
- Parent sees only linked student data inside the same organization.
- Canvases, live sessions, materials, recordings, quizzes, messages, and notifications must remain organization-scoped.

### License boundary

Production subscription has separate license pools:

- Total teacher licenses.
- Total student licenses.
- Total parent licenses.

Rules:

- Active Teachers consume teacher licenses.
- Active Students consume student licenses.
- Active Parents consume parent licenses.
- Partner Admin and Super Admin do not consume customer teacher/student/parent licenses.
- Organization Admin should use an admin allowance or plan policy, not teacher/student/parent pools.
- Disabled users do not consume licenses.

### Email types

Current backend already supports:

- Welcome email after user creation.
- OTP email for login.
- Live-session invite email with join code.

Production should also include:

- Partner Admin welcome email.
- Organization Admin license activation email.
- Parent welcome/linking email.
- Renewal/expiry emails.
- Role-specific license-limit alert emails.
- Recording/material available email if enabled.

## Role 1: Super Admin Journey

### Who this user is

Super Admin is SoftLogic internal owner/operator.

Super Admin can:

- See all organizations.
- Create partner/reseller organizations.
- Create customer organizations.
- Create Partner Admins and Organization Admins.
- Create/update subscriptions and license counts.
- Configure branding mode.
- Upload/remove organization and reseller logos.
- View all users and audit activity.
- Support customers and resellers.
- Suspend/reactivate organizations and users.

### First-time setup

1. Backend seed creates a Super Admin user.
2. Super Admin receives or knows the seeded email.
3. Super Admin signs in with OTP or invited Google account.
4. App routes Super Admin to the main dashboard.
5. Super Admin opens Admin Console.

### Daily journey

1. Super Admin logs in.
2. Opens Admin Console.
3. Reviews active users, organizations, partners, subscriptions, license usage, and activity.
4. Uses Users, Organizations, Subscriptions, and Activity tabs.
5. Performs sales, onboarding, billing, support, and compliance actions.

### Direct customer onboarding journey

1. Receive customer approval/payment.
2. Create customer `Organization`.
3. Upload customer logo if provided.
4. Create `Subscription`.
5. Set total teacher licenses.
6. Set total student licenses.
7. Set total parent licenses.
8. Create first Organization Admin as `CUSTOMER_ADMIN`.
9. Confirm welcome email was sent.
10. Send license activation/onboarding details.

### Reseller onboarding journey

1. Create partner/reseller organization.
2. Select sales/branding mode: SoftLogic brand or reseller brand.
3. Upload reseller logo and support contact if reseller-brand mode is enabled.
4. Create Partner Admin as `PARTNER_ADMIN`.
5. Send Partner Admin welcome email.
6. Create or assign customer organizations under that partner.
7. Create each customer subscription with teacher, student, and parent license counts.
8. Confirm Partner Admin can see only assigned customer organizations.

### Super Admin failure states

- Duplicate organization slug: reuse existing org or create a unique slug.
- Payment not confirmed: do not activate paid license.
- Partner sees wrong customer: fix partner assignment before onboarding users.
- License usage wrong: recalculate from active users before changing license counts.
- Email failure: keep user created, show resend email action, and log the failure.

## Role 2: Partner Admin Journey

### Who this user is

Partner Admin is the reseller/channel partner operator.

Partner Admin can:

- Login after Super Admin creates the partner account.
- View assigned customer organizations only.
- Create customer organizations if partner-led onboarding is enabled.
- Create Organization Admins, Teachers, Students, and Parents inside assigned customer organizations.
- View customer license usage for teacher, student, and parent pools.
- Support assigned customers.
- View partner-scope reports.
- Manage reseller branding only if SoftLogic enabled reseller-brand mode.

Partner Admin cannot:

- See unrelated partners or unrelated customer organizations.
- Create Super Admins.
- Change global settings.
- Change license counts unless SoftLogic explicitly allows partner-managed subscription edits.
- Access student/parent data outside assigned organization boundaries.

### Account creation journey

1. Super Admin creates partner organization.
2. Super Admin creates Partner Admin user.
3. Backend sends welcome email.
4. Partner Admin opens app.
5. Partner Admin logs in with OTP or invited Google account.
6. App routes Partner Admin to admin/dashboard surface.

Partner welcome email must include:

- Partner Admin name.
- Partner/reseller organization name.
- Login email.
- Role: Partner Admin.
- Branding mode.
- App/download URL.
- Assigned support contact.
- Scope rule: manage only assigned customer organizations.

### Customer onboarding journey

Partner Admin can onboard customer only if enabled by SoftLogic policy.

1. Partner Admin opens Organizations.
2. Creates customer organization.
3. Assigns organization logo/branding if allowed.
4. Requests subscription/license approval from SoftLogic or selects approved plan.
5. Creates Organization Admin.
6. Organization Admin receives welcome email.
7. Partner Admin tracks license usage and customer activation.

### Reseller brand journey

If reseller-brand mode is enabled:

1. Partner Admin sees reseller branding controls allowed by SoftLogic.
2. Partner Admin confirms reseller logo, display name, support email, and customer-facing text.
3. Customer organization inherits reseller brand unless organization-specific branding overrides it.
4. Welcome/activation emails use reseller display identity where configured.
5. SoftLogic Super Admin remains audit and support owner.

### Failure states

- Partner tries to open unrelated org: access blocked.
- Partner tries to create user in unassigned org: access blocked.
- Partner license request exceeds approved commercial terms: requires Super Admin approval.
- Reseller branding missing: fall back to SoftLogic brand until Super Admin configures it.

## Role 3: Organization Admin Journey

### Who this user is

Organization Admin is the school/institute admin. In backend this is `CUSTOMER_ADMIN`.

Organization Admin can:

- Login after being created by Super Admin or Partner Admin.
- Manage own organization users.
- Create Teachers, Students, and Parents within license limits.
- See own organization subscription and role-specific license usage.
- Manage organization branding if allowed.
- Support teacher/student/parent access issues.
- Request more teacher, student, or parent licenses.

Organization Admin cannot:

- See other organizations.
- Create Partner Admins or Super Admins.
- Change paid subscription values directly unless policy allows.
- Bypass teacher/student/parent license counts.

### Account creation journey

1. Super Admin or Partner Admin creates organization.
2. Super Admin or Partner Admin creates Organization Admin user.
3. Backend sends welcome email.
4. Email includes organization name, role, login email, app URL, support contact, and license summary.
5. Organization Admin opens app.
6. Organization Admin signs in using OTP or invited Google account.
7. App routes to admin/dashboard surface.
8. Organization Admin verifies organization name, logo, license, and usage.

### Teacher creation journey

1. Organization Admin opens Users.
2. Selects Teacher.
3. Enters name and email.
4. Backend checks organization status.
5. Backend checks active subscription.
6. Backend checks teacher license availability.
7. Teacher user is created as active.
8. Teacher welcome email is sent.
9. Teacher logs in and opens Teacher Dashboard.

### Student creation journey

1. Organization Admin opens Users.
2. Selects Student.
3. Enters name and email.
4. Backend checks student license availability.
5. Student user is created as active.
6. Student welcome email is sent.
7. Student logs in and opens Student Dashboard.

### Parent creation journey

1. Organization Admin opens Users.
2. Selects Parent.
3. Enters parent name and email.
4. Selects linked student or students from same organization.
5. Backend checks parent license availability.
6. Parent user is created as active.
7. Parent-student link is stored.
8. Parent welcome email is sent.
9. Parent logs in and opens Parent Dashboard.

### License management journey

Organization Admin sees:

- Plan.
- Subscription status.
- Start/end date.
- Total teacher licenses and used teacher licenses.
- Total student licenses and used student licenses.
- Total parent licenses and used parent licenses.
- Storage/recording limits.

Organization Admin can request:

- More teacher licenses.
- More student licenses.
- More parent licenses.
- More recording/material storage.
- Upgrade/renewal through SoftLogic or assigned reseller.

### Failure states

- Teacher license full: admin must buy more teacher licenses or disable old teacher accounts.
- Student license full: admin must buy more student licenses or disable old student accounts.
- Parent license full: admin must buy more parent licenses or disable old parent accounts.
- Parent not linked to student: parent can login but sees no student data until linked, or login is blocked according to policy.
- User email already exists: admin must use another email or ask Super Admin for transfer.
- Expired license: user creation/reactivation and new paid activity are blocked.

## Role 4: Teacher Journey

### Who this user is

Teacher runs whiteboard classes and live sessions.

Teacher can:

- Login after being invited/provisioned.
- Create and open boards.
- Use whiteboard tools, imports, media, templates, and exports.
- Start live sessions.
- Generate join codes.
- Invite students by email.
- Use chat, hand raise, quiz, controls, and audio/video if enabled.
- Upload session materials.
- Record/upload class recordings if enabled.
- View session history and materials.

Teacher cannot:

- Manage organization license.
- Create Organization Admins or Partner Admins.
- See another organization's data.
- Create Parent accounts unless future policy allows teacher-assisted parent invites.

### First login journey

1. Organization Admin or Partner Admin creates teacher.
2. Teacher receives welcome email.
3. Teacher opens app/download link.
4. Teacher logs in with OTP or invited Google account.
5. App routes to Teacher Dashboard.

### Live class journey

1. Teacher creates or opens a board.
2. Teacher starts live session.
3. Backend checks active organization and license.
4. Backend creates `LiveSession`.
5. Teacher configures title, permissions, chat, audio/video, and recording.
6. Teacher generates join code.
7. Teacher invites students by email.
8. Students join.
9. Teacher teaches using board, chat, quiz, hand raise, media, and controls.
10. Teacher ends session.
11. Recording/materials become available according to storage and access rules.

### Failure states

- License expired: teacher cannot start new live session.
- Teacher license disabled: teacher cannot login or paid actions are blocked.
- Join code issue: teacher refreshes code or sends new invite.
- Student not in organization: invite flow creates/links student only inside teacher organization.
- Recording upload fails: show processing/failed state and allow retry if policy allows.

## Role 5: Student Journey

### Who this user is

Student attends live sessions, joins by code, views materials, answers quizzes, and uses class chat where enabled.

Student can:

- Login after being invited/provisioned.
- Join live session by code or invite.
- Use audio/video if permission allows.
- View board.
- Chat if enabled.
- Raise hand.
- Answer quiz.
- View shared materials and recordings.

Student cannot:

- Create organization users.
- Manage subscriptions.
- Start teacher sessions.
- Upload teacher-only live-session media.
- See another organization's data.
- See parent-only or other student private data.

### Account creation journey

Student account can be created by:

- Organization Admin.
- Partner Admin within assigned organization.
- Teacher live-session invite flow.
- Controlled school import in future.

Student receives:

- Welcome email if new account.
- OTP email during login.
- Live-session invite email when teacher sends code.

### First login journey

1. Student opens app/download link.
2. Student enters invited email.
3. Backend sends OTP.
4. Student enters OTP.
5. App routes to Student Dashboard.

### Join session by code

1. Student opens Join Session.
2. Student enters code from teacher/email.
3. App calls verify join-code API.
4. Backend verifies active session code or invite code.
5. App shows session preview.
6. Student clicks Join.
7. Backend creates/updates `LiveSessionParticipant`.
8. App connects socket.
9. App opens whiteboard with `liveSessionId`.
10. App requests call token if audio/video is used.

### After class

Student dashboard shows:

- Joined/invited sessions.
- Schedule.
- Materials.
- Boards.
- Files.
- Recordings.
- Quiz activity.

Student can open shared materials if organization/session access allows it.

### Failure states

- Code expired: student asks teacher for new code.
- Code belongs to another student email: backend blocks join for student role.
- User not invited: login fails and student contacts school/admin.
- License expired: student may lose access to new live classes depending support policy.
- Teacher ended session: student sees ended/no active session state.

## Role 6: Parent Journey

### Who this user is

Parent is a guardian/observer user linked to one or more students.

Parent can:

- Login after being invited/provisioned.
- View linked student schedule.
- View attendance/progress summaries when available.
- View teacher messages and organization notifications.
- View shared materials/recordings if enabled by organization policy.
- Contact school/support through allowed communication channels if enabled.

Parent cannot:

- Start or join live sessions as a teaching participant by default.
- Edit whiteboards.
- Submit student quiz answers.
- Manage users or subscriptions.
- View unlinked students.
- View another organization's data.

### Account creation journey

Parent account can be created by:

- Organization Admin.
- Partner Admin within assigned organization.
- Controlled import flow in future.

Required parent fields:

- Parent name.
- Parent email.
- Organization.
- Linked student or students.
- Parent status.
- Notification preference if available.

Parent welcome email must include:

- Parent name.
- Organization/school name.
- Login email.
- Linked student name(s) if policy allows.
- App/download URL.
- Parent dashboard instructions.
- What parent can view.
- Support contact.

### First login journey

1. Parent opens app/download link.
2. Parent enters invited email.
3. Backend validates parent account exists and is active.
4. Backend validates parent belongs to same organization as linked student.
5. Backend sends OTP.
6. Parent enters OTP.
7. App routes to Parent Dashboard.

### Parent dashboard journey

Parent Dashboard shows:

- Home summary.
- Linked student schedule.
- Attendance summary when available.
- Progress/quiz summary when available.
- Teacher messages.
- Organization notifications.
- Shared materials/recordings if enabled.

Parent data rules:

- Parent sees only linked student data.
- Parent cannot access all class participants.
- Parent cannot access other parent accounts.
- Parent cannot access live teacher controls.
- Parent cannot access data after unlinking unless retention policy allows historical messages.

### Parent material access journey

1. Teacher ends session.
2. Recording/material becomes ready.
3. Organization policy decides whether parents can view it.
4. Parent dashboard shows allowed item only for linked student.
5. Parent opens item through protected or signed URL.
6. Access is denied if parent is unlinked, disabled, or outside organization.

### Failure states

- Parent license full: admin must buy more parent licenses or disable unused parent accounts.
- Parent not linked to student: parent sees no student data or login is blocked by policy.
- Linked student disabled/transferred: parent access is restricted until relinked.
- Parent email wrong: admin updates email and resends welcome email.
- Parent tries to access another student: backend blocks access.
- Organization license expired: parent access to old data follows retention policy.

## Frontend Routing Journey

Current Flutter routing:

- Public: splash, login, OTP, legal pages.
- Authenticated home routes by role.
- `SUPER_ADMIN`, `PARTNER_ADMIN`, and `CUSTOMER_ADMIN` can access admin/dashboard surfaces.
- `TEACHER` routes to Teacher Dashboard.
- `STUDENT` routes to Student Dashboard.
- Parent Dashboard route exists in Flutter.
- Join Session opens join-code flow.
- Whiteboard route accepts `canvasId` and optional `liveSessionId`.

Production routing additions:

- Add or confirm first-class parent auth role mapping when backend supports `PARENT`.
- Route Parent users to Parent Dashboard.
- Block parent users from teacher/student-only live participation routes unless a special observer mode is implemented.
- Show expired/restricted license state after login.

## Backend Permission Journey

Current backend rules:

- Admin routes use `authMiddleware` and role guard for admin-like roles.
- Super Admin can manage all organizations.
- Partner Admin can manage assigned customer scope.
- Customer Admin manages own organization.
- Teacher can create live sessions.
- Student can join sessions they are invited to or joined.
- Canvas access is checked by user or accessible organization.
- Live session access is checked by host/admin/participant/invite.

Production additions:

- Add first-class `PARENT` role or parent account model.
- Add parent-student linkage model.
- Add license guard after auth.
- Add teacher/student/parent license guards to user create/reactivate.
- Add organization status guard.
- Add subscription expiry job.
- Add strict invited-only Google rule if not already enforced in deployed backend.
- Add partner/reseller scope checks to every admin list/detail action.

## Acceptance Checklist

- Super Admin can onboard direct customer end to end.
- Super Admin can onboard reseller/partner end to end.
- Partner Admin can manage only assigned customer organizations.
- Organization Admin can login and manage only own organization.
- Organization Admin can create Teachers until teacher licenses are full.
- Organization Admin can create Students until student licenses are full.
- Organization Admin can create Parents until parent licenses are full.
- Teacher can login, create board, start session, generate code, and invite students.
- Student can login, join by code, attend session, and view materials.
- Parent can login and view only linked student schedule, progress, messages, and allowed materials.
- Users cannot self-signup.
- Wrong organization access is blocked.
- Disabled users cannot login.
- Expired license blocks new paid actions.
- Emails exist for welcome, OTP, live invite, parent invite, license activation, renewal, and failure cases.

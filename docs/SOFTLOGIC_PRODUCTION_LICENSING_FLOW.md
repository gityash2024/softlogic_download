# SoftLogic Production Licensing Flow

## Purpose

This document defines the production licensing flow for selling SoftLogic Whiteboard directly to schools and through reseller/partner channels.

The production model is organization-level licensing with separate license counts for teachers, students, and parents. Access remains invite-only/admin-provisioned. There is no public signup.

Current implementation note:

- Backend currently has `Organization`, `OrganizationMembership`, `Subscription`, `AdminAuditLog`, `User`, and role-based admin APIs.
- Backend role enum currently includes `SUPER_ADMIN`, `PARTNER_ADMIN`, `CUSTOMER_ADMIN`, `ADMIN`, `TEACHER`, and `STUDENT`.
- Flutter currently maps `SUPER_ADMIN`, `PARTNER_ADMIN`, `CUSTOMER_ADMIN`, `TEACHER`, and `STUDENT`; it also has a Parent dashboard surface.
- `PARENT` is a production-role gap if backend authentication must support parent accounts as a first-class role.
- Current subscription records use generic `seatLimit` and `seatUsage`; production licensing must extend this into separate teacher, student, and parent license counts.

## Production Roles

### Super Admin - SoftLogic Internal

Super Admin is SoftLogic internal operations owner.

Super Admin can:

- Create and manage partner/reseller organizations.
- Create and manage customer organizations.
- Create and manage subscriptions/licenses.
- Configure branding mode for direct customers and resellers.
- Create Partner Admins and Organization Admins.
- View all organizations, subscriptions, users, audit logs, and support data.
- Suspend/reactivate organizations and subscriptions.
- Override license state only through audited administrative action.

### Partner Admin

Partner Admin is the reseller or channel partner operator.

Partner Admin can:

- Manage only the organizations assigned to that partner/reseller scope.
- Create customer organizations if SoftLogic enables partner-led onboarding.
- Create Organization Admins, Teachers, Students, and Parents inside assigned customer organizations.
- View assigned customer license status and license usage.
- See partner-level reports for assigned organizations.
- Manage reseller branding only if reseller-brand mode is enabled by SoftLogic.

Partner Admin cannot:

- View unrelated partners or unrelated customer organizations.
- Create Super Admins.
- Change global platform configuration.
- Change commercial license counts unless SoftLogic policy explicitly allows partner-managed subscription edits.

### Organization Admin

Organization Admin is the school/institute admin. In current backend this maps to `CUSTOMER_ADMIN`.

Organization Admin can:

- Manage users only inside their organization.
- Create Teachers, Students, and Parents until the relevant license count is exhausted.
- View own organization subscription/license state.
- View organization classrooms, users, sessions, materials, and recordings according to admin permissions.
- Request more licenses from SoftLogic or their reseller.

### Teacher

Teacher is a licensed teaching user.

Teacher can:

- Login after being invited/provisioned.
- Create and manage whiteboards.
- Start live sessions.
- Invite students.
- Upload teaching materials.
- Use classroom tools, quiz, chat, hand raise, recording, and session controls.

Teacher consumes one teacher license when active.

### Student

Student is a licensed learning user.

Student can:

- Login after being invited/provisioned.
- Join live sessions by code or invite.
- View assigned boards, materials, recordings, quizzes, and classroom activity.
- Chat, answer quiz, raise hand, and use audio/video if enabled.

Student consumes one student license when active.

### Parent

Parent is a licensed guardian/observer user.

Parent can:

- Login after being invited/provisioned.
- View linked student schedule, attendance/progress summaries, teacher messages, and shared materials if enabled.
- Receive notifications and parent-facing communication.
- Access only the students explicitly linked to that parent account inside the same organization.

Parent consumes one parent license when active.

Parent cannot:

- Start live sessions.
- Edit whiteboards.
- Manage users.
- View unrelated students.
- View data from another organization.

## Licensing Model

### License owner

The license belongs to a customer `Organization`, not an individual device.

Each customer school or institute has:

- Organization name.
- Stable unique slug.
- Organization status: `ACTIVE` or `INACTIVE`.
- Branding mode.
- Optional parent partner/reseller organization.
- One active production `Subscription`.
- One or more Organization Admins.
- Teachers, Students, and Parents under that organization.

### Subscription license counts

Production subscription must track separate license counts:

| License pool | Required field | Usage field | Counted users |
| --- | --- | --- | --- |
| Teacher licenses | `totalTeacherLicenses` | `usedTeacherLicenses` | Active `TEACHER` users |
| Student licenses | `totalStudentLicenses` | `usedStudentLicenses` | Active `STUDENT` users |
| Parent licenses | `totalParentLicenses` | `usedParentLicenses` | Active `PARENT` users |

Required production subscription fields:

- `organizationId`: owning customer organization.
- `partnerOrganizationId`: reseller/partner organization when sold through partner.
- `planName`: commercial plan, for example Trial, School Basic, School Pro, Enterprise, White Label Partner.
- `status`: `TRIAL`, `ACTIVE`, `EXPIRED`, or `CANCELED`.
- `billingMode`: manual invoice or online checkout.
- `brandingMode`: SoftLogic brand or reseller brand.
- `totalTeacherLicenses`.
- `usedTeacherLicenses`.
- `totalStudentLicenses`.
- `usedStudentLicenses`.
- `totalParentLicenses`.
- `usedParentLicenses`.
- `startDate`.
- `endDate`.
- `storageLimit`.
- `featureFlags`.

Production enforcement rules:

- Teacher creation/reactivation checks teacher license availability.
- Student creation/reactivation checks student license availability.
- Parent creation/reactivation checks parent license availability.
- Disabled users do not consume licenses.
- Super Admin and Partner Admin do not consume a customer teacher/student/parent license.
- Organization Admin accounts should be controlled by an admin allowance or plan policy, not deducted from teacher/student/parent counts unless business later decides otherwise.
- Usage counts must be recalculated by the system from active users, not manually trusted from UI input.

### Current implementation gap

Current backend subscription records have generic `seatLimit` and `seatUsage`. For production, keep backward compatibility while adding role-specific counts.

Migration direction:

- Keep existing `seatLimit` as legacy total seat reference if needed.
- Add teacher/student/parent license count fields.
- Update user create/reactivate/login guards to check the correct role-specific pool.
- Update Admin Console labels from generic seats to role-specific licenses.

## Sales Channels

### Direct SoftLogic sale

Customer buys directly from SoftLogic.

Flow:

1. SoftLogic receives lead.
2. SoftLogic runs demo and captures requirements.
3. SoftLogic prepares quotation.
4. Customer approves quotation.
5. SoftLogic sends invoice or online checkout link.
6. Payment/trial approval is confirmed.
7. Super Admin creates customer organization.
8. Super Admin creates subscription with teacher, student, and parent license counts.
9. Super Admin creates Organization Admin.
10. System sends welcome and license activation emails.

Branding:

- Customer sees SoftLogic branding.
- Download page, app name, emails, and support contacts remain SoftLogic unless organization-specific branding is enabled.

### Reseller in SoftLogic brand

The reseller sells SoftLogic under the SoftLogic product brand.

Customer-facing behavior:

- Customer sees SoftLogic Whiteboard branding.
- App logo, download page, core emails, and product name remain SoftLogic.
- Support contact can show SoftLogic, reseller, or both depending agreement.

Operational behavior:

1. Super Admin creates Partner/Reseller organization.
2. Super Admin creates Partner Admin.
3. Super Admin assigns customer organizations to the partner scope.
4. Partner Admin can onboard/manage assigned customer organizations if enabled.
5. Each customer organization receives its own subscription and role-specific license counts.
6. Partner Admin sees only assigned organizations.
7. Super Admin retains full platform ownership and audit visibility.

Billing behavior:

- SoftLogic may invoice the reseller, or reseller may invoice the school based on commercial agreement.
- License activation should still occur only after SoftLogic approval, partner credit approval, payment confirmation, or approved trial exception.

Email behavior:

- Customer onboarding emails use SoftLogic product identity.
- Email may include reseller contact as support/account manager.
- License activation email must mention customer organization, plan, teacher license count, student license count, parent license count, start date, and end date.

### Reseller in reseller brand

The reseller sells a white-label/reseller-branded experience.

Customer-facing behavior:

- Customer sees reseller logo/name where branding policy allows.
- Product may appear as reseller-branded classroom/whiteboard solution.
- Emails may use reseller display name and support contact.
- SoftLogic remains platform owner and backend operator unless contract says otherwise.

Operational behavior:

1. Super Admin creates Partner/Reseller organization.
2. Super Admin enables reseller-brand mode for that partner.
3. Super Admin uploads partner logo, display name, support email, and branding settings.
4. Super Admin creates Partner Admin.
5. Partner Admin creates or requests customer organization creation.
6. Customer organization inherits reseller branding unless overridden by organization branding.
7. Customer subscription stores partner id, branding mode, license counts, plan, dates, and storage limits.
8. Organization Admin receives reseller-branded onboarding email.
9. Teachers, Students, and Parents receive reseller-branded or organization-branded emails according to branding policy.

Control rules:

- SoftLogic Super Admin always keeps full access for support, billing, compliance, and audit.
- Partner Admin never sees other partner data.
- Customer organization data remains isolated even under the same reseller.
- Reseller branding must never leak one customer organization's data to another customer.

## Manual Enterprise Licensing Flow

Manual sales is the recommended production launch path because schools usually need quotation, invoice, onboarding, internal approval, and training.

### 1. Lead received

Lead can come from:

- Website inquiry.
- Phone call.
- Email.
- Demo request.
- Partner referral.
- Existing school contact.
- Reseller sales pipeline.

Required lead fields:

- School/organization name.
- City/state/country.
- Contact person name.
- Contact email.
- Contact phone.
- Sales channel: direct, reseller in SoftLogic brand, reseller in reseller brand.
- Partner/reseller name if applicable.
- Expected number of Organization Admins.
- Expected number of Teachers.
- Expected number of Students.
- Expected number of Parents.
- Number of smart boards/classrooms.
- Required platforms: Windows, Android, web, or mixed.
- Required live-session recording storage.
- Required training date.
- Billing contact and GST/tax details if applicable.
- Branding requirements.

### 2. Demo and requirement capture

Demo must confirm:

- Whether customer needs whiteboard only or full live-classroom flow.
- Number of schools/branches.
- Teacher license count.
- Student license count.
- Parent license count.
- Whether parents need dashboard access immediately or in a later phase.
- Whether student accounts should be created individually or imported in bulk.
- Whether parent accounts are linked one-to-one or one parent can link multiple students.
- Whether session recordings are required.
- Whether desktop installer is required.
- Whether branding should be SoftLogic, organization, or reseller brand.
- Whether Google login is allowed by school policy.
- Whether only OTP email login should be used.
- Whether reseller has support responsibility.

### 3. Quotation prepared

Quotation must include:

- Sales channel.
- Customer organization name.
- Partner/reseller name if applicable.
- Branding mode.
- Plan name.
- Total teacher licenses.
- Total student licenses.
- Total parent licenses.
- Admin allowance if applicable.
- Billing period.
- Start date.
- End date.
- Included features.
- Recording/material storage limit.
- Support level.
- Training/onboarding terms.
- Renewal terms.
- Payment terms.
- Cancellation policy.

Example direct plan:

- Plan: School Pro.
- Total teacher licenses: 40.
- Total student licenses: 1200.
- Total parent licenses: 1200.
- Term: 12 months.
- Includes: admin console, teacher whiteboard, student dashboard, parent dashboard, live sessions, join codes, OTP login, invited Google login, classroom materials, recordings.
- Storage: 500 GB recordings/materials.
- Branding: SoftLogic brand with customer logo.

Example reseller-brand plan:

- Plan: Partner White Label Pro.
- Partner: ABC Education Solutions.
- Customer: Sunrise Public School.
- Total teacher licenses: 30.
- Total student licenses: 800.
- Total parent licenses: 800.
- Branding: reseller brand with customer logo.
- Support: reseller first-line support, SoftLogic second-line platform support.

### 4. Customer approval and payment

Manual path:

1. Customer approves quotation.
2. SoftLogic or reseller sends invoice according to sales channel.
3. Customer or reseller pays offline.
4. Finance confirms payment or approved credit.
5. Super Admin provisions organization and license.

No paid license should be activated before payment confirmation, partner credit approval, or an approved trial exception.

### 5. Super Admin creates partner/reseller when applicable

This step is used only for reseller sales.

Super Admin action:

1. Open Admin Console.
2. Create Partner organization.
3. Set organization kind/type as partner/reseller.
4. Set partner status `ACTIVE`.
5. Choose branding mode: SoftLogic brand or reseller brand.
6. Upload reseller logo and support contact if reseller-brand mode is enabled.
7. Create Partner Admin user.
8. Send Partner Admin welcome email.

Partner Admin welcome email must include:

- Partner Admin name.
- Partner organization name.
- Login email.
- Role: Partner Admin.
- Portal/app URL.
- Branding mode.
- Assigned support contact.
- Instructions to manage only assigned customer organizations.

### 6. Super Admin creates customer organization

Current backend/API surface:

- `POST /api/v1/admin/organizations`
- `GET /api/v1/admin/organizations`
- `PUT /api/v1/admin/organizations/:id`
- `POST /api/v1/admin/organizations/:id/logo`

Admin Console action:

1. Super Admin or enabled Partner Admin opens Organizations tab.
2. Creates customer organization with school name.
3. Confirms slug.
4. Links partner/reseller organization if sale is through reseller.
5. Selects branding mode.
6. Uploads customer logo if available.
7. Keeps status `ACTIVE`.

Data requirements:

- Organization name must match sales agreement.
- Slug must be stable and unique.
- Partner id must be stored for reseller customers.
- Logo should be uploaded before inviting admins if branding is part of sale.

### 7. Super Admin creates subscription/license

Current backend/API surface:

- `POST /api/v1/admin/subscriptions`
- `GET /api/v1/admin/subscriptions`
- `PUT /api/v1/admin/subscriptions/:id`

Production Admin Console action:

1. Open Subscriptions tab.
2. Create subscription against customer organization.
3. Select partner/reseller if applicable.
4. Enter `planName`.
5. Set `status`.
6. Set `billingMode`.
7. Set `brandingMode`.
8. Set total teacher licenses.
9. Set total student licenses.
10. Set total parent licenses.
11. Set start date.
12. Set end date.
13. Set storage limit and features.
14. Save.

Production rule:

- Used license counts should be system-calculated.
- License count changes must be audit logged.
- Reducing license counts below current active usage should be blocked or scheduled for renewal after users are disabled.

### 8. Super Admin creates Organization Admin

Current backend/API surface:

- `POST /api/v1/admin/users`
- `PUT /api/v1/admin/users/:id`

Admin Console action:

1. Open Users tab.
2. Create customer admin user.
3. Set role `CUSTOMER_ADMIN`.
4. Assign customer organization.
5. Set status `ACTIVE`.
6. Save.

Welcome email must include:

- Organization Admin name.
- Organization name.
- Email used for login.
- Role label: Organization Admin.
- SoftLogic or reseller-branded app URL.
- Download page URL.
- License summary: teacher, student, and parent license counts.
- Login instruction: use email OTP or invited Google account.
- Support contact.

### 9. Organization Admin creates Teachers, Students, and Parents

Organization Admin can manage only users inside their organization.

Teacher creation:

1. Organization Admin opens Users.
2. Selects Teacher role.
3. Enters teacher name and email.
4. Backend checks `usedTeacherLicenses < totalTeacherLicenses`.
5. User is created as active Teacher.
6. Welcome email is sent.

Student creation:

1. Organization Admin opens Users.
2. Selects Student role.
3. Enters student name and email.
4. Backend checks `usedStudentLicenses < totalStudentLicenses`.
5. User is created as active Student.
6. Welcome email is sent.

Parent creation:

1. Organization Admin opens Users.
2. Selects Parent role.
3. Enters parent name and email.
4. Links parent to one or more students in same organization.
5. Backend checks `usedParentLicenses < totalParentLicenses`.
6. User is created as active Parent.
7. Welcome email is sent.

Parent welcome email must include:

- Parent name.
- Organization/school name.
- Linked student name(s) if policy allows showing them in email.
- Login email.
- Parent dashboard URL/app instruction.
- What parent can view: schedule, progress/attendance summaries, messages, and shared materials if enabled.
- Support contact.

### 10. License enforcement

License checks must run on:

- User create.
- User import.
- User reactivate.
- Login/session refresh if organization is inactive or subscription expired.
- Live-session creation.
- Media upload.
- Recording start/upload.
- Export/download paths if plan restricts them.

If teacher license pool is full:

- Block Teacher creation/reactivation.
- Show message: "Teacher license limit reached. Buy more teacher licenses or disable unused teacher accounts."

If student license pool is full:

- Block Student creation/reactivation.
- Show message: "Student license limit reached. Buy more student licenses or disable unused student accounts."

If parent license pool is full:

- Block Parent creation/reactivation.
- Show message: "Parent license limit reached. Buy more parent licenses or disable unused parent accounts."

If subscription is expired:

- Super Admin can still renew.
- Partner Admin can see renewal-needed state for assigned customers.
- Organization Admin can see renewal-needed state.
- Teacher cannot start new paid/live activity.
- Student and Parent access to old materials follows retention policy.

## Online Checkout Flow

Online checkout is supported as a future/secondary path.

Checkout must collect:

- Organization name.
- Contact name.
- Contact email.
- Plan.
- Total teacher licenses.
- Total student licenses.
- Total parent licenses.
- Branding mode if reseller checkout is enabled.
- Partner/reseller code if applicable.

Payment success webhook must:

1. Verify payment signature.
2. Create or update customer organization.
3. Link partner/reseller if partner code was used.
4. Create or update subscription.
5. Store teacher/student/parent license counts.
6. Create Organization Admin.
7. Send welcome email.
8. Send license activation email.
9. Audit all license-critical actions.

Payment failure must:

- Not activate paid license.
- Email payment failure to buyer.
- Notify SoftLogic/partner sales team.
- Keep checkout attempt for audit/support.

## Renewal, Upgrade, Downgrade, Expiry, And Cancellation

### Renewal

1. Renewal reminders are sent before expiry.
2. Customer or reseller confirms renewal.
3. Payment/credit approval is confirmed.
4. Super Admin or billing webhook updates `endDate`.
5. License activation/renewal email is sent.

Renewal email must include:

- Organization name.
- Plan.
- Teacher license count.
- Student license count.
- Parent license count.
- Start date.
- End date.
- Support contact.

### Upgrade

Upgrade can increase:

- Teacher licenses.
- Student licenses.
- Parent licenses.
- Storage.
- Recording features.
- Support level.
- Branding features.

Upgrade flow:

1. Organization Admin or Partner Admin requests upgrade.
2. Super Admin approves commercial terms.
3. Payment/credit approval is confirmed.
4. Subscription is updated.
5. Audit log records old and new values.
6. Upgrade confirmation email is sent.

### Downgrade

Downgrade can reduce license counts or features.

Rules:

- Downgrade below active usage is blocked unless users are disabled first.
- Downgrade can be scheduled for renewal date.
- Organization Admin/Partner Admin must see which pool is over limit.
- Super Admin confirms final downgrade.

### Expiry

When subscription expires:

- New teacher sessions are blocked.
- New media uploads are blocked.
- New recording starts/uploads are blocked.
- New user creation/reactivation is blocked.
- Existing data is retained according to retention policy.
- Organization Admin, Partner Admin, and Super Admin can see renewal-required state.

### Cancellation

Cancellation flow:

1. Customer/reseller requests cancellation.
2. Super Admin verifies contract terms.
3. Subscription is marked `CANCELED`.
4. Organization status may remain active for data export grace period.
5. After grace period, access follows retention/deletion policy.
6. Cancellation email is sent.

## Email Notifications

Required emails:

- Partner Admin welcome email.
- Organization Admin welcome email.
- Teacher welcome email.
- Student welcome email.
- Parent welcome email.
- OTP email.
- License activation email.
- Renewal reminder email.
- Subscription expired email.
- Upgrade/downgrade confirmation email.
- Seat/license limit alert email.
- Payment success/failure email.
- Recording/material available email if enabled.

Every license email must include:

- Correct brand identity.
- Organization name.
- Partner/reseller name if applicable.
- Plan.
- Teacher license count.
- Student license count.
- Parent license count.
- License start/end date.
- Support contact.

## Organization-Wise Data Isolation

Rules:

- Super Admin can see all organizations.
- Partner Admin can see only assigned partner/customer scope.
- Organization Admin can see only own organization.
- Teacher can see own and organization-shared teaching content.
- Student can see invited/joined sessions and shared materials.
- Parent can see only linked student data inside the same organization.
- Recordings/materials must never be available across organization boundaries.
- Reseller branding must not weaken organization-level data isolation.

## Production Gaps To Implement Later

Required backend gaps:

- Add first-class `PARENT` role or an equivalent parent account model.
- Add parent-student linkage model.
- Add role-specific license count fields to subscription.
- Add license guard for teacher/student/parent pool enforcement.
- Add partner/reseller branding model.
- Add branding mode to subscription/organization.
- Add checkout webhook endpoint.
- Add renewal/expiry scheduled job.
- Add production billing/reminder email templates.

Required frontend/admin gaps:

- Admin UI fields for total teacher licenses, total student licenses, and total parent licenses.
- Usage cards for each license pool.
- Disable create-user buttons by role when that role pool is exhausted.
- Parent creation/linking UI.
- Partner Admin scoped organization view.
- Reseller branding controls.

## Acceptance Checklist

- Super Admin can create partner/reseller organization.
- Super Admin can create direct customer organization.
- Super Admin can create customer subscription with teacher, student, and parent license counts.
- Partner Admin can manage only assigned customer organizations.
- Reseller in SoftLogic brand keeps SoftLogic product branding.
- Reseller in reseller brand shows reseller branding where configured.
- Organization Admin can create Teachers until teacher licenses are full.
- Organization Admin can create Students until student licenses are full.
- Organization Admin can create Parents until parent licenses are full.
- Parent account is linked only to students in same organization.
- Disabled users do not consume role-specific license counts.
- Expired subscription blocks new paid actions.
- Emails contain correct brand, role, license counts, login instructions, and support contact.
- Audit log records all license-critical actions.

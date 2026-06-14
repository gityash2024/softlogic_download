window.SOFTLOGIC_RELEASE_MANIFEST = {
  currentVersion: "v1.0.20",
  lastSynced: "2026-06-14",
  softlogicAdmin: {
    title: "SoftLogic Admin Console",
    description:
      "Sign in to manage organisations, users, partners, licences, and admin tooling. Use the credentials below for the default super admin account.",
    url: "https://adminpanelsoftlogic.vercel.app",
    label: "Open Admin Panel",
    email: "admin@softlogicwhiteboard.com",
    password: "admin123"
  },
  api: {
    backendBaseUrl: "https://softlogic-whiteboard-backend-testin.vercel.app",
    swaggerUrl: "https://softlogic-whiteboard-backend-testin.vercel.app/api/docs",
    swaggerJsonUrl: "./swagger/openapi-v1.0.0.json",
    backendSwaggerJsonUrl: "https://softlogic-whiteboard-backend-testin.vercel.app/api/docs.json",
    publicVersionUrl: "https://softlogic-whiteboard-backend-testin.vercel.app/api/version",
    apiVersionUrl: "https://softlogic-whiteboard-backend-testin.vercel.app/api/v1/version",
    apiBaseUrl: "https://softlogic-whiteboard-backend-testin.vercel.app/api/v1"
  },
  accessGuide: {
    adminEmail: "admin@softlogicwhiteboard.com",
    fixedOtp: "1234",
    loginFlow: [
      "Open the SoftLogic Whiteboard app.",
      "Enter the admin or invited user email address.",
      "Select Send OTP to create an active OTP request.",
      "Use the email-delivered OTP, or use QA fixed OTP 1234 when testing auth limits are enabled.",
      "After verification, the dashboard opens with permissions from the saved user role."
    ],
    otpNotes: [
      "Original OTP is generated for every login request and delivered by email; in dev/test flows it may also be logged by the backend.",
      "Fixed QA OTP 1234 still requires an active OTP request first.",
      "Infrastructure secrets such as database URLs, JWT secrets, SMTP passwords, and cloud credentials remain excluded. Version 1.0.9 publishes only the AI setup keys requested for classroom AI enablement."
    ],
    userCreationFlow: [
      "Super Admin creates partner/customer organizations and users from the Admin panel.",
      "Partner Admin can create customer admins, teachers, and students under managed customer organizations.",
      "Customer Admin or Admin can create teachers and students for their managed organization.",
      "Created users sign in by email OTP or supported Google sign-in, and their access follows the role stored in the backend."
    ],
    roleHierarchy: [
      "SUPER_ADMIN",
      "PARTNER_ADMIN",
      "CUSTOMER_ADMIN / ADMIN",
      "TEACHER / STUDENT"
    ]
  },
  testingReports: [
    {
      title: "Full Flutter App Testing Checklist",
      file: "FULL_FLUTTER_APP_TESTING_CHECKLIST.md",
      description:
        "Checklist proof for full Flutter app automated coverage across auth, dashboard, admin, settings, and whiteboard suites."
    },
    {
      title: "Full Flutter App Testing Report",
      file: "FULL_FLUTTER_APP_TESTING_REPORT.md",
      description:
        "Client-shareable testing report with automated test, Windows launch, and Android emulator smoke proof."
    },
    {
      title: "Phase 1 Closure Report",
      file: "PHASE1_CLOSURE_REPORT.md",
      description:
        "Authoritative Phase 1 closure report with status totals, skipped/manual items, and feature-by-feature verification."
    }
  ],
  docApproval: [
    {
      title: "Production Licensing Flow",
      file: "SOFTLOGIC_PRODUCTION_LICENSING_FLOW.md",
      status: "Ready for review",
      description:
        "Production licensing with student-login controls, Google Drive storage policy, AI credit extension, Partner Admin, Parent, reseller branding, and role-specific license counts."
    },
    {
      title: "User Journey Flow",
      file: "SOFTLOGIC_USER_JOURNEY_FLOW.md",
      status: "Ready for review",
      description:
        "Detailed journey for Super Admin, Partner Admin, Organization Admin, Teacher, Student, and Parent with org-wise permissions, session-only QR access, Google Drive setup, and AI credit prompts."
    },
    {
      title: "Live Session Flow",
      file: "SOFTLOGIC_LIVE_SESSION_FLOW.md",
      status: "Ready for review",
      description:
        "Live session flow with QR join details, login-enabled and login-disabled student paths, Google Drive recording/material storage, Partner support scope, and org-wise isolation."
    }
  ],
  docApprovalLastUpdated: "2026-05-25 12:44 IST",
  releases: [
    {
      version: "v1.0.12",
      appVersion: "1.0.12",
      build: "13",
      status: "Previous",
      releaseDate: "2026-06-02",
      title: "Dotted drawing, settings sliders, and scoped storage verification release",
      summary:
        "Release bump to v1.0.12 with updated Android APK and Windows EXE links. Softlogic AI and Admin actions keep their existing hosted links.",
      artifacts: [
        {
          platform: "Android",
          format: "APK",
          label: "Download Android APK",
          href:
            "https://drive.google.com/file/d/1KJkUwpR-wQIlh72rByLSSLZFFmKnyNoO/view?usp=sharing",
          description:
            "Android release build v1.0.12 for tablet, mobile, and whiteboard hardware classroom use."
        },
        {
          platform: "Windows",
          format: "EXE",
          label: "Download Windows EXE",
          href:
            "https://drive.google.com/file/d/14Ga-ufVq6f10gvyTHjMnwPlDFbM5W7jA/view?usp=sharing",
          description:
            "One-file Windows installer build v1.0.12 for desktop classroom stations and teaching workflows."
        },
        {
          platform: "Softlogic AI",
          format: "Hosted page",
          label: "Open Softlogic AI",
          href: "/softlogic-ai",
          description:
            "Hosted Softlogic AI page retained with the same Vercel project."
        }
      ],
      aiSetup: {
        title: "AI features setup for v1.0.12",
        description:
          "For this version, add these organisation API keys before using AI features.",
        path:
          "Login to softlogic admin panel > Organisation > Organisation Settings",
        keys: [
          {
            label: "Gemini API key",
            value: "AIzaSyDbbv5Xm8so3AIYQahwNeFQ7o1N_wpfyic"
          },
          {
            label: "Deepgram API key",
            value: "a4d45bfd78210e24cc92cd015fcd9124a30f194e"
          }
        ]
      },
      dashboardMode: "singleUserFriendly",
      dashboardSection: {
        title: "What's included in this whiteboard build (v1.0.12)",
        items: [
          "Interactive pen and eraser settings sliders UI layout polish.",
          "Refined canvas painter dotted pen drawing paths and gesture-based recognition.",
          "Integrated secure storage verification flows and Scoped Storage directory checks.",
          "Polished cloud integration dialogs and custom whiteboard file picker filters.",
          "Expanded automated test suites covering dotted pens, export flows, and screen bounds."
        ]
      },
      noteSections: [
        {
          title: "Whiteboard Drawing & Canvas",
          items: [
            "Optimized canvas painter stroke rendering paths and drawing controller states.",
            "Enhanced dotted pen drawing logic, coordinate allocations, and stroke continuities.",
            "Updated pen_settings_panel.dart and eraser_settings_panel.dart with custom slider UI inputs.",
            "Polished whiteboard_minimap.dart zooming and bounds tracking persistences."
          ]
        },
        {
          title: "Storage & File System",
          items: [
            "Added storage_access_service.dart and updated bootstrap.dart for Scoped Storage directory checks.",
            "Polished MainActivity.kt Kotlin adjustments for scoped folder validations.",
            "Refined whiteboard_export_service.dart and export_destination_dialog.dart validation guides.",
            "Updated whiteboard_file_picker.dart filtering and folder loader hooks."
          ]
        },
        {
          title: "Cloud & UI Polish",
          items: [
            "Polished cloud_import_dialog.dart Dropbox and GDrive integration preview guides.",
            "Refined shape_geometry.dart, geometry_panel.dart, and shape_panel.dart classifications."
          ]
        },
        {
          title: "Testing Suites & Verification",
          items: [
            "Added comprehensive test suites: whiteboard_dots_pen_test.dart and whiteboard_export_ui_test.dart.",
            "Added automated verification for whiteboard_import_ui_test.dart and geometry_panel_test.dart.",
            "Portal downloads point to current v1.0.12 beta APK while preserving stable v1.0.11 history."
          ]
        }
      ]
    },
    {
      version: "v1.0.11",
      appVersion: "1.0.11",
      build: "12",
      status: "Current",
      releaseDate: "2026-05-30",
      title: "Licensing activation, support threads, and whiteboard testing suite release",
      summary:
        "Release bump to v1.0.11 with updated Android APK and one-file Windows installer EXE links. This version introduces hardware activation keys, a help desk support module with user thread tracking, and expanded whiteboard verification suites.",
      artifacts: [
        {
          platform: "Android",
          format: "APK",
          label: "Download Android APK",
          href:
            "https://drive.google.com/file/d/1l2vasQMGgtPr5cCRvMnp-9qguJTF_jNL/view?usp=sharing",
          description:
            "Android release build v1.0.11 for tablet, mobile, and whiteboard hardware classroom use."
        },
        {
          platform: "Windows",
          format: "EXE",
          label: "Download Windows EXE",
          href:
            "https://drive.google.com/file/d/14Ga-ufVq6f10gvyTHjMnwPlDFbM5W7jA/view?usp=sharing",
          description:
            "One-file Windows installer build v1.0.11 for desktop classroom stations and teaching workflows."
        },
        {
          platform: "Softlogic AI",
          format: "Hosted page",
          label: "Open Softlogic AI",
          href: "/softlogic-ai",
          description:
            "Hosted Softlogic AI page retained with the same Vercel project."
        }
      ],
      aiSetup: {
        title: "AI features setup for v1.0.11",
        description:
          "For this version, add these organisation API keys before using AI features.",
        path:
          "Login to softlogic admin panel > Organisation > Organisation Settings",
        keys: [
          {
            label: "Gemini API key",
            value: "AIzaSyDbbv5Xm8so3AIYQahwNeFQ7o1N_wpfyic"
          },
          {
            label: "Deepgram API key",
            value: "a4d45bfd78210e24cc92cd015fcd9124a30f194e"
          }
        ]
      },
      dashboardMode: "singleUserFriendly",
      dashboardSection: {
        title: "What's included in this whiteboard build (v1.0.11)",
        items: [
          "Hardware activation and licensing system requiring key inputs on startup.",
          "Help support center with detailed ticket threads, messages, and unread notifications.",
          "Refined whiteboard multi-touch ink points tracking and import storage checks.",
          "Comprehensive automated test coverage for drawing, tools, and error boundary components."
        ]
      },
      noteSections: [
        {
          title: "Hardware Licensing & Activation",
          items: [
            "Added lib/features/license/domain/entities and data/hardware_activation_service.dart.",
            "Added activation_key_screen.dart and subscription_required_screen.dart for license validation.",
            "Implemented activation provider state management for first-load license enforcement."
          ]
        },
        {
          title: "Help Desk Support Tickets",
          items: [
            "Added lib/features/support/ and help_threads_screen.dart to list support tickets.",
            "Added help_new_thread_screen.dart and help_thread_detail_screen.dart with ticket chat views.",
            "Configured support_unread_provider.dart to track and notify users of ticket replies."
          ]
        },
        {
          title: "Whiteboard Drawing & Storage",
          items: [
            "Refined multi-touch drawing points and stroke alignments inside canvas painter.",
            "Polished whiteboard import service file pickers and temporary workspace loaders.",
            "Integrated device_storage_service.dart for secure credential and session mapping."
          ]
        },
        {
          title: "Testing Suites & Verification",
          items: [
            "Added comprehensive test suites: error_interceptor_test.dart and whiteboard_screen_test.dart.",
            "Added automated verification for geometry instrument overlays and whiteboard write tools."
          ]
        }
      ]
    },
    {
      version: "v1.0.10",
      appVersion: "1.0.10",
      build: "11",
      status: "Previous",
      releaseDate: "2026-05-29",
      title: "Whiteboard browser, geometry guides, and localization packs release",
      summary:
        "Release bump to v1.0.10 with updated Android APK and one-file Windows installer EXE links, focused on local translation pack expansion, in-app browser split-screen tools, ruler-guided geometry drawings, and responsive color swatch selection.",
      artifacts: [
        {
          platform: "Android",
          format: "APK",
          label: "Download Android APK",
          href:
            "https://drive.google.com/file/d/1u5yy7o1EscrG1DzEjArUJyGyfI3uBUlG/view?usp=sharing",
          description:
            "Android release build v1.0.10 for tablet, mobile, and whiteboard hardware classroom use."
        },
        {
          platform: "Windows",
          format: "EXE",
          label: "Download Windows EXE",
          href:
            "https://drive.google.com/file/d/1xzrpSIdnTtWOmXq2Wb9w2ccFZpgBSv3b/view?usp=sharing",
          description:
            "One-file Windows installer build v1.0.10 for desktop classroom stations and teaching workflows."
        },
        {
          platform: "Softlogic AI",
          format: "Hosted page",
          label: "Open Softlogic AI",
          href: "/softlogic-ai",
          description:
            "Hosted Softlogic AI page retained with the same Vercel project."
        }
      ],
      aiSetup: {
        title: "AI features setup for v1.0.10",
        description:
          "For this version, add these organisation API keys before using AI features.",
        path:
          "Login to softlogic admin panel > Organisation > Organisation Settings",
        keys: [
          {
            label: "Gemini API key",
            value: "AQ.Ab8RN6KUxCawMDe5PhQiwz4oaueLEYpLgFDZXs2_vuVoMZsLlQ"
          },
          {
            label: "Deepgram API key",
            value: "a4d45bfd78210e24cc92cd015fcd9124a30f194e"
          }
        ]
      },
      dashboardMode: "singleUserFriendly",
      dashboardSection: {
        title: "What's included in this whiteboard build (v1.0.10)",
        items: [
          "Added complete offline localization/translation catalogs for portal UI and translation engines.",
          "Refined split-screen browser widgets with history service, custom Windows/Android WebView controllers, and safe search.",
          "Upgraded geometry instrument overlays with interactive ruler/compass drawing guides and protractor alignments.",
          "Streamlined whiteboard color swatch picking with distinct boundaries, picker options, and custom palette additions.",
          "Optimized local draft auto-saving, shape manipulation, and export dialogues across large display classroom hardware."
        ]
      },
      noteSections: [
        {
          title: "Localization and translations",
          items: [
            "Added portal_required_translation_packs.dart mapping offline classroom translation catalogs.",
            "Configured embedded language selector, settings persistence, and language resource mappings."
          ]
        },
        {
          title: "In-App Web Browser",
          items: [
            "Added custom Windows-specific webview controller and Android-specific webview controllers.",
            "Integrated browser history service with local session navigation and back/forward bounds.",
            "Polished split-screen webview panel rendering and safe URL loading."
          ]
        },
        {
          title: "Geometry Guides and Colors",
          items: [
            "Enhanced ruler guided drawing and protractor coordinate alignments.",
            "Polished shape resize handles, selection overlays, and geometry instrument SVG icons.",
            "Redesigned color swatch selectors for shape, border, canvas background, and pen pickers."
          ]
        },
        {
          title: "Release and compatibility",
          items: [
            "Current APK and one-file Windows installer links are frozen as v1.0.10 build 11.",
            "Flutter app version now reads 1.0.10+11.",
            "Previous v1.0.9, v1.0.8, v1.0.7, v1.0.6, v1.0.5, v1.0.3, v1.0.2, v1.0.1, and v1.0.0 APK and EXE links remain available in release history."
          ]
        }
      ]
    },
    {
      version: "v1.0.9",
      appVersion: "1.0.9",
      build: "10",
      status: "Previous",
      releaseDate: "2026-05-27",
      title: "AI key sync, media generation, and response reliability release",
      summary:
        "Release bump to v1.0.9 with updated Android APK and one-file Windows installer EXE links, focused on live organisation AI key refresh, stricter AI response validation, safer Text-to-Media failures, deployed backend/admin Vercel updates, and preserved download history.",
      artifacts: [
        {
          platform: "Android",
          format: "APK",
          label: "Download Android APK",
          href:
            "https://drive.google.com/file/d/14nG5MmE_u-_3YRZhdMMdedscqyVyCvl-/view?usp=sharing",
          description:
            "Android release build v1.0.9+10 for tablet, mobile, and whiteboard hardware classroom use."
        },
        {
          platform: "Windows",
          format: "EXE",
          label: "Download Windows EXE",
          href:
            "https://drive.google.com/file/d/1tx5r9Q8u4G2YggimGA-dJYBAL6A1ekk-/view?usp=sharing",
          description:
            "One-file Windows installer build v1.0.9 for desktop classroom stations and teaching workflows."
        },
        {
          platform: "Softlogic AI",
          format: "Hosted page",
          label: "Open Softlogic AI",
          href: "/softlogic-ai",
          description:
            "Hosted Softlogic AI page retained with the same Vercel project."
        }
      ],
      aiSetup: {
        title: "AI features setup for v1.0.9",
        description:
          "For this version, add these organisation API keys before using AI features.",
        path:
          "Login to softlogic admin panel > Organisation > Organisation Settings",
        keys: [
          {
            label: "Gemini API key",
            value: "AQ.Ab8RN6KUxCawMDe5PhQiwz4oaueLEYpLgFDZXs2_vuVoMZsLlQ"
          },
          {
            label: "Deepgram API key",
            value: "a4d45bfd78210e24cc92cd015fcd9124a30f194e"
          }
        ]
      },
      dashboardMode: "singleUserFriendly",
      dashboardSection: {
        title: "What's included in this current whiteboard build (v1.0.9)",
        items: [
          "The Flutter app now refreshes organisation AI settings from the backend before AI actions and when AI key/status UI opens, so admin key changes apply without app restart or re-login.",
          "The backend current-user response now returns the latest organisation AI settings with canonical Gemini model fields while keeping legacy text, image, and TTS model fields compatible.",
          "Text-to-Media keeps successful generated image insertion unchanged, but failed image generation now shows a clear error instead of creating prompt fallback cards.",
          "AI text generation now validates empty, sentinel, reference-only, and malformed responses, retries once with a repair instruction, and prevents invalid output from becoming board content.",
          "Admin organisation AI settings now save/read canonical Gemini model fields while preserving existing settings behavior.",
          "Recent whiteboard geometry, browser, controller, modal, table, and login panel refinements from backend, Flutter, and admin commits remain included with the same UI flow.",
          "The download portal now publishes the v1.0.9 APK and one-file Windows installer while preserving every previous release link in the selector."
        ]
      },
      noteSections: [
        {
          title: "Flutter AI reliability and key refresh",
          items: [
            "Auth session refresh now uses the existing current-user endpoint to sync fresh organisation AI settings without clearing tokens or requiring a new login.",
            "Whiteboard AI key badges and AI tool execution now read the refreshed organisation settings before use.",
            "Gemini/OpenRouter text extraction now combines valid response parts, rejects invalid bodies such as -1, empty payloads, null-like output, and reference-only answers, and retries malformed Gemini responses once before showing a controlled error.",
            "Plain meaningful non-JSON text remains accepted, so existing AI Assist, Summary, Lesson Prep, Quiz, Flashcards, Translation, TTS script generation, Dialogue, and selection-action flows keep their current behavior."
          ]
        },
        {
          title: "Text-to-Media and image generation",
          items: [
            "Text-to-Media no longer inserts prompt cards, gradient cards, or text-only fallback cards when the image provider returns no usable image.",
            "Invalid key, quota, timeout, and no-image failures now clear the failed result, disable insert actions, and surface an error to the user.",
            "Successful generated-image insertion remains unchanged for existing board and canvas workflows."
          ]
        },
        {
          title: "Backend and admin deployment",
          items: [
            "Backend production Vercel alias is updated at https://softlogic-whiteboard-backend-testin.vercel.app.",
            "Admin production Vercel alias is updated at https://adminpanelsoftlogic.vercel.app.",
            "Backend user-context handling maps canonical geminiTextModel, geminiImageModel, and geminiTtsModel values while remaining backward compatible with legacy textModel, imageModel, and ttsModel settings.",
            "Admin organisation AI settings now align with the canonical backend payload and keep existing reveal, copy, modal, and organization-management flows intact."
          ]
        },
        {
          title: "Release and compatibility",
          items: [
            "Current APK and one-file Windows installer links are frozen as v1.0.9 build 10.",
            "Flutter app version now reads 1.0.9+10.",
            "Release notes are based on the recent backend, Flutter, and admin histories plus the production deployment updates for this release.",
            "Previous v1.0.8, v1.0.7, v1.0.6, v1.0.5, v1.0.3, v1.0.2, v1.0.1, and v1.0.0 APK and EXE links remain available in release history."
          ]
        },
        {
          title: "Deployment",
          items: [
            "Portal current release data now points to v1.0.9.",
            "Version selector now supports v1.0.9 current with v1.0.8, v1.0.7, v1.0.6, v1.0.5, v1.0.3, v1.0.2, v1.0.1, and v1.0.0 as previous downloads.",
            "Release data update is isolated to the manifest and static cache references; existing page layout and interaction patterns are preserved."
          ]
        }
      ]
    },
    {
      version: "v1.0.8",
      appVersion: "1.0.8",
      build: "9",
      status: "Previous",
      releaseDate: "2026-05-25",
      title: "Whiteboard AI setup, loader stability, and admin key tools release",
      summary:
        "Release bump to v1.0.8 with updated Android APK and one-file Windows installer EXE links, focused on AI modal loader stability, Softlogic-branded processing states, admin API-key reveal/copy controls, and safer AI setup guidance for organisation settings.",
      artifacts: [
        {
          platform: "Android",
          format: "APK",
          label: "Download Android APK",
          href:
            "https://drive.google.com/file/d/1FOXxhtDagQUI-A-OcQoK90lE0oHhfLKd/view?usp=sharing",
          description:
            "Android release build v1.0.8+9 for tablet, mobile, and whiteboard hardware classroom use."
        },
        {
          platform: "Windows",
          format: "EXE",
          label: "Download Windows EXE",
          href:
            "https://drive.google.com/file/d/1Hzhk4zQvG78fTJFsENqO_ecvvRrN461g/view?usp=sharing",
          description:
            "One-file Windows installer build v1.0.8 for desktop classroom stations and teaching workflows."
        },
        {
          platform: "Softlogic AI",
          format: "Hosted page",
          label: "Open Softlogic AI",
          href: "/softlogic-ai",
          description:
            "Hosted Softlogic AI page retained with the same Vercel project."
        }
      ],
      aiSetup: {
        title: "AI features setup for v1.0.8",
        description:
          "For this version, add these organisation API keys before using AI features.",
        path:
          "Login to softlogic admin panel > Organisation > Organisation Settings",
        keys: [
          {
            label: "Gemini API key",
            value: "AQ.Ab8RN6KUxCawMDe5PhQiwz4oaueLEYpLgFDZXs2_vuVoMZsLlQ"
          },
          {
            label: "Deepgram API key",
            value: "a4d45bfd78210e24cc92cd015fcd9124a30f194e"
          }
        ]
      },
      dashboardMode: "singleUserFriendly",
      dashboardSection: {
        title: "What's included in this current whiteboard build (v1.0.8)",
        items: [
          "AI Analysis, AI Assist, AI write/pen, and AI Hub loading now use the shared Softlogic processing experience without freezing the whiteboard while generation is running.",
          "AI loader visuals now reuse the established Softlogic empty-state icon animation so the modal stays familiar, lightweight, and responsive.",
          "AI processing copy is aligned to Softlogic classroom workflow states and avoids exposing backend/provider implementation wording inside the whiteboard UI.",
          "Organisation settings now includes API-key reveal and copy controls so admins can verify Gemini and Deepgram keys before AI features are used.",
          "The download portal now publishes the v1.0.8 APK and one-file Windows installer while preserving every previous release link in the selector.",
          "This version requires the listed AI setup keys to be added under Organisation Settings before AI features are expected to work.",
          "Existing whiteboard, dashboard, admin, settings, and download-page layout flows remain unchanged."
        ]
      },
      noteSections: [
        {
          title: "AI loader and whiteboard responsiveness",
          items: [
            "AI modal loading now uses the same familiar Softlogic icon animation seen in empty states.",
            "The shared AI loading component was kept lightweight so generate actions do not lock the app UI while work is in progress.",
            "AI Hub, AI Analysis, AI Assist, AI write/pen, and related modal loading states continue through the same visual system."
          ]
        },
        {
          title: "AI setup keys",
          items: [
            "Organisation settings includes reveal and copy controls for API key fields.",
            "Version 1.0.8 requires the Gemini and Deepgram keys listed on the Downloads tab before using AI features.",
            "Setup path: Login to softlogic admin panel > Organisation > Organisation Settings."
          ]
        },
        {
          title: "Release and compatibility",
          items: [
            "Current APK and one-file Windows installer links are frozen as v1.0.8 build 9.",
            "Flutter app version now reads 1.0.8+9.",
            "Backend version metadata and API docs are unchanged in this portal-only download update.",
            "Previous v1.0.7, v1.0.6, v1.0.5, v1.0.3, v1.0.2, v1.0.1, and v1.0.0 APK and EXE links remain available in release history."
          ]
        },
        {
          title: "Deployment",
          items: [
            "Portal current release data now points to v1.0.8.",
            "Version selector now supports v1.0.8 current with v1.0.7, v1.0.6, v1.0.5, v1.0.3, v1.0.2, v1.0.1, and v1.0.0 as previous downloads.",
            "Release data update is isolated to the manifest, API-key helper rendering, and static cache references; existing page layout and interaction patterns are preserved."
          ]
        }
      ]
    },
    {
      version: "v1.0.7",
      appVersion: "1.0.7",
      build: "8",
      status: "Previous",
      releaseDate: "2026-05-21",
      title: "Whiteboard writing, settings, and hardware stability release",
      summary:
        "Release bump to v1.0.7 with updated Android APK and one-file Windows installer EXE links, focused on whiteboard production bug fixes across real-time writing, Smart Write timing, palm eraser classification, pages modal icons, hardware-safe Open import flow, template selection, settings cleanup, language selection, and HD icon rendering.",
      artifacts: [
        {
          platform: "Android",
          format: "APK",
          label: "Download Android APK",
          href:
            "https://drive.google.com/file/d/1OoyDIa9gQPDrzUM5qM5fkNoC243LZNes/view?usp=sharing",
          description:
            "Android release build v1.0.7+8 for tablet, mobile, and whiteboard hardware classroom use."
        },
        {
          platform: "Windows",
          format: "EXE",
          label: "Download Windows EXE",
          href:
            "https://drive.google.com/file/d/1LAYKLSvTjmx2Dvf9Ai_eOLFtv4tjYdG2/view?usp=sharing",
          description:
            "One-file Windows installer build v1.0.7 for desktop classroom stations and teaching workflows."
        },
        {
          platform: "Softlogic AI",
          format: "Hosted page",
          label: "Open Softlogic AI",
          href: "/softlogic-ai",
          description:
            "Hosted Softlogic AI page retained with the same Vercel project."
        }
      ],
      dashboardMode: "singleUserFriendly",
      dashboardSection: {
        title: "What's included in this current whiteboard build (v1.0.7)",
        items: [
          "Write tools now behave closer to real classroom pens with no extra cursor circle, faster live ink, and distinct brush, marker, pencil, dot, laser, rainbow, and highlighter behavior.",
          "Smart Write now waits after the user stops writing before converting text, and normal pens no longer accidentally trigger handwriting recognition.",
          "Palm As Eraser now detects large palm-like touch contact and uses a broad pixel eraser, while normal finger, stylus, and mouse writing continue to work.",
          "Quick Access and AI floating icons use transparent glass styling, and Pages modal icons render with sharper HD/vector-safe strokes on large whiteboard displays.",
          "Menu Open now uses the embedded import/file browser flow so whiteboard hardware can open supported board, image, PDF/PPT, SVG, audio, video, and notes files.",
          "Templates selected with the Select tool now show the normal selection submenu while preserving editable template-field behavior.",
          "Whiteboard Settings were cleaned up with duplicate tool controls removed, black as the default global palette color, an embedded language selector, and fixed color picker/layout behavior.",
          "Previous versions and their download links remain available in the version selector without any change."
        ]
      },
      noteSections: [
        {
          title: "Writing and Smart Write",
          items: [
            "Removed the custom cursor circle from write tools so writing starts directly from the pen pointer.",
            "Improved live stroke rendering so ink follows pointer movement more immediately during active writing.",
            "Separated brush, marker, pencil, and dot pen visuals so each tool has a more recognizable stroke style.",
            "Fixed dot pen continuity issues that created half-circle artifacts or grid-cut-looking strokes.",
            "Added clearer boundaries to whiteboard color swatches for picker, recent colors, shape colors, text colors, and theme colors.",
            "Smart Write now waits for a post-stroke pause before conversion so multi-stroke words can be completed.",
            "Switching from Text or Formula Smart Write to normal pens now cancels pending recognition and returns to normal drawing mode."
          ]
        },
        {
          title: "Hardware input and erasing",
          items: [
            "Palm As Eraser no longer turns every finger or pen contact into an eraser.",
            "Large touch contact is classified as palm input only when the device reports a broad contact footprint.",
            "Palm erase uses a broad pixel-mask eraser sized from the contact area, even when the normal eraser mode is element erase.",
            "Multi-touch writing continues to support simultaneous normal touch strokes without palm misclassification.",
            "Stylus and mouse writing remain unchanged while palm eraser is enabled."
          ]
        },
        {
          title: "Whiteboard UI polish",
          items: [
            "Quick Access launcher and AI floating icon were updated to transparent glass-style visuals without changing tap, drag, overlay, or layout behavior.",
            "Pages modal action icons, three-dot menus, add-page icon, clone, select, delete, rename, and close controls now render sharper on large displays.",
            "The Pages modal close style is aligned with the selected production icon treatment.",
            "Main settings tabs use consistent reset-to-default button styling and HD icon rendering across large classroom screens.",
            "Whiteboard settings modal layout was tightened so board visibility, language selection, color picker, and footer controls fit without overflow."
          ]
        },
        {
          title: "Menu, import, templates, and settings",
          items: [
            "Menu Open now launches the same embedded import modal used by import flows, avoiding native picker failures on whiteboard hardware.",
            "Open mode enables all supported file categories while routing .slwb files to board open and other files to their existing import handlers.",
            "Selecting templates with the Select tool now shows the selection action submenu before field editing begins.",
            "Settings now removes duplicate controls already available in tool panels while keeping board visibility, global palette, multi-touch writing, and palm eraser controls.",
            "The embedded Translation Language section reuses the same language registry and preference saving flow as the main app settings."
          ]
        },
        {
          title: "Release and compatibility",
          items: [
            "Current APK and one-file Windows installer links are frozen as v1.0.7 build 8.",
            "Flutter app version now reads 1.0.7+8.",
            "Backend version metadata and API docs are unchanged in this portal-only download update.",
            "Previous v1.0.6, v1.0.5, v1.0.3, v1.0.2, v1.0.1, and v1.0.0 APK and EXE links remain available in release history."
          ]
        },
        {
          title: "Deployment",
          items: [
            "Portal current release data now points to v1.0.7.",
            "Version selector now supports v1.0.7 current with v1.0.6, v1.0.5, v1.0.3, v1.0.2, v1.0.1, and v1.0.0 as previous downloads.",
            "Release data update is isolated to the manifest and static cache references; UI layout and interaction patterns are unchanged."
          ]
        }
      ]
    },
    {
      version: "v1.0.6",
      appVersion: "1.0.6",
      build: "7",
      status: "Previous",
      releaseDate: "2026-05-17",
      title: "Whiteboard production tools and stability release",
      summary:
        "Release bump to v1.0.6 with updated Android APK and one-file Windows installer EXE links, focused on production-grade whiteboard geometry tools, document import coverage, templates, autosave reliability, writing/erasing stability, formula editing, simulations, NCERT books, and reference-zone integrations.",
      artifacts: [
        {
          platform: "Android",
          format: "APK",
          label: "Download Android APK",
          href:
            "https://drive.google.com/file/d/1X9a8kx54W5ysxr-Hw5KOqsJv3X2lH2K1/view?usp=sharing",
          description:
            "Android release build v1.0.6+7 for tablet and mobile classroom whiteboarding."
        },
        {
          platform: "Windows",
          format: "EXE",
          label: "Download Windows EXE",
          href:
            "https://drive.google.com/file/d/1Pn0lAA_dxjsqkZXLcXOTMYnhktIxm7ar/view?usp=sharing",
          description:
            "One-file Windows installer build v1.0.6 for desktop classroom stations and teaching workflows."
        },
        {
          platform: "Softlogic AI",
          format: "Hosted page",
          label: "Open Softlogic AI",
          href: "/softlogic-ai",
          description:
            "Hosted Softlogic AI page retained with the same Vercel project."
        }
      ],
      dashboardMode: "singleUserFriendly",
      dashboardSection: {
        title: "What's included in this current whiteboard build (v1.0.6)",
        items: [
          "Document import now brings all pages into the whiteboard instead of limiting the imported document flow to a partial page set.",
          "Production-grade geometry instruments now include live compass, ruler, protractor, 360 protractor, and right triangle workflows with stable SVG icons and improved handle behavior.",
          "Templates now apply in proper format with cleaner unique template listing, direct apply behavior, and rigid text-field alignment for classroom boards.",
          "Write tools were updated with stroke stability fixes, Smart Write improvements, and safer eraser behavior that only clears the selected area when selection erase is used.",
          "Teaching content now includes PhET simulations, NCERT digital books, formula editor support, and reference-zone third-party integrations.",
          "Local autosave now protects in-progress boards every 60 seconds with safer session recovery and discard/save exit handling.",
          "Settings now let users choose visible whiteboard controls such as minimap, grid, infinite canvas, and related board display options.",
          "Previous versions and their download links remain available in the version selector without any change."
        ]
      },
      noteSections: [
        {
          title: "Whiteboard import and reliability",
          items: [
            "Document import now takes all pages into the whiteboard document flow.",
            "Local autosave now protects in-progress boards every 60 seconds with safer session recovery and discard/save exit handling.",
            "Image and board output improvements include crop persistence with Fit and Full, print page selection, export and print compatibility, and layout-safe rendering.",
            "Settings now let users choose which board controls are visible, including minimap, grid, infinite canvas, and related whiteboard display options."
          ]
        },
        {
          title: "Writing, erasing, templates, and shapes",
          items: [
            "Write tool stroke issues were fixed for smoother board writing.",
            "Smart Write and the write tool family were updated for stronger writing workflows.",
            "Erase selected area behavior was corrected so selection erase only clears the selected area.",
            "Templates now apply in proper format with stable regions, cleaner listing, and aligned editable text areas.",
            "Shape editing was simplified by removing X/Y position fields from the edit shape controls."
          ]
        },
        {
          title: "Teaching content and integrations",
          items: [
            "PhET simulations were added for classroom science and math activities.",
            "NCERT digital books were added for curriculum reference inside the whiteboard workflow.",
            "Reference Zone now includes the third-party integrations added for the current teaching content flow.",
            "Formula editor support was added for math expression creation and rendering."
          ]
        },
        {
          title: "Geometry tools",
          items: [
            "Production whiteboard geometry improvements include live compass, ruler, protractor, 360 protractor, and right triangle workflows.",
            "Geometry tool icons and instrument assets were upgraded for sharper rendering and clearer classroom use.",
            "Ruler-guided drawing and instrument behavior were refined so geometry output stays compatible with save, export, print, and undo/redo."
          ]
        },
        {
          title: "Release and versioning",
          items: [
            "Current APK and one-file Windows installer links are frozen as v1.0.6 build 7.",
            "Flutter app version now reads 1.0.6+7.",
            "Backend version metadata and API docs are unchanged in this portal-only download update.",
            "Previous v1.0.5, v1.0.3, v1.0.2, v1.0.1, and v1.0.0 APK and EXE links remain available in release history."
          ]
        },
        {
          title: "Compatibility",
          items: [
            "The app continues to target the existing testing backend URL.",
            "No auth, dashboard, settings, API docs, or Softlogic AI navigation flow is changed.",
            "Existing historical release downloads remain available through the version selector."
          ]
        },
        {
          title: "Deployment",
          items: [
            "Portal current release data now points to v1.0.6.",
            "Version selector now supports v1.0.6 current with v1.0.5, v1.0.3, v1.0.2, v1.0.1, and v1.0.0 as previous downloads.",
            "Release data update is isolated to the manifest file; UI layout and interaction patterns are unchanged."
          ]
        }
      ]
    },
    {
      version: "v1.0.5",
      appVersion: "1.0.5",
      build: "6",
      status: "Previous",
      releaseDate: "2026-05-13",
      title: "Whiteboard media import and playback release",
      summary:
        "Release bump to v1.0.5 with updated Android APK and one-file Windows installer EXE artifact links while preserving all previous download versions and portal behavior.",
      artifacts: [
        {
          platform: "Android",
          format: "APK",
          label: "Download Android APK",
          href:
            "https://drive.google.com/file/d/1L3RoqDQkqgRqAQvoIB1UmMOs7zCS46zf/view?usp=sharing",
          description:
            "Android release build v1.0.5+6 for tablet and mobile classroom whiteboarding."
        },
        {
          platform: "Windows",
          format: "EXE",
          label: "Download Windows EXE",
          href:
            "https://drive.google.com/file/d/1qsBjt0CDB1CN7emWrWqViY5Qmt7JfiYU/view?usp=sharing",
          description:
            "One-file Windows installer build v1.0.5 for desktop classroom stations and teaching workflows."
        },
        {
          platform: "Softlogic AI",
          format: "Hosted page",
          label: "Open Softlogic AI",
          href: "/softlogic-ai",
          description:
            "Hosted Softlogic AI page retained with the same Vercel project."
        }
      ],
      dashboardMode: "singleUserFriendly",
      dashboardSection: {
        title: "What's included in this current whiteboard build (v1.0.5)",
        items: [
          "Start your flow directly from the whiteboard and continue teaching without extra setup steps.",
          "Drawing, writing, erasing, shapes, and board interaction tools are available for daily classroom use.",
          "Media support is available in the current build, including image, audio, and video usage on the board.",
          "Sticky notes, widgets, and supporting classroom tools are available for planning and live sessions.",
          "Android APK and Windows EXE in this release point to the same current feature-complete whiteboard experience.",
          "Previous versions and their download links remain available in the version selector without any change."
        ]
      },
      noteSections: [
        {
          title: "Current version updates",
          items: [
            "Audio and video imports now use the existing board media insertion flow.",
            "Media Tools audio and video insertion now places selected files directly on the board.",
            "Windows media playback support is included in the installer build.",
            "GIF images continue to animate on the live board.",
            "Notes import continues to insert text into board sticky notes."
          ]
        },
        {
          title: "Release and versioning",
          items: [
            "Current APK and one-file Windows installer links are frozen as v1.0.5 build 6.",
            "Flutter app version remains 1.0.5+6.",
            "Backend version metadata and API docs are unchanged in this portal-only download update.",
            "Previous v1.0.3, v1.0.2, v1.0.1, and v1.0.0 APK and EXE links remain available in release history."
          ]
        },
        {
          title: "Compatibility",
          items: [
            "The app continues to target the existing testing backend URL.",
            "No auth, dashboard, settings, API docs, or Softlogic AI navigation flow is changed.",
            "Existing historical release downloads remain available through the version selector."
          ]
        },
        {
          title: "Deployment",
          items: [
            "Portal current release data now points to v1.0.5.",
            "Version selector now supports v1.0.5 current with v1.0.3, v1.0.2, v1.0.1, and v1.0.0 as previous downloads.",
            "Release data update is isolated to the manifest file; UI layout and interaction patterns are unchanged."
          ]
        }
      ]
    },
    {
      version: "v1.0.3",
      appVersion: "1.0.3",
      build: "4",
      status: "Previous",
      releaseDate: "2026-05-07",
      title: "Whiteboard tool refinements and updated release builds",
      summary:
        "Release bump to v1.0.3 with updated Android APK and Windows EXE artifact links while preserving all previous download versions and portal behavior.",
      artifacts: [
        {
          platform: "Android",
          format: "APK",
          label: "Download Android APK",
          href:
            "https://drive.google.com/file/d/1xcQ0GCYaE3-_Ga0ohK_1zE7ZxHQ2TPtQ/view?usp=sharing",
          description:
            "Android release build v1.0.3+4 for tablet and mobile classroom whiteboarding."
        },
        {
          platform: "Windows",
          format: "EXE",
          label: "Download Windows EXE",
          href:
            "https://drive.google.com/file/d/1YfzYQSiAGK-Wd4khGFb5_p7UTuek7BEi/view?usp=sharing",
          description:
            "Windows release build v1.0.3 for desktop classroom stations and teaching workflows."
        },
        {
          platform: "Softlogic AI",
          format: "Hosted page",
          label: "Open Softlogic AI",
          href: "/softlogic-ai",
          description:
            "Hosted Softlogic AI page retained with the same Vercel project."
        }
      ],
      noteSections: [
        {
          title: "Current version updates",
          items: [
            "Split-screen teaching now includes pane-level write, eraser, select, and shape tools.",
            "Pane-scoped tool panels stay inside the active split pane for cleaner classroom multitasking.",
            "Calendar and flow-chart tool panels were refined for production-ready whiteboard use.",
            "Flow-chart tooling was hardened for robust teacher workflow creation and diagram placement.",
            "Calendar planning tools were upgraded for board-local event preparation and classroom scheduling."
          ]
        },
        {
          title: "Release and versioning",
          items: [
            "Current APK and EXE links are frozen as v1.0.3 build 4.",
            "Backend package and public version metadata now read 1.0.3.",
            "Flutter app version now reads 1.0.3+4.",
            "Previous v1.0.2, v1.0.1, and v1.0.0 APK and EXE links remain available in release history."
          ]
        },
        {
          title: "Compatibility",
          items: [
            "The app continues to target the existing testing backend URL.",
            "No auth, dashboard, settings, API docs, README, or Softlogic AI navigation flow is changed.",
            "Existing historical release downloads remain available through the version selector."
          ]
        },
        {
          title: "Deployment",
          items: [
            "Portal is deployed on the same Vercel alias and URL.",
            "Version selector now supports v1.0.3 current with v1.0.2, v1.0.1, and v1.0.0 as previous downloads.",
            "Release data update is isolated to the manifest file; UI layout and interaction patterns are unchanged."
          ]
        }
      ]
    },
    {
      version: "v1.0.2",
      appVersion: "1.0.2",
      build: "3",
      status: "Previous",
      releaseDate: "2026-05-04",
      title: "Version increment with refreshed APK and EXE",
      summary:
        "Release bump to v1.0.2 with updated Android APK and Windows EXE artifact links while preserving all previous download versions and portal behavior.",
      artifacts: [
        {
          platform: "Android",
          format: "APK",
          label: "Download Android APK",
          href:
            "https://drive.google.com/file/d/1p86i1iJvH5hm21fDaFoUpniCMfMsRwF7/view?usp=sharing",
          description:
            "Android release build v1.0.2+3 for tablet and mobile classroom whiteboarding."
        },
        {
          platform: "Windows",
          format: "EXE",
          label: "Download Windows EXE",
          href:
            "https://drive.google.com/file/d/1MUqAhfaP4ZpQ71eC89YKG3qljMNNlqY6/view?usp=sharing",
          description:
            "Windows release build v1.0.2 for desktop classroom stations and teaching workflows."
        },
        {
          platform: "Softlogic AI",
          format: "Hosted page",
          label: "Open Softlogic AI",
          href: "/softlogic-ai",
          description:
            "Hosted Softlogic AI page retained with the same Vercel project."
        }
      ],
      noteSections: [
        {
          title: "Current version updates",
          items: [
            "This release includes the latest whiteboard UX refinements, platform optimizations, and integration upgrades.",
            "Big-screen responsiveness is improved for toolbar, panels, dialogs, and whiteboard workspace layout.",
            "Toolbar and menu icon assets were refreshed to remove blurry rendering.",
            "Tool cursor behavior now maps correctly to the active drawing and editing tool.",
            "Hardware acceleration support was integrated for smoother writing performance on supported Android devices.",
            "Cloud-storage functionality for Drive, cloud targets, and Dropbox is integrated across app and backend flows.",
            "Cloud provider connection UI is ready; live account authorization still requires project API/OAuth credentials.",
            "Board-size and canvas boundary handling were updated so expanded boards no longer hide content.",
            "Eraser behavior was refined for stable movement tracking and consistent erase sizing while moving.",
            "Drag, move, and drop interactions for icons, toolbar controls, and panel elements were stabilized.",
            "Overlapping issues were fixed across floating panels, selection controls, and geometry overlays.",
            "Geometry instruments and measurement formatting were improved for clearer shape and angle feedback.",
            "Export/import dialogs and storage destination flows were improved for consistent user actions.",
            "Canvas and template rendering pipelines were tuned for better visual consistency and reliability.",
            "System performance and speed were optimized across whiteboard interaction, integrations, and regression test coverage."
          ]
        },
        {
          title: "Release and versioning",
          items: [
            "Current APK and EXE links are frozen as v1.0.2 build 3.",
            "Backend package and public version metadata now read 1.0.2.",
            "Flutter app version now reads 1.0.2+3.",
            "Previous v1.0.1 and v1.0.0 APK and EXE links remain available in release history."
          ]
        },
        {
          title: "Compatibility",
          items: [
            "The app continues to target the existing testing backend URL.",
            "No whiteboard, auth, dashboard, settings, or download-page navigation flow is changed.",
            "Existing API docs, phase status, README, and Softlogic AI links remain available."
          ]
        },
        {
          title: "Deployment",
          items: [
            "Portal is deployed on the same Vercel alias and URL.",
            "Version selector now supports v1.0.2 current with v1.0.1 and v1.0.0 as previous downloads.",
            "Release data update is isolated to the manifest file; UI layout and interaction patterns are unchanged."
          ]
        }
      ]
    },
    {
      version: "v1.0.1",
      appVersion: "1.0.1",
      build: "2",
      status: "Previous",
      releaseDate: "2026-05-01",
      title: "Versioned release portal update",
      summary:
        "Patch release with updated Android APK and Windows EXE links, synchronized backend/frontend version metadata, and a QA-safe access guide for testers.",
      artifacts: [
        {
          platform: "Android",
          format: "APK",
          label: "Download Android APK",
          href:
            "https://drive.google.com/file/d/1WcI0rZdKO2nSHDpxtLYUyxMtToCMQqtU/view?usp=sharing",
          description:
            "Android release build v1.0.1+2 for tablet and mobile classroom whiteboarding."
        },
        {
          platform: "Windows",
          format: "EXE",
          label: "Download Windows EXE",
          href:
            "https://drive.google.com/file/d/1y_3vq8rBxpAXda7UbEp_FyWEtaEzQev5/view?usp=sharing",
          description:
            "Windows release build v1.0.1 for desktop classroom stations and teaching workflows."
        },
        {
          platform: "Softlogic AI",
          format: "Hosted page",
          label: "Open Softlogic AI",
          href: "/softlogic-ai",
          description:
            "Hosted Softlogic AI page retained with the same Vercel project."
        }
      ],
      noteSections: [
        {
          title: "Release and versioning",
          items: [
            "APK and EXE links are frozen as v1.0.1 build 2.",
            "Backend package and public version metadata now read 1.0.1.",
            "Flutter app version now reads 1.0.1+2.",
            "Previous v1.0.0 APK and EXE links remain available in release history."
          ]
        },
        {
          title: "Access guide",
          items: [
            "New Access & Creds tab documents admin email, OTP login flow, fixed QA OTP 1234, and user creation flow.",
            "The public page intentionally excludes infrastructure secrets.",
            "Role-based access continues to come from the user record saved in the backend."
          ]
        },
        {
          title: "Compatibility",
          items: [
            "The app continues to target the existing testing backend URL.",
            "No existing whiteboard, auth, dashboard, settings, or download-page navigation flow is changed.",
            "Existing API docs, phase status, README, and Softlogic AI links remain available."
          ]
        }
      ]
    },
    {
      version: "v1.0.0",
      appVersion: "1.0.0",
      build: "1",
      status: "Previous",
      releaseDate: "2026-04-28",
      title: "First frozen downloadable release",
      summary:
        "Initial frozen APK and Windows EXE release for SoftLogic Whiteboard with versioned links, backend metadata, and client-facing project status.",
      artifacts: [
        {
          platform: "Android",
          format: "APK",
          label: "Download Android APK",
          href:
            "https://drive.google.com/file/d/1qY_sjm3GykYDJ7cFI6XImvpRkO_cfMVB/view?usp=sharing",
          description:
            "Android release build for tablet and mobile classroom whiteboarding."
        },
        {
          platform: "Windows",
          format: "EXE",
          label: "Download Windows EXE",
          href:
            "https://drive.google.com/file/d/1DY-C6fzSlmgKiF9qWwHvmW7veW6bSpNE/view?usp=sharing",
          description:
            "Windows installer for desktop classroom stations and teaching workflows."
        },
        {
          platform: "Softlogic AI",
          format: "Hosted page",
          label: "Open Softlogic AI",
          href: "/softlogic-ai",
          description:
            "Hosted Softlogic AI page retained with the same Vercel project."
        }
      ],
      noteSections: [
        {
          title: "Release and versioning",
          items: [
            "v1.0.0 APK and EXE links remain frozen as build 1.",
            "Backend package version remains 1.0.0 and Swagger metadata reads from the shared version source.",
            "Flutter app version remains 1.0.0+1 with reusable app version constants.",
            "Public version endpoints are available at /api/version and /api/v1/version.",
            "Raw OpenAPI JSON is exposed for portal preview at /api/docs.json."
          ]
        },
        {
          title: "Authentication and access",
          items: [
            "Email login screen, validation, OTP send, OTP verify, resend OTP, expiry handling, and session persistence.",
            "Google sign-in support for mobile/plugin flow and desktop browser OAuth flow.",
            "Refresh token, logout, JWT middleware, role-aware admin routing, and protected API requests."
          ]
        },
        {
          title: "Whiteboard foundation",
          items: [
            "Infinite canvas, pan, zoom, zoom indicator, reset zoom, viewport performance handling, and board frame support.",
            "Pen, pencil, marker, brush, highlighter, laser, rainbow, and dotted pen rendering.",
            "Stroke size presets, custom stroke sizes, color palette, custom color picker, recent colors, and selected tool state.",
            "Pixel, element, selection, and full-canvas eraser flows with adjustable eraser sizes.",
            "Undo, redo, action stack, keyboard shortcut support, object deletion, duplicate/copy, selection, and resizing.",
            "2D shapes, 3D shape entries, geometry instruments, shape color, fill/stroke, angle display, length display, and selection controls.",
            "Text insertion, edit mode, formatting toolbar, font size, font family, color, bold, italic, underline, strikethrough, and alignment controls.",
            "Sticky notes, icon library, icon search, icon insertion, content blocks, widgets, and media-capable board elements.",
            "Slide/page system, thumbnails, add, reorder, delete, duplicate, local document state, and board dirty tracking."
          ]
        },
        {
          title: "Export, save, and platform",
          items: [
            "Manual save, auto-save support, local draft persistence, cloud/export directory dialogs, and export progress states.",
            "PDF export, image export, PNG/JPG paths, export quality, export resolution, and share-after-export workflow.",
            "Android build setup, Android permissions, responsive Android UI handling, app icon, splash assets, and APK artifact.",
            "Windows runner, Windows recording/voice helpers, installer metadata, and EXE artifact."
          ]
        },
        {
          title: "Backend and API",
          items: [
            "Express API with security middleware, CORS, rate limiting, request logging, error middleware, and Swagger docs.",
            "Prisma-backed auth, users, admin, canvas, slides, settings, filter, export, import conversion, live sessions, media, and integrations modules.",
            "Admin organization/user/subscription/activity APIs, logo upload, settings persistence, profanity filtering, and storage services.",
            "Live session APIs for create, start, end, invite, join code verification, messages, media, recordings, share URL, and call token groundwork.",
            "Integration APIs for Google image search, YouTube search, Dropbox OAuth/files/import, LMS status, and LMS sync groundwork."
          ]
        },
        {
          title: "Advanced tool groundwork",
          items: [
            "Live session join flow, socket service, call token handling, message list, media/recording states, and collaboration data models.",
            "Recording service, voice message service, calculator engines, graph engine, periodic table catalog, simulation catalog, browser viewer, split screen, magnifier, spotlight, table, graph, flow chart, mind map, and heat map board widgets.",
            "AI tool UI states and service groundwork for AI assist, smart write, AI pen, lesson generation, quiz generation, summary, translation, text-to-speech, dialogue, media generation, and flashcards.",
            "Dropbox import UI/service, file import conversion, local/cloud storage browser, document import/export service, and media placement."
          ]
        },
      ]
    }
  ],
  swaggerModules: [
    {
      name: "Auth",
      endpoints: [
        "POST /api/v1/auth/send-otp",
        "POST /api/v1/auth/verify-otp",
        "POST /api/v1/auth/resend-otp",
        "POST /api/v1/auth/google",
        "POST /api/v1/auth/google/desktop/start",
        "GET /api/v1/auth/google/desktop/status/{attemptId}",
        "POST /api/v1/auth/refresh",
        "POST /api/v1/auth/logout"
      ]
    },
    {
      name: "Canvas, slides, export",
      endpoints: [
        "GET /api/v1/canvas",
        "POST /api/v1/canvas",
        "PUT /api/v1/canvas/{id}",
        "GET /api/v1/canvas/{id}/slides",
        "POST /api/v1/canvas/{id}/slides",
        "POST /api/v1/export/pdf",
        "POST /api/v1/export/image"
      ]
    },
    {
      name: "Admin, settings, live sessions",
      endpoints: [
        "GET /api/v1/admin/users",
        "GET /api/v1/users/me/settings",
        "POST /api/v1/live-sessions",
        "POST /api/v1/live-sessions/{id}/start",
        "POST /api/v1/live-sessions/join-code/verify",
        "POST /api/v1/media/upload",
        "GET /api/v1/integrations/dropbox/files"
      ]
    }
  ],
  phaseStatus: {
    lastSynced: "2026-04-28",
    phase1Summary: {
      title: "Phase 1 - Core Whiteboarding Foundation",
      taskCount: 115,
      frontendDone: 115,
      backendDone: 38,
      backendNotApplicable: 77,
      status: "Phase 1 frontend complete; backend complete where backend is required."
    },
    phase1TicketsCsv: `P1-001|Authentication & User Management|Email/OTP Login|Design login screen UI with email input field|Done|N/A
P1-002|Authentication & User Management|Email/OTP Login|Implement email validation logic|Done|N/A
P1-003|Authentication & User Management|Email/OTP Login|Create 4-digit OTP generation system|Done|Done
P1-004|Authentication & User Management|Email/OTP Login|Design OTP input screen with 4-digit fields|Done|N/A
P1-005|Authentication & User Management|Email/OTP Login|Implement OTP sending mechanism (email/SMS)|Done|Done
P1-006|Authentication & User Management|Email/OTP Login|Add OTP verification logic with expiry time|Done|Done
P1-007|Authentication & User Management|Email/OTP Login|Implement resend OTP functionality|Done|Done
P1-008|Authentication & User Management|Email/OTP Login|Add session management after successful login|Done|Done
P1-009|Authentication & User Management|Social Authentication|Integrate Google Sign-In SDK|Done|Done
P1-010|Authentication & User Management|Social Authentication|Design social login button on login screen|Done|N/A
P1-011|Authentication & User Management|Social Authentication|Implement Google OAuth authentication flow|Done|Done
P1-012|Authentication & User Management|Social Authentication|Handle Google login success/failure callbacks|Done|Done
P1-013|Authentication & User Management|Social Authentication|Create user profile creation/linking for social login|Done|Done
P1-014|Authentication & User Management|Social Authentication|Add error handling for social login failures|Done|Done
P1-015|Core Drawing & Canvas Features|Infinite Canvas|Implement infinite canvas rendering engine|Done|N/A
P1-016|Core Drawing & Canvas Features|Infinite Canvas|Add pan/scroll functionality for canvas navigation|Done|N/A
P1-017|Core Drawing & Canvas Features|Infinite Canvas|Implement canvas boundary management|Done|N/A
P1-018|Core Drawing & Canvas Features|Infinite Canvas|Add canvas performance optimization (viewport rendering)|Done|N/A
P1-019|Core Drawing & Canvas Features|Drawing Tools - Pen|Implement Pen tool with smooth stroke rendering|Done|N/A
P1-020|Core Drawing & Canvas Features|Drawing Tools - Pencil|Implement Pencil Pen tool with texture effect|Done|N/A
P1-021|Core Drawing & Canvas Features|Drawing Tools - Highlighter|Implement Highlighter tool with transparency|Done|N/A
P1-022|Core Drawing & Canvas Features|Drawing Tools - Laser|Implement Laser Pen tool with fade effect|Done|N/A
P1-023|Core Drawing & Canvas Features|Drawing Tools - Rainbow|Implement Rainbow Pen tool with gradient colors|Done|N/A
P1-024|Core Drawing & Canvas Features|Drawing Tools - Dotted|Implement Dotted Pen tool with dot pattern|Done|N/A
P1-025|Core Drawing & Canvas Features|Tool Customization|Create size selector UI (small, medium, large, custom)|Done|N/A
P1-026|Core Drawing & Canvas Features|Tool Customization|Implement stroke size adjustment logic for all pen tools|Done|N/A
P1-027|Core Drawing & Canvas Features|Tool Customization|Design preset color palette UI (15-20 common colors)|Done|N/A
P1-028|Core Drawing & Canvas Features|Tool Customization|Implement color selection functionality|Done|N/A
P1-029|Core Drawing & Canvas Features|Tool Customization|Integrate color picker component (RGB/HEX selector)|Done|N/A
P1-030|Core Drawing & Canvas Features|Tool Customization|Save user's recent/favorite colors|Done|Done
P1-031|Core Drawing & Canvas Features|Eraser Tools|Implement Pixel Eraser (erases individual pixels)|Done|N/A
P1-032|Core Drawing & Canvas Features|Eraser Tools|Implement Element Eraser (erases complete objects)|Done|N/A
P1-033|Core Drawing & Canvas Features|Eraser Tools|Implement Full Eraser (clear entire canvas)|Done|N/A
P1-034|Core Drawing & Canvas Features|Eraser Tools|Implement eraser size adjustment|Done|N/A
P1-035|Core Drawing & Canvas Features|Editing Functions|Implement Undo functionality with action stack|Done|N/A
P1-036|Core Drawing & Canvas Features|Editing Functions|Implement Redo functionality|Done|N/A
P1-037|Core Drawing & Canvas Features|Editing Functions|Add undo/redo keyboard shortcuts|Done|N/A
P1-038|Core Drawing & Canvas Features|Editing Functions|Implement Zoom In functionality with pinch gesture|Done|N/A
P1-039|Core Drawing & Canvas Features|Editing Functions|Implement Zoom Out functionality|Done|N/A
P1-040|Core Drawing & Canvas Features|Editing Functions|Add zoom level indicator (percentage display)|Done|N/A
P1-041|Core Drawing & Canvas Features|Editing Functions|Implement reset zoom (fit to screen)|Done|N/A
P1-042|Advanced Tools & Text Features|2D Shapes|Implement Rectangle shape tool|Done|N/A
P1-043|Advanced Tools & Text Features|2D Shapes|Implement Circle/Ellipse shape tool|Done|N/A
P1-044|Advanced Tools & Text Features|2D Shapes|Implement Triangle shape tool|Done|N/A
P1-045|Advanced Tools & Text Features|2D Shapes|Implement Line tool|Done|N/A
P1-046|Advanced Tools & Text Features|2D Shapes|Implement Arrow tool|Done|N/A
P1-047|Advanced Tools & Text Features|2D Shapes|Add fill/stroke options for shapes|Done|N/A
P1-048|Advanced Tools & Text Features|2D Shapes|Implement shape color selection|Done|N/A
P1-049|Advanced Tools & Text Features|Text Tools|Implement text insertion on canvas|Done|N/A
P1-050|Advanced Tools & Text Features|Text Tools|Create text formatting toolbar UI|Done|N/A
P1-051|Advanced Tools & Text Features|Text Tools|Add font family selector (10+ fonts)|Done|N/A
P1-052|Advanced Tools & Text Features|Text Tools|Implement font size adjustment|Done|N/A
P1-053|Advanced Tools & Text Features|Text Tools|Add text color picker|Done|N/A
P1-054|Advanced Tools & Text Features|Text Tools|Implement Bold formatting|Done|N/A
P1-055|Advanced Tools & Text Features|Text Tools|Implement Italic formatting|Done|N/A
P1-056|Advanced Tools & Text Features|Text Tools|Implement Underline formatting|Done|N/A
P1-057|Advanced Tools & Text Features|Text Tools|Implement Strikethrough formatting|Done|N/A
P1-058|Advanced Tools & Text Features|Text Tools|Add text alignment (Left, Center, Right, Justify)|Done|N/A
P1-059|Advanced Tools & Text Features|Text Tools|Implement text editing mode (double-tap to edit)|Done|N/A
P1-060|Canvas Management & Organization|Object Manipulation|Implement object grouping functionality|Done|N/A
P1-061|Canvas Management & Organization|Object Manipulation|Implement ungroup functionality|Done|N/A
P1-062|Canvas Management & Organization|Object Manipulation|Add rotate gesture and button for objects|Done|N/A
P1-063|Canvas Management & Organization|Object Manipulation|Implement resize handles for objects|Done|N/A
P1-064|Canvas Management & Organization|Object Manipulation|Add crop functionality for images/objects|Done|N/A
P1-065|Canvas Management & Organization|Object Manipulation|Implement object deletion|Done|N/A
P1-066|Canvas Management & Organization|Object Manipulation|Add duplicate/copy object functionality|Done|N/A
P1-067|Canvas Management & Organization|Layering & Organization|Implement layer management system|Done|N/A
P1-068|Canvas Management & Organization|Layering & Organization|Add "Bring to Front" functionality|Done|N/A
P1-069|Canvas Management & Organization|Layering & Organization|Add "Send to Back" functionality|Done|N/A
P1-070|Canvas Management & Organization|Layering & Organization|Add "Bring Forward" functionality|Done|N/A
P1-071|Canvas Management & Organization|Layering & Organization|Add "Send Backward" functionality|Done|N/A
P1-072|Canvas Management & Organization|Layering & Organization|Create layer panel UI|Done|N/A
P1-073|Canvas Management & Organization|Slide Management|Implement slide/page system|Done|Done
P1-074|Canvas Management & Organization|Slide Management|Add "Add New Slide" functionality|Done|Done
P1-075|Canvas Management & Organization|Slide Management|Create slide thumbnail navigation|Done|Done
P1-076|Canvas Management & Organization|Slide Management|Implement slide reordering (drag & drop)|Done|Done
P1-077|Canvas Management & Organization|Slide Management|Add slide deletion with confirmation|Done|Done
P1-078|Canvas Management & Organization|Slide Management|Implement slide duplication|Done|Done
P1-079|Core task|Additional Tools|Create sticky note customization (colors, sizes)|Done|N/A
P1-080|Settings & Customization|Additional Tools|Add icon library/picker|Done|N/A
P1-081|Settings & Customization|Additional Tools|Implement icon insertion on canvas|Done|N/A
P1-082|Settings & Customization|Additional Tools|Create icon search functionality|Done|N/A
P1-083|Settings & Customization|Content Filtering|Integrate profanity filter library|Done|Done
P1-084|Settings & Customization|Content Filtering|Apply profanity filter to text inputs|Done|Done
P1-085|Settings & Customization|Content Filtering|Add profanity filter enable/disable setting|Done|Done
P1-086|Settings & Customization|Content Filtering|Create filtered words replacement logic|Done|Done
P1-087|Settings & Customization|App Settings|Create settings screen UI|Done|N/A
P1-088|Settings & Customization|App Settings|Implement timezone selection dropdown|Done|Done
P1-089|Settings & Customization|App Settings|Add automatic timezone detection|Done|Done
P1-090|Settings & Customization|App Settings|Implement language selection (multi-language support)|Done|Done
P1-091|Settings & Customization|App Settings|Add language resource files (English, Spanish, etc.)|Done|Done
P1-092|Settings & Customization|App Settings|Create performance settings panel|Done|Done
P1-093|Settings & Customization|App Settings|Add quality/performance toggles (low, medium, high)|Done|N/A
P1-094|Settings & Customization|App Settings|Implement settings persistence (save user preferences)|Done|Done
P1-095|Export & Platform Support|Save Functionality|Implement auto-save functionality (every 30 seconds)|Done|Done
P1-096|Export & Platform Support|Save Functionality|Add manual save button|Done|Done
P1-097|Export & Platform Support|Save Functionality|Create save progress indicator|Done|Done
P1-098|Export & Platform Support|Save Functionality|Implement local storage for drafts|Done|N/A
P1-099|Export & Platform Support|Save Functionality|Add cloud sync functionality (optional)|Done|Done
P1-100|Export & Platform Support|Export Options|Implement PDF export functionality|Done|Done
P1-101|Export & Platform Support|Export Options|Add PDF export quality settings|Done|Done
P1-102|Export & Platform Support|Export Options|Implement PNG image export|Done|Done
P1-103|Export & Platform Support|Export Options|Implement JPG image export|Done|Done
P1-104|Export & Platform Support|Export Options|Add export resolution selector|Done|Done
P1-105|Export & Platform Support|Export Options|Create export progress dialog|Done|Done
P1-106|Export & Platform Support|Export Options|Add share functionality after export|Done|Done
P1-107|Export & Platform Support|Android Build|Setup Android development environment|Done|N/A
P1-108|Export & Platform Support|Android Build|Configure Android build settings (minSDK, targetSDK)|Done|N/A
P1-109|Export & Platform Support|Android Build|Implement Android-specific UI adaptations|Done|N/A
P1-110|Export & Platform Support|Android Build|Add Android permissions (storage, camera, etc.)|Done|N/A
P1-111|Export & Platform Support|Android Build|Optimize performance for various Android devices|Done|N/A
P1-112|Export & Platform Support|Android Build|Test on multiple Android versions (10, 11, 12, 13+)|Done|N/A
P1-113|Export & Platform Support|Android Build|Create Android app icon and splash screen|Done|N/A
P1-114|Export & Platform Support|Android Build|Generate signed APK/AAB for release|Done|N/A
P1-115|Export & Platform Support|Android Build|Setup Google Play Store listing|Done|N/A`,
    completedOtherPhaseTickets: [
      ["Phase 2", "COM-002", "Text Chat", "Implement real-time messaging UI", "Done", "Done"],
      ["Phase 2", "COM-003", "Text Chat", "Setup WebSocket / real-time server", "N/A", "Done"],
      ["Phase 2", "COM-005", "Audio Chat", "Integrate WebRTC for audio calling", "Done", "Done"],
      ["Phase 2", "CM-002", "Insert Images & Videos", "Implement file upload component", "Done", "N/A"],
      ["Phase 2", "CM-003", "Insert Images & Videos", "Backend API for media storage", "N/A", "Done"],
      ["Phase 2", "CM-004", "Google Image Search", "Integrate Google Image Search API", "N/A", "Done"],
      ["Phase 2", "CM-005", "YouTube Video Search", "Integrate YouTube API for video search", "N/A", "Done"],
      ["Phase 2", "CM-007", "File Import", "Implement file parser and preview", "Done", "Done"],
      ["Phase 2", "INT-003", "Dropbox", "Dropbox API integration", "Done", "Done"],
      ["Phase 2", "INT-004", "LMS Integration", "Define LMS API structure", "N/A", "Done"],
      ["Phase 2", "INT-005", "LMS Integration", "Implement LMS sync logic", "N/A", "Done"],
      ["Phase 2", "REC-002", "Screen Recording", "Implement local screen recording", "Done", "N/A"],
      ["Phase 2", "REC-004", "Public Link", "Generate shareable public URL", "Done", "Done"],
      ["Phase 2", "REC-005", "Email Participants", "Email automation for session sharing", "N/A", "Done"],
      ["Phase 2", "AI-002", "ChatGPT Integration", "Integrate content assist service", "Done", "N/A"],
      ["Phase 2", "AI-003", "ChatGPT Integration", "Implement prompt handling and response rendering", "Done", "N/A"],
      ["Phase 2", "PLT-001", "Windows Initialization", "Setup Windows deployment architecture", "Done", "N/A"],
      ["Phase 3", "TUT-002.1", "Timer & Stopwatch", "Implement countdown logic", "Done", "N/A"],
      ["Phase 3", "TUT-002.2", "Timer & Stopwatch", "Implement stopwatch increment logic", "Done", "N/A"],
      ["Phase 3", "TUT-003.1", "Calculator", "Create calculator UI layout", "Done", "N/A"],
      ["Phase 3", "TUT-003.2", "Calculator", "Implement basic operations", "Done", "N/A"],
      ["Phase 3", "TUT-003.3", "Calculator", "Implement scientific functions", "Done", "N/A"],
      ["Phase 3", "TUT-003.5", "Calculator", "Add calculation history panel", "Done", "N/A"],
      ["Phase 3", "ORG-004.1", "Mind Map / Flow Chart", "Design drag-drop node UI", "Done", "N/A"],
      ["Phase 3", "ORG-005.1", "Mind Map / Flow Chart", "Implement node creation logic", "Done", "N/A"],
      ["Phase 3", "ORG-005.2", "Mind Map / Flow Chart", "Implement drag and reposition", "Done", "N/A"],
      ["Phase 3", "ORG-005.3", "Mind Map / Flow Chart", "Implement link connection logic", "Done", "N/A"],
      ["Phase 3", "MAT-002.1", "Protractor / Ruler", "Implement angle detection logic", "Done", "N/A"],
      ["Phase 3", "MAT-002.2", "Protractor / Ruler", "Implement object rotation logic", "Done", "N/A"],
      ["Phase 3", "WHT-002.1", "Split Screen", "Create dual rendering engine", "Done", "N/A"],
      ["Phase 3", "ANA-002.5", "Heatmaps", "Generate heatmap overlay rendering", "Done", "N/A"],
      ["Phase 4", "AI-REC-002.1", "AI Pen", "Capture stroke coordinate data", "Done", "N/A"],
      ["Phase 4", "AI-REC-002.2", "AI Pen", "Convert strokes into vector format", "Done", "N/A"],
      ["Phase 4", "AI-REC-002.5", "AI Pen", "Replace handwritten content with recognized object", "Done", "N/A"],
      ["Phase 4", "AI-REC-006.3", "Formula & Graph Generation", "Integrate 2D graph rendering engine", "Done", "N/A"],
      ["Phase 4", "AI-LESS-002.2", "AI Lesson Preparation", "Generate structured lesson outline", "Done", "N/A"],
      ["Phase 4", "AI-LESS-003.1", "AI Quiz Generation", "Generate MCQ questions", "Done", "N/A"],
      ["Phase 4", "AI-AUTO-002.4", "AI Summary", "Display summarized output", "Done", "N/A"],
      ["Phase 4", "AI-INT-002.2", "AI Dialogue Assistant", "Process AI conversational response", "Done", "N/A"],
      ["Phase 4", "AI-LANG-001.2", "Real-time Translation", "Translate text in real-time", "Done", "N/A"],
      ["Phase 4", "AI-LANG-002.1", "Text-to-Speech", "Convert selected text to speech", "Done", "N/A"],
      ["Phase 5", "5.1.5", "3D Shapes", "Implement shape insertion on whiteboard", "Done", "N/A"],
      ["Phase 5", "5.1.6", "3D Shapes", "Enable drag, rotate and zoom interactions", "Done", "N/A"],
      ["Phase 5", "5.3.1", "PHET", "Develop simulation embed module", "Done", "N/A"],
      ["Phase 5", "5.7.1", "Web Search", "Develop in-app browser engine", "Done", "N/A"],
      ["Phase 5", "5.9.2", "Math Expression Editor", "Implement real-time formula preview", "Done", "N/A"],
      ["Phase 6", "6.7.1", "Profanity & Safety Filters", "Develop real-time profanity detection engine", "Done", "Done"],
      ["Phase 6", "6.8.3", "Sync", "Develop real-time sync engine", "Done", "Done"],
      ["Phase 6", "6.9.1", "Multi-OS Optimization", "Optimize performance for Windows", "Done", "N/A"]
    ]
  },
  readmeMarkdown: `# SoftLogic Whiteboard

![Release](https://img.shields.io/badge/release-v1.0.11-123e8b)
![Build](https://img.shields.io/badge/build-12-117a65)
![Flutter](https://img.shields.io/badge/flutter-1.0.11%2B12-02569B)
![Backend](https://img.shields.io/badge/backend-Node.js%20Express-111827)
![Platforms](https://img.shields.io/badge/platforms-Android%20%7C%20Windows-5f6f89)

SoftLogic Whiteboard is a classroom-focused digital whiteboard platform for teaching, drawing, presenting, exporting, live-session groundwork, content preparation, integrations, and AI-assisted education workflows. This download portal publishes the current v1.0.11 release artifacts together with preserved v1.0.10, v1.0.9, v1.0.8, v1.0.7, v1.0.6, v1.0.5, v1.0.3, v1.0.2, v1.0.1, and v1.0.0 downloads, API reference, development phase status, and release documentation.

## Release Summary

| Field | Value |
| --- | --- |
| Release | v1.0.11 |
| App version | 1.0.11+12 |
| Build | 12 |
| Release date | 2026-05-30 |
| Android artifact | APK release link is available on the Downloads tab |
| Windows artifact | EXE release link is available on the Downloads tab |
| Softlogic AI | Hosted under the same Vercel portal |
| Backend API | Production backend and OpenAPI reference are available on the API Docs tab |

## What This Release Provides

- Production download hub for Android APK and Windows EXE artifacts.
- Static release manifest used by the portal for version, artifact, access guide, phase, API, and README data.
- In-page OpenAPI preview for the backend reference.
- Phase status tables showing code-evidence progress without changing backend data flow.
- Hosted Softlogic AI page retained inside the same Vercel project.

## Product Capabilities

SoftLogic Whiteboard includes a Flutter application designed for education workflows:

- Infinite whiteboard canvas with pan, zoom, reset zoom, viewport performance handling, and board frame support.
- Drawing tools including pen, pencil, marker, brush, highlighter, laser, rainbow pen, and dotted pen.
- Eraser modes for pixel, element, selected content, and full-canvas clearing.
- 2D shape tools, 3D shape entries, geometry instruments, fill and stroke controls, and selection handling.
- Text tools with formatting, font family, font size, color, bold, italic, underline, strikethrough, and alignment.
- Sticky notes, icon insertion, widgets, media-ready elements, calculator, graph, timer, browser, simulations, and AI tool panels.
- Slide/page management with thumbnails, add, duplicate, reorder, delete, and local document state.
- Export flows for PDF, PNG, JPG, quality settings, progress states, and share-after-export workflow.

## Platform Support

| Platform | Status |
| --- | --- |
| Android | APK release available |
| Windows | EXE installer release available |
| Web portal | Static Vercel download and documentation portal |
| Backend API | Node.js and Express API hosted separately |

## Frontend Architecture

- Flutter application using Riverpod for state management, GoRouter for navigation, Dio for API access, Hive/local storage for persistence, and secure storage for protected session data.
- Feature areas include authentication, dashboard, admin, settings, whiteboard, export, integrations, live session, and advanced whiteboard tools.
- Shared app foundation includes theme tokens, typography, spacing, platform-aware widgets, network interceptors, runtime configuration, localization, and validation utilities.

## Backend Architecture

- Node.js and Express backend with Prisma, PostgreSQL support, Redis-ready services, JWT auth, OTP login, Google auth, Swagger/OpenAPI docs, admin APIs, user APIs, canvas APIs, slide APIs, settings APIs, filter APIs, media APIs, export APIs, live-session APIs, and integration APIs.
- Public version endpoints are exposed through /api/version and /api/v1/version.
- API documentation is available through the backend docs endpoint and the bundled portal preview.

## Release Portal Structure

| File | Purpose |
| --- | --- |
| index.html | Static shell, tabs, and accessible portal layout |
| portal.js | Data rendering, tab behavior, Swagger preview, phase tables, README rendering, and scroll-to-top behavior |
| release-manifest.js | Single static data source for releases, downloads, access guide, API links, phase status, README, and project metadata |
| styles.css | Responsive glass-style UI, typography, spacing, tables, and cards |
| swagger/openapi-v1.0.0.json | Bundled OpenAPI JSON used by the in-page API preview |
| softlogic-ai | Hosted Softlogic AI page inside the same Vercel project |

## Local Setup

\`\`\`bash
# Download portal
cd softlogic_download_page
npx vercel build --prod
npx vercel --prod --yes

# Flutter app checks
cd flutter_app_softlogic
flutter pub get
flutter analyze --no-pub
flutter test

# Backend checks
cd backend_softlogic
npm install
npm run build
npm test
\`\`\`

## Release Maintenance

1. Keep existing v1.0.11, v1.0.10, v1.0.9, v1.0.8, v1.0.7, v1.0.6, v1.0.5, v1.0.3, v1.0.2, v1.0.1, and v1.0.0 artifact links frozen while publishing v1.0.12 beta as the current release.
2. Add every future APK or EXE as a new release record instead of overwriting old release records.
3. Update portal version metadata, release notes, API docs, phase status, and README together when a new release is published.
4. Deploy backend changes first when API metadata changes, then deploy the portal.
5. Verify the production alias after deployment: https://softlogicdownloadpage.vercel.app/

## Verification Checklist

- Downloads tab has current Android APK, Windows EXE, and Softlogic AI actions.
- Downloads tab shows AI setup keys with reveal and copy controls for v1.0.11.
- Access & Creds tab documents the QA-safe admin email, OTP, fixed OTP, and user creation flow without infrastructure secrets.
- API Docs tab renders the bundled OpenAPI preview or a fallback link.
- Phase Status tab renders Phase 1 and other-phase tables without duplicate status summary tags.
- README tab renders this documentation from the static manifest.
- The production Vercel alias points to the latest ready deployment.`,
  structureTree: {
    name: "SoftLogic v1.0.11",
    meta: "Versioned release snapshot",
    children: [
      {
        name: "backend_softlogic",
        meta: "Node.js, Express, Prisma, Swagger API",
        children: [
          {
            name: "src",
            meta: "Application entry and API wiring",
            children: [
              { name: "app.ts", meta: "Express app, middleware, docs, health, version, API routes" },
              { name: "index.ts", meta: "Server bootstrap" },
              {
                name: "config",
                meta: "Environment, database, CORS, Redis, Swagger, version",
                children: [
                  { name: "env.ts" },
                  { name: "database.ts" },
                  { name: "cors.ts" },
                  { name: "redis.ts" },
                  { name: "swagger.ts" },
                  { name: "version.ts" },
                  { name: "tests/version.test.ts" }
                ]
              },
              {
                name: "modules",
                meta: "Feature API boundaries",
                children: [
                  { name: "auth", meta: "OTP, JWT, Google sign-in, desktop OAuth, refresh/logout" },
                  { name: "users", meta: "Current user, profile, user context" },
                  { name: "admin", meta: "Organizations, users, subscriptions, upload logo" },
                  { name: "canvas", meta: "Canvas CRUD and ownership" },
                  { name: "slides", meta: "Slide CRUD and ordering" },
                  { name: "export", meta: "PDF/image export and import conversion" },
                  { name: "settings", meta: "App preference persistence" },
                  { name: "filter", meta: "Profanity/content filter endpoint" },
                  { name: "live-sessions", meta: "Sessions, invites, join codes, messages, media, calls" },
                  { name: "media", meta: "Media upload service" },
                  { name: "integrations", meta: "Google images, YouTube, Dropbox, LMS integration endpoints" }
                ]
              },
              {
                name: "shared",
                meta: "Cross-cutting API utilities",
                children: [
                  { name: "middleware", meta: "Auth, error, logger, rate limit, upload, validation" },
                  { name: "services", meta: "Cloudinary and file storage" },
                  { name: "utils", meta: "Access control, response, crypto, email, file, JWT, OTP, pagination" },
                  { name: "errors", meta: "App, auth, validation errors" },
                  { name: "types", meta: "API, common, Express, vendor typings" }
                ]
              },
              { name: "sockets", meta: "Socket server and live-collaboration hooks" }
            ]
          },
          {
            name: "prisma",
            meta: "Database schema and migrations",
            children: [
              { name: "schema.prisma" },
              { name: "migrations" }
            ]
          },
          {
            name: "public API metadata",
            meta: "Release and Swagger endpoints",
            children: [
              { name: "GET /api/version" },
              { name: "GET /api/v1/version" },
              { name: "GET /api/docs" },
              { name: "GET /api/docs.json" },
              { name: "GET /api/v1/docs.json" }
            ]
          }
        ]
      },
      {
        name: "flutter_app_softlogic",
        meta: "Flutter Android and Windows app",
        children: [
          {
            name: "lib",
            meta: "Application source",
            children: [
              { name: "main.dart" },
              { name: "app.dart" },
              { name: "bootstrap.dart" },
              {
                name: "core",
                meta: "Shared app foundation",
                children: [
                  { name: "constants", meta: "API, app, canvas, storage, version constants" },
                  { name: "network", meta: "Dio client, API client, runtime config, auth/error/logging interceptors" },
                  { name: "router", meta: "GoRouter routes and guards" },
                  { name: "session", meta: "App session and bridge" },
                  { name: "storage", meta: "Hive, local, secure storage" },
                  { name: "theme", meta: "Colors, typography, spacing, shadows, theme" },
                  { name: "l10n", meta: "Localized ARB and generated localizations" },
                  { name: "utils", meta: "Extensions, platform, responsive layout, validators" }
                ]
              },
              {
                name: "features",
                meta: "User-facing app modules",
                children: [
                  { name: "auth", meta: "Local/remote data sources, repository, providers, login, OTP, welcome, legal screens" },
                  { name: "dashboard", meta: "Teacher/student dashboard, canvas list, dashboard settings" },
                  { name: "admin", meta: "Admin panel, organization, user, subscription sections" },
                  { name: "settings", meta: "Remote app preferences and providers" },
                  { name: "whiteboard", meta: "Drawing domain, controller, screen, tools, panels, overlays, canvas, export/import, AI, browser, simulations" },
                  { name: "live_session", meta: "Join session, call, socket, remote data source, provider" },
                  { name: "integrations", meta: "Dropbox models, service, provider, import dialog" },
                  { name: "export" },
                  { name: "media" },
                  { name: "ai_tools" },
                  { name: "assessments" },
                  { name: "chat" },
                  { name: "marketplace" },
                  { name: "simulations" }
                ]
              },
              {
                name: "shared",
                meta: "Reusable models and widgets",
                children: [
                  { name: "models/result.dart" },
                  { name: "widgets/app_button.dart" },
                  { name: "widgets/app_error_widget.dart" },
                  { name: "widgets/app_loading.dart" },
                  { name: "widgets/app_text_field.dart" },
                  { name: "widgets/platform_aware_widget.dart" }
                ]
              }
            ]
          },
          {
            name: "platforms",
            meta: "Release targets",
            children: [
              { name: "android", meta: "APK target" },
              { name: "windows", meta: "EXE target and installer metadata" }
            ]
          }
        ]
      },
      {
        name: "softlogic_download_page",
        meta: "Static Vercel release portal",
        children: [
          { name: "index.html", meta: "Accessible tabs and portal shell" },
          { name: "release-manifest.js", meta: "Single static source for releases, notes, phases, README, structure" },
          { name: "portal.js", meta: "Tabs, Swagger preview, phase tables, README renderer, structure tree" },
          { name: "styles.css", meta: "Responsive production layout" },
          { name: "swagger/openapi-v1.0.0.json", meta: "Bundled v1.0.0 Swagger preview spec" },
          { name: "softlogic-ai", meta: "Hosted Softlogic AI information page" }
        ]
      },
      {
        name: "release-artifacts",
        meta: "Versioned downloadable links with historical support",
        children: [
          { name: "SoftLogic APK v1.0.17" },
          { name: "SoftLogic Windows EXE v1.0.17" },
          { name: "AI Smart Board APK v1.0.17" },
          { name: "AI Smart Board Windows EXE v1.0.17" },
          { name: "Softlogic AI v1.0.17 using existing hosted page" },
          { name: "Android APK v1.0.15 build 16" },
          { name: "Windows EXE v1.0.15 build 16" },
          { name: "Android APK v1.0.14 build 15" },
          { name: "Windows EXE v1.0.14 build 15" },
          { name: "Android APK v1.0.13 build 14" },
          { name: "Windows EXE v1.0.13 build 14" },
          { name: "Android APK v1.0.11 build 12" },
          { name: "Windows EXE v1.0.11 build 12" },
          { name: "Android APK v1.0.10 build 11" },
          { name: "Windows EXE v1.0.10 build 11" },
          { name: "Android APK v1.0.9 build 10" },
          { name: "Windows EXE v1.0.9 build 10" },
          { name: "Android APK v1.0.8 build 9" },
          { name: "Windows EXE v1.0.8 build 9" },
          { name: "Android APK v1.0.7 build 8" },
          { name: "Windows EXE v1.0.7 build 8" },
          { name: "Android APK v1.0.6 build 7" },
          { name: "Windows EXE v1.0.6 build 7" },
          { name: "Android APK v1.0.5 build 6" },
          { name: "Windows EXE v1.0.5 build 6" },
          { name: "Android APK v1.0.3 build 4" },
          { name: "Windows EXE v1.0.3 build 4" },
          { name: "Android APK v1.0.2 build 3" },
          { name: "Windows EXE v1.0.2 build 3" },
          { name: "Android APK v1.0.1 build 2" },
          { name: "Windows EXE v1.0.1 build 2" },
          { name: "Android APK v1.0.0 build 1" },
          { name: "Windows EXE v1.0.0 build 1" },
          { name: "Softlogic AI hosted page" }
        ]
      },
      {
        name: "version metadata",
        meta: "Shared version source across backend, Flutter, and portal",
        children: [
          { name: "Backend package/version metadata: unchanged in this download update" },
          { name: "Flutter pubspec/app constants: 1.0.17+18 artifacts published for both branded v1.0.17 builds" },
          { name: "Portal current version: v1.0.17 current release" }
        ]
      }
    ]
  }
};

(function () {
  const manifest = window.SOFTLOGIC_RELEASE_MANIFEST;
  if (!manifest) {
    return;
  }

  const baseRelease = manifest.releases.find((release) => release.version === "v1.0.12");

  if (!baseRelease || manifest.releases.some((release) => release.version === "v1.0.17")) {
    return;
  }

  const previousRelease = {
    ...baseRelease,
    version: "v1.0.13",
    appVersion: "1.0.13",
    build: "14",
    status: "Previous",
    releaseType: "Previous",
    releaseDate: "2026-06-02",
    title: "Dotted drawing, settings sliders, and scoped storage verification release",
    summary:
      "Release bump to v1.0.13 with updated Android APK and Windows EXE links. Softlogic AI and Admin actions keep their existing hosted links.",
    artifacts: baseRelease.artifacts.map((artifact) => ({
      ...artifact,
      href:
        artifact.platform === "Android"
          ? "https://drive.google.com/file/d/1z28Blu86LT1UMCX_IAKEFSzT5kvhvlT6/view?usp=sharing"
          : artifact.platform === "Windows"
            ? "https://drive.google.com/file/d/1rHE22VPZDz-MlWzIxWeMS-p8qzGFMgPs/view?usp=sharing"
            : artifact.href,
      description: artifact.description
        .replaceAll("v1.0.12", "v1.0.13")
        .replaceAll("1.0.12", "1.0.13"),
    })),
    betaBanner: undefined,
    aiSetup: {
      ...baseRelease.aiSetup,
      title: "AI features setup for v1.0.13",
    },
    dashboardSection: {
      title: "What's included in this whiteboard build (v1.0.13)",
      items: [
        "Interactive pen and eraser settings sliders UI layout polish.",
        "Refined canvas painter dotted pen drawing paths and gesture-based recognition.",
        "Integrated secure storage verification flows and Scoped Storage directory checks.",
        "Polished cloud integration dialogs and custom whiteboard file picker filters.",
        "Expanded automated test suites covering dotted pens, export flows, and screen bounds."
      ],
    },
    noteSections: [
      {
        title: "Whiteboard Drawing & Canvas",
        items: [
          "Optimized canvas painter stroke rendering paths and drawing controller states.",
          "Enhanced dotted pen drawing logic, coordinate allocations, and stroke continuities.",
          "Updated pen_settings_panel.dart and eraser_settings_panel.dart with custom slider UI inputs.",
          "Polished whiteboard_minimap.dart zooming and bounds tracking persistences."
        ]
      },
      {
        title: "Storage & File System",
        items: [
          "Added storage_access_service.dart and updated bootstrap.dart for Scoped Storage directory checks.",
          "Polished MainActivity.kt Kotlin adjustments for scoped folder validations.",
          "Refined whiteboard_export_service.dart and export_destination_dialog.dart validation guides.",
          "Updated whiteboard_file_picker.dart filtering and folder loader hooks."
        ]
      },
      {
        title: "Cloud & UI Polish",
        items: [
          "Polished cloud_import_dialog.dart Dropbox and GDrive integration preview guides.",
          "Refined shape_geometry.dart, geometry_panel.dart, and shape_panel.dart classifications."
        ]
      },
      {
        title: "Testing Suites & Verification",
        items: [
          "Added comprehensive test suites: whiteboard_dots_pen_test.dart and whiteboard_export_ui_test.dart.",
          "Added automated verification for whiteboard_import_ui_test.dart and geometry_panel_test.dart.",
          "Portal downloads point to v1.0.13 APK while preserving stable v1.0.11 history."
        ]
      }
    ],
  };

  const releasev1014 = {
    ...previousRelease,
    version: "v1.0.14",
    appVersion: "1.0.14",
    build: "15",
    status: "Previous",
    releaseType: "Previous",
    releaseDate: "2026-06-04",
    summary:
      "Release bump to v1.0.14 with updated Android APK and Windows EXE links. Softlogic AI and Admin actions keep their existing hosted links.",
    artifacts: previousRelease.artifacts.map((artifact) => ({
      ...artifact,
      href:
        artifact.platform === "Android"
          ? "https://drive.google.com/file/d/1Vy_YW8zIybhsmCi2CS5Qw-VYu8fZ87qh/view?usp=sharing"
          : artifact.platform === "Windows"
            ? "https://drive.google.com/file/d/1VsemDgUMaxMI_lJDKEIBzQsC9SUy5Wkp/view?usp=sharing"
            : artifact.href,
      description: artifact.description
        .replaceAll("v1.0.13", "v1.0.14")
        .replaceAll("1.0.13", "1.0.14"),
    })),
    betaBanner: undefined,
    aiSetup: {
      ...previousRelease.aiSetup,
      title: "AI features setup for v1.0.14",
    },
    dashboardSection: {
      ...previousRelease.dashboardSection,
      title: "What's included in this whiteboard build (v1.0.14)",
    },
    noteSections: previousRelease.noteSections.map((section) => ({
      ...section,
      items: section.items.map((item) =>
        item.replaceAll("v1.0.13", "v1.0.14")
      ),
    })),
  };

  const releasev1015 = {
    ...releasev1014,
    version: "v1.0.15",
    appVersion: "1.0.15",
    build: "16",
    status: "Previous",
    releaseType: "Previous",
    releaseDate: "2026-06-04",
    summary:
      "Release bump to v1.0.15 with updated Android APK and Windows EXE links. Softlogic AI and Admin actions keep their existing hosted links.",
    artifacts: releasev1014.artifacts.map((artifact) => ({
      ...artifact,
      href:
        artifact.platform === "Android"
          ? "https://drive.google.com/file/d/18n78IZqud6I0eOVIkd4ZDCebXeMNinDN/view?usp=sharing"
          : artifact.platform === "Windows"
            ? "https://drive.google.com/file/d/1rHYT3xybtPG8BEv5LRaISuEWxcJInLk5/view?usp=sharing"
            : artifact.href,
      description: artifact.description
        .replaceAll("v1.0.14", "v1.0.15")
        .replaceAll("1.0.14", "1.0.15"),
    })),
    betaBanner: undefined,
    aiSetup: {
      ...releasev1014.aiSetup,
      title: "AI features setup for v1.0.15",
    },
    dashboardSection: {
      ...releasev1014.dashboardSection,
      title: "What's included in this whiteboard build (v1.0.15)",
    },
    noteSections: releasev1014.noteSections.map((section) => ({
      ...section,
      items: section.items.map((item) =>
        item.replaceAll("v1.0.14", "v1.0.15")
      ),
    })),
  };

  const releasev1016 = {
    ...releasev1015,
    version: "v1.0.16",
    appVersion: "1.0.16",
    build: "17",
    status: "Previous",
    releaseType: "Previous",
    releaseDate: "2026-06-06",
    summary:
      "Release bump to v1.0.16 with updated Android APK and Windows EXE links. Softlogic AI and Admin actions keep their existing hosted links.",
    artifacts: releasev1015.artifacts.map((artifact) => ({
      ...artifact,
      href:
        artifact.platform === "Android"
          ? "https://drive.google.com/file/d/1EcoPrA0qvp0HQX-qWzAKniuF38Oks2bF/view?usp=sharing"
          : artifact.platform === "Windows"
            ? "https://drive.google.com/file/d/1CcvzGCZki3nckowYQgRs6wrMPqSTWgUe/view?usp=sharing"
            : artifact.href,
      description: artifact.description
        .replaceAll("v1.0.15", "v1.0.16")
        .replaceAll("1.0.15", "1.0.16"),
    })),
    betaBanner: undefined,
    aiSetup: {
      ...releasev1015.aiSetup,
      title: "AI features setup for v1.0.16",
    },
    dashboardSection: {
      ...releasev1015.dashboardSection,
      title: "What's included in this whiteboard build (v1.0.16)",
    },
    noteSections: releasev1015.noteSections.map((section) => ({
      ...section,
      items: section.items.map((item) =>
        item.replaceAll("v1.0.15", "v1.0.16")
      ),
    })),
  };

  const releasev1017 = {
    ...releasev1016,
    version: "v1.0.17",
    appVersion: "1.0.17",
    build: "18",
    status: "Previous",
    releaseType: "Previous",
    releaseDate: "2026-06-08",
    lastUpdatedAt: "2026-06-09 11:51 AM IST",
    summary:
      "Current v1.0.17 release with separate SoftLogic and AI Smart Board Android APK and Windows installer downloads. Softlogic AI and Admin actions keep their existing hosted links.",
    artifacts: [
      {
        platform: "SoftLogic Android",
        format: "APK",
        label: "Download SoftLogic APK",
        href:
          "https://drive.google.com/file/d/1BYjb9Z1sinWfG4Ai8mJrHM-ulnjL7ZHO/view?usp=sharing",
        description:
          "SoftLogic Android release build v1.0.17 for tablet, mobile, and whiteboard hardware classroom use."
      },
      {
        platform: "SoftLogic Windows",
        format: "EXE",
        label: "Download SoftLogic EXE",
        href:
          "https://drive.google.com/file/d/10-fn_L5KueJ1mY9uymoCzIRMa5qgKqCy/view?usp=sharing",
        description:
          "SoftLogic one-file Windows installer v1.0.17 for desktop classroom stations and teaching workflows."
      },
      {
        platform: "AI Smart Board Android",
        format: "APK",
        label: "Download AI Smart Board APK",
        href:
          "https://drive.google.com/file/d/1-D6DTs_umsVgRo5ryOiRy1dVHYFv7TTK/view?usp=sharing",
        description:
          "AI Smart Board Android release build v1.0.17 with separate white-label identity."
      },
      {
        platform: "AI Smart Board Windows",
        format: "EXE",
        label: "Download AI Smart Board EXE",
        href:
          "https://drive.google.com/file/d/1HeX_M23N3EDJ2uSeErlMFWJ48EX2oIpQ/view?usp=sharing",
        description:
          "AI Smart Board one-file Windows installer v1.0.17 with separate white-label identity."
      },
      {
        platform: "Softlogic AI",
        format: "Hosted page",
        label: "Open Softlogic AI",
        href: "/softlogic-ai",
        description:
          "Hosted Softlogic AI page retained with the same Vercel project."
      }
    ],
    downloadGroups: [
      {
        title: "SoftLogic",
        badge: "Original brand",
        description:
          "Use the current SoftLogic branded app with existing name, icon, and branding.",
        artifacts: [
          {
            format: "APK",
            label: "Download Android APK",
            href:
              "https://drive.google.com/file/d/1BYjb9Z1sinWfG4Ai8mJrHM-ulnjL7ZHO/view?usp=sharing"
          },
          {
            format: "EXE",
            label: "Download Windows EXE",
            href:
              "https://drive.google.com/file/d/10-fn_L5KueJ1mY9uymoCzIRMa5qgKqCy/view?usp=sharing"
          }
        ]
      },
      {
        title: "AI Smart Board",
        badge: "White label",
        description:
          "Use the AI Smart Board app with separate app name, icon, and install identity.",
        artifacts: [
          {
            format: "APK",
            label: "Download Android APK",
            href:
              "https://drive.google.com/file/d/1-D6DTs_umsVgRo5ryOiRy1dVHYFv7TTK/view?usp=sharing"
          },
          {
            format: "EXE",
            label: "Download Windows EXE",
            href:
              "https://drive.google.com/file/d/1HeX_M23N3EDJ2uSeErlMFWJ48EX2oIpQ/view?usp=sharing"
          }
        ]
      }
    ],
    betaBanner: undefined,
    releaseSpotlight: {
      eyebrow: "Current release",
      title: "SoftLogic Whiteboard v1.0.17",
      description:
        "Stable release artifacts are available for both SoftLogic and AI Smart Board.",
      status: "Current release",
      type: "Stable",
      version: "v1.0.17",
    },
    aiSetup: {
      ...releasev1016.aiSetup,
      title: "AI features setup for v1.0.17",
    },
    dashboardSection: {
      ...releasev1016.dashboardSection,
      title: "What's included in this whiteboard build (v1.0.17)",
    },
    noteSections: releasev1016.noteSections.map((section) => ({
      ...section,
      items: section.items.map((item) =>
        item.replaceAll("v1.0.16", "v1.0.17")
      ),
    })),
  };

  const releasev1018 = {
    ...releasev1017,
    version: "v1.0.18",
    appVersion: "1.0.18",
    build: "19",
    status: "Current release",
    releaseType: "Production grade",
    primaryBadge: "Production grade",
    secondaryBadge: "Current release",
    releaseDate: "2026-06-12",
    lastUpdatedAt: "2026-06-12 06:34 AM IST",
    summary:
      "Production-grade v1.0.18 release with updated SoftLogic and AI Smart Board Android APK and Windows installer downloads. Previous release artifacts remain available from the version selector.",
    artifacts: [
      {
        platform: "SoftLogic Android",
        format: "APK",
        label: "Download SoftLogic APK",
        href:
          "https://drive.google.com/file/d/1P_qrDZW-McppNDBJi6QYPjk6NWefEjMW/view?usp=sharing",
        description:
          "SoftLogic Android release build v1.0.18 for production tablet, mobile, and whiteboard hardware classroom use."
      },
      {
        platform: "SoftLogic Windows",
        format: "EXE",
        label: "Download SoftLogic EXE",
        href:
          "https://drive.google.com/file/d/1JxIZMtMUpoUr7aMwxW-k5ivtZxv40XIG/view?usp=sharing",
        description:
          "SoftLogic one-file Windows installer v1.0.18 for production desktop classroom stations and teaching workflows."
      },
      {
        platform: "AI Smart Board Android",
        format: "APK",
        label: "Download AI Smart Board APK",
        href:
          "https://drive.google.com/file/d/1JNEorqSmxeApyF9J77nyOw_B0UuoL_Zq/view?usp=sharing",
        description:
          "AI Smart Board Android release build v1.0.18 with separate white-label identity."
      },
      {
        platform: "AI Smart Board Windows",
        format: "EXE",
        label: "Download AI Smart Board EXE",
        href:
          "https://drive.google.com/file/d/1CxtWfGGKTFCUhK_1yYIZ6_C9pjATapNu/view?usp=sharing",
        description:
          "AI Smart Board one-file Windows installer v1.0.18 with separate white-label identity."
      },
      {
        platform: "Softlogic AI",
        format: "Hosted page",
        label: "Open Softlogic AI",
        href: "/softlogic-ai",
        description:
          "Hosted Softlogic AI page retained with the same Vercel project."
      }
    ],
    downloadGroups: [
      {
        title: "SoftLogic",
        badge: "Production grade",
        description:
          "Use the production-grade SoftLogic branded app with the current name, icon, and branding.",
        artifacts: [
          {
            format: "APK",
            label: "Download Android APK",
            href:
              "https://drive.google.com/file/d/1P_qrDZW-McppNDBJi6QYPjk6NWefEjMW/view?usp=sharing"
          },
          {
            format: "EXE",
            label: "Download Windows EXE",
            href:
              "https://drive.google.com/file/d/1JxIZMtMUpoUr7aMwxW-k5ivtZxv40XIG/view?usp=sharing"
          }
        ]
      },
      {
        title: "AI Smart Board",
        badge: "White label",
        description:
          "Use the AI Smart Board app with separate app name, icon, and install identity.",
        artifacts: [
          {
            format: "APK",
            label: "Download Android APK",
            href:
              "https://drive.google.com/file/d/1JNEorqSmxeApyF9J77nyOw_B0UuoL_Zq/view?usp=sharing"
          },
          {
            format: "EXE",
            label: "Download Windows EXE",
            href:
              "https://drive.google.com/file/d/1CxtWfGGKTFCUhK_1yYIZ6_C9pjATapNu/view?usp=sharing"
          }
        ]
      }
    ],
    betaBanner: undefined,
    releaseSpotlight: {
      eyebrow: "Production grade",
      title: "SoftLogic Whiteboard v1.0.18",
      description:
        "Production-grade release artifacts are available for SoftLogic and AI Smart Board on Android and Windows.",
      status: "Current release",
      type: "Production",
      version: "v1.0.18",
    },
    aiSetup: {
      ...releasev1017.aiSetup,
      title: "AI features setup for v1.0.18",
    },
    dashboardSection: {
      ...releasev1017.dashboardSection,
      title: "What's included in this whiteboard build (v1.0.18)",
    },
    noteSections: releasev1017.noteSections.map((section) => ({
      ...section,
      items: section.items.map((item) =>
        item.replaceAll("v1.0.17", "v1.0.18")
      ),
    })),
  };

  manifest.releases.unshift(previousRelease);
  manifest.releases.unshift(releasev1014);
  manifest.releases.unshift(releasev1015);
  manifest.releases.unshift(releasev1016);
  manifest.releases.unshift(releasev1017);
  manifest.releases.unshift(releasev1018);

  const createReleasev1019 = ({
    environment,
    primaryBadge,
    releaseType,
    status,
    softlogicApk,
    softlogicExe,
    aiSmartBoardApk,
    aiSmartBoardExe,
  }) => ({
    ...releasev1018,
    version: "v1.0.19",
    appVersion: "1.0.19",
    build: "20",
    status,
    releaseType,
    primaryBadge,
    secondaryBadge: "Current release",
    releaseDate: "2026-06-13",
    lastUpdatedAt: "2026-06-13 IST",
    title: `SoftLogic Whiteboard v1.0.19 ${environment} release`,
    summary:
      `${environment} v1.0.19 release with separate SoftLogic and AI Smart Board Android APK and Windows installer downloads.`,
    artifacts: [
      {
        platform: "SoftLogic Android",
        format: "APK",
        label: "Download SoftLogic APK",
        href: softlogicApk,
        description:
          `SoftLogic Android v1.0.19 ${environment.toLowerCase()} build for tablet, mobile, and whiteboard hardware classroom use.`
      },
      {
        platform: "SoftLogic Windows",
        format: "EXE",
        label: "Download SoftLogic EXE",
        href: softlogicExe,
        description:
          `SoftLogic Windows installer v1.0.19 for the ${environment.toLowerCase()} environment.`
      },
      {
        platform: "AI Smart Board Android",
        format: "APK",
        label: "Download AI Smart Board APK",
        href: aiSmartBoardApk,
        description:
          `AI Smart Board Android v1.0.19 ${environment.toLowerCase()} build with separate white-label identity.`
      },
      {
        platform: "AI Smart Board Windows",
        format: "EXE",
        label: "Download AI Smart Board EXE",
        href: aiSmartBoardExe,
        description:
          `AI Smart Board Windows installer v1.0.19 for the ${environment.toLowerCase()} environment.`
      },
      {
        platform: "Softlogic AI",
        format: "Hosted page",
        label: "Open Softlogic AI",
        href: "/softlogic-ai",
        description:
          "Hosted Softlogic AI page retained with the same Vercel project."
      }
    ],
    downloadGroups: [
      {
        title: "SoftLogic",
        badge: `${environment} build`,
        description:
          `Use the SoftLogic branded v1.0.19 app built for ${environment.toLowerCase()}.`,
        artifacts: [
          {
            format: "APK",
            label: "Download Android APK",
            href: softlogicApk
          },
          {
            format: "EXE",
            label: "Download Windows EXE",
            href: softlogicExe
          }
        ]
      },
      {
        title: "AI Smart Board",
        badge: `${environment} build`,
        description:
          `Use the AI Smart Board v1.0.19 app built for ${environment.toLowerCase()} with its separate install identity.`,
        artifacts: [
          {
            format: "APK",
            label: "Download Android APK",
            href: aiSmartBoardApk
          },
          {
            format: "EXE",
            label: "Download Windows EXE",
            href: aiSmartBoardExe
          }
        ]
      }
    ],
    betaBanner: undefined,
    releaseSpotlight: {
      eyebrow: `${environment} environment`,
      title: "SoftLogic Whiteboard v1.0.19",
      description:
        `${environment} release artifacts are available for SoftLogic and AI Smart Board on Android and Windows.`,
      status,
      type: environment,
      version: "v1.0.19",
    },
    aiSetup: {
      ...releasev1018.aiSetup,
      title: "AI features setup for v1.0.19",
    },
    dashboardSection: {
      ...releasev1018.dashboardSection,
      title: "What's included in this whiteboard build (v1.0.19)",
    },
    noteSections: releasev1018.noteSections.map((section) => ({
      ...section,
      items: section.items.map((item) =>
        item.replaceAll("v1.0.18", "v1.0.19")
      ),
    })),
  });

  const stagingReleasev1019 = createReleasev1019({
    environment: "Staging",
    primaryBadge: "Staging build",
    releaseType: "Staging",
    status: "Current staging release",
    softlogicApk:
      "https://drive.google.com/file/d/1jSHu7_F-Ten2WnO4qbiRMzeIunkgCkRV/view?usp=sharing",
    softlogicExe:
      "https://drive.google.com/file/d/17rVKqt21yggnrlT2WR3E4RyAuFy0E655/view?usp=sharing",
    aiSmartBoardApk:
      "https://drive.google.com/file/d/1AOt7N9la5Aa_CWpKUiVOjw_mexMG2FfQ/view?usp=sharing",
    aiSmartBoardExe:
      "https://drive.google.com/file/d/1p5QU9HOGSei3KngLoNdlVG7ORzVB0Ypn/view?usp=sharing",
  });

  const productionReleasev1019 = createReleasev1019({
    environment: "Production",
    primaryBadge: "Production grade",
    releaseType: "Production grade",
    status: "Current production release",
    softlogicApk:
      "https://drive.google.com/file/d/1cxYJp_y7TdLuvRZXYamaFdNEoi6HxXgb/view?usp=sharing",
    softlogicExe:
      "https://drive.google.com/file/d/1j8g17WGZ-Ttb-CU_5DQeDQsV1hUJ5uB1/view?usp=sharing",
    aiSmartBoardApk:
      "https://drive.google.com/file/d/1IOU7MZMivVoIEfxUkMB45kZFD5apBwUp/view?usp=sharing",
    aiSmartBoardExe:
      "https://drive.google.com/file/d/1_hv_K9sZoJLnKbl4FlFUqrvJ5XKfx-Ub/view?usp=sharing",
  });
  productionReleasev1019.aiSetup = undefined;

  const createReleasev1020 = ({
    environment,
    primaryBadge,
    releaseType,
    status,
    softlogicApk,
    softlogicExe,
    aiSmartBoardApk,
    aiSmartBoardExe,
  }) => ({
    ...releasev1018,
    version: "v1.0.20",
    appVersion: "1.0.20",
    build: "21",
    status,
    releaseType,
    primaryBadge,
    secondaryBadge: "Current release",
    releaseDate: "2026-06-14",
    lastUpdatedAt: "2026-06-14 IST",
    title: `SoftLogic Whiteboard v1.0.20 ${environment} release`,
    summary:
      `${environment} v1.0.20 release with separate SoftLogic and AI Smart Board Android APK and Windows installer downloads.`,
    artifacts: [
      {
        platform: "SoftLogic Android",
        format: "APK",
        label: "Download SoftLogic APK",
        href: softlogicApk,
        description:
          `SoftLogic Android v1.0.20 ${environment.toLowerCase()} build for tablet, mobile, and whiteboard hardware classroom use.`
      },
      {
        platform: "SoftLogic Windows",
        format: "EXE",
        label: "Download SoftLogic EXE",
        href: softlogicExe,
        description:
          `SoftLogic Windows installer v1.0.20 for the ${environment.toLowerCase()} environment.`
      },
      {
        platform: "AI Smart Board Android",
        format: "APK",
        label: "Download AI Smart Board APK",
        href: aiSmartBoardApk,
        description:
          `AI Smart Board Android v1.0.20 ${environment.toLowerCase()} build with separate white-label identity.`
      },
      {
        platform: "AI Smart Board Windows",
        format: "EXE",
        label: "Download AI Smart Board EXE",
        href: aiSmartBoardExe,
        description:
          `AI Smart Board Windows installer v1.0.20 for the ${environment.toLowerCase()} environment.`
      }
    ],
    downloadGroups: [
      {
        title: "SoftLogic",
        badge: `${environment} build`,
        description:
          `Use the SoftLogic branded v1.0.20 app built for ${environment.toLowerCase()}.`,
        artifacts: [
          {
            format: "APK",
            label: "Download Android APK",
            href: softlogicApk
          },
          {
            format: "EXE",
            label: "Download Windows EXE",
            href: softlogicExe
          }
        ]
      },
      {
        title: "AI Smart Board",
        badge: `${environment} build`,
        description:
          `Use the AI Smart Board v1.0.20 app built for ${environment.toLowerCase()} with its separate install identity.`,
        artifacts: [
          {
            format: "APK",
            label: "Download Android APK",
            href: aiSmartBoardApk
          },
          {
            format: "EXE",
            label: "Download Windows EXE",
            href: aiSmartBoardExe
          }
        ]
      }
    ],
    betaBanner: undefined,
    releaseSpotlight: {
      eyebrow: `${environment} environment`,
      title: "SoftLogic Whiteboard v1.0.20",
      description:
        `${environment} release artifacts are available for SoftLogic and AI Smart Board on Android and Windows.`,
      status,
      type: environment,
      version: "v1.0.20",
    },
    aiSetup: {
      ...releasev1018.aiSetup,
      title: "AI features setup for v1.0.20",
    },
    dashboardSection: {
      ...releasev1018.dashboardSection,
      title: "What's included in this whiteboard build (v1.0.20)",
    },
    noteSections: releasev1018.noteSections.map((section) => ({
      ...section,
      items: section.items.map((item) =>
        item.replaceAll("v1.0.18", "v1.0.20")
      ),
    })),
  });

  const stagingReleasev1020 = createReleasev1020({
    environment: "Staging",
    primaryBadge: "Staging build",
    releaseType: "Staging",
    status: "Current staging release",
    softlogicApk:
      "https://drive.google.com/file/d/1wLusfF1aPR3_gC4N2WQBA-xP3gsk8aFI/view?usp=sharing",
    softlogicExe:
      "https://drive.google.com/file/d/1icsvUDfYTRE4VzuFAB1EoB1zONSU4ycM/view?usp=sharing",
    aiSmartBoardApk:
      "https://drive.google.com/file/d/1ZSYrLn5JsNDgIGBFhevQErT0NCWlIvZB/view?usp=sharing",
    aiSmartBoardExe:
      "https://drive.google.com/file/d/1Ldnxqk3Vci1k3J49dDcHLDDTv-OMaMGw/view?usp=sharing",
  });

  const productionReleasev1020 = createReleasev1020({
    environment: "Production",
    primaryBadge: "Production grade",
    releaseType: "Production grade",
    status: "Current production release",
    softlogicApk:
      "https://drive.google.com/file/d/1cY0VVH2_UpJ9nWAnB7oBVmSqdXFx3D8p/view?usp=sharing",
    softlogicExe:
      "https://drive.google.com/file/d/1MXQE5A88p-wb8JVknrIhZPGGfIe1rQl9/view?usp=sharing",
    aiSmartBoardApk:
      "https://drive.google.com/file/d/1GYFnzqZZ_mSL31pCTU_QtY_QovIdHeNk/view?usp=sharing",
    aiSmartBoardExe:
      "https://drive.google.com/file/d/1JbadcQgug6LhGd0P6TDk8mQdSnAyO_zG/view?usp=sharing",
  });
  productionReleasev1020.aiSetup = undefined;

  const sharedAdmin = {
    ...manifest.softlogicAdmin,
    email: undefined,
    password: undefined,
    showCredentials: false,
  };
  const stagingAccessGuide = {
    ...manifest.accessGuide,
    badge: "Staging QA access guide",
    title: "Staging admin access and user flow",
    description:
      "Use these staging testing details to verify OTP behavior and user creation through the UAT admin hierarchy.",
    credentialLabel: "Fixed QA OTP",
    credentialValue: manifest.accessGuide.fixedOtp,
    accessNote:
      "Request OTP first, then verify with the delivered OTP or fixed QA OTP when staging testing limits are enabled.",
  };
  const productionAccessGuide = {
    adminEmail: "anirudha@softlogic.co.in",
    fixedOtp: "Disabled",
    badge: "Production access policy",
    title: "Production authentication and user flow",
    description:
      "Use the AWS production admin and email-delivered authentication flow. Development shortcuts are disabled.",
    credentialLabel: "Fixed QA OTP",
    credentialValue: "Disabled in production",
    accessNote:
      "Use the email-delivered OTP. Development fixed-OTP shortcuts and relaxed authentication limits must remain disabled.",
    loginFlow: [
      "Open the production SoftLogic Whiteboard app.",
      "Enter the authorized production user email address.",
      "Select Send OTP to create an active OTP request.",
      "Use only the OTP delivered through the configured production email provider.",
      "After verification, the dashboard opens with permissions from the saved production role."
    ],
    otpNotes: [
      "Production fixed OTP is disabled.",
      "Testing authentication limits remain disabled.",
      "Passwords, OTP values, provider credentials, and infrastructure secrets are never published in this portal."
    ],
    userCreationFlow: [
      "Super Admin creates partner/customer organizations and users from the AWS production admin panel.",
      "Partner Admin can create customer admins, teachers, and students under managed customer organizations.",
      "Customer Admin or Admin can create teachers and students for their managed organization.",
      "Created users complete the approved production sign-in or password setup flow, and access follows the stored role."
    ],
    roleHierarchy: [
      "SUPER_ADMIN",
      "PARTNER_ADMIN",
      "CUSTOMER_ADMIN / ADMIN",
      "TEACHER / STUDENT"
    ]
  };

  manifest.environments = {
    staging: {
      label: "Staging",
      currentVersion: "v1.0.20",
      releases: [stagingReleasev1020, stagingReleasev1019, ...manifest.releases],
      softlogicAdmin: {
        ...sharedAdmin,
        description:
          "Open the UAT admin panel connected to the DigitalOcean staging backend.",
        url: "https://adminpanelsoftlogic.vercel.app",
      },
      api: {
        backendBaseUrl: "https://softlogic-api.mymultimeds.com",
        swaggerUrl: "https://softlogic-api.mymultimeds.com/api/docs",
        swaggerJsonUrl: "./swagger/openapi-v1.0.0.json",
        backendSwaggerJsonUrl: "https://softlogic-api.mymultimeds.com/api/docs.json",
        publicVersionUrl: "https://softlogic-api.mymultimeds.com/api/version",
        apiVersionUrl: "https://softlogic-api.mymultimeds.com/api/v1/version",
        apiBaseUrl: "https://softlogic-api.mymultimeds.com/api/v1",
      },
      accessGuide: stagingAccessGuide,
    },
    production: {
      label: "Production",
      currentVersion: "v1.0.20",
      releases: [productionReleasev1020, productionReleasev1019],
      softlogicAdmin: {
        ...sharedAdmin,
        description:
          "Open the production admin panel served by Nginx on AWS.",
        url: "https://ai.softeractive.com",
      },
      api: {
        backendBaseUrl: "https://api.softeractive.com",
        swaggerUrl: "https://api.softeractive.com/api/docs",
        swaggerJsonUrl: "./swagger/openapi-v1.0.0.json",
        backendSwaggerJsonUrl: "https://api.softeractive.com/api/docs.json",
        publicVersionUrl: "https://api.softeractive.com/api/version",
        apiVersionUrl: "https://api.softeractive.com/api/v1/version",
        apiBaseUrl: "https://api.softeractive.com/api/v1",
      },
      accessGuide: productionAccessGuide,
    },
  };
})();

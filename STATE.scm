;;; STATE.scm — Fogbinder Project State Checkpoint
;;; Format: Guile Scheme S-expressions
;;; Purpose: Context reconstruction across conversation boundaries

(define-module (fogbinder state)
  #:export (state))

;;;; ============================================================
;;;; METADATA
;;;; ============================================================

(define metadata
  '((format-version . "1.0.0")
    (project . "fogbinder")
    (created . "2025-12-08")
    (last-updated . "2025-12-08")
    (schema . "state.scm/v1")))

;;;; ============================================================
;;;; PROJECT SUMMARY
;;;; ============================================================

(define project-summary
  '((name . "Fogbinder")
    (tagline . "Zotero plugin for navigating epistemic ambiguity in research")
    (philosophy . ("Late Wittgenstein: Language games, family resemblance"
                   "J.L. Austin: Speech act theory, illocutionary force"))
    (core-insight . "Ambiguity and contradiction are features to explore, not bugs to fix")
    (tech-stack . ((primary . "ReScript")
                   (performance . "Rust/WASM")
                   (runtime . "Deno")
                   (target . "Zotero 7.0+ plugin")))))

;;;; ============================================================
;;;; CURRENT POSITION
;;;; ============================================================

(define current-position
  '((overall-completion . "80%")
    (phase . "pre-mvp")
    (status . "in-progress")

    (implemented
     ((core-philosophy
       ((module . "EpistemicState.res")
        (status . "complete")
        (tested . #t)
        (description . "6 epistemic modalities: Known, Probable, Vague, Ambiguous, Mysterious, Contradictory"))
       ((module . "SpeechAct.res")
        (status . "complete")
        (tested . #t)
        (description . "J.L. Austin's 5 illocutionary forces with felicity conditions"))
       ((module . "FamilyResemblance.res")
        (status . "complete")
        (tested . #t)
        (description . "Wittgensteinian clustering without strict definitions")))

      (analysis-engines
       ((module . "ContradictionDetector.res")
        (status . "complete")
        (tested . #f)
        (description . "Detects language-game conflicts (5 types)"))
       ((module . "MoodScorer.res")
        (status . "complete")
        (tested . #f)
        (description . "Speech-act-based mood analysis"))
       ((module . "MysteryClustering.res")
        (status . "complete")
        (tested . #f)
        (description . "Clusters epistemic resistance (4 types)"))
       ((module . "FogTrailVisualizer.res")
        (status . "complete")
        (tested . #f)
        (description . "Network visualization with SVG/JSON export")))

      (orchestration
       ((module . "Fogbinder.res")
        (status . "complete")
        (tested . #t)
        (description . "Main analysis pipeline, batch processing, report generation"))
       ((module . "main.js")
        (status . "complete")
        (tested . #f)
        (description . "JavaScript API wrapper with JSDoc types")))))

    (partial
     ((wasm-modules
       ((module . "contradiction_detector")
        (status . "stubbed")
        (description . "Language game conflict detection - TODOs remain"))
       ((module . "graph_algorithms")
        (status . "stubbed")
        (description . "Force-directed layout, fog density, community detection"))
       ((module . "string_similarity")
        (status . "stubbed")
        (description . "Cosine/Jaccard similarity not implemented"))
       ((module . "crypto")
        (status . "partial")
        (description . "SHAKE256/BLAKE3 working; Ed448/Kyber need implementation")))

      (zotero-integration
       ((module . "ZoteroBindings.res")
        (status . "complete")
        (description . "ReScript bindings defined"))
       ((module . "zotero_api.js")
        (status . "mock-only")
        (description . "Uses mock data, needs real Zotero API integration")))))

    (not-implemented
     ("Actual WASM compilation (Cargo modules set up but not building)"
      "TypeScript elimination (src/main.ts still exists)"
      "npm removal (still uses Node.js for ReScript compiler)"
      "Full Zotero integration (currently uses mock data)"
      "Benchmarking suite (infrastructure removed in migration)"
      "Advanced NLP (currently simplified heuristics)"
      "Formal verification (placeholder directory, no proofs)"))))

;;;; ============================================================
;;;; ROUTE TO MVP v1
;;;; ============================================================

(define mvp-route
  '((version . "1.0.0")
    (target-scope . "Functional Zotero plugin with core analysis features")

    (critical-path
     ((step . 1)
      (task . "Real Zotero Integration")
      (description . "Replace mock data in zotero_api.js with actual Zotero API calls")
      (files . ("src/zotero/zotero_api.js" "src/zotero/ZoteroBindings.res"))
      (priority . "P0")
      (blockers . none))

     ((step . 2)
      (task . "Test Coverage for Engine Modules")
      (description . "Add tests for ContradictionDetector, MoodScorer, MysteryClustering, FogTrailVisualizer")
      (files . ("src/engines/*.res"))
      (priority . "P0")
      (blockers . none))

     ((step . 3)
      (task . "Build Pipeline Verification")
      (description . "Ensure ReScript compilation works end-to-end, verify all .bs.js outputs")
      (priority . "P0")
      (blockers . none))

     ((step . 4)
      (task . "Manual Integration Testing")
      (description . "Test with real Zotero library, verify analysis accuracy")
      (priority . "P0")
      (blockers . (1 2 3)))

     ((step . 5)
      (task . "Zotero Plugin Packaging")
      (description . "Create proper .xpi file for Zotero installation")
      (files . ("manifest.json"))
      (priority . "P0")
      (blockers . (4))))

    (deferred-to-post-mvp
     ("WASM modules compilation and integration"
      "Post-quantum cryptography (Ed448, Kyber-1024)"
      "Advanced NLP models"
      "Formal verification proofs"
      "Benchmarking suite"
      "Full localization support"
      "Performance optimization"))))

;;;; ============================================================
;;;; KNOWN ISSUES
;;;; ============================================================

(define issues
  '((blocking
     ((id . "ISS-001")
      (severity . "high")
      (title . "Zotero API Integration is Mocked")
      (description . "zotero_api.js returns mock data, not connected to real Zotero")
      (impact . "Plugin cannot function with real research libraries")
      (location . "src/zotero/zotero_api.js"))

     ((id . "ISS-002")
      (severity . "high")
      (title . "Engine Modules Lack Test Coverage")
      (description . "ContradictionDetector, MoodScorer, MysteryClustering, FogTrailVisualizer have no tests")
      (impact . "Cannot verify correctness of analysis outputs")
      (location . "src/engines/")))

    (non-blocking
     ((id . "ISS-003")
      (severity . "medium")
      (title . "WASM Modules Not Compiled")
      (description . "Rust WASM modules are stubbed with TODOs, Cargo not building")
      (impact . "Performance optimization unavailable, using pure JS fallbacks")
      (location . "src/wasm/"))

     ((id . "ISS-004")
      (severity . "medium")
      (title . "TypeScript File Still Exists")
      (description . "src/main.ts should be removed or converted to ReScript")
      (impact . "Inconsistent with stated 'no TypeScript' architecture")
      (location . "src/main.ts"))

     ((id . "ISS-005")
      (severity . "low")
      (title . "Simplified NLP Heuristics")
      (description . "Mood scoring and contradiction detection use string matching, not proper NLP")
      (impact . "Analysis accuracy limited, may miss subtle contradictions")
      (location . "src/engines/"))

     ((id . "ISS-006")
      (severity . "low")
      (title . "Post-Quantum Crypto Incomplete")
      (description . "Ed448 signing and Kyber-1024 KEM have TODOs")
      (impact . "Security features not fully available")
      (location . "src/wasm/crypto/src/lib.rs")))))

;;;; ============================================================
;;;; QUESTIONS FOR MAINTAINER
;;;; ============================================================

(define questions
  '(((id . "Q-001")
     (topic . "MVP Scope")
     (question . "Should MVP include any WASM modules, or is pure ReScript/JS acceptable for v1?")
     (context . "WASM provides performance but adds complexity; JS-only is simpler to ship"))

    ((id . "Q-002")
     (topic . "Zotero API")
     (question . "Do you have a Zotero test library set up for integration testing?")
     (context . "Need real data to test plugin functionality"))

    ((id . "Q-003")
     (topic . "NLP Strategy")
     (question . "For v1, should we keep simplified heuristics or integrate a proper NLP library?")
     (context . "Current string-matching is fast but less accurate; NLP adds dependencies"))

    ((id . "Q-004")
     (topic . "Distribution")
     (question . "Will this be distributed via Zotero's official plugin registry or self-hosted?")
     (context . "Affects packaging, signing, and update mechanism requirements"))

    ((id . "Q-005")
     (topic . "Priority")
     (question . "What's the relative priority: accuracy of analysis vs. completeness of visualization?")
     (context . "Could focus effort on either ContradictionDetector accuracy OR FogTrail polish"))

    ((id . "Q-006")
     (topic . "Security")
     (question . "Is post-quantum crypto required for MVP, or can it wait for v1.1?")
     (context . "Current usage is unclear; may be over-engineered for research tool"))))

;;;; ============================================================
;;;; LONG-TERM ROADMAP
;;;; ============================================================

(define roadmap
  '((v1.0 . ((name . "MVP Release")
             (focus . "Core functionality in Zotero")
             (features . ("Real Zotero API integration"
                          "Contradiction detection"
                          "Mood scoring"
                          "Mystery clustering"
                          "FogTrail visualization"
                          "Basic report generation"))
             (tech-debt . "Simplified heuristics, no WASM, mock removal")))

    (v1.1 . ((name . "Performance & Polish")
             (focus . "Speed optimization and UX refinement")
             (features . ("WASM module integration (graph algorithms)"
                          "Improved FogTrail interactivity"
                          "Batch processing optimization"
                          "Error handling improvements"
                          "User preferences persistence"))))

    (v1.2 . ((name . "Advanced Analysis")
             (focus . "Better NLP and analysis accuracy")
             (features . ("Proper NLP integration for mood/contradiction"
                          "Configurable sensitivity thresholds"
                          "Custom language game definitions"
                          "Export to citation managers beyond Zotero"))))

    (v2.0 . ((name . "Collaborative Research")
             (focus . "Multi-user and sharing features")
             (features . ("Shared FogTrail annotations"
                          "Team contradiction discussions"
                          "Post-quantum signed attestations"
                          "Research trail versioning"
                          "API for external integrations"))))

    (v3.0 . ((name . "AI-Augmented Ambiguity")
             (focus . "LLM integration for deeper analysis")
             (features . ("LLM-powered contradiction explanation"
                          "Suggested resolution strategies"
                          "Cross-corpus mystery detection"
                          "Automated literature review assistance"
                          "Philosophical stance classification"))))))

;;;; ============================================================
;;;; ARCHITECTURE NOTES
;;;; ============================================================

(define architecture-notes
  '((data-flow . "Sources → EpistemicState → Analysis Engines → FogTrail → Report")

    (layer-stack . ("Zotero Plugin Interface (manifest.json)"
                    "API Layer (main.js)"
                    "Orchestration (Fogbinder.res)"
                    "Analysis Engines (ReScript)"
                    "Core Philosophy (ReScript)"
                    "Performance (Rust/WASM, optional)"))

    (key-types . ((EpistemicModality . "Known | Probable | Vague | Ambiguous | Mysterious | Contradictory")
                  (IllocutionaryForce . "Assertive | Directive | Commissive | Expressive | Declaration")
                  (ContradictionType . "DirectNegation | MethodologicalConflict | TerminologicalDispute | PresuppositionClash | LanguageGameConflict")
                  (MysteryType . "Phenomenological | Conceptual | Empirical | Methodological")))

    (philosophy-encoding . "Wittgenstein's 'whereof one cannot speak' as Mysterious modality; Austin's performatives as first-class types")))

;;;; ============================================================
;;;; NEXT ACTIONS (PRIORITIZED)
;;;; ============================================================

(define next-actions
  '(((priority . 1)
     (action . "Implement real Zotero API calls in zotero_api.js")
     (rationale . "Unblocks all integration testing"))

    ((priority . 2)
     (action . "Write tests for ContradictionDetector.res")
     (rationale . "Core analysis feature, needs verification"))

    ((priority . 3)
     (action . "Write tests for MoodScorer.res")
     (rationale . "Speech act analysis is philosophically central"))

    ((priority . 4)
     (action . "Write tests for MysteryClustering.res")
     (rationale . "Completes engine test coverage"))

    ((priority . 5)
     (action . "Verify ReScript build produces valid Zotero-compatible bundle")
     (rationale . "Must work in Zotero's XUL/WebExtension environment"))

    ((priority . 6)
     (action . "Create .xpi packaging script")
     (rationale . "Required for Zotero installation"))

    ((priority . 7)
     (action . "Remove or convert src/main.ts")
     (rationale . "Architectural consistency with 'no TypeScript' stance"))))

;;;; ============================================================
;;;; STATE EXPORT
;;;; ============================================================

(define state
  `((metadata . ,metadata)
    (project-summary . ,project-summary)
    (current-position . ,current-position)
    (mvp-route . ,mvp-route)
    (issues . ,issues)
    (questions . ,questions)
    (roadmap . ,roadmap)
    (architecture-notes . ,architecture-notes)
    (next-actions . ,next-actions)))

;;; End of STATE.scm

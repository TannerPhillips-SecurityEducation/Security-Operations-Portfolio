# Editorial Curation Policy

Projects and Publications are **manually selected**. The website must not automatically promote GitHub repositories, draft manuscripts, or informal experiments as featured releases.

## Authoritative file
`src/data/showcase.json` is the sole listing manifest. It currently has **zero approved Projects** and **zero approved Publications**. This is intentional.

The published site only includes entries present in that file and passing `npm run validate:showcase`. Every addition requires editorial approval by the website owner.

## Projects

A project is eligible when it is completed or when a substantial, publicly inspectable result is demonstrable, even if further development continues.

Required project fields:

| Field | Purpose |
| --- | --- |
| `slug` | Permanent URL-safe name |
| `title`, `category`, `summary`, `overview` | First-person, factual presentation |
| `status` | Must be `completed` or `demonstrable` |
| `approvedForPublication` | Must be `true` after owner approval |
| `evidence` | At least one real public demonstration, release, or inspectable artifact |
| `sections` | Expandable case-study sections (may be empty) |
| `technologies`, `releasedAt` | Optional grounded details |

Unreleased concepts, private tools, non-public demonstrations, and unverified accomplishments do not qualify. The presence of a GitHub repository does not constitute publication approval.

## Publications

A publication is eligible when a full work or edition has been intentionally released for public consumption.

Required fields:

| Field | Purpose |
| --- | --- |
| `slug`, `title`, `kind`, `summary` | A readable listing and category |
| `approvedForPublication` | Explicit approval |
| `currentEdition` | Identifier of the current released edition |
| `editions` | One or more publicly released editions |

Each edition requires an `id`, `version`, `releasedAt` date, and an accessible `publicUrl`. Optional `downloads`, `citation`, and `markdownId` support downloads, reference text, and native reading.

For an approved native reading copy, create a Markdown file at `src/content/releases/<markdownId>.md` and add its exact `markdownId` to the published edition. Build-time validation rejects missing files. An authored local draft must not be published until the work itself has been explicitly approved as released.

Older editions stay accessible through publication-specific version history. Unpublished revisions do not appear.

## Process and validation

1. Verify a public demonstration or release URL.
2. Confirm eligibility and disclosure permissions.
3. Obtain the owner's explicit selection of that particular project or work.
4. Add the curated manifest record (and optional publicly released Markdown edition).
5. Run `npm run validate:showcase`, then build and test the pages.
6. Review the generated public result.

## Separation of concerns

- The Security-Education repository remains the source of technical Knowledge.
- The Projects section is not a GitHub activity feed.
- The Publications section is not a mirror of every Knowledge article or unfinished manuscript.
- Publication metadata and public edition links are separate from the site's general design.
- Obsidian Prism and `TSP.yaml` are still in the design phase.

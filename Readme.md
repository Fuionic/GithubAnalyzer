
# Git Analyzer

 A high-performance Spring Boot and React developer intelligence engine that compiles real-time repository metadata and AI-synthesized coding style dossiers.


---

## Live Demo
You can access the live web application interface directly at [gitanalyzer-omega.vercel.app](https://gitanalyzer-omega.vercel.app). The user interface is optimized for modern web browsers, featuring responsive glassmorphic layouts and interactive dashboard panels.

---

## Demo Video
For a complete visual walkthrough of the user flows, authentication steps, real-time developer dossier generation, and overall system functionality, watch the walkthrough video link:
[Click here to view the Demonstration Video](https://github.com/Fuionic/GithubAnalyzer/raw/main/assets/GitAnlayzer.mp4)

---

## Preview's
The user interface uses a custom pitch-black modern workspace layout built with Tailwind CSS and Framer Motion. Below is a high-level preview of the core analytical workspace:

**Landing**

<img src="assets/Landing.png" alt="Landing" width="100%" />

**Login**

<img src="assets/Login.png" alt="Login" width="100%" />

**Dashboard**

<img src="assets/Dashboard.png" alt="Dashboard" width="100%" />

<img src="assets/Dashboard2.png" alt="Dashboard 2" width="100%" />

<img src="assets/Dashboard3.png" alt="Dashboard 3" width="100%" />

---

## Project Overview
GitAnalyzer is a developer intelligence engine designed to transform raw, fragmented developer profiles into rich, structured engineering intelligence. Instead of simply pulling standard profile summaries, GitAnalyzer compiles deep candidate dossiers by programmatically scanning public repositories, analyzing commit frequencies, evaluating repository size distributions, and calculating language density trends. This structural analysis is supplemented by custom-trained AI pipelines that synthesize a developer's engineering character, collaboration patterns, and architectural paradigms.

---

## Problem Statement
Modern technical recruitment and developer evaluation processes suffer from a reliance on self-reported resumes and static profile pages. Hiring managers and technical leads struggle to quickly grasp a candidate's actual coding style, architectural discipline, and consistency. While platforms like GitHub offer raw public data, this information is highly fragmented across multiple repositories, languages, and commit histories. Calculating developer consistency, language dominance, and repository impact manually is time-consuming. GitAnalyzer solves this problem by programmatically aggregating, normalising, caching, and evaluating candidate metadata in real time, serving clean intelligence reports within seconds.

---

## Core Features

### Real-Time AST and Metadata Analysis
The platform processes public repository structures on demand, calculating exact language usage percentages, aggregate star count indices, fork tracking ratios, and codebase complexity trends.

### Generative AI Developer Summaries
Using Google Gemini models integrated via Spring AI, the application analyzes historical public code patterns to output qualitative insights about code design habits, collaboration signals, and clean architecture practices.

### Unified Developer Dossiers
The engine integrates disparate GitHub data endpoints into a clean, unified REST resource, exposing candidate profiles that include developer suitabilities against target enterprise roles.

---

## Technology Stack
The platform is constructed with a modern, high-performance tech stack:
* **Backend Framework:** Spring Boot 4.0.3 utilizing Java 25 features for efficient bytecode processing.
* **Security & Authentication:** Spring Security configured for stateless OAuth2 flows combined with custom JWT generation and validation layers.
* **Caching Engine:** Upstash Redis Cloud connected via Lettuce Client configuration.
* **Persistence Layer:** Spring Data JPA with a MySQL database hosted on Aiven.
* **AI Engine:** Spring AI incorporating Google Gemini API connectivity.
* **Frontend Web Application:** React with Vite, styled using Tailwind CSS and animated with Framer Motion.
* **Hosting Platforms:** Render for the backend service API, and Vercel for hosting the frontend application.

---

## System Architecture
GitAnalyzer uses a decoupled, three-tier architecture that segregates the client runtime from the data transformation and evaluation pipelines. The React-based frontend communicates through secure proxies to a robust Spring Boot backend engine. Under the hood, the backend uses a dedicated database layer for indexing user information, a Redis caching tier to mitigate external API rate-limiting restrictions, and a Spring AI-managed pipeline for code generation and sentiment-driven developer analysis.

Below is a detailed structural representation of the system runtime flow:

```mermaid
graph TD
    Client[React Frontend / Vercel] <-->|HTTPS / JWT Auth| Gateway[Vercel Rewrites Proxy]
    Gateway <-->|Forwarded Headers / Secure REST| Backend[Spring Boot Backend / Render]
    Backend <-->|Redis Cache / Lettuce| Cache[(Upstash Redis Cloud)]
    Backend <-->|Data Persistence / JPA| DB[(Aiven MySQL Database)]
    Backend <-->|External Aggregation| GitHubAPI[GitHub REST API v3]
    Backend <-->|AI Summary Generation| Gemini[Google Gemini AI API]
```

---

## Authentication Flow
GitAnalyzer enforces a stateless OAuth2-based login system supporting Google and GitHub federated identity providers. 

The complete authentication sequence operates as follows:
1. The user triggers authentication from the React application by redirecting to the relative backend endpoint `/oauth2/authorization/google` or `/oauth2/authorization/github`.
2. The browser request goes through Vercel's proxy server, which forwards the request to Render while appending proxy context headers (`X-Forwarded-Host` and `X-Forwarded-Proto`).
3. Spring Security intercepts the request, uses the forwarded headers to construct the correct redirect callback URL matching the frontend origin, and sends the user to the provider's consent page.
4. Upon successful validation, the provider redirects the user's browser back to the frontend-configured proxy callback address.
5. The backend captures the authentication success, generates a cryptographically signed JWT token (utilizing HS256), and redirects the browser back to the main frontend application screen while embedding the token.
6. The React application extracts the token and securely commits it to local storage for subsequent authenticated API requests.

---

## Request Lifecycle
Every API call targeting candidate intelligence undergoes a structured lifecycle:
1. The client sends a request to `/api/v1/analyzer/analyze` containing the GitHub username, appending the authorization JWT token in the `Authorization: Bearer <TOKEN>` header.
2. The API Gateway forwards the request. The backend security filter chain validates the JWT signature, extracts credentials, and permits execution.
3. The request enters the Controller layer, which invokes the Analysis Service.
4. The service checks the Upstash Redis cache using a unique key derived from the target GitHub username. If cached data is present and valid, it bypasses external network calls.
5. If a cache miss occurs, the service coordinates multiple concurrent requests to the GitHub REST API.
6. The returned raw JSON payloads are deserialized into POJOs, filtered, and aggregated.
7. The aggregated developer data is forwarded to the AI Pipeline service to synthesize developer traits.
8. The final dossier is cached in Redis, persisted in MySQL for history tracking, and returned to the controller to be rendered on the frontend.

---

## Caching Strategy
Due to strict rate limiting imposed by external resource providers like the GitHub API, caching is a critical pillar of GitAnalyzer's performance. The caching tier uses Upstash Redis Cloud managed via Spring Data Redis. 

The cache strategy operates on a **Cache-Aside** design pattern. When a user requests data for a candidate, the system attempts to resolve it via Redis. On a cache hit, the data is returned immediately. On a cache miss, the profile is analyzed, saved to the database, and stored in Redis with an explicit Time-to-Live (TTL) configuration of 24 hours. This balances real-time relevance with performance safety.

---

## Database Design
The database schema is managed via Spring Data JPA and hosted on an Aiven MySQL cluster. It maintains candidate information, user authentication records, and analytical session logs.

<img src="assets/Database.png" alt="Database" width="100%" />



*The database maps relations dynamically, maintaining high data integrity for audit logs without coupling candidate metadata to authentication credentials.*

---

## AI Pipeline
The qualitative evaluation engine integrates Spring AI with Google's Gemini models. The pipeline is designed around semantic code analysis. 

The application compiles structured code summaries and public commit logs, passing them alongside system instructions to the Gemini endpoint. The model evaluates coding styles (checking for SOLID principles, readability, and testing habits), analyzes language percentages, and generates a structured candidate evaluation dossier. This output is parsed back into Java objects using custom Jackson bindings.

---

## Deployment Architecture
The platform is designed to run in a containerized environment:
* **Frontend Web App:** Compiled to static assets using Vite and hosted on Vercel's global CDN network. All API calls are mapped back to the backend through rewriting rules in `vercel.json` to prevent CORS issues.
* **Backend Application:** Packaged as a JAR and deployed in a Render container instance running behind their internal load balancers.
* **Data Layer:** Connected via secure TLS connections to Upstash Redis and Aiven MySQL clusters.

---

## API Examples

### Candidate Evaluation Endpoint

`POST /api/v1/analyzer/analyze`

**Request Headers:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
Content-Type: application/json
```

**Request Body:**
```json
{
  "username": "octocat"
}
```

**Response Body:**
```json
{
  "username": "octocat",
  "name": "The Octocat",
  "avatarUrl": "https://avatars.githubusercontent.com/u/5832347?v=4",
  "publicRepos": 8,
  "followers": 3200,
  "stats": {
    "totalStars": 14280,
    "forkCount": 1894,
    "activeContributors": 42
  },
  "topLanguages": [
    { "language": "TypeScript", "percentage": 85 },
    { "language": "Java", "percentage": 60 }
  ],
  "aiSummary": "Exhibits strong adherence to clean architectural separation of concerns (SOLID principles). High performance focus: Frequently optimizes hot paths in async TypeScript handlers.",
  "roleMatch": {
    "targetRole": "Backend Engineer",
    "score": 92
  }
}
```

---

## Performance Optimizations
To maintain fast response times, several optimizations are applied:
1. **JSON Deserialization Filtering:** Classes are decorated with `@JsonIgnoreProperties(ignoreUnknown = true)` to avoid parsing unnecessary metadata from GitHub.
2. **Connection Trimming:** The Redis connection parser trims whitespaces and newlines automatically, avoiding configuration errors on deployment servers.
3. **Stateless Operations:** Session creation is set to `SessionCreationPolicy.STATELESS` to eliminate backend session overhead.

---

## Security
GitAnalyzer enforces standard security protocols:
* **JWT Secret Integrity:** Secret keys are injected as externalized environment variables.
* **Stateless Filter Chain:** The request filters execute before standard security checks, validating the signature of incoming JWT tokens for all `/api/v1/**` resources.
* **TLS Encryption:** SSL connectivity is enforced across both MySQL (`sslMode=REQUIRED`) and Redis (`rediss://`).

---

## Challenges Faced
* **GitHub API Rate Limits:** Bypassed by introducing Upstash Redis as a transient cache layer.
* **SameSite Cookie Contexts:** Handled by routing federated OAuth redirects back through Vercel CDN proxy rewrites instead of executing cross-origin redirects directly.
* **Whitespace/Newline String Configurations:** Resolved by programmatically trimming parsed connection URL environments prior to instantiating connection factory instances.

---

## Future Scope
Planned features include:
* **Multi-Profile Comparison:** A feature to compare multiple candidates side-by-side.
* **Automatic Pull Request Reviewing:** Deeper evaluation of specific repository pull requests.
* **Enterprise SSO Support:** Integration with SAML and LDAP for enterprise teams.

---

## Contact
For questions regarding the architecture, please contact:
* **Project Maintainer:** [accclens@gmail.com](mailto:accclens@gmail.com)
* **GitHub profile:** [github.com/fuioinic](https://github.com/fuionic)
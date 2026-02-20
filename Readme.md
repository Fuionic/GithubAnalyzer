This README is designed to represent your project as a professional engineering portfolio piece. It reflects the shift from a "simple API caller" to an "Intelligence Analyzer."

---

# 🛡️ GitHub Profile Intelligence Analyzer

**A High-Performance Spring Boot Analytics Engine**

This project is a sophisticated backend service designed to transform raw GitHub data into actionable developer intelligence. Instead of simply proxying GitHub's JSON, this engine consumes multiple API endpoints, processes repository metadata, and calculates complex metrics to provide a "Skills Distribution" and "Impact Score" for any developer.

---

## 🎯 Project Vision

The goal is to provide a "Developer Dossier" that answers deeper questions than a standard profile page:

* **How impactful is this developer?** (Total stars and average stars per repo)
* **What is their primary ecosystem?** (Language dominance calculation)
* **How consistent is their activity?** (Recency of repository updates)

---

## 🏗️ Technical Architecture

The system follows a clean, decoupled architecture to ensure "Engineer-level" code quality:

### 1. The Controller Layer (The Entry Point)

Handles REST requests and maps Path Variables (`{username}`) to service calls.

* `GET /githubuser/{username}` -> Basic Profile Summary
* `GET /githubuser/{username}/analysis` -> Intelligence & Scoring Report

### 2. The Service Layer (The Brain)

This is where the transformation happens. It performs:

* **Aggregation:** Summing stars across all repositories.
* **Analysis:** Identifying the most used programming language through frequency mapping.
* **Logic:** Calculating account age and activity scores.

### 3. The DTO Layer (The Contract)

Strictly defined Data Transfer Objects ensure our API output is clean, professional, and independent of GitHub's internal structure.

---

## 📊 Feature Roadmap

### Phase 1: The Core Engine (Current)

* [x] Integration with GitHub REST API via `RestTemplate`.
* [x] Mapping raw JSON to Java POJOs using Jackson.
* [x] Implementation of `@JsonIgnoreProperties` for efficient memory usage.
* [x] Custom DTO creation for a "clean-only" data response.

### Phase 2: Intelligence & Analysis (Next)

* [ ] Multiple-endpoint orchestration (User Data + Repo Data).
* [ ] Logic for **Total Star Count** and **Top Language** detection.
* [ ] "Account Age" calculation using Java `Time` API.

### Phase 3: Persistence & Scalability (Planned)

* [ ] MySQL integration to cache analyzed profiles.
* [ ] Ranking system (Compare developers based on Impact Scores).
* [ ] Database-level tracking of user search history.

---

## 💻 Tech Stack

* **Language:** Java 25 (Modern Bytecode)
* **Framework:** Spring Boot 3.x
* **Dependency Management:** Maven
* **JSON Processing:** Jackson
* **External API:** GitHub REST API v3
* **Database:** MySQL (Configured for Phase 3)

---

## 🚦 Installation & Setup

1. **Clone the Project:**
```bash
git clone https://github.com/yourusername/github-analyzer.git

```


2. **Configure Environment:**
   Update `src/main/resources/application.properties` with your database credentials (or keep the DataSource exclusion for Phase 1).
3. **Build & Run:**
```bash
mvn clean install
mvn spring-boot:run

```


4. **Endpoint Test:**
```text
GET http://localhost:8080/githubuser/octocat

```



---

## 🛡️ Why this project matters

For a CS Engineering student, this project demonstrates:

1. **Loose Coupling:** Changing the frontend won't break the analysis logic.
2. **External Integration:** Handling 3rd party API rate limits and data mapping.
3. **Business Logic:** Moving beyond CRUD to actual data processing and intelligence.

---

## 📈 Future Enhancements
--- **AI-generated summary.
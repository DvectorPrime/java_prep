# COS 202 Java Exam-Prep Web Application
**Faculty of Computing, University of Ibadan**  
Course: **C-COS 202 — Advanced Object-Oriented Programming (Java)**  
Lecturer: Dr. Babatunde I. Ayinla

A mobile-first, high-performance exam preparation web application for COS 202 students. The app serves 100 preset, authentic practical Java exam questions from the master question bank and provides instantaneous AI-powered grading of student code and error identification using a resilient server-side Groq API key pool.

---

## Key Features

1. **Preset Question Bank (100 Questions)**:
   - **Section A (20 Qs):** Classes, Constructors, Encapsulation, Inheritance
   - **Section B (15 Qs):** Abstract Classes, Interfaces, Polymorphism, Modifiers
   - **Section C (12 Qs):** `ArrayList` and Exception Handling
   - **Section D (13 Qs):** Swing GUI and Event Handling
   - **Section E (12 Qs):** Arrays, 2D Arrays, Overloading, Recursion, Sorting/Searching
   - **Section F (8 Qs):** OOP Class Design Hierarchies
   - **Section G (5 Qs):** Collections, Custom Exceptions, Advanced GUI
   - **Section H (10 Qs):** Predict-the-Output Code Tracing
   - **Section I (5 Qs):** Debug & Extend Real-World Exam Scenarios

2. **Simulated Mock Examinations**:
   - Replicates the 05 October 2026 UI COS 202 practical paper structure.
   - Part 1 (Student Records), Part 2 (Payment Processing & Swing GUI), Part 3 (Comprehensive Programming).
   - Persistent countdown timer stored in `localStorage`.
   - Batch exam submission with a **concurrency limiter (max 2 parallel requests)** to protect rate limits.

3. **High-Speed Groq AI Grader**:
   - Powered by `openai/gpt-oss-120b` (primary) and `openai/gpt-oss-20b` (fallback).
   - Fast token inference with `reasoning_effort: "low"`.
   - Automatic key rotation across registered API keys.
   - Resilient error handling (automatic cooldown on 429, retry on network errors).
   - SHA-256 exact answer caching to conserve daily quotas.

4. **Free Self-Check Mode**:
   - Zero-token instant check revealing the official answer key, reference solution, rubric, and common student pitfalls.

5. **Device-Local Identity & Zero Database**:
   - No external database or login library required.
   - Client identity is stored in `localStorage` (`clientId` + student name).
   - Export and import progress anytime via JSON files.

---

## Getting Started

### Prerequisites
- Node.js 18+ (tested on Node v20/v24)
- `pnpm` (version 9+)

### Installation
```bash
# 1. Install dependencies
pnpm install

# 2. Compile and validate the 100-question master dataset
pnpm run build:data

# 3. Build the Next.js production bundle
pnpm run build
```

---

## Local LAN & Hotspot Hosting Instructions

Run the application on your laptop so classmates on the same Wi-Fi network or mobile hotspot can access it seamlessly:

### Step 1: Start the Server on `0.0.0.0`
```bash
pnpm run start -- -H 0.0.0.0 -p 3000
```

### Step 2: Find Your Laptop's Local IP Address
In Windows PowerShell / Command Prompt:
```powershell
ipconfig
```
Look for the **IPv4 Address** under your active Wi-Fi or Wireless LAN adapter (e.g., `192.168.43.120` or `192.168.1.15`).

### Step 3: Configure Windows Firewall
To allow other devices on your Wi-Fi/hotspot to connect to port 3000:
1. Open PowerShell as Administrator.
2. Run the following command:
```powershell
New-NetFirewallRule -DisplayName "COS 202 Java Prep WebApp" -Direction Inbound -LocalPort 3000 -Protocol TCP -Action Allow -Profile Private
```
3. Classmates can now open their mobile browsers and navigate to:
```text
http://<YOUR_LAPTOP_IP>:3000
```
*(e.g., `http://192.168.43.120:3000`)*

---

## Free Cloudflare Tunnel (Remote Sharing Without Hotspot)

If your classmates are connected over cellular data (MTN, Airtel, Glo) without being on your local hotspot, you can expose your local server with a secure, zero-config Cloudflare Tunnel:

1. Download [cloudflared for Windows](https://github.com/cloudflare/cloudflared/releases).
2. Start your local server: `pnpm run start -- -p 3000`
3. Run the tunnel command:
```bash
cloudflared tunnel --url http://localhost:3000
```
4. Copy the generated `https://*.trycloudflare.com` URL and share it with your classmates.

---

## Vercel Cloud Deployment

The application is fully compatible with serverless cloud deployment on Vercel:
1. Push the repository to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. In **Settings > Environment Variables**, add:
   - `ADMIN_PASSCODE`: Your desired admin dashboard password (default: `admin2026`).
   - `GROQ_API_KEYS`: Comma-separated list of Groq API keys:
     ```text
     gsk_key1,gsk_key2,gsk_key3
     ```
4. Deploy! In Vercel's ephemeral serverless environment, keys are automatically read from `GROQ_API_KEYS`.

---

## Admin Console (`/admin`)

The admin portal provides real-time oversight and key pool configuration:
- Access: `/admin` (Default passcode: `admin2026`).
- **Live Key Dashboard**: View status (Active, Cooldown, Invalid, Disabled) and daily token usage per key.
- **Key Testing**: Execute immediate 5-token ping requests to verify key connectivity and latency.
- **Bulk Import**: Paste new keys in `[label] - [key]` format.
- **Master Pause Switch**: Temporarily pause AI grading during peak network congestion, automatically switching students to Self-Check mode.
- **Cache Controls**: View total cached evaluations and flush cache when needed.

---

## Academic Integrity Notice
Built for University of Ibadan students preparing for the COS 202 Practical Examination. Question bank questions strictly match the syllabus guidelines set by Dr. Babatunde I. Ayinla, Faculty of Computing.

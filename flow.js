/**
 * SkillSaarthi Cybersecurity Trainer Dashboard Engine
 * Handles interactive question rendering, inline editing, deletion, and PDF generation.
 */

// Initial 30-Question Assessment Dataset
let questionsData = [
    // Python Domain
    { id: 1, domain: 'Python', level: 'Basic', marks: 1, text: 'Which Python module is primarily used to interact with the operating system for path manipulation and file inspection?', options: ['sys', 'os', 'math', 'requests'], answer: 1 },
    { id: 2, domain: 'Python', level: 'Basic', marks: 1, text: 'Which file mode opens an existing server log in Python for append operations without overwriting?', options: ["'w'", "'r'", "'a'", "'x'"], answer: 2 },
    { id: 3, domain: 'Python', level: 'Intermediate', marks: 2, text: 'Which code snippet correctly reads a system log line by line safely using a context manager?', options: ["with open('log.txt') as f: lines = f.readlines()", "open('log.txt').read_all()", "file.fetch('log.txt')", "import log; log.read('log.txt')"], answer: 0 },
    { id: 4, domain: 'Python', level: 'Intermediate', marks: 2, text: 'Which Python regular expression pattern matches a standard IPv4 address format (0.0.0.0 - 255.255.255.255)?', options: [r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}', r'[a-z]+\.[a-z]+', r'\d+\-\d+\-\d+', r'IP\:\d{4}'], answer: 0 },
    { id: 5, domain: 'Python', level: 'Advanced', marks: 3, text: 'Which Python snippet computes the SHA-256 hash of a file named evidence.raw for forensic integrity?', options: ["import hashlib; print(hashlib.sha256(open('evidence.raw', 'rb').read()).hexdigest())", "import crypto; print(crypto.hash('evidence.raw'))", "import os; print(os.get_hash('evidence.raw'))", "import base64; print(base64.b64encode('evidence.raw'))"], answer: 0 },
    { id: 6, domain: 'Python', level: 'Advanced', marks: 3, text: 'How should a script handling automated network socket connections gracefully handle timeouts?', options: ['Use try...except socket.timeout blocks around socket calls', 'Set sys.ignore_errors = True', 'Execute os.system("kill -9")', 'Use assert socket.connected == True'], answer: 0 },

    // Linux Domain
    { id: 7, domain: 'Linux', level: 'Basic', marks: 1, text: 'Which Linux command displays active running processes and real-time resource utilization?', options: ['ls', 'top', 'chmod', 'ifconfig'], answer: 1 },
    { id: 8, domain: 'Linux', level: 'Basic', marks: 1, text: 'Which command sets permissions so only the file owner has full read, write, and execute access (rwx------)?', options: ['chmod 777 filename', 'chmod 644 filename', 'chmod 700 filename', 'chown 700 filename'], answer: 2 },
    { id: 9, domain: 'Linux', level: 'Intermediate', marks: 2, text: 'How do you search for failed SSH login attempts inside /var/log/auth.log?', options: ['grep "Failed password" /var/log/auth.log', 'cat /var/log/auth.log | find "Failed"', 'tail -f /var/log/auth.log --search', 'ls -l /var/log/auth.log'], answer: 0 },
    { id: 10, domain: 'Linux', level: 'Intermediate', marks: 2, text: 'Which utility identifies listening network ports and open sockets on a Linux target?', options: ['ss -tuln', 'ps aux', 'df -h', 'uname -a'], answer: 0 },
    { id: 11, domain: 'Linux', level: 'Advanced', marks: 3, text: 'Which command forcefully terminates a malicious process running under PID 4821?', options: ['kill -9 4821', 'rm 4821', 'stop --force 4821', 'service 4821 restart'], answer: 0 },
    { id: 12, domain: 'Linux', level: 'Advanced', marks: 3, text: 'Where are persistence mechanism scheduled tasks stored in Linux that require investigation?', options: ['/etc/cron* and /var/spool/cron/crontabs/', '/home/user/desktop', '/usr/bin/cron', '/dev/null'], answer: 0 },

    // Networking Domain
    { id: 13, domain: 'Networking', level: 'Basic', marks: 1, text: 'Which transport layer protocol provides connection-oriented, reliable communications?', options: ['UDP', 'TCP', 'ICMP', 'ARP'], answer: 1 },
    { id: 14, domain: 'Networking', level: 'Basic', marks: 1, text: 'What is the default destination port utilized for secure HTTPS traffic?', options: ['80', '21', '443', '22'], answer: 2 },
    { id: 15, domain: 'Networking', level: 'Intermediate', marks: 2, text: 'Which protocol resolves an IP address to a physical MAC address on a local network segment?', options: ['DNS', 'DHCP', 'ARP', 'SNMP'], answer: 2 },
    { id: 16, domain: 'Networking', level: 'Intermediate', marks: 2, text: 'What is the standard sequence of flags in a 3-way TCP handshake connection setup?', options: ['SYN -> SYN-ACK -> ACK', 'ACK -> SYN -> SYN-ACK', 'FIN -> ACK -> RST', 'SYN -> FIN -> ACK'], answer: 0 },
    { id: 17, domain: 'Networking', level: 'Advanced', marks: 3, text: 'A continuous stream of SYN packets without ACK completions from multiple spoofed IPs indicates:', options: ['SYN Flood DDoS / Stealth Port Scan', 'Standard DNS Resolution', 'Active FTP File Transfer', 'DHCP Allocation'], answer: 0 },
    { id: 18, domain: 'Networking', level: 'Advanced', marks: 3, text: 'How many usable host IP addresses are available in a /26 subnet (255.255.255.192)?', options: ['254', '62', '128', '30'], answer: 1 },

    // Web Security Domain
    { id: 19, domain: 'Web Security', level: 'Basic', marks: 1, text: 'Which vulnerability occurs when an attacker executes malicious client-side script in a victim web browser?', options: ['Cross-Site Scripting (XSS)', 'SQL Injection', 'Buffer Overflow', 'Denial of Service'], answer: 0 },
    { id: 20, domain: 'Web Security', level: 'Basic', marks: 1, text: 'Which browser policy prevents scripts on one domain from accessing data on another domain origin?', options: ['Same-Origin Policy (SOP)', 'Multi-Factor Authentication', 'Public Key Infrastructure', 'NAT'], answer: 0 },
    { id: 21, domain: 'Web Security', level: 'Intermediate', marks: 2, text: 'Injecting "\' OR \'1\'=\'1" into an unvalidated login input field tests for which vulnerability?', options: ['CSRF', 'SQL Injection (SQLi)', 'Directory Traversal', 'Command Injection'], answer: 1 },
    { id: 22, domain: 'Web Security', level: 'Intermediate', marks: 2, text: 'What is the primary technical control to prevent Stored and Reflected XSS attacks?', options: ['Context-aware Output Encoding & Input Sanitization', 'Increasing Server RAM', 'Using HTTP instead of HTTPS', 'Disabling SSH'], answer: 0 },
    { id: 23, domain: 'Web Security', level: 'Advanced', marks: 3, text: 'Which response header mitigates Clickjacking by restricting web frame rendering?', options: ['X-Frame-Options', 'Strict-Transport-Security', 'Access-Control-Allow-Origin', 'X-Content-Type-Options'], answer: 0 },
    { id: 24, domain: 'Web Security', level: 'Advanced', marks: 3, text: 'What occurs during a Server-Side Request Forgery (SSRF) exploit?', options: ['The web server is coerced into sending crafted requests to internal/external systems', 'Browser executes local JS', 'Database crashes', 'Cookies are stolen'], answer: 0 },

    // Incident Response Domain
    { id: 25, domain: 'Incident Response', level: 'Basic', marks: 1, text: 'What core principles form the fundamental CIA triad in information security?', options: ['Confidentiality, Integrity, Availability', 'Control, Inspection, Authentication', 'Authorization, Accounting, Auditing', 'Detection, Prevention, Recovery'], answer: 0 },
    { id: 26, domain: 'Incident Response', level: 'Basic', marks: 1, text: 'What is the immediate priority when a workstation exhibits active ransomware file encryption?', options: ['Isolate host from the network immediately', 'Pay the ransom', 'Reboot machine', 'Email attacker'], answer: 0 },
    { id: 27, domain: 'Incident Response', level: 'Intermediate', marks: 2, text: 'What is the correct sequential order of the NIST Incident Response Lifecycle?', options: ['Preparation -> Detection & Analysis -> Containment, Eradication & Recovery -> Post-Incident Activity', 'Detection -> Preparation -> Recovery -> Containment', 'Eradication -> Containment -> Analysis -> Lessons Learned', 'Recovery -> Detection -> Eradication -> Preparation'], answer: 0 },
    { id: 28, domain: 'Incident Response', level: 'Intermediate', marks: 2, text: 'Why is Chain of Custody logging crucial during physical and digital evidence handling?', options: ['To maintain legal admissibility by recording evidence control and transfers', 'To speed up imaging', 'To bypass passwords', 'To auto-encrypt logs'], answer: 0 },
    { id: 29, domain: 'Incident Response', level: 'Advanced', marks: 3, text: 'Why must volatile memory (RAM) acquisition occur prior to shutting down a compromised host?', options: ['RAM is volatile; turning off power permanently erases artifacts and network states', 'Disk wipes automatically', 'Reboot is required for drivers', 'Routers drop logs'], answer: 0 },
    { id: 30, domain: 'Incident Response', level: 'Advanced', marks: 3, text: 'Which official document records attack timeline, root cause, impact, and post-incident remediation actions?', options: ['Incident Report', 'Privacy Assessment', 'Purchase Order', 'User Audit'], answer: 0 }
];

document.addEventListener('DOMContentLoaded', () => {
    renderQuestions();
    setupEventListeners();
    setupSmoothScroll();
});

// Render Questions to DOM
function renderQuestions() {
    const container = document.getElementById('questions-list');
    container.innerHTML = '';

    questionsData.forEach((q, index) => {
        const qCard = document.createElement('div');
        qCard.className = 'q-card';
        qCard.setAttribute('data-id', q.id);

        const levelClass = q.level.toLowerCase();

        qCard.innerHTML = `
            <div class="q-header">
                <div class="q-meta">
                    <span class="badge domain">${q.domain}</span>
                    <span class="badge ${levelClass}">${q.level} (${q.marks} Mark${q.marks > 1 ? 's' : ''})</span>
                    <strong style="color: var(--text-muted); font-size: 0.85rem;">Q${index + 1}</strong>
                </div>
                <div class="q-actions no-print">
                    <button class="btn-edit" onclick="editQuestion(${q.id})" title="Edit Question"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
                    <button class="btn-delete" onclick="deleteQuestion(${q.id})" title="Delete Question"><i class="fa-solid fa-trash"></i> Delete</button>
                </div>
            </div>
            <div class="q-text" id="q-text-${q.id}">${q.text}</div>
            <div class="q-options" id="q-opt-${q.id}">
                ${q.options.map((opt, optIndex) => `
                    <div class="opt-item ${optIndex === q.answer ? 'correct' : ''}">
                        <strong>${String.fromCharCode(65 + optIndex)}:</strong> ${opt}
                    </div>
                `).join('')}
            </div>
        `;
        container.appendChild(qCard);
    });
}

// Edit Question Logic
function editQuestion(id) {
    const q = questionsData.find(item => item.id === id);
    if (!q) return;

    const newText = prompt("Edit Question Text:", q.text);
    if (newText !== null && newText.trim() !== "") {
        q.text = newText.trim();
        
        // Optionally edit options
        for (let i = 0; i < q.options.length; i++) {
            const newOpt = prompt(`Edit Option ${String.fromCharCode(65 + i)}:`, q.options[i]);
            if (newOpt !== null && newOpt.trim() !== "") {
                q.options[i] = newOpt.trim();
            }
        }
        renderQuestions();
    }
}

// Delete Question Logic
function deleteQuestion(id) {
    if (confirm("Are you sure you want to delete this question from the assessment?")) {
        questionsData = questionsData.filter(q => q.id !== id);
        renderQuestions();
    }
}

// Add New Question Logic
function setupEventListeners() {
    document.getElementById('add-q-btn').addEventListener('click', () => {
        const domain = prompt("Enter Domain (Python, Linux, Networking, Web Security, Incident Response):", "Python") || "Python";
        const level = prompt("Enter Difficulty Level (Basic, Intermediate, Advanced):", "Basic") || "Basic";
        const text = prompt("Enter Question Text:");
        if (!text) return;

        const optA = prompt("Option A:") || "Option A";
        const optB = prompt("Option B:") || "Option B";
        const optC = prompt("Option C:") || "Option C";
        const optD = prompt("Option D:") || "Option D";
        const answerIdx = parseInt(prompt("Correct Option Index (0 for A, 1 for B, 2 for C, 3 for D):", "0") || "0", 10);

        const marks = level === 'Advanced' ? 3 : (level === 'Intermediate' ? 2 : 1);

        const newQ = {
            id: Date.now(),
            domain,
            level,
            marks,
            text,
            options: [optA, optB, optC, optD],
            answer: answerIdx >= 0 && answerIdx < 4 ? answerIdx : 0
        };

        questionsData.push(newQ);
        renderQuestions();
    });

    // Save as PDF Functionality
    document.getElementById('export-pdf-btn').addEventListener('click', () => {
        const element = document.getElementById('pdf-container');
        const opt = {
            margin:       0.5,
            filename:     'SkillSaarthi_CyberCell_Assessment.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        // Fallback to native print if html2pdf fails or is used in standard print
        if (typeof html2pdf !== 'undefined') {
            html2pdf().set(opt).from(element).save();
        } else {
            window.print();
        }
    });
}

// Smooth scrolling for sidebar links
function setupSmoothScroll() {
    document.querySelectorAll('.sidebar a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelectorAll('.sidebar a').forEach(a => a.classList.remove('active'));
            this.classList.add('active');

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}
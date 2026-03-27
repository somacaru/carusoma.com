import Link from 'next/link';
import { notFound } from 'next/navigation';

// Shared post data — move to a lib/posts.ts file when adding a CMS
const blogPosts = [
  {
    id: 1,
    title: 'AI vs. Your Business: How to Spot Deepfake Phishing Attacks',
    excerpt: 'Deepfake technology is being weaponized for social engineering. Learn how to protect your small business from AI-powered phishing attacks.',
    date: 'December 19, 2025',
    readTime: '10 min read',
    category: 'Emerging Threats',
    slug: 'ai-deepfake-phishing-attacks',
    content: `
Deepfake technology has moved well beyond viral videos of celebrities — it's now a weapon in the hands of cybercriminals targeting your business.

## What Are Deepfake Phishing Attacks?

Traditional phishing relies on text-based deception. Deepfake phishing adds hyper-realistic audio and video impersonation. Attackers can now clone a CEO's voice in minutes using free AI tools, then call your finance team requesting an urgent wire transfer.

## The Numbers Don't Lie

- **$25M** lost in a single deepfake video call scam in Hong Kong (2024)
- **Voice cloning** requires as little as 3 seconds of audio
- **85%** of employees cannot reliably distinguish AI-generated voice from real

## How to Protect Your Business

**1. Establish a verbal codeword protocol**
Any wire transfer or sensitive request made by phone must include a pre-shared codeword — even if the caller sounds exactly like your CEO.

**2. Implement callback verification**
Never process financial requests from inbound calls. Hang up and call back using a verified number from your internal directory.

**3. Train your team to pause**
Urgency is the attacker's best weapon. Train employees that legitimate urgent requests can survive a 10-minute verification delay.

**4. Flag unusual communication channels**
If your CEO normally emails but suddenly calls asking for crypto — that's a red flag regardless of how authentic the voice sounds.

## The Bottom Line

You don't need to be a Fortune 500 company to be targeted. Small businesses are often easier targets because they lack formal verification protocols. Building simple procedures now costs nothing. A successful deepfake attack could cost everything.

**Need a security audit?** [Contact us](/contact) to assess your social engineering exposure.
    `.trim(),
  },
  {
    id: 2,
    title: 'Ransomware 2025: Why Small Businesses Are Prime Targets',
    excerpt: "Ransomware attacks against small businesses increased 58% in Q2 2025. Discover why you're targeted and how to protect your business.",
    date: 'December 12, 2025',
    readTime: '12 min read',
    category: 'Ransomware',
    slug: 'ransomware-2025-small-business-targets',
    content: `
Ransomware gangs have quietly shifted their focus from enterprise giants to small businesses — and the results are devastating.

## Why Small Businesses?

Large corporations now have dedicated security teams, cyber insurance requirements, and hardened infrastructure. Small businesses often have none of these — making them the path of least resistance.

**The math is simple:** 500 small businesses paying $15,000 each = $7.5M. Same yield, far less resistance than attacking one enterprise.

## The 2025 Threat Landscape

- **RaaS (Ransomware-as-a-Service)** has lowered the bar — script kiddies can now deploy enterprise-grade ransomware
- **Double extortion** is now standard: encrypt your data AND threaten to publish it
- **Average downtime** after a ransomware attack: 21 days
- **Average recovery cost** for small businesses: $50,000–$200,000

## Your Biggest Vulnerabilities

1. **Unpatched systems** — attackers scan the internet continuously for known CVEs
2. **Weak RDP** — Remote Desktop Protocol exposed to the internet with weak passwords
3. **No MFA** — password reuse + credential stuffing = easy access
4. **No offline backups** — if your backups are network-connected, ransomware encrypts those too

## A Practical Defense Checklist

- [ ] Enable MFA on every account (especially email and VPN)
- [ ] Keep Windows and software fully patched
- [ ] Disable RDP or put it behind a VPN
- [ ] Maintain offline (air-gapped) backups, tested monthly
- [ ] Segment your network so ransomware can't spread laterally
- [ ] Train staff to recognize phishing — still the #1 initial access vector

## If You Get Hit

1. **Isolate immediately** — unplug affected machines from the network
2. **Don't pay yet** — contact law enforcement (FBI IC3) and a incident response firm first
3. **Preserve evidence** — don't wipe machines before forensics
4. **Notify** — check your state's breach notification requirements

**Don't wait until after an attack.** [Book a security assessment](/book) and find your gaps before attackers do.
    `.trim(),
  },
  {
    id: 3,
    title: "Learning from 2025's Biggest Breaches: What Small Businesses Need to Know",
    excerpt: "With 16 billion passwords leaked and major breaches affecting millions, here's what small businesses can learn from 2025's biggest security incidents.",
    date: 'December 5, 2025',
    readTime: '9 min read',
    category: 'Data Breaches',
    slug: 'biggest-breaches-2025-lessons',
    content: `
2025 was a record year for data breaches. Here's what every small business owner needs to take away from the headlines.

## The Headline Numbers

- **16 billion** passwords leaked across multiple breach compilations
- **National Public Data breach** exposed Social Security numbers for nearly every American
- **Healthcare sector** saw a 300% increase in ransomware incidents
- **Supply chain attacks** compromised thousands of businesses through trusted vendors

## Lesson 1: Your Password Policy Is Probably Broken

The 16 billion leaked passwords include credentials from breaches spanning years. If any of your employees reuse passwords across accounts, assume some of those credentials are already for sale on the dark web.

**Fix:** Enforce a password manager (Bitwarden is free), enable MFA everywhere, and run a dark web scan of your business email domains.

## Lesson 2: Third-Party Risk Is Your Risk

Many of 2025's biggest breaches didn't start with the victim — they started with a vendor. Software update mechanisms, managed service providers, and SaaS platforms all became attack vectors.

**Fix:** Audit who has access to your systems. Limit third-party permissions to least privilege. Ask vendors about their security posture before signing contracts.

## Lesson 3: Healthcare Is Not the Only Target

While healthcare dominates breach headlines, financial services, legal, and retail saw massive increases. If you store any sensitive client data — you're a target.

**Fix:** Data minimization. Don't store what you don't need. Encrypt what you do store. Know exactly where your sensitive data lives.

## The Bottom Line

Breaches happen to businesses that thought they were too small to be targeted. The same reconnaissance tools attackers use against enterprises scan your IP range too.

**Know your exposure.** [Contact us](/contact) for a dark web scan and vulnerability assessment.
    `.trim(),
  },
  {
    id: 4,
    title: 'Cloud Security Misconfigurations: The #1 Data Breach Cause',
    excerpt: 'Cloud misconfigurations are the leading cause of data breaches. Learn the most common mistakes and how to secure your cloud infrastructure.',
    date: 'November 28, 2025',
    readTime: '11 min read',
    category: 'Cloud Security',
    slug: 'cloud-security-misconfigurations',
    content: `
You migrated to the cloud for flexibility and security. But if you misconfigured it, you may have created the biggest vulnerability in your business.

## Why Misconfiguration Is the Top Threat

Unlike traditional breaches that require sophisticated exploitation, cloud misconfigurations are often just... publicly exposed storage buckets or overly permissive IAM roles. No hacking required.

**Gartner projects** that through 2025, 99% of cloud security failures will be the customer's fault — not the provider's.

## The Most Dangerous Misconfigurations

**1. Public S3 buckets / Blob storage**
Thousands of businesses have accidentally exposed customer databases, internal documents, and backups to the entire internet by forgetting one checkbox.

**2. Overpermissive IAM roles**
Giving a service account admin access "just to be safe" means one compromised token gives attackers the keys to your entire cloud.

**3. No MFA on cloud console**
Root account + no MFA = catastrophic risk. A phished password is all it takes.

**4. Unrestricted security groups**
Leaving ports 22 (SSH), 3389 (RDP), or 3306 (MySQL) open to 0.0.0.0/0 is essentially an open invitation.

**5. Logging disabled**
Without CloudTrail, audit logs, or similar — you have no visibility into what's happening. You won't know you've been breached until it's too late.

## A Quick Audit Checklist

- [ ] Run AWS Trusted Advisor or Azure Security Center — free and catches common issues
- [ ] Audit all public-facing storage buckets
- [ ] Review IAM roles for principle of least privilege
- [ ] Enable MFA on all cloud console accounts
- [ ] Lock down security groups to specific IP ranges
- [ ] Enable logging and set up alerts for unusual activity

**Need a cloud security review?** [Book a consultation](/book) — we'll find your misconfigurations before attackers do.
    `.trim(),
  },
  {
    id: 5,
    title: "Critical Vulnerabilities: Why Patch Management Can't Wait",
    excerpt: "Zero-day exploits like React2Shell demonstrate why timely patching is critical. Learn patch management best practices for small businesses.",
    date: 'November 21, 2025',
    readTime: '8 min read',
    category: 'Vulnerability Management',
    slug: 'patch-management-critical-vulnerabilities',
    content: `
Every unpatched system in your network is an open door. Patch management isn't glamorous — but it stops the majority of attacks cold.

## The Reality of Unpatched Systems

The average time between a vulnerability being disclosed and it being actively exploited in the wild has dropped to **under 15 days**. Meanwhile, the average organization takes **60–90 days** to patch.

That gap is where breaches happen.

## Why Businesses Fall Behind on Patching

- "We'll patch it next maintenance window" — which keeps getting postponed
- Fear of breaking production systems
- No centralized visibility into what needs patching
- Understaffed IT teams with competing priorities

## A Practical Patch Management Framework

**1. Know your inventory**
You can't patch what you don't know exists. Maintain an up-to-date asset inventory — every server, workstation, network device, and cloud resource.

**2. Prioritize by CVSS score and exploitability**
Not all patches are equal. A CVSS 9.8 with a public exploit available needs to be patched this week. A CVSS 4.0 with no known exploitation can wait for your normal cycle.

**3. Test before mass deployment**
Spin up a staging environment. Test patches on non-critical systems first. Document what you tested.

**4. Set SLAs by severity**
- Critical (CVSS 9+, actively exploited): 24–72 hours
- High (CVSS 7–8.9): 7 days
- Medium (CVSS 4–6.9): 30 days
- Low: Next scheduled maintenance

**5. Automate where possible**
Windows Update, AWS Systems Manager Patch Manager, and similar tools can handle routine patching automatically, freeing your team for complex cases.

## The Bottom Line

Most breaches exploit vulnerabilities that had patches available for months. Patching isn't optional — it's the single highest-ROI security activity available to any organization.

**Unsure of your patch status?** [Contact us](/contact) for a vulnerability scan.
    `.trim(),
  },
  {
    id: 6,
    title: 'AI-Enabled Insider Threats: The New Security Challenge',
    excerpt: 'AI is transforming traditional insider threats into scalable operations. Discover how to protect your business from AI-enhanced insider risks.',
    date: 'November 14, 2025',
    readTime: '10 min read',
    category: 'Insider Threats',
    slug: 'ai-enabled-insider-threats',
    content: `
Insider threats have always been difficult to detect. AI makes them orders of magnitude more dangerous.

## What's Changed

Traditional insider threats were limited by human capacity — a disgruntled employee could only steal so much data, exfiltrate so many files, or do so much damage before being caught or running out of time.

AI removes those constraints. A malicious insider with access to AI tools can now:
- Automatically classify and exfiltrate sensitive documents at machine speed
- Generate convincing phishing emails targeting colleagues
- Analyze internal communications to identify the most valuable targets
- Cover their tracks more effectively

## The Three Types of AI-Enhanced Insiders

**1. The Malicious Insider**
A current or former employee deliberately using AI to maximize damage or data theft before departing.

**2. The Compromised Insider**
An employee whose credentials have been stolen — an external attacker operating with inside access and using AI to move laterally.

**3. The Negligent Insider**
An employee who inadvertently feeds sensitive company data into public AI tools (ChatGPT, etc.), creating unintended data exposure.

## Detection Strategies

**Behavioral analytics**
Modern DLP (Data Loss Prevention) and UEBA (User and Entity Behavior Analytics) tools establish baselines and flag anomalies — mass downloads at 2am, accessing files outside normal role scope, large email attachments to personal accounts.

**Data classification**
If you don't know where your sensitive data is, you can't protect it. Label it, restrict access by role, and audit who touches it.

**Least privilege access**
Employees should only have access to the systems and data their role requires. Regular access reviews catch privilege creep.

**Exit procedures**
Departing employees — especially those leaving involuntarily — should have access revoked the moment they're notified. Not after the exit interview. Immediately.

## The AI Tool Policy Gap

Most small businesses have no policy governing employee use of AI tools. This is urgent. An employee pasting customer contracts into ChatGPT to summarize them has just exposed your clients' confidential information to a third party.

**Build an AI usage policy now.** It doesn't need to be complex — just clear about what data can and cannot be processed by external AI tools.

**Need help building an insider threat program?** [Contact us](/contact) — we can help right-size it for your organization.
    `.trim(),
  },
];

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Convert simple markdown-ish content to paragraphs
  const sections = post.content.split('\n\n').map((block, i) => {
    if (block.startsWith('## ')) {
      return <h2 key={i} className="text-2xl font-bold text-white mt-10 mb-4">{block.replace('## ', '')}</h2>;
    }
    if (block.startsWith('**') && block.endsWith('**')) {
      return <p key={i} className="text-white font-semibold mb-4">{block.replace(/\*\*/g, '')}</p>;
    }
    if (block.startsWith('- [')) {
      const items = block.split('\n').filter(Boolean);
      return (
        <ul key={i} className="space-y-2 mb-6">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-slate-300">
              <span className="text-cyan-400 mt-1">☐</span>
              <span>{item.replace(/- \[.\] /, '')}</span>
            </li>
          ))}
        </ul>
      );
    }
    if (block.startsWith('- ')) {
      const items = block.split('\n').filter(Boolean);
      return (
        <ul key={i} className="space-y-2 mb-6">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-slate-300">
              <span className="text-cyan-400 mt-1">→</span>
              <span dangerouslySetInnerHTML={{ __html: item.replace('- ', '').replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p
        key={i}
        className="text-slate-300 leading-relaxed mb-6"
        dangerouslySetInnerHTML={{
          __html: block
            .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>')
            .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-cyan-400 hover:text-cyan-300 underline">$1</a>'),
        }}
      />
    );
  });

  return (
    <div className="min-h-screen bg-arcane-dark">
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-arcane-dark via-arcane-dark/95 to-arcane-dark"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium mb-8 transition-colors"
          >
            ← Back to Blog
          </Link>
          <div className="flex items-center gap-3 text-sm text-slate-500 mb-4">
            <span className="text-cyan-400 font-medium">{post.category}</span>
            <span>•</span>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8 md:p-12">
          <p className="text-xl text-slate-300 leading-relaxed mb-8 pb-8 border-b border-slate-700/50">
            {post.excerpt}
          </p>
          <div>{sections}</div>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-slate-800/50 border border-cyan-500/20 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">Ready to strengthen your security posture?</h3>
          <p className="text-slate-400 mb-6">Get a professional assessment tailored to your business.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="bg-cyan-500 text-slate-900 px-6 py-3 rounded-lg font-bold hover:bg-cyan-400 transition-all duration-200"
            >
              Book a Consultation
            </Link>
            <Link
              href="/contact"
              className="border border-cyan-500/50 text-cyan-400 px-6 py-3 rounded-lg font-semibold hover:bg-cyan-500/10 transition-all duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-8 text-center">
          <Link href="/blog" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
            ← Back to all posts
          </Link>
        </div>
      </article>
    </div>
  );
}

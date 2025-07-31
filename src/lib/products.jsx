import React from 'react';
import { Wifi, Code, Bot, Shield, Server, Skull } from 'lucide-react';

export const productsData = [
  {
    id: 'web3-drainer',
    name: 'Web3 Drainer',
    tagline: 'Multi-chain wallet drainer with max efficiency.',
    description: 'Our top-tier Web3 Drainer kit supports multiple chains including ETH, SOL, and BSC. It comes with a clean interface, customizable branding, and detailed analytics. Easy to deploy, hard to detect.',
    icon: <Wifi className="w-12 h-12"/>,
    images: [
        'https://via.placeholder.com/800x600/0a0a0a/33ffcc.png?text=Drainer+Panel',
        'https://via.placeholder.com/800x600/0a0a0a/33ffcc.png?text=Live+Analytics',
        'https://via.placeholder.com/800x600/0a0a0a/33ffcc.png?text=Wallet+Connect',
    ],
    features: [
      "Supports 10+ chains",
      "NFT and Token draining",
      "Seaport 1.5 Integration",
      "User-friendly dashboard",
      "Full source code included",
    ],
    options: [
      { name: 'Standard Kit', price: 499, popular: false },
      { name: 'Pro Kit + Setup', price: 799, popular: true },
    ]
  },
  {
    id: 'venom-rat',
    name: 'Venom RAT',
    tagline: 'Advanced Remote Admin Tool with HVNC.',
    description: 'Venom RAT provides a comprehensive suite of remote administration tools, including a Hidden VNC, keylogger, file manager, and password recovery. Fully undetectable (FUD) and stable.',
    icon: <Bot className="w-12 h-12"/>,
    images: [
        'https://via.placeholder.com/800x600/0a0a0a/33ffcc.png?text=Venom+Dashboard',
        'https://via.placeholder.com/800x600/0a0a0a/33ffcc.png?text=Connection+Manager',
        'https://via.placeholder.com/800x600/0a0a0a/33ffcc.png?text=HVNC+in+Action',
    ],
    features: [
      "Hidden VNC (HVNC)",
      "Advanced Keylogger",
      "Password Stealer (All Browsers)",
      "Live Microphone Feed",
      "FUD Stub (0/32)",
    ],
    options: [
      { name: 'Lifetime License', price: 350, popular: true },
      { name: 'Monthly License', price: 150, popular: false },
    ]
  },
  {
    id: 'custom-malware',
    name: 'Custom Malware',
    tagline: 'Tailor-made solutions for specific targets.',
    description: 'We develop custom malware to your specifications. Whether you need a banking trojan, a crypto miner, or a data destroyer, our team delivers high-quality, private builds with ongoing support.',
    icon: <Code className="w-12 h-12"/>,
    images: [
        'https://via.placeholder.com/800x600/0a0a0a/33ffcc.png?text=Builder+Interface',
        'https://via.placeholder.com/800x600/0a0a0a/33ffcc.png?text=Payload+Options',
        'https://via.placeholder.com/800x600/0a0a0a/33ffcc.png?text=Live+Infections',
    ],
    features: [
      "Banking Trojan Module",
      "Silent Crypto Miner",
      "Ransomware Module",
      "Data Destroyer Payload",
      "Private & Unique Stub",
    ],
    options: [
      { name: 'Banking Trojan', price: 1200, popular: false },
      { name: 'Crypto Miner', price: 800, popular: true },
      { name: 'Full Suite', price: 2500, popular: false },
    ]
  },
  {
    id: 'bulletproof-vps',
    name: 'Bulletproof VPS',
    tagline: 'Secure & anonymous hosting for your operations.',
    description: 'Our offshore bulletproof VPS solutions guarantee 99.9% uptime, ignore DMCA takedowns, and have a strict no-logs policy. Perfect for hosting your C2 servers, phishing sites, or other critical infrastructure.',
    icon: <Server className="w-12 h-12"/>,
    images: [
        'https://via.placeholder.com/800x600/0a0a0a/33ffcc.png?text=Server+Specs',
        'https://via.placeholder.com/800x600/0a0a0a/33ffcc.png?text=Control+Panel',
        'https://via.placeholder.com/800x600/0a0a0a/33ffcc.png?text=Network+Diagram',
    ],
    features: [
      "Offshore Locations (RU, NL)",
      "DMCA Ignored",
      "No Logs Policy",
      "Full Root Access",
      "DDoS Protection",
    ],
    options: [
      { name: 'Basic VPS', price: 69.99, popular: false },
      { name: 'Pro VPS', price: 129.99, popular: true },
      { name: 'Elite VPS', price: 199.99, popular: false },
    ]
  },
  {
    id: 'banking-trojan',
    name: 'Cerberus Trojan',
    tagline: 'Advanced Android banking trojan.',
    description: 'Cerberus is a powerful Android trojan with a wide range of features, including web injects for hundreds of banks, SMS control, and a keylogger. Get clean logs from targeted devices.',
    icon: <Shield className="w-12 h-12"/>,
    images: [
        'https://via.placeholder.com/800x600/0a0a0a/33ffcc.png?text=Web+Injects',
        'https://via.placeholder.com/800x600/0a0a0a/33ffcc.png?text=Control+Panel',
        'https://via.placeholder.com/800x600/0a0a0a/33ffcc.png?text=Live+Logs',
    ],
    features: [
      "400+ Web Injects",
      "Credit Card Stealer",
      "SMS Interception",
      "Keylogging",
      "Admin Panel",
    ],
    options: [
      { name: 'Monthly', price: 750, popular: false },
      { name: 'Lifetime', price: 1800, popular: true },
    ]
  },
  {
    id: 'data-destroyer',
    name: 'Data Destroyer',
    tagline: 'Irreversibly wipe data from target systems.',
    description: 'A powerful tool designed for one purpose: to completely and irreversibly destroy data on a target system. Bypasses standard recovery methods and can be deployed silently.',
    icon: <Skull className="w-12 h-12"/>,
    images: [
        'https://via.placeholder.com/800x600/0a0a0a/33ffcc.png?text=Wipe+Confirmed',
        'https://via.placeholder.com/800x600/0a0a0a/33ffcc.png?text=Targeting+Options',
        'https://via.placeholder.com/800x600/0a0a0a/33ffcc.png?text=Deployment+Panel',
    ],
    features: [
      "Multiple Wipe Algorithms",
      "MBR/GPT Overwrite",
      "Silent Execution",
      "Delayed Execution Timer",
      "Self-destruct after run",
    ],
    options: [
      { name: 'Single Use', price: 100, popular: false },
      { name: '10-Pack License', price: 500, popular: true },
    ]
  }
];